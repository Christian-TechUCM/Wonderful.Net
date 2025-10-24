import * as React from 'react';
import styles from './WonderfulFooter.module.scss';
import { IWonderfulFooterProps } from './IWonderfulFooterProps';
import { IWonderfulFooterState } from './IWonderfulFooterState';
import { FooterLink } from './FooterLink';
import { INavItem } from '../../services';

export default class WonderfulFooter extends React.Component<IWonderfulFooterProps, IWonderfulFooterState> {
  public render(): React.ReactElement<IWonderfulFooterProps> {

    return (
      <div id="footerParent">
        <div id="footerContainer" style={{
          width: '876px',
          borderTop: 'none',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <div className={styles.row}>
            <div className={styles.fullCell}>
              <div id="footerDivider" style={{
                display: 'none'
              }}>
                <img src="https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/footer_divider.jpg" style={{
                  width: '100%',
                  height: '1px'
                }}
                  className="img-responsive" alt="Wonderful Company" />
              </div>
            </div>

            <div className={styles.fullCell}>
              <div id="footerLogoContainer" style={{
                width: '876px'
              }}>
                <img src="https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/wond_company_logo.jpg" className={styles.footerlogo} alt="Wonderful Company" />
              </div>
            </div>
          </div>
          <div id="otherBrandsContainer">
            {/* <div className={css(styles.brandlogo, styles.fiji)}>
            </div>
            <div className={css(styles.brandlogo, styles.justin)} >
            </div>
            <div className={css(styles.brandlogo, styles.landmark)}>
            </div>
            <div className={css(styles.brandlogo, styles.pom)} >
            </div>
            <div className={css(styles.brandlogo, styles.teleflora)} >
            </div>
            <div className={css(styles.brandlogo, styles.halos)} >
            </div>
            <div className={css(styles.brandlogo, styles.almonds)}>
            </div>
            <div className={css(styles.brandlogo, styles.pistachios)}>
            </div>
            <div className={css(styles.brandlogo)}  style={{
              paddingRight: '11px'
            }}>
            <img src={sutera} alt="Sutera" height="25"/>
            </div>
            <div className={css(styles.brandlogo)} style={{
              paddingRight: '0px',
              paddingTop: '5px'
            }}>
              <img src={wsl} alt="Wonderful Seedless Lemons" height="25"/>
            </div> */}
            { this.props.links.map((navLink: INavItem)=>{
              return <FooterLink link={navLink} />;
            })}

          </div>
          <div className={styles.copyrightcontainer}>
            <div id="copyright">
              © The Wonderful Company LLC. All Rights Reserved.</div>
          </div>
        </div >
      </div >
    );
  }
}
