import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { setPlay } from '../../redux/slices/player/playerPlaySlice';
import animationPlayer from '../../assets/animationPlayer.gif';

export const TableRowPlay = ({ hoveredRow, index, id }: { hoveredRow: number | null, index: number, id: string }) => {
    const currentTrack = useSelector((state: RootState) => state.playerTrackInfo.tracksInfo);
    const dispatch = useDispatch()

    const handleClick = (payload: string) => {
        let play = {
          play: currentTrack.isPlaying
        }
        if (payload === 'pause') {
          play = {
            play: false
          } 
        } else {
          play = {
            play: true
          } 
        }
        
        dispatch(setPlay(play))
      }

    const HoveringItem = ({ id }: { id: string }) => {
        return (
            <div style={{width: 20, cursor: 'pointer'}}>
              {
                currentTrack.isPlaying && id === currentTrack.track.id ?
                <PauseIcon onClick={() => handleClick('pause')} />
                :
                <PlayArrowIcon onClick={() => handleClick('resume')}/>
              }
            </div>
        );
      }
    
      const BeforeHoveringItem = ({ id, index }: { id: string, index: number }) => {
        return (
            <div style={{width: 20}}>
              {
                id === currentTrack.track.id ? 
                <span>
                  {currentTrack.isPlaying ?
                    <img height={25} src={animationPlayer}/>               
                  :
                    <span style={{color: 'green', fontSize: '14px', fontWeight: '600'}}>{index+1}</span>
                  }
                </span>
                :
                  <span>{index+1}</span>
              }
            </div>
        );
      }

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
