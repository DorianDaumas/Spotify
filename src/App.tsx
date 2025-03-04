import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation } from '@toolpad/core/AppProvider';
import { createTheme, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
// import { useGetCurrentPlayingTrackQuery } from './redux/services/spotifyApi';
import { setInfoBtn, Track } from './redux/slices/player/playerInfoReadSong';
import { useDispatch } from 'react-redux';
import { useGetPlaybackStateQuery } from './redux/services/spotifyApi';


const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'home',
    title: 'Accueil',
    icon: <DashboardIcon />,
  },
  {
    segment: 'home/profil',
    title: 'Profil',
    icon: <PersonIcon />,
  },
  {
    kind: 'header',
    title: 'Bibliothèque',
  },
];

const BRANDING = {
  title: 'My music App',
};

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
  
});


export default function App() {
  const dispatch = useDispatch()

  const { refetch: refetchPlaybackState } = useGetPlaybackStateQuery(undefined, {
    refetchOnMountOrArgChange: true
  });
  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {

        const token = window.localStorage.getItem("token");
        if (!token) {return;}
        const player = new window.Spotify.Player({
            name: 'Web Playback SDK',
            getOAuthToken: cb => { cb(token); },
            volume: 0.5
        });

        player.addListener('ready', ({ device_id }) => {
          window.localStorage.setItem("device_id", device_id);
        });

        player.addListener('not_ready', () => {
            // console.log('Device ID has gone offline', device_id);
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
              }))            }
        });

        dispatch(setInfoBtn({
            context: { uri, metadata },
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
            await refetchPlaybackState();
          } catch (error) {
            console.error('Erreur lors du refetch:', error);
          }
        }, 100);
      });

      player.connect();

    };
}, [refetchPlaybackState]);
  
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </ReactRouterAppProvider>
  );
}