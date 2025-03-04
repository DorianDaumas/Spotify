export interface RootUserTopArtist {
    items: Item[];
    total: number;
    limit: number;
    offset: number;
    href: string;
    next?: string;
    previous?: string;
  }
  
export interface Item {
    external_urls: Externalurls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
  }
  
  interface Image {
    height: number;
    url: string;
    width: number;
  }
  
  interface Followers {
    href?: string;
    total: number;
  }
  
  interface Externalurls {
    spotify: string;
  }