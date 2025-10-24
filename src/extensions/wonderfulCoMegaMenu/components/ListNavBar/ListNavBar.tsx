import * as React from "react";
import * as ReactDom from "react-dom";
import styles from "./ListNavBar.module.scss";
import globalStyles from "../WonderfulNavBar/WonderfulNavBar.module.scss";
import { IListNavBarProps } from "./IListNavBarProps";
import { IListNavBarState } from "./IListNavBarState";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";
import { ISPFXContext, dateAdd } from "@pnp/pnpjs";
import { css } from "@uifabric/utilities/lib/css";
import { ILinkNavListItem } from "./ILinkNavListItem";
import { NavQuickLink } from "./NavQuickLink";

export class ListNavBar extends React.Component<
  IListNavBarProps,
  IListNavBarState
> {
  constructor(props: IListNavBarProps) {
    super(props);

    this.state = {
      listItems: undefined,
    };
  }

  public async componentDidMount(): Promise<void> {
    //console.log(
    //   "Getting ListNavBar navigation",
    //   this.props.listName,
    //   this.props.siteUrl
    // );
    try {
      sp.setup({
        spfxContext: this.props.context as any,
      });

      const w = Web(this.props.siteUrl);
      //const w = await sp.web;
      ////console.log(`Web Title: ${w.Title}`);

      //const w = Web(this.props.siteUrl);
      //console.log("It's probably Hugo's fault!!!!");
      const allItems: ILinkNavListItem[] = await w.lists
        .getByTitle(this.props.listName)
        .items.select("MenuName", "GroupName", "URL", "DataInterception")
        .filter(
          `BU eq '${this.props.businessUnit}' and MenuName eq '${this.props.menuName}'`
        )
        .usingCaching({
          expiration: dateAdd(new Date(), "hour", 8),
          key: `${this.props.businessUnit}_${this.props.menuName}`,
          storeName: "local",
        })
        .getAll();
      // console.log(
      //   `Got items for ${this.props.businessUnit} and ${this.props.menuName}`,
      //   allItems
      // );

      this.setState({
        listItems: allItems,
      });
    } catch (e) {
      console.log("Error getting listnavbar", e);
    }
  }

  public render(): React.ReactElement<IListNavBarProps> {
    if (this.state.listItems !== undefined) {
      //console.log(
      // `Items ${this.props.businessUnit} and ${this.props.menuName}`,
      // this.state.listItems);
    }

    return (
      <div className={css(globalStyles.globalNavCell, styles.listnavbar)}>
        <a href="#">
          {this.props.displayName
            ? this.props.displayName.toUpperCase()
            : this.props.menuName}
        </a>
        <div className={globalStyles.globalarrowup}></div>
        <div className={globalStyles.globalgroupdd}>
          <div className={globalStyles.grouplinkcontainer}>
            {this.state.listItems &&
              this.state.listItems
                .sort((a: ILinkNavListItem, b: ILinkNavListItem) => (a.GroupName > b.GroupName) ? 1 : -1)
                .map((navItem: ILinkNavListItem) => {
                  return <NavQuickLink link={navItem} />;
                })}
          </div>
        </div>
      </div>
    );
  }
}
