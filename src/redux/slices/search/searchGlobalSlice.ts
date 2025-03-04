import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootGlobalSearch } from '../../interfaces/search/searchGlobal.interface';

const initialState: RootGlobalSearch = {
    tracks: {
        href: '',
        limit: 0,
        next: '',
        offset: 0,
        total: 0,
        items: []
    },
    artists: {
        href: '',
        limit: 0,
        next: '',
        offset: 0,
        total: 0,
        items: []
    },
    albums: {
        href: '',
        limit: 0,
        next: '',
        offset: 0,
        total: 0,
        items: []
    },
    playlists: {
        href: '',
        limit: 0,
        next: '',
        offset: 0,
        total: 0,
        items: []
    }
};

export const searchGlobalSlice = createSlice({
    name: 'searchGlobal',
    initialState,
    reducers: {
        getSearchResult: (state, action: PayloadAction<RootGlobalSearch>) => {
            state.albums = action.payload.albums;
            state.artists = action.payload.artists;
            state.playlists = action.payload.playlists;
            state.tracks = action.payload.tracks;
        },
    },
});

export const { getSearchResult } = searchGlobalSlice.actions;
export default searchGlobalSlice.reducer; 