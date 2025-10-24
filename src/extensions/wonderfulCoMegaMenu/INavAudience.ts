import { INavConfiguration } from "./INavConfiguration";

export interface INavAudience {
    adGroups: string[];
    navigation: Array<INavConfiguration>;
}