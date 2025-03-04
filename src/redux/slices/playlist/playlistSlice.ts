import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootObject } from '../../interfaces/playlist/playlist.interface'
const initialState: RootObject = {
    playlistDetails: {
        collaborative: false,
        description: '',
        external_urls: {
            spotify: ''
        },
        followers: {
            href: null,
            total: 0
        },
        href: '',
        id: '',
        images: [],
        name: '',
        owner: {
            display_name: '',
            href: '',
            id: '',
            type: '',
            uri: ''
        },
        primary_color: null,
        public: false,
        snapshot_id: '',
        tracks: {
            href: '',
            total: 0,
            items: [],
            limit: 0,
            next: '',
            offset: 0
        },
        type: '',
        uri: ''
    },
    status: false,
    errorId: ''
};

export const playlistSlice = createSlice({
    name: 'intro',
    initialState,
    reducers: {
        getPlaylistData: (state, action: PayloadAction<RootObject>) => {            
            state.playlistDetails = action.payload.playlistDetails
        },
    },
});

export const { getPlaylistData } = playlistSlice.actions;
export default playlistSlice.reducer;