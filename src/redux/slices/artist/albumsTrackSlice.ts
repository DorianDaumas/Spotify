import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootAlbumTracks } from '../../interfaces/artist/albumTracks.interface';

const initialState: RootAlbumTracks = {
    albumTracksitems: {
        href: '',
        items: [],
        limit: 0,
        next: '',
        offset: 0,
        previous: '',
        total: 0,
    },
};

export const albumTracksSlice = createSlice({
    name: 'albumTracks',
    initialState,
    reducers: {
        getAlbumTracks: (state, action: PayloadAction<RootAlbumTracks>) => {
            state.albumTracksitems = action.payload.albumTracksitems;
        },
    },
});

export const { getAlbumTracks } = albumTracksSlice.actions;
export default albumTracksSlice.reducer; 