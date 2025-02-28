import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RooTrackDetails } from './trackDetails.interface';

const initialState: RooTrackDetails = {
    trackDetails: {
        album: {
            album_type: '',
            artists: [],
            available_markets: [],
            external_urls: {
                spotify: ''
            },
            href: '',
            id: '',
            images: [],
            name: '',
            release_date: '',
            release_date_precision: '',
            total_tracks: 0,
            type: '',
            uri: ''
        },
        artists: [],
        available_markets: [],
        disc_number: 0,
        duration_ms: 0,
        explicit: false,
        external_ids: {
            isrc: ''
        },
        external_urls: {
            spotify: ''
        },
        href: '',
        id: '',
        is_local: false,
        name: '',
        popularity: 0,
        track_number: 0,
        type: '',
        uri: ''
    },
};

export const trackDetailsSlice = createSlice({
    name: 'trackDetails',
    initialState,
    reducers: {
        getTrackDetails: (state, action: PayloadAction<RooTrackDetails>) => {
            state.trackDetails = action.payload?.trackDetails;
        },
    },
});

export const { getTrackDetails } = trackDetailsSlice.actions;
export default trackDetailsSlice.reducer; 