export interface ILinkNavListItem {
    MenuName: string;
    GroupName: string;
    DataInterception?: boolean;
    URL: {
        Description: string;
        Url: string;
    };
}