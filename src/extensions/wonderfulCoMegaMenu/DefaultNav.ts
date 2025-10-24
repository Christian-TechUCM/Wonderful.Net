import { IMegaNav } from "./services";

export const DEFAULT_NAV: IMegaNav = {
  globalNav: [
    {
      name: "Now",
      url: "https://wonderful.espresa.com",
      imageUrl: "https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/NOW_logo_white_sm.svg",
      width: "60.924",
      height: "15.785",
      "dataInterception": "off"
    },
    {
      name: "L&OD",
      url: "https://wonderfulco.sharepoint.com",
      imageUrl: "https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/LOD_Logo.svg",
      width: "54.8",
      height: "15.8",
      "dataInterception": "off",
      elements: [{ url: "https://lod.wonderful.net/login", name: "L&OD Website", dataInterception: "off" }, { url: "https://learning.ultipro.com/", name: "UKG Learning", dataInterception: "off" }]
    },
    {
      name: "Grow",
      url: "https://wonderfulco.sharepoint.com/sites/grow",
      imageUrl:
        "https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/grow.svg",
      width: "66.924",
      height: "21.785",
      dataInterception: "off"
    },
    {
      name: "wow",
      url: "https://wow.wonderful.net/",
      imageUrl:
        "https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/just_wow.svg",
      width: "54.98",
      height: "15.57",
      dataInterception: "off",
      elements: [{ url: "https://wow.wonderful.net", name: "WOW Website", dataInterception: "off" }, 
        { url: "https://wonderful.kainexus.com/#b", name: "WOW Hub", dataInterception: "off" }]
    },
    {
      name: "CSR Website",
      url: "https://csr.wonderful.com",
      dataInterception: "off"
    },
    {
      name: "IT Support",
      url: "https://it.wonderful.com",
      dataInterception: "off",
      elements: [{ url: "https://wonderfulco.sharepoint.com/sites/itsupport", name: "Information", dataInterception: "off" }, 
        { url: "https://it.wonderful.com", name: "Submit a ticket", dataInterception: "off" }]
    },
    {
      name: "Org Charts",
      url:
        "https://wonderfulco.sharepoint.com/sites/wonpeople/Pages/Wonderful-People-Org-Charts.aspx",
      dataInterception: "off",
    },
    {
      name: "Wonderful Neighbor",
      url: "https://wonderfulco.sharepoint.com/sites/wonderfulneighbor",
      dataInterception: "off",
    },
    {
      name: "Travel",
      url: "https://wonderfulco.sharepoint.com/sites/Travel",
      dataInterception: "off",
      elements: [{ url: "https://wonderfulco.sharepoint.com/sites/Travel", name: "Information", dataInterception: "off" }, { url: "https://launcher.myapps.microsoft.com/api/signin/435b89aa-9532-4c22-9195-49876218038e?tenantId=57fe7bb5-e382-4498-88fe-5c50d256f735", name: "Concur", dataInterception: "off" }]
    },
    {
      name: "UKG/HR SUPPORT",
      url:
        "https://wonderful.ultipro.com",
        dataInterception: "off",
        elements: [{ url: "https://wonderfulco.sharepoint.com/sites/TWC-HR", name: "HR Information", dataInterception: "off" }, 
          { url: "https://wonderful.ultipro.com", name: "UKG", dataInterception: "off" },
          { url: "https://wonderfulco.sharepoint.com/sites/TWC-HR/SitePages/UKG-Guides.aspx", name: "UKG Guides", dataInterception: "off" },
          { url: "https://wonderful.service-now.com/sp?id=emp_taxonomy_topic_hr&topic_id=936094211bf1825050568404604bcbd5", name: "Submit HR Request", dataInterception: "off" },
          { url: "https://powerdms.com/ui/login.aspx?siteid=wonderful", name: "Handbook & Policies", dataInterception: "off" }]
    },
    {
      name: "Rewards",
      url: "https://wonderfulco.sharepoint.com/sites/benefits",
    },
    {
      name: "Careers",
      url: "https://www.smartrecruiters.com/app/employee-portal/",
    },
    {
      name: "Ethics & Compliance Hotline",
      url: "https://secure.ethicspoint.com/domain/media/en/gui/33488/index.html",
    },
  ],
  footer: [
    {
      name: "Fiji",
      imageUrl:
        "https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/fiji_logo.jpg",
      width: "32",
      height: "37",
    },
    {
      name: "Justin",
      imageUrl:
        "https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/justin_logo.jpg",
      width: "35",
      height: "37",
    },
    {
      name: "Landmark",
      imageUrl:
        "https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/landmark_logo.jpg",
      width: "93",
      height: "37",
    },
    {
      name: "Lewis Cellars",
      imageUrl:
        "https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/LC_Logo_RGB.png",
      width: "93",
      height: "37",
    },
    {
      name: "Pom",
      imageUrl:
        "https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/pom_logo.jpg",
      width: "57",
      height: "37",
    },
    {
      name: "Pistachios",
      imageUrl:
        "https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/pistachios_logo.jpg",
      width: "88",
      height: "37",
    },
    {
      name: "Halos",
      imageUrl:
        "https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/halos_logo.jpg",
      width: "59",
      height: "37",
    },
    {
      name: "Wonderful Seedless Lemons",
      imageUrl:
        "https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/WSL_logo.png",
      height: "25",
    },
    {
      name: "Teleflora",
      imageUrl:
        "https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/teleflora_logo.jpg",
      width: "95",
      height: "37",
    },
    // {
    //   name: "Almonds",
    //   imageUrl:
    //     "https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/almonds_logo.jpg",
    //   height: "31",
    // },
    {
      name: "Neptune Pacific",
      imageUrl:
        "https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/Neptune-Pacific-Logo.jpg",
      height: "25",
    },
    {
      name: "Sutera",
      imageUrl:
        "https://publiccdn.sharepointonline.com/wonderfulco.sharepoint.com/style library/meganav/suterra_logo.png",
      height: "25",
    },
  ],
};
