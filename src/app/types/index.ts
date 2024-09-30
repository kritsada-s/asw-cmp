export interface Project {
    projectId: number;
    image: string;
    project: string;
    link: string;
  }
  
  export interface ProjectGroup {
    group_name: string;
    projects_listed: Project[];
  }
  
  export interface FormData {
    ProjectID: number;
    ContactChannelID: number;
    ContactTypeID: number;
    RefID: string;
    Fname: string;
    Lname: string;
    Tel: string;
    Email: string;
    Ref: string;
    RefDate:string;
    FollowUpID: number;
    utm_source: string;
    PriceInterest: string;
    PurchasePurpose: string;
    FlagPersonalAccept: boolean;
    FlagContactAccept: boolean;
    AppointTime: string;
    AppointTimeEnd: string;
  }