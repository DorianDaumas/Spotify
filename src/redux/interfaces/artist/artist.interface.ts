export interface RootArtistDetail {
    artists: Artist[];
  }
  
export interface Artist {
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