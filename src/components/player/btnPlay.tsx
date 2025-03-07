import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import { useGetUserProfilQuery, usePausePlaybackMutation, useStartPlaybackMutation } from '../../redux/services/spotifyApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export interface Payload {
    info: {
        context_uri?: string;
        uri?: string | string[];
        name: string;
        offset?: number;
        type?: string
    }

}
export const BtnPlay = (payload: Payload) => {
    const currentDataInfo = useSelector((state: RootState) => state.playerInfoReadSong);
    const {data: userInfo} = useGetUserProfilQuery()

    const [startPlayback] = useStartPlaybackMutation();
    const [pausePlayback] = usePausePlaybackMutation();


    const deviceIdValue = localStorage.getItem('device_id');              
            
    const play = async () => {
        let state;
        if (payload.info.type === 'artist') {
            if (payload.info.context_uri === currentDataInfo?.context.uri) {
                state = {
                    data: {
                        position_ms: currentDataInfo?.position,
                    },
                    device_id: typeof deviceIdValue !== 'string' ? '' :  deviceIdValue
                }            
            } else {
                state = {
                    data: {
                        context_uri: Array.isArray(payload.info.context_uri) ? payload.info.context_uri[0] : payload.info.context_uri,
                        position_ms: 0,
                    },
                    device_id: typeof deviceIdValue !== 'string' ? '' :  deviceIdValue
                }
            }
        } else if (payload.info.type === 'user-liked-tracks') { 
            const findUri = Array.isArray(payload?.info?.uri) ? payload?.info?.uri?.find((el: string) => el === currentDataInfo?.track_window.current_track.uri) : payload?.info?.uri
            if (findUri) {
                    state = {
                        data: {
                            uris: payload.info.uri,
                            position_ms: currentDataInfo?.position,
                            offset: {
                                uri: findUri,
                            }
                        },
                        device_id: typeof deviceIdValue !== 'string' ? '' :  deviceIdValue
                    }
                } else {
                    state = {
                        data: {
                            uris: payload.info.uri,
                            position_ms: 0,
                            offset: {
                                position: 0,
                            }
                        },
                        device_id: typeof deviceIdValue !== 'string' ? '' :  deviceIdValue
                    }
                }              
        } else if (payload.info.type === 'album') {            
            if (payload.info.context_uri === currentDataInfo?.context.uri && currentDataInfo?.track_window.current_track.album.uri === currentDataInfo?.context.uri) {                                
                state = {
                    data: {
                        position_ms: currentDataInfo?.position,
                    },
                    device_id: typeof deviceIdValue !== 'string' ? '' :  deviceIdValue
                }    
            } else {
                state = {
                    data: {
                        context_uri: Array.isArray(payload.info.context_uri) ? payload.info.context_uri[0] : payload.info.context_uri,
                        position_ms: 0,
                        offset: {
                            position: payload.info.offset ? payload.info.offset -1 : 0,
                        }
                    },
                    device_id: typeof deviceIdValue !== 'string' ? '' :  deviceIdValue
                }
            }
        } else {
            if (payload.info.context_uri === currentDataInfo?.context.uri) {                                
                state = {
                    data: {
                        position_ms: currentDataInfo?.position,
                    },
                    device_id: typeof deviceIdValue !== 'string' ? '' :  deviceIdValue
                }    
            } else {
                state = {
                    data: {
                        context_uri: Array.isArray(payload.info.context_uri) ? payload.info.context_uri[0] : payload.info.context_uri,
                        position_ms: 0,
                        offset: {
                            position: payload.info.offset ? payload.info.offset -1 : 0,
                        }
                    },
                    device_id: typeof deviceIdValue !== 'string' ? '' :  deviceIdValue
                }
            }
        }
        startPlayback(state)
    }
    const pause = () => {
        const data = { device_id: typeof deviceIdValue !== 'string' ? '' :  deviceIdValue }
        pausePlayback(data)
    }

    if (userInfo?.product === 'free') {
        return (
            <Tooltip title='Vous devez avoir un compte premium pour écouter de la musique'>
                <PlayCircleFilledWhiteIcon color='disabled' sx={{fontSize: 60}} />   
            </Tooltip>
        )
    }

    if (payload?.info.type === 'user-liked-tracks') {
        const findUri = Array.isArray(payload?.info?.uri) ? payload?.info?.uri?.find((el: string) => el === currentDataInfo?.track_window.current_track.uri) : payload?.info?.uri
        return (
            <div>
                <IconButton color="success">
                    {
                        !currentDataInfo?.paused && findUri ?
                        <PauseCircleFilledIcon onClick={pause} sx={{fontSize: 60}} />                
                        :
                        <PlayCircleFilledWhiteIcon onClick={play} sx={{fontSize: 60}} />                
                    }
                </IconButton>
                
            </div>
        )
    } else if (payload?.info.type === 'album') {
        return (
            <div>
                <IconButton color="success">
                    {
                        !currentDataInfo?.paused && currentDataInfo?.context.uri === payload.info.context_uri && currentDataInfo?.track_window.current_track.album.uri === currentDataInfo?.context.uri ?
                        <PauseCircleFilledIcon onClick={pause} sx={{fontSize: 60}} />                
                        :
                        <PlayCircleFilledWhiteIcon onClick={play} sx={{fontSize: 60}} />                
                    }
                </IconButton>
                
            </div>
        )
    } else {
            return (
                <div>
                    <IconButton color="success">
                        {
                            !currentDataInfo?.paused && currentDataInfo?.context.uri === payload.info.context_uri ?
                            <PauseCircleFilledIcon onClick={pause} sx={{fontSize: 60}} />                
                            :
                            <PlayCircleFilledWhiteIcon onClick={play} sx={{fontSize: 60}} />                
                        }
                    </IconButton>
                    
                </div>
            )
    }
    
}
