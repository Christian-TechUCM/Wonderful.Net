import * as React from 'react';
import { ILinkNavListItem } from './ILinkNavListItem';


export interface INavQuickLinkProps {
  link: ILinkNavListItem;
}

export interface INavQuickLinkState {

}

export class NavQuickLink extends React.Component<INavQuickLinkProps, INavQuickLinkState> {

  public render(): React.ReactElement<INavQuickLinkProps> {
    const { link } = this.props;
    return (
      <a 
      className="quick-link" 
      target="_blank" 
      rel="noopener" 
      href={link.URL.Url}
      data-interception={link.DataInterception === false ? 'off': undefined}
      >{link.URL.Description}</a>
    );
  }
}

