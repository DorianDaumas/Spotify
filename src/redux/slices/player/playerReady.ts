import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Play {
  playerReady: boolean
}
const initialState: Play = {
  playerReady: false
}

export const playerReady = createSlice({
  name: 'playerReady',
  initialState,
  reducers: {
    getPlayerReady: (state) => state,
    setPlayerReady: (state, action: PayloadAction<Play>) => {
      state.playerReady = action.payload.playerReady;      
    },
  }
});

export const { getPlayerReady, setPlayerReady } = playerReady.actions

export default playerReady.reducer