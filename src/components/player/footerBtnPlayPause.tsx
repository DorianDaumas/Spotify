import { IconButton, Tooltip } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import { usePausePlaybackMutation, useStartPlaybackMutation } from '../../redux/services/spotifyApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';

export const BtnPlayPause = () => {

    
    const currentDataInfo = useSelector((state: RootState) => state.playerInfoReadSong);

    const [startPlayback] = useStartPlaybackMutation();
    const [pausePlayback] = usePausePlaybackMutation();
    
    useEffect(() => {
        
    }, [currentDataInfo])
    
    const deviceIdValue = localStorage.getItem('device_id');              
    if (typeof deviceIdValue !== 'string') {return;}

    const play = async () => {   
            const state = {
                data: {
                    position_ms: currentDataInfo.position,
                },
                device_id: deviceIdValue
            }
            startPlayback(state)    
    }

    const pause = () => {
        const data = { device_id: deviceIdValue }
        pausePlayback(data)   
    }
    return (
        <div>
            {
                currentDataInfo?.track_window.current_track.uri === '' ?
                <IconButton disabled color="info">
                    <PlayCircleFilledWhiteIcon color='disabled' sx={{fontSize: 40}} />                                
                </IconButton>
                :
                <Tooltip title={currentDataInfo?.paused ? 'Lecture' : 'Pause'}>
                    <IconButton color="success">
                    {
                        currentDataInfo?.paused ?
                        <PlayCircleFilledWhiteIcon onClick={play} sx={{fontSize: 40}} />                

                        :
                        <PauseCircleFilledIcon onClick={pause} sx={{fontSize: 40}} />                

                    }
                    </IconButton>
                </Tooltip>
            }                
        </div>
    )
}
