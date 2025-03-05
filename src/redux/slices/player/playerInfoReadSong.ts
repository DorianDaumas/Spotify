import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Track {
  id: string;
  uri: string;
  type: string;
  uid: string;
  linked_from: Linkedfrom | null;
  media_type: string;
  track_type: string;
  name: string;
  duration_ms: number;
  artists: Artist[];
  album: Album;
  is_playable: boolean;
}

interface Album {
  name: string;
  uri: string;
  images: Image[];
}

interface Image {
  url: string;
  size: string | number;  // Permettre les deux types
  height: number;
  width: number;
}

interface Artist {
  name: string;
  uri: string;
  url: string;
}

interface Linkedfrom {
  uri?: string | null;
  id?: string | null;
}

export interface InfoBtn {
    context: { uri: string | null, metadata: object | null },
    position: number,
    updateTime: number,
    duration: number,
    paused: boolean,
    track_window: { current_track: Track, next_tracks: Track[], previous_tracks: Track[] }
}
  

const initialState: InfoBtn = {
  context: { uri: "", metadata: {} },
  position: 0,
  updateTime: 0,
  paused: false,
  duration: 0,
  track_window: {
    current_track: {
      uri: "",
      id: "",
      type: "",
      media_type: "",
      name: "",
      is_playable: false,
      album: {
        uri: "",
        name: "",
        images: [{
          url: "",
          height: 0,
          width: 0,
          size: ''
        }]
      },
      artists: [{
        uri: "",
        name: "",
        url: ''
      }],
      uid: '',
      linked_from: { uri: '', id: '' },
      track_type: '',
      duration_ms: 0
    },
    next_tracks: [], 
    previous_tracks: []  
  }
};

export const playerInfoReadSongSlice = createSlice({
  name: 'playerInfoReadSong',
  initialState,
  reducers: {
    setInfoBtn: (state, action: PayloadAction<InfoBtn>) => {      
      state.context = action.payload.context;
      state.position = action.payload.position;
      state.paused = action.payload.paused;
      state.duration = action.payload.duration;
      state.updateTime = action.payload.updateTime;
      state.track_window = action.payload.track_window;            
    },
    getInfo: (state) => state,
  },
});

export const { setInfoBtn, getInfo } = playerInfoReadSongSlice.actions;
export default playerInfoReadSongSlice.reducer;
