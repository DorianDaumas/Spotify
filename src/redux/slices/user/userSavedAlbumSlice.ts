import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootUserSavedAlbums, UserSavedAlbums } from './userSavedAlbums.interface';

const initialState: RootUserSavedAlbums = {
    savedAlbums: {
        href: '',
        items: [],
        limit: 0,
        next: '',
        offset: 0,
        previous: '',
        total: 0
    }
};

export const userSavedAlbums = createSlice({
    name: 'userSavedAlbums',
    initialState,
    reducers: {
        getUserSavedAlbums: (state, action: PayloadAction<UserSavedAlbums>) => {
            state.savedAlbums = action.payload
        },
    },
});

export const { getUserSavedAlbums } = userSavedAlbums.actions;
export default userSavedAlbums.reducer;