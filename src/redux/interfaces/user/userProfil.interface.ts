export interface RootUserProfil {
    userProfil: UserProfil
}

export interface UserProfil {
    country: string;
    display_name: string;
    email: string;
    explicit_content: Explicitcontent;
    external_urls: Externalurls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
  }
  
  interface Image {
    url: string;
    height: number;
    width: number;
  }
  
  interface Followers {
    href: string;
    total: number;
  }
  
  interface Externalurls {
    spotify: string;
  }
  
  interface Explicitcontent {
    filter_enabled: boolean;
    filter_locked: boolean;
  }