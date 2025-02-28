export interface RootRecommendationByGenre {
    tracks: Tracks;
  }
  
  interface Tracks {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous?: string;
    total: number;
    items: Item[];
  }
  
 export interface Item {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: Externalids;
    external_urls: Externalurls;
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url?: string;
    track_number: number;
    type: string;
    uri: string;
  }
  
  interface Externalids {
    isrc: string;
  }
  
  interface Album {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: Externalurls;
    href: string;
    id: string;
    images: Image[];
    is_playable: boolean;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  }
  
  interface Image {
    height: number;
    width: number;
    url: string;
  }
  
  interface Artist {
    external_urls: Externalurls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  
  interface Externalurls {
    spotify: string;
  }