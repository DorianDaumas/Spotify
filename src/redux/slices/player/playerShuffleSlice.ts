import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface PlayerDevice {
    device: string
}

const initialState: PlayerDevice = {
    device: ''
};

export const playerDeviceSlice = createSlice({
  name: 'playerShuffle',
  initialState,
  reducers: {
    setDevice: (state, action: PayloadAction<string>) => {
      state.device = action.payload
    },
    getDevice: (state) => state
  },
});

export const { setDevice, getDevice } = playerDeviceSlice.actions;
export default playerDeviceSlice.reducer;
