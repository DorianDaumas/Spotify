interface Album {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: Externalurls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  }
  
  interface Image {
    height: number;
    url: string;
    width: number;
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
  
  interface Externalids {
    isrc: string;
  }
  
  interface Restrictions {
    reason: string;
  }
  
export interface Currentlyplaying {
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
    preview_url: string | null; // preview_url peut être null
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
  }
  
 export interface CurrentQueueItem { // Renommé pour éviter la confusion avec le type RootQueue
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
    name: string;
    popularity: number;
    track_number: number;
    type: string;
    uri: string;
  }
  
  export interface RootQueue {
    currently_playing: Currentlyplaying | null; // Peut être null si rien ne joue
    queue: (SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObjectFull)[]; // Tableau de CurrentQueueItem
  }