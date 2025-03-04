export interface rootAlbumDetails {
    albumDetails: AlbumDetailsType
}

export interface AlbumDetailsType {
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
    restrictions: Restrictions;
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
    isrc: string;
    ean: string;
    upc: string;
  }
  
export interface Copyright {
    text: string;
    type: string;
  }
  
export interface Tracks {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
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
    is_playable: boolean;
    linked_from: Linkedfrom;
    restrictions: Restrictions;
    name: string;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
  }
  
export interface Linkedfrom {
    external_urls: Externalurls;
    href: string;
    id: string;
    type: string;
    uri: string;
  }
  
export interface Artist {
    external_urls: Externalurls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  
export interface Restrictions {
    reason: string;
  }

export interface Image {
    url: string;
    height: number;
    width: number;
  }
  
export interface Externalurls {
    spotify: string;
  }