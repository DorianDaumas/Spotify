import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { PlayerUris, setNewUris } from '../../redux/slices/player/playerSice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setPlay } from '../../redux/slices/player/playerPlaySlice';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';

export const BtnPlay = (payload: PlayerUris) => {
    const dispatch = useDispatch();
    const currentTrack = useSelector((state: RootState) => state.playerTrackInfo.tracksInfo);    
    const infoReadSong = useSelector((state: RootState) => state.playerInfoReadSong)
    

    const handleClick = () => {
        if (payload.info.type === "artist") {
            if (currentTrack.track.artists.length > 0 && currentTrack.track.artists[0].uri === payload.info.uri) {
                const play = {
                    play: !currentTrack.isPlaying
                }
                dispatch(setPlay(play))
            } else {
                dispatch(setNewUris(payload))
                const play = {
                    play: true
                }
                dispatch(setPlay(play))
            }
        }
        if (payload.info.type === "track") {
            if (currentTrack.track.artists.length > 0 && payload?.ids?.includes(currentTrack.track.id)) {
                const play = {
                    play: !currentTrack.isPlaying
                }
                dispatch(setPlay(play))
            } else {
                dispatch(setNewUris(payload))
                const play = {
                    play: true
                }
                dispatch(setPlay(play))
            }
        }
        if (payload.info.type === "album") {
            console.log(payload, 'oafidenbfiuzebfizuebf');

            if (currentTrack.track.artists.length > 0 && infoReadSong.info.name === payload.info.name) {
                const play = {
                    play: !currentTrack.isPlaying
                }
                dispatch(setPlay(play))
            } else {
                
                dispatch(setNewUris(payload))
                const play = {
                    play: true
                }
                dispatch(setPlay(play))
            }
        }
        if (payload.info.type === "playlist") {
            if (currentTrack.track.artists.length > 0 && infoReadSong.info.name === payload.info.name) {
                const play = {
                    play: !currentTrack.isPlaying
                }
                dispatch(setPlay(play))
            } else {
                dispatch(setNewUris(payload))
                const play = {
                    play: true
                }
                dispatch(setPlay(play))
            }
        }
    }

    return (
        <div>
            <IconButton onClick={handleClick} color="success">
                {
                    currentTrack.isPlaying && infoReadSong.info.name === payload.info.name ?
                    <PauseCircleFilledIcon sx={{fontSize: 60}} />                
                    :
                    <PlayCircleFilledWhiteIcon sx={{fontSize: 60}} />                
                }
            </IconButton>
            
        </div>
    )
}
