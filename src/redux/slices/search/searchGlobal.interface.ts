export interface RootGlobalSearch {
    tracks: Tracks;
    artists: Artists;
    albums: Albums;
    playlists: Playlists;
  }
  
  export interface Playlists {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous?: string;
    total: number;
    items: (Item4 | null)[];
  }
  
  export interface Item4 {
    collaborative?: boolean;
    description?: string;
    external_urls?: Externalurls;
    href?: string;
    id?: string;
    images?: Image2[];
    name?: string;
    owner?: Owner;
    primary_color?: string;
    public?: boolean;
    snapshot_id?: string;
    tracks?: Tracks2;
    type?: string;
    uri?: string;
  }
  
  export interface Tracks2 {
    href: string;
    total: number;
  }
  
  export interface Owner {
    display_name: string;
    external_urls: Externalurls;
    href: string;
    id: string;
    type: string;
    uri: string;
  }
  
  export interface Image2 {
    height?: string;
    url: string;
    width?: string;
  }
  
  export interface Albums {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous?: string;
    total: number;
    items: Item3[];
  }
  
  export interface Item3 {
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
  }
  
  export interface Artists {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous?: string;
    total: number;
    items: Item2[];
  }
  
  export interface Item2 {
    external_urls?: Externalurls;
    followers?: Followers;
    genres?: string[];
    href?: string;
    id?: string;
    images?: Image[];
    name?: string;
    popularity?: number;
    type?: string;
    uri?: string;
  }
  
  export interface Followers {
    href?: string;
    total: number;
  }
  
  export interface Tracks {
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
  
  export interface Externalids {
    isrc: string;
  }
  
  export interface Album {
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
  
  export interface Image {
    height: number;
    width: number;
    url: string;
  }
  
  export interface Artist {
    external_urls: Externalurls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  
  export interface Externalurls {
    spotify: string;
  }