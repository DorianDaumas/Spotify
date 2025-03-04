import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Payload } from '../../../components/player/btnPlay';

const initialState: Payload = {
  info: {
    name: '',
    uri: '',
    offset: 1,
  }
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setNewUris: (state, action: PayloadAction<Payload>) => {
      state.info = action.payload.info;
    },
    getUris: (state) => state,
    clearUris: (state) => {
      state.info = { name: '', uri: '', offset: 1 };
    },
  },
});

export const { setNewUris, clearUris, getUris } = playerSlice.actions;
export default playerSlice.reducer;
