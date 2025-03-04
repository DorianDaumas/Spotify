import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootArtistDetail } from '../../interfaces/artist/artist.interface'

const initialState: RootArtistDetail = {
    artists: [],
};


export const artistDetailsSlice = createSlice({
    name: 'artistDetails',
    initialState,
    reducers: {
        getArtistData: (state, action: PayloadAction<RootArtistDetail>) => {
            state.artists = action.payload.artists
        },
    },
});

export const { getArtistData } = artistDetailsSlice.actions;
export default artistDetailsSlice.reducer;