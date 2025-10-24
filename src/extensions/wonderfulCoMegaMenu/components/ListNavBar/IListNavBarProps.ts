import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

export interface IListNavBarProps {
    displayName?: string;
    siteUrl: string;
    listName: string;
    context: ApplicationCustomizerContext;
    businessUnit: string;
    menuName: string;
}