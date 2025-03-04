export interface RootStartPlayer {
    context_uri?: string | null;
    deviceId?: string;
    offset?: {
        position?: number;
        uri?: string;
    };
    uris?: string | string[];
    position_ms?: number;
}
