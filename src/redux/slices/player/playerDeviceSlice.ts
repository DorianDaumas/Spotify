import { createSlice } from '@reduxjs/toolkit'

export interface RootDevice {
    devices: Device[];
}

interface Device {
    id: string;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: string;
    volume_percent: number;
    supports_volume: boolean;
}

const initialState: RootDevice = {
  devices: []
}

export const playerDeviceSlice = createSlice({
  name: 'playerPlay',
  initialState,
  reducers: {
    getDevices: (state) => state,
  }
});

export const { getDevices } = playerDeviceSlice.actions

export default playerDeviceSlice.reducer