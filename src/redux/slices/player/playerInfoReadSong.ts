import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InfoBtn {
    info: {
        name: string,
        uri: string,
        type: string,
        id: string,
    }
  }
  

const initialState: InfoBtn = {
    info: {
        name: '',
        uri: '',
        type: '',
        id: ''
    }
};

export const playerInfoReadSongSlice = createSlice({
  name: 'playerInfoReadSong',
  initialState,
  reducers: {
    setInfoBtn: (state, action: PayloadAction<InfoBtn>) => {      
      state.info = action.payload.info
      console.log(state.info, 'zieufhbizeufg');
      
    },
    getInfo: (state) => state,
  },
});

export const { setInfoBtn, getInfo } = playerInfoReadSongSlice.actions;
export default playerInfoReadSongSlice.reducer;
