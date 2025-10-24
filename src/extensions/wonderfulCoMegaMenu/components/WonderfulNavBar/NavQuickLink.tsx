import * as React from 'react';
import { INavItem } from '../../services';

export interface INavQuickLinkProps {
  link: INavItem;
}

export interface INavQuickLinkState {

}

export class NavQuickLink extends React.Component<INavQuickLinkProps, INavQuickLinkState> {

  public render(): React.ReactElement<INavQuickLinkProps> {
    const { link } = this.props;
    return (
      <a className="quick-link" target="_blank" rel="noopener" href={link.url} data-interception={link.dataInterception && link.dataInterception}>{link.name}</a>
    );
  }
}

