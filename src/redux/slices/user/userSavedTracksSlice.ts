import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootUserSavedTracks, UserSavedTracks } from './userSavedTracks.interface';

const initialState: RootUserSavedTracks = {
    savedTracks: {
        href: '',
        items: [],
        limit: 0,
        next: '',
        offset: 0,
        previous: '',
        total: 0
    }
};

export const userSavedTracks = createSlice({
    name: 'userSavedTracks',
    initialState,
    reducers: {
        getUserSavedTracks: (state, action: PayloadAction<UserSavedTracks>) => {
            state.savedTracks = action.payload
        },
    },
});

export const { getUserSavedTracks } = userSavedTracks.actions;
export default userSavedTracks.reducer;