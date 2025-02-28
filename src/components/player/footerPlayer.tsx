import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; // Assurez-vous que le chemin est correct
import { useCallback, useState } from 'react';
import SpotifyPlayer, { State } from 'react-spotify-web-playback'
import { setCurrentTrack } from '../../redux/slices/player/playerTracksInfoSlice';
import { setPlay } from '../../redux/slices/player/playerPlaySlice';
import { spotifyApi } from 'react-spotify-web-playback';
import { setQueue } from '../../redux/slices/player/playerQueueSlice';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { RootQueue } from '../../redux/slices/player/playerQueue.interface';

export const FooterPlayer = ({ toggleDrawer, drawer }: {drawer: boolean, toggleDrawer: (data: boolean) => void}) => {
  const abo = useSelector((state: RootState) => state);
  const token = useSelector((state: RootState) => state.auth.token);
  const getUris = useSelector((state: RootState) => state.player);
  const play = useSelector((state: RootState) => state.playerPlay.play)
  const currentQueue = useSelector((state: RootState) => state.playerQueue.queue)
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);


  const getDataFromPlayer = useCallback(    
    async (track: State) => {
      const tracksInfo = {
        tracksInfo: track,
      }     
      
      dispatch(setCurrentTrack(tracksInfo))
      const play = {
        play: track.isPlaying
      }
      getMyQueue();
      dispatch(setPlay(play))
    },[],
  );

  async function getMyQueue() {
    if (token) {
      try {
        setTimeout( async () => {         
          const value = await spotifyApi.getQueue(token);
          const getQueue = value;
          const queue: RootQueue = {
            queue: getQueue.queue,
            currently_playing: getQueue.currently_playing
          }
          dispatch(setQueue(queue))          
        }, 1000);
      } catch (error) {
        console.error("Error getting queue:", error);
      }
    }
  }

  const openDrawer = () => {
    if (currentQueue.length > 0) {
      setOpen(true)
      toggleDrawer(open);      
    }
  }

  if (abo) {
    return (
      <div className='player'>
        {token && <><SpotifyPlayer
          styles={{
            activeColor: '#fff',
            bgColor: 'black',
            color: '#fff',
            loaderColor: '#fff',
            sliderColor: '#1cb954',
            trackArtistColor: '#ccc',
            trackNameColor: '#fff',
          }}
          play={play}
          offset={getUris.offset}
          token={token}
          hideAttribution
          callback={getDataFromPlayer}
          uris={getUris.uris}
        />
          <div onClick={openDrawer} style={{
            position: 'absolute',
            top: 25,
            right: 190,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: currentQueue.length > 0 ? 'pointer' : 'default'
          }}>
            <QueueMusicIcon style={{color: currentQueue.length > 0 ? 'green' : 'grey'}} />
            <span style={{width: 10, height: 10, borderRadius: 50, background: drawer ? 'green' : 'grey'}}></span>
          </div>
           
        </>
        }
      </div>
    )  
  } else {
    return (
      <div style={{  
        width: 'calc(100% - 20px)',
        height: '50px',
        position: 'fixed',
        bottom: '0',
        marginLeft: '10px',
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '15px',
        backgroundColor: '#0d0d0d'
      }}>
        <div style={{textAlign: 'center', margin: '10px auto'}}>Le player est disponible uniquement pour les abonnées premium Spotify.</div>
    </div>
  )}
  
}
