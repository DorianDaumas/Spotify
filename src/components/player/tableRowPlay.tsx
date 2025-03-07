import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import animationPlayer from '../../assets/animationPlayer.gif';
import { useGetUserProfilQuery, usePausePlaybackMutation, useStartPlaybackMutation } from '../../redux/services/spotifyApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Tooltip from '@mui/material/Tooltip';

export const TableRowPlay = ({ hoveredRow, index, context, id, uri, type, uris }: { context?: string, type?: string, uris?: string[], uri: string, hoveredRow: number | null, index: number, id: string, }) => {

    const currentDataInfo = useSelector((state: RootState) => state.playerInfoReadSong);
    const {data: userInfo} = useGetUserProfilQuery()
  
    const [startPlayback] = useStartPlaybackMutation();
    const [pausePlayback] = usePausePlaybackMutation();
    
    const deviceIdValue = localStorage.getItem('device_id');              
    
    const handleClick = (payload: string) => {

        if (payload === 'pause') {
            const data = { device_id: typeof deviceIdValue !== 'string' ? '' :  deviceIdValue }
            pausePlayback(data)
        } 
        if (payload === 'resume') {
          if (type === 'user-liked-tracks') {
            let state;            
            if (id === currentDataInfo?.track_window.current_track.id) {
              state = {
                data: {
                    uris: uris,
                    position_ms: currentDataInfo.position,
                    offset: {
                      position: index,
                    }
                },
                device_id: typeof deviceIdValue !== 'string' ? '' :  deviceIdValue
              }
            } else {
              state = {
                data: {
                    uris: uris,
                    position_ms: 0,
                    offset: {
                      position: index,
                    }
                },
                device_id: typeof deviceIdValue !== 'string' ? '' :  deviceIdValue
              }
            }
            startPlayback(state)
          } else {
            
            let state;
            if (context !== currentDataInfo?.track_window.current_track.album.uri) {

              state = {
                data: {
                    context_uri: context,
                    position_ms: 0,
                    offset: {
                      uri: uri,
                    }
                },
                device_id: typeof deviceIdValue !== 'string' ? '' :  deviceIdValue
              }              
            } else if (id === currentDataInfo?.track_window.current_track.id) {
              state = {
                data: {
                    context_uri: currentDataInfo.context.uri,
                    position_ms: currentDataInfo.position,
                    offset: {
                      uri: currentDataInfo.track_window.current_track.uri,
                    }
                },
                device_id: typeof deviceIdValue !== 'string' ? '' :  deviceIdValue
              }
            } else {             
              state = {
                data: {
                    context_uri: currentDataInfo.context.uri,
                    position_ms: 0,
                    offset: {
                      uri: uri,
                    }
                },
                device_id: typeof deviceIdValue !== 'string' ? '' :  deviceIdValue
              }
            }
            startPlayback(state)
          }
        }
    }   
    
    const HoveringItem = ({ id }: { id: string }) => {
        return (
            <div style={{width: 20, cursor: 'pointer'}}>
              {
                id === currentDataInfo?.track_window.current_track.id ? 
                <span>
                  {currentDataInfo?.paused ?
                    <PlayArrowIcon onClick={() => handleClick('resume')}/>
                    :
                    <PauseIcon onClick={() => handleClick('pause')} />
                  }
                </span>
                :
                  <span>
                    <PlayArrowIcon onClick={() => handleClick('resume')}/>                  
                  </span>
              }
            </div>
        );
      }
    
      const BeforeHoveringItem = ({ id, index }: { id: string, index: number }) => {
        return (
            <div style={{width: 20}}>
              {
                id === currentDataInfo?.track_window.current_track.id ? 
                <span>
                  {currentDataInfo?.paused ?
                    <span style={{color: 'green', fontSize: '14px', fontWeight: '600'}}>{index+1}</span>
                  :
                    <img height={25} src={animationPlayer}/>               

                  }
                </span>
                :
                  <span>{index+1}</span>
              }
            </div>
        );
      }
      
      if (userInfo?.product === 'free') {
        return (<>
            <Tooltip title='Vous devez avoir un compte premium pour écouter de la musique'>
                <PlayArrowIcon color='disabled'  />   
            </Tooltip>
        </>)
      }
    
      if (type === 'playlist') {
        return (
          <div style={{width: 20}}>
              {
                id === currentDataInfo?.track_window.current_track.id ? 
                <span>
                  {currentDataInfo?.paused ?
                    <span style={{color: 'green', fontSize: '14px', fontWeight: '600'}}>{index+1}</span>
                  :
                    <img height={25} src={animationPlayer}/>               

                  }
                </span>
                :
                  <span>{index+1}</span>
              }
          </div>
        )
      } else {
        return (
          <div>
              {
                  index+1 === hoveredRow ? 
                  <HoveringItem id={id}/>
                  : 
                  <BeforeHoveringItem index={index} id={id}/>
              }
          </div>
        )
      }
}
