import * as React from "react";
import styles from "./WonderfulNavBar.module.scss";

import { IWonderfulNavBarProps } from "./IWonderfulNavBarProps";
import { IWonderfulNavBarState } from "./IWonderfulNavBarState";
import { INavItem } from "../../services";
import { GlobalNavLink } from "./GlobalNavLink";
import TargetAudience from "../TargetAudience/TargetAudience";

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import { ListNavBar } from "../ListNavBar";
import { INavConfiguration } from "../../INavConfiguration";
import { INavAudience } from "../../INavAudience";

export default class WonderfulNavBar extends React.Component<
  IWonderfulNavBarProps,
  IWonderfulNavBarState
> {

  public render(): React.ReactElement<IWonderfulNavBarProps> {
    //console.log("Rendering");
    const { megaNav } = this.props;
    if (this.props.skip) {
      require("./WonderfulStyles.scss");
      return <></>;
    }

    require("./WonderfulStyles.scss");
    require("./NoHeader.scss");
    return (
      <div className={styles.topnav}>
        <div className={styles.header}>
          <a href="https://wonderfulco.sharepoint.com">
            <img
              src="https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/wonderfulnet.svg"
              alt="Wonderful.net"
              width={"188.45"}
              height={"23.79"}
              className={styles.logo}
            />
          </a>
          <img
            src="https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/header_divider.jpg"
            alt=""
            className={styles.headerdivider}
          ></img>

          <div className={styles.globalNav}>
            <div className={styles.globalNavRow}>
              {this.props.navigation.map(
                (navItem: INavConfiguration | INavAudience, index: number) => {
                  const isTargeted: boolean =
                    (navItem as INavAudience).adGroups !== undefined;

                  if (isTargeted) {
                    const targeted: INavAudience = navItem as INavAudience;
                    return (
                      <TargetAudience
                        userAudiences={this.props.audiences}
                        uniqueKey={`Nav_{index}`}
                        groupIds={targeted.adGroups}
                      >
                        {targeted.navigation.map((nav: INavConfiguration) => {
                          return (
                            <ListNavBar
                              displayName={nav.displayName}
                              menuName={nav.menuName}
                              businessUnit={nav.businessUnit}
                              listName={this.props.listName}
                              siteUrl={this.props.siteUrl}
                              context={this.props.context}
                            />
                          );
                        })}
                      </TargetAudience>
                    );
                  } else {
                    const nav: INavConfiguration = navItem as INavConfiguration;
                    return (
                      <ListNavBar
                        displayName={nav.displayName}
                        menuName={nav.menuName}
                        businessUnit={nav.businessUnit}
                        listName={this.props.listName}
                        siteUrl={this.props.siteUrl}
                        context={this.props.context}
                      />
                    );
                  }
                }
              )}
            </div>
          </div>
        </div>

        <ul>
          {megaNav.globalNav.map((navItem: INavItem) => {
            return <GlobalNavLink link={navItem} />;
          })}
        </ul>
      </div>
    );
  }
}
