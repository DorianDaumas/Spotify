export interface RootQueue {
    currently_playing: Currentlyplaying;
    queue: Currentlyplaying[];
  }
  
  interface Currentlyplaying {
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
    is_playable: boolean;
    linked_from: string;
    restrictions: Restrictions;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
  }
  
  interface Externalids {
    isrc: string;
    ean: string;
    upc: string;
  }
  
  interface Album {
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
  }
  
  interface Artist {
    external_urls: Externalurls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  
  interface Restrictions {
    reason: string;
  }
  
  interface Image {
    url: string;
    height: number;
    width: number;
  }
  
  interface Externalurls {
    spotify: string;
  }