export interface Project {
    projectId: number;
    image: string;
    thumb?: string;
    logo?: string;
    project?: string;
    nameTH?: string;
    nameEN?: string;
    price?: string;
    university?: string;
    link: string;
    status?: string;
  }

  export interface ProjectGroup {
    group_name: string;
    group_key: string;
    group_desc: string;
    projects_listed: Project[];
    group_sub_title: string;
  }
  
  export interface FormData {
    ProjectID: number;
    ContactChannelID: number;
    ContactTypeID: number;
    RefID: number;
    Fname: string;
    Lname: string;
    Tel: string;
    Email: string;
    Ref: string;
    RefDate:string;
    FollowUpID: number;
    utm_source: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    PriceInterest: string;
    PurchasePurpose: string;
    FlagPersonalAccept: boolean;
    FlagContactAccept: boolean;
    AppointTime: string;
    AppointTimeEnd: string;
  }