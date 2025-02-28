import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Albums, RootAlbumsNewReleases } from './albumNewReleases.interface';

const initialState: RootAlbumsNewReleases = {
  albums: {
        href: '',
        limit: 0,
        next: '',
        offset: 0,
        previous: '',
        total: 0,
        items: []
    }
}

const albumNewReleases = createSlice({
  name: 'albumNewReleases',
  initialState,
  reducers: {
    getAlbumsNewReleases: (state, action: PayloadAction<Albums>) => {
        state.albums = action.payload
    },
  }
});

export const {getAlbumsNewReleases} = albumNewReleases.actions

export default albumNewReleases.reducer