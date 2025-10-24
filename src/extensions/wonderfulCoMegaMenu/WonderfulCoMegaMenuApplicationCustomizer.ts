import * as React from "react";
import * as ReactDom from "react-dom";
import { override } from "@microsoft/decorators";
import { Log } from "@microsoft/sp-core-library";
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
} from "@microsoft/sp-application-base";
import WonderfulNavBar from "./components/WonderfulNavBar/WonderfulNavBar";
import WonderfulFooter from "./components/WonderfulFooter/WonderfulFooter";
import { IWonderfulFooterProps } from "./components/WonderfulFooter/IWonderfulFooterProps";

import { IWonderfulNavBarProps } from "./components/WonderfulNavBar/IWonderfulNavBarProps";
import { IWonderfulCoMegaMenuApplicationCustomizerProperties } from "./IWonderfulCoMegaMenuApplicationCustomizerProperties";
import { DEFAULT_NAV } from "./DefaultNav";
import { Dialog } from "@microsoft/sp-dialog";
import { MSGraphClient } from "@microsoft/sp-http";
import { Entity } from "@microsoft/microsoft-graph-types";
import { UrlQueryParameterCollection } from "@microsoft/sp-core-library";
import { ICachedMembership } from "./ICachedMembership";
import * as strings from "WonderfulCoMegaMenuApplicationCustomizerStrings";

const LOG_SOURCE: string = "WonderfulCoMegaMenuApplicationCustomizer";

const HOURSCACHE: number = 8;
const CACHEKEY: string = "membership-audiences";

/** A Custom Action which can be run during execution of a Client Side Application */
export default class WonderfulCoMegaMenuApplicationCustomizer extends BaseApplicationCustomizer<IWonderfulCoMegaMenuApplicationCustomizerProperties> {
  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;
  private _audiences: string[] = undefined;

  public async onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    if (
      this._audiences === undefined &&
      this.properties.navigation !== undefined
    ) {
      await this._verifyAudiences();
    }

    this.context.placeholderProvider.changedEvent.add(
      this,
      this._renderPlaceHolders
    );

    return Promise.resolve();
  }

  private async _verifyAudiences(): Promise<void> {
    const queryParameters = new UrlQueryParameterCollection(
      window.location.href
    );
    const noCache: boolean = !!queryParameters.getValue("flushcache");
    if (noCache) {
      console.log("Flushing cache");
      localStorage.removeItem(CACHEKEY);
    }

    // Uncomment this if you want to clear cache manually for testing
    // localStorage.removeItem(CACHEKEY);

    const cmJson: string = localStorage.getItem(CACHEKEY);
    if (cmJson) {
      const cachedMembership: ICachedMembership = JSON.parse(cmJson);
      const now: Date = new Date();

      if (cachedMembership && cachedMembership.dateExpiry) {
        const dateExpiry = new Date(cachedMembership.dateExpiry);

        if (dateExpiry > now) {
          this._audiences = cachedMembership.userAudiences;
          return;
        }
      }
    }

    var audienceIds: string[] = [];

    // extract the audience ids from the navigation
    this.properties.navigation.forEach((nav: any) => {
      if (nav.adGroups !== undefined) {
        nav.adGroups.forEach((adGroup: any) => {
          audienceIds.push(adGroup);
        });
      }
    });

    // Get the user's actual group memberships
    const myAudienceIds: string[] = await this.getAudienceIds();

    // Filter to see which of the nav's adGroup IDs we actually belong to
    this._audiences = audienceIds.filter((item) => {
      return myAudienceIds.indexOf(item) > -1;
    });

    // Cache the membership
    this.cacheMembership(this._audiences);
  }

  private cacheMembership(audiences: string[]): void {
    // Calculate how long before our cache expires
    const dateExpiry: Date = this.addMinutes(new Date(), HOURSCACHE * 60);

    // Create a cached membership object
    const cachedMembership: ICachedMembership = {
      dateExpiry: dateExpiry.getTime(),
      userAudiences: audiences,
    };

    localStorage.setItem(CACHEKEY, JSON.stringify(cachedMembership));
  }

  private addMinutes(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
  }

  private _renderPlaceHolders(): void {
    const absoluteUrl: string =
      this.context.pageContext.site.absoluteUrl.toLowerCase();
    let skip: boolean = false;

    // See if we need to skip this URL
    if (this.properties.skipUrls) {
      // Look for an exact match of the full URL
      if (this.properties.skipUrls.indexOf(absoluteUrl) > -1) {
        skip = true;
      }

      // Look for a partial match
      this.properties.skipUrls.forEach((u: string) => {
        if (absoluteUrl.indexOf(u.toLowerCase()) > -1 && !skip) {
          skip = true;
        }
      });
    }

    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );

      if (!this._topPlaceholder) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }

      const element: React.ReactElement<IWonderfulNavBarProps> =
        React.createElement(WonderfulNavBar, {
          megaNav: DEFAULT_NAV,
          navigation: this.properties.navigation,
          context: this.context,
          listName: this.properties.listName,
          siteUrl: this.properties.siteUrl,
          skip: skip,
          audiences: this._audiences,
        });

      ReactDom.render(element, this._topPlaceholder.domElement);
    }

    // Handling the bottom placeholder
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Bottom,
          { onDispose: this._onDispose }
        );

      if (!this._bottomPlaceholder) {
        console.error("The expected placeholder (Bottom) was not found.");
        return;
      }

      const footerElement: React.ReactElement<IWonderfulFooterProps> =
        React.createElement(WonderfulFooter, {
          links: DEFAULT_NAV.footer,
        });

      let footerReplaced: boolean = false;
      const intervalHandle: number = setInterval(() => {
        const footer: HTMLElement =
          this._bottomPlaceholder.domElement.ownerDocument.querySelector(
            "footer"
          );
        if (footer) {
          this.replaceNodeWithReactComponent(footer, footerElement);
          footerReplaced = true;
          clearInterval(intervalHandle);
        }
      }, 100);
    }
  }

  private replaceNodeWithReactComponent(
    element: HTMLElement,
    reactComponent: any
  ) {
    const parent = document.createElement("div");
    ReactDom.render(reactComponent, parent, () => {
      element.replaceWith(parent.childNodes[0]);
    });
  }

  private _onDispose(): void {}

  /**
   * Using Option A: A single while-loop to handle paging.
   */
  public getAudienceIds = async (): Promise<string[]> => {
    const client = await this.context.msGraphClientFactory.getClient("3");
    let allGroups: string[] = [];

    // Start with the initial endpoint
    let endpoint = "/me/transitiveMemberOf";

    // Keep calling until no @odata.nextLink is returned
    while (endpoint) {
      const response = await client.api(endpoint).get();

      if (response && response.value) {
        // Map each object to its ID
        const currentPageIds = response.value.map((group: Entity) => group.id);
        allGroups.push(...currentPageIds);
      }

      // If @odata.nextLink is present, that's our new endpoint
      // If not, we set endpoint to "" (or null) to exit the loop
      endpoint = response["@odata.nextLink"] || "";
    }

    return allGroups;
  }
}
