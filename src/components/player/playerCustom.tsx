// import { BtnPlay } from './btnPlay'
import { useGetPlaybackStateQuery, useGetPlayerQueueQuery, useNextTrackPlaybackMutation, usePrevTrackPlaybackMutation, useShuffleQueueQuery, useVolumePlaybackMutation } from '../../redux/services/spotifyApi'
import { Box, IconButton, Slider, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import { BtnPlayPause } from './footerBtnPlayPause';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import Tooltip from '@mui/material/Tooltip';

export const PlayerCustom = ({ toggleDrawer, drawer }: {drawer: boolean, toggleDrawer: (data: boolean) => void}) => {
    const {data: playbackState, refetch} = useGetPlaybackStateQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });    
    
    const [open, setOpen] = useState(true);
    const [shuffle, setShuffle] = useState(false);
    const {data: currentQueue} = useGetPlayerQueueQuery()
    const state = {
        state: shuffle,
        device_id: localStorage.getItem('device_id') ?? ''
    }
    const {refetch: refetchShuffle} = useShuffleQueueQuery(state);    
    const [position, setPosition] = useState<number | number[]>(playbackState?.device?.volume_percent ?? 50);
    const currentDataInfo = useSelector((state: RootState) => state.playerInfoReadSong);
    const [nextTrackPlayback] = useNextTrackPlaybackMutation()
    const [prevTrackPlayback] = usePrevTrackPlaybackMutation()
    const [volumePlayback] = useVolumePlaybackMutation()
    // const token = useSelector((state: RootState) => state.auth.token);

    const setVolume = (value: number) => {
        setPosition(value)      
        setTimeout(() => {
            volumePlayback({device_id: localStorage.getItem('device_id') || '', volume_percent: value})
        }, 1000);
        
    }
    
    const openDrawer = () => {
          setOpen(true)
          toggleDrawer(open);         
    }

    const toggleShuffle = () => {
        setShuffle(!shuffle)
        refetchShuffle()
    }

    const nextTrack = () => {
        nextTrackPlayback({device_id: localStorage.getItem('device_id') || ''}).then(() => {
            refetch()
        })
    }

    const prevTrack = () => {
        prevTrackPlayback({device_id: localStorage.getItem('device_id') || ''}).then(() => {
            refetch()
        })
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px', height: '100%', maxHeight: '77px', overflow: 'auto'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                    {
                        currentDataInfo?.track_window.current_track.uri === '' ?
                            null
                        :
                            <img style={{width: '70px', height: '70px', marginTop: '9px'}} src={currentDataInfo?.track_window?.current_track?.album.images[0].url} alt="poster album" />
                    }
                </div>
                <div style={{paddingLeft: '20px', width: '300px'}}>
                    <Tooltip title={currentDataInfo?.track_window?.current_track?.name}>
                        <Typography noWrap>{currentDataInfo?.track_window?.current_track?.name}</Typography>
                    </Tooltip>
                    <Typography>{currentDataInfo?.track_window?.current_track?.artists[0].name}</Typography>        
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <IconButton disabled={currentDataInfo?.track_window.current_track.uri === ''} onClick={() => prevTrack()} aria-label="prev">
                    <SkipPreviousRoundedIcon />
                </IconButton>
                    <BtnPlayPause/>
                <IconButton disabled={currentDataInfo?.track_window.current_track.uri === ''} onClick={() => nextTrack()} aria-label="next">
                    <SkipNextRoundedIcon />
                </IconButton>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div>
                    {
                        currentDataInfo?.track_window.current_track.uri === '' ?
                            null
                        :
                        <div style={{display: 'flex'}}>
                            <div onClick={openDrawer} style={{marginRight: '10px', cursor: 'pointer'}}>
                                <Tooltip title="Ouvrir la fille d'attente">
                                    <div>
                                        <QueueMusicIcon style={{color: currentQueue?.queue ? 'green' : 'grey'}} />
                                        <span style={{width: 10, height: 10, borderRadius: 50, background: drawer ? 'green' : 'grey'}}>
                                            <div className={currentQueue?.queue && currentQueue.queue?.length > 0 ? 'pastille-on' : 'pastille-off'}></div>
                                        </span>
                                    </div>
                                </Tooltip>
                            </div>
                            <div onClick={toggleShuffle} style={{cursor: 'pointer'}}>
                                <Tooltip title={shuffle ? 'Désactiver la lecture aléatoire' : 'Activer la lecture aléatoire'}>
                                    <div>
                                        <ShuffleRoundedIcon style={{color: shuffle ? 'green' : 'grey'}} />
                                        <span style={{width: 10, height: 10, borderRadius: 50, background: shuffle ? 'green' : 'grey'}}>
                                            <div className={shuffle ? 'pastille-on' : 'pastille-off'}></div>
                                        </span>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    }
                </div>
                <div style={{marginLeft: 10}}>
                    <Box sx={{ width: 200 }}>
                        <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                            <VolumeDown />
                                <Slider color='success' aria-label="Volume" onChange={(_, value) => setVolume(typeof value === 'number' ? value : value[0])} value={position} />
                            <VolumeUp />
                        </Stack>
                    </Box>
                </div>

            </div>
        </div>
    )
}
