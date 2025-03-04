export interface RootSearchPopularArtists {
    artists: PopularArtists;
  }
  
export interface PopularArtists {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Item[];
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
  
export interface Image {
    url: string;
    height: number;
    width: number;
  }
  
export interface Followers {
    href?: string;
    total: number;
  }
  
export interface Externalurls {
    spotify: string;
  }