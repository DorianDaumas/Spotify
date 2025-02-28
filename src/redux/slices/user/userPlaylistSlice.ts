import { createSlice } from '@reduxjs/toolkit';
import { RootUserPlaylist } from './userPlaylist.interface';

const initialState: RootUserPlaylist = {
    userPlaylist: {
        href: '',
        limit: 0,
        next: '',
        offset: 0,
        previous: '',
        total: 0,
        items: []
    }
};

export const userPlaylistSlice = createSlice({
  name: 'userPlaylist',
  initialState,
  reducers: {
    getPlaylist: (state) => state,
  },
});
