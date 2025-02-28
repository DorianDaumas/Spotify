export interface RootAlbumTracks {
    albumTracksitems: AlbumTracks;
  }
  
  export interface AlbumTracks {
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
  
export interface Restrictions {
    reason: string;
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
  
export interface Externalurls {
    spotify: string;
  }