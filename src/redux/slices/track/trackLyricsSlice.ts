import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Lyrics {
    lyrics: string
}
const initialState: Lyrics = {
    lyrics: '',
};

export const trackLyricsSlice = createSlice({
    name: 'trackLyrics',
    initialState,
    reducers: {
        getTrackLyrics: (state, action: PayloadAction<Lyrics>) => {
            state.lyrics = action.payload.lyrics;
        },
    },
});

export const { getTrackLyrics } = trackLyricsSlice.actions;
export default trackLyricsSlice.reducer; 