export interface RootStartPlayer {
    context_uri?: string;
    deviceId?: string;
    offset?: {
        position?: number;
        uri?: string;
    };
    uris?: string[];
    position_ms?: number;
}
