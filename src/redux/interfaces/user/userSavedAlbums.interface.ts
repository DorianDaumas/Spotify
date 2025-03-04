export interface RootUserSavedAlbums {
    savedAlbums: UserSavedAlbums
  }

export interface UserSavedAlbums {
href: string;
items: Item2[];
limit: number;
next?: string;
offset: number;
previous?: string;
total: number;
}
  
export interface Item2 {
    added_at: string;
    album: Album;
  }
  
export interface Album {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: Externalurls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    type: string;
    uri: string;
    artists: Artist[];
    tracks: Tracks;
    copyrights: Copyright[];
    external_ids: Externalids;
    genres: string[];
    label: string;
    popularity: number;
  }
  
export interface Externalids {
    upc: string;
  }
  
export interface Copyright {
    text: string;
    type: string;
  }
  
export interface Tracks {
    href: string;
    limit: number;
    next?: string;
    offset: number;
    previous?: string;
    total: number;
    items: Item[];
  }
  
export interface Item {
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: Externalurls;
    href: string;
    id: string;
    name: string;
    preview_url?: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
  }
  
export interface Artist {
    external_urls: Externalurls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  
export interface Image {
    url: string;
    height: number;
    width: number;
  }
  
export interface Externalurls {
    spotify: string;
  }