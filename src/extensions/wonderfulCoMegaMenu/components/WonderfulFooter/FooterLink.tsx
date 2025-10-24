import * as React from 'react';
import { IFooterLinkState } from './IFooterLinkState';
import { IFooterLinkProps } from './IFooterLinkProps';
import styles from './WonderfulFooter.module.scss';

export class FooterLink extends React.Component<IFooterLinkProps, IFooterLinkState> {

  public render(): React.ReactElement<IFooterLinkProps> {
    const { link } = this.props;
    return <div className={styles.brandlogo}>
      { link.url ? <a rel="noopener" target="_blank" href={link.url} data-interception={link.dataInterception}>
      <img src={link.imageUrl} alt={link.name} width={link.width} height={link.height} />
      </a>:
      <img src={link.imageUrl} alt={link.name} width={link.width} height={link.height} />}
          </div>;
  }
}

