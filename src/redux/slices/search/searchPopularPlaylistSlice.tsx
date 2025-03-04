import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PopularPlaylists, RootSearchPopularPlaylist } from '../../interfaces/search/searchPopularPlaylist.interface';

const initialState: RootSearchPopularPlaylist = {
    playlists: {
        href: '',
        limit: 0,
        next: '',
        offset: 0,
        previous: '',
        total: 0,
        items: []
    },
};

export const searchPopularPlaylistSlice = createSlice({
    name: 'popularPlaylist',
    initialState,
    reducers: {
        getPopularPlaylist: (state, action: PayloadAction<PopularPlaylists>) => {
            state.playlists = action.payload;
        },
    },
});

export const { getPopularPlaylist } = searchPopularPlaylistSlice.actions;
export default searchPopularPlaylistSlice.reducer; 