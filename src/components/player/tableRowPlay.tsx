import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import animationPlayer from '../../assets/animationPlayer.gif';
import { usePausePlaybackMutation, useStartPlaybackMutation } from '../../redux/services/spotifyApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const TableRowPlay = ({ hoveredRow, index, id, uri, type, uris }: { type?: string, uris?: string[], uri: string, hoveredRow: number | null, index: number, id: string, }) => {

    const currentDataInfo = useSelector((state: RootState) => state.playerInfoReadSong);

    const [startPlayback] = useStartPlaybackMutation();
    const [pausePlayback] = usePausePlaybackMutation();
    
    const deviceIdValue = localStorage.getItem('device_id');              
    if (typeof deviceIdValue !== 'string') {return;}
    
    const handleClick = (payload: string) => {

        if (payload === 'pause') {
            const data = { device_id: deviceIdValue }
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
                device_id: deviceIdValue
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
                device_id: deviceIdValue
              }
            }
            startPlayback(state)
          } else {
            let state;
            if (id === currentDataInfo?.track_window.current_track.id) {
              state = {
                data: {
                    context_uri: currentDataInfo.context.uri,
                    position_ms: currentDataInfo.position,
                    offset: {
                      uri: currentDataInfo.track_window.current_track.uri,
                    }
                },
                device_id: deviceIdValue
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
                device_id: deviceIdValue
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
