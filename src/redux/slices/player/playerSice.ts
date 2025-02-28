import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface PlayerUris {
    ids?: string | string[];
    info: {
      type: string,
      uri: string | string[],
      hoverId?: string,
      name?: string
    }
    offset?: number;
    uris: string | string[];
}

const initialState: PlayerUris = {
  offset: 1,
  uris: [],
  info: {
    type: '',
    uri: ''
  }
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setNewUris: (state, action: PayloadAction<PlayerUris>) => {
     
      state.offset = action.payload.offset;
      state.uris = action.payload.info.uri;
    },
    getUris: (state) => state,
    clearUris: (state) => {
      state.offset = 1;
      state.uris = [];
    },
  },
});

export const { setNewUris, clearUris, getUris } = playerSlice.actions;
export default playerSlice.reducer;
