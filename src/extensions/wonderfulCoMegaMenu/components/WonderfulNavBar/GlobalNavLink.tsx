import * as React from 'react';
import { IGlobalNavLinkState } from './IGlobalNavLinkState';
import { IGlobalNavLinkProps } from './IGlobalNavLinkProps';
import "./dropdown.css";

export class GlobalNavLink extends React.Component<IGlobalNavLinkProps, IGlobalNavLinkState> {

  public render(): React.ReactElement<IGlobalNavLinkProps> {

    const { link } = this.props;
    return (
      <li className={link.elements ? "dropdown" : ""}><a rel="noopener" target="_blank" href={link.url} data-interception={link.dataInterception}>
        {
          link.imageUrl ?
            <img src={link.imageUrl} alt={link.name} width={link.width} height={link.height} />
            : link.name
        }</a>{link.elements ? <ul className='dropdown-content' >
          {
            link.elements.map((dropdownLink: any) => {
              return (<li><a rel="noopener" target="_blank" href={dropdownLink.url} data-interception={dropdownLink.dataInterception}>{dropdownLink.name}<i className="fa fa-caret-down"></i></a></li>);
            })
          }
        </ul> : ""}</li>
    );
  }
}

