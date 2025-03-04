export interface RootSearchPopularPlaylist {
    playlists: PopularPlaylists;
  }
  
export interface PopularPlaylists {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: (Item | null)[];
  }
  
export interface Item {
    collaborative?: boolean;
    description?: string;
    external_urls?: Externalurls;
    href?: string;
    id?: string;
    images?: Image[];
    name?: string;
    owner?: Owner;
    primary_color?: string;
    public?: boolean;
    snapshot_id?: string;
    tracks?: Tracks;
    type?: string;
    uri?: string;
  }
  
export interface Tracks {
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
  
export interface Image {
    height?: string;
    url: string;
    width?: string;
  }
  
export interface Externalurls {
    spotify: string;
  }