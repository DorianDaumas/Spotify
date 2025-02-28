export interface RootObject {
    playlistDetails: PlaylistDetails;
    status: boolean;
    errorId: string;
  }
  
  export interface PlaylistDetails {
    collaborative: boolean;
    description: string;
    external_urls: { spotify: string };
    followers: { href: string | null; total: number };
    href: string;
    id: string;
    images: Array<{ height: number; url: string; width: number }>;
    name: string;
    owner: { display_name: string; href: string; id: string; type: string; uri: string };
    primary_color: string | null;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;
  }
  
  export interface Tracks {
    href: string;
    items: Item[];
    limit: number;
    next: string;
    offset: number;
    previous?: string;
    total: number;
  }
  
  export interface Item {
    added_at: string;
    added_by: Addedby;
    is_local: boolean;
    primary_color?: string;
    track: Track;
    video_thumbnail: Videothumbnail;
  }
  
  export interface Videothumbnail {
    url?: string;
  }
  
  export interface Track {
    preview_url?: string;
    available_markets: string[];
    explicit: boolean;
    type: string;
    episode: boolean;
    track: boolean;
    album: Album;
    artists: Artist[];
    disc_number: number;
    track_number: number;
    duration_ms: number;
    external_ids: Externalids;
    external_urls: Externalurls;
    href: string;
    id: string;
    name: string;
    popularity: number;
    uri: string;
    is_local: boolean;
  }
  
  export interface Externalids {
    isrc: string;
  }
  
  export interface Album {
    available_markets: string[];
    type: string;
    album_type: string;
    href: string;
    id: string;
    images: Image2[];
    name: string;
    release_date: string;
    release_date_precision: string;
    uri: string;
    artists: Artist[];
    external_urls: Externalurls;
    total_tracks: number;
  }
  
  export interface Artist {
    external_urls: Externalurls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  
  export interface Image2 {
    url: string;
    width: number;
    height: number;
  }
  
  export interface Addedby {
    external_urls: Externalurls;
    href: string;
    id: string;
    type: string;
    uri: string;
  }
  
  export interface Owner {
    display_name: string;
    external_urls: Externalurls;
    href: string;
    id: string;
    type: string;
    uri: string;
  }
  
  export interface Image {
    height?: number;
    url: string;
    width?: number;
  }
  
  export interface Followers {
    href?: string;
    total: number;
  }
  
  export interface Externalurls {
    spotify: string;
  }