export interface RootUserPlaylist {
    userPlaylist: UserPlaylist
}

export interface UserPlaylist {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Item[];
  }
  
export interface Item {
    collaborative: boolean;
    description: string;
    external_urls: Externalurls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: Owner;
    public: boolean;
    snapshot_id: string;
    tracks: Followers;
    type: string;
    uri: string;
}

export interface Owner {
    external_urls: Externalurls;
    followers: Followers;
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
}

export interface Followers {
    href: string;
    total: number;
}

export interface Image {
    url: string;
    height: number;
    width: number;
}

export interface Externalurls {
    spotify: string;
}