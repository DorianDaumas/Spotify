import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootQueue } from './playerQueue.interface';

const initialState: RootQueue = {
  currently_playing: null,
  queue: [{
    album: {
      artists: [],
      available_markets: [],
      external_urls: {
        spotify: ''
      },
      href: '',
      id: '',
      images: [],
      name: '',
      release_date: '',
      total_tracks: 0,
      uri: '',
      album_type: 'album',
      release_date_precision: 'year',
      type: 'album'
    },
    artists: [],
    available_markets: [],
    disc_number: 0,
    duration_ms: 0,
    explicit: false,
    external_ids: {
      isrc: ''
    },
    external_urls: {
      spotify: ''
    },
    href: '',
    id: '',
    is_local: false,
    name: '',
    popularity: 0,
    preview_url: null,
    track_number: 0,
    type: 'track',
    uri: ''
  } as SpotifyApi.TrackObjectFull]
};

export const playerQueueSlice = createSlice({
  name: 'playerQueue',
  initialState,
  reducers: {
    setQueue: (state, action: PayloadAction<RootQueue>) => {
      state.queue = action.payload.queue;
      state.currently_playing = action.payload.currently_playing;
    },
    getQueue: (state) => state,
  },
});

export const { setQueue, getQueue } = playerQueueSlice.actions;
export default playerQueueSlice.reducer;