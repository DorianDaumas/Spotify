import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from 'react-spotify-web-playback';

export interface playerTracksInfo {
    tracksInfo: State;
}

const initialState: playerTracksInfo = {
  tracksInfo: {
    currentDeviceId: '',
    currentURI: '',
    deviceId: '',
    devices: [],
    error: '',
    errorType: null,
    isActive: false,
    isInitializing: false,
    isMagnified: false,
    isPlaying: false,
    isSaved: false,
    isUnsupported: false,
    needsUpdate: false,
    nextTracks: [],
    playerPosition: 'top',
    position: 0,
    previousTracks: [],
    progressMs: 0,
    repeat: 'track',
    shuffle: false,
    status: 'ERROR',
    track: {
      artists: [],
      durationMs: 0,
      id: '',
      image: '',
      name: '',
      uri: '',
    },
    volume: 0
  }
};

export const playerTrackInfoSlice = createSlice({
  name: 'playerTrackInfo',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<playerTracksInfo>) => {      
      state.tracksInfo = action.payload.tracksInfo
    },
    getCurrentTrack: (state) => state,
  },
});

export const { setCurrentTrack, getCurrentTrack } = playerTrackInfoSlice.actions;
export default playerTrackInfoSlice.reducer;
