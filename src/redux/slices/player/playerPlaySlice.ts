import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Play {
  play: boolean
}
const initialState: Play = {
  play: false
}

export const playerPlayEvent = createSlice({
  name: 'playerPlay',
  initialState,
  reducers: {
    getPlay: (state) => state,
    setPlay: (state, action: PayloadAction<Play>) => {
      state.play = action.payload.play;      
    },
  }
});

export const { getPlay, setPlay } = playerPlayEvent.actions

export default playerPlayEvent.reducer