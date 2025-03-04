import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PopularArtists, RootSearchPopularArtists } from '../../interfaces/search/searchPopularArtist.interface';

const initialState: RootSearchPopularArtists = {
    artists: {
        href: '',
        limit: 0,
        next: '',
        offset: 0,
        previous: '',
        total: 0,
        items: []
    },
};

export const searchPopularArtistSlice = createSlice({
    name: 'popularArtist',
    initialState,
    reducers: {
        getPopularArtist: (state, action: PayloadAction<PopularArtists>) => {
            state.artists = action.payload;
        },
    },
});

export const { getPopularArtist } = searchPopularArtistSlice.actions;
export default searchPopularArtistSlice.reducer; 