import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { createTheme, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { setInfoBtn, Track } from './redux/slices/player/playerInfoReadSong';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetPlaybackStateQuery, useLazyGetPlayerQueueQuery } from './redux/services/spotifyApi';
import { RootState } from './redux/store';
import { setPlayerReady } from './redux/slices/player/playerReady';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

export default function App() {
  const dispatch = useDispatch();
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const token = useSelector((state: RootState) => state.auth.token);
  const [getPlayerQueue] = useLazyGetPlayerQueueQuery()

  const [getPlaybackState] = useLazyGetPlaybackStateQuery()

  const initializeSpotifyPlayer = () => {
    if (!window.Spotify) {
      console.error("Spotify Web Playback SDK not loaded yet.");
      return;
    }

    if (!token) {
      return;
    }

    const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
    });

    player.addListener('ready', ({ device_id }) => {
      console.log("Player online");
      dispatch(setPlayerReady({playerReady: true}))
      window.localStorage.setItem("device_id", device_id);
      getPlaybackState()
    });

    player.addListener('not_ready', () => {
    console.log('Player offline');
    });

    player.addListener('player_state_changed', ({
      context: { uri, metadata },
      position,
      paused,
      duration,
      track_window: { current_track, next_tracks, previous_tracks }
    }) => {
      const formatTrack = (track: Spotify.Track): Track => ({
        ...track,
        id: track.id || '',
        uri: track.uri || '',
        type: track.type || '',
        linked_from: track.linked_from ? {
          uri: track.linked_from.uri || undefined,
          id: track.linked_from.id || undefined
        } : null,
              media_type: track.media_type || '',
        name: track.name || '',
        duration_ms: track.duration_ms || 0,
        artists: track.artists.map(artist => ({
            name: artist.name || '',
            uri: artist.uri || '',
            url: artist.url || ''
        })),
        album: {
            uri: track.album.uri || '',
            name: track.album.name || '',
            images: track.album.images.map(image => ({
              url: image.url,
              size: image.size || '',
              height: image.height || 0,
              width: image.width || 0
        }))
      }
    });
    
    dispatch(setInfoBtn({
        context: { uri, metadata },
        updateTime: performance.now(),
        paused,
        position,
        duration,
        track_window: {
            current_track: formatTrack(current_track),
            next_tracks: next_tracks.map(formatTrack),
            previous_tracks: previous_tracks.map(formatTrack)
        }
    }));

    setTimeout(async () => {
      try {
        getPlayerQueue()
        getPlaybackState()
        
      } catch (error) {
        console.error('Erreur lors du refetch: refetchQueue:', error);
      }
    }, 1000);
  });

  player.connect();
  setPlayer(player);
};

  useEffect(() => {


    window.onSpotifyWebPlaybackSDKReady = () => {
      initializeSpotifyPlayer();
    };

    const loadSpotifySDK = () => {
      if(window.Spotify){
          initializeSpotifyPlayer();
          return;
      }

      window.onSpotifyWebPlaybackSDKReady = initializeSpotifyPlayer;

      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);
      return () => {
        if (player) {
          player.disconnect();
        }
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }

    loadSpotifySDK();

  }, [token, getPlaybackState]);
  
  return (
    <ReactRouterAppProvider>
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </ReactRouterAppProvider>
  );
}