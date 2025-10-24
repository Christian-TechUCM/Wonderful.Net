import { INavAudience } from './INavAudience';
import { INavConfiguration } from './INavConfiguration';

export interface IWonderfulCoMegaMenuApplicationCustomizerProperties {
    listName: string;
    siteUrl: string;
    navigation: Array<INavConfiguration|INavAudience>;
    skipUrls: string[];
  }
  