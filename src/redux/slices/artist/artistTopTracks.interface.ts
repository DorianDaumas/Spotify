export interface RootTopTrack {
    tracks: Track[];
}

export interface Track {
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
    linked_from: object;
    restrictions: Restrictions;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
}


export interface Externalids {
    isrc: string;
    ean: string;
    upc: string;
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
    restrictions: Restrictions;
    type: string;
    uri: string;
    artists: Artist[];
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