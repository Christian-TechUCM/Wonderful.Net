import { IMegaNav } from '../../services';

import {
  ApplicationCustomizerContext
} from '@microsoft/sp-application-base';
import { INavAudience } from '../../INavAudience';
import { INavConfiguration } from '../../INavConfiguration';

export interface IWonderfulNavBarProps {
  megaNav: IMegaNav;
  navigation: Array<INavConfiguration|INavAudience>;
  context: ApplicationCustomizerContext;
  siteUrl: string;
  listName: string;
  skip: boolean;
  audiences: string[];
}
