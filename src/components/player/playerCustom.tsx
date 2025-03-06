import { useLazyGetPlaybackStateQuery, useLazyGetPlayerQueueQuery, useGetUserProfilQuery, useNextTrackPlaybackMutation, usePrevTrackPlaybackMutation, useRepeatModeQuery, useSeekPositionPlaybackMutation, useShuffleQueueQuery, useVolumePlaybackMutation, useGetTrackLyricsQuery } from '../../redux/services/spotifyApi'
import { Backdrop, Box, CircularProgress, IconButton, Slider, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
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
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { convertirMillisecondes } from '../../utils/convertMs';
import { Link } from 'react-router';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import LyricsRoundedIcon from '@mui/icons-material/LyricsRounded';
import { formatText } from '../../utils/formatLyrics';

export const PlayerCustom = ({ toggleDrawer, drawer }: {drawer: boolean, toggleDrawer: (data: boolean) => void}) => {
    const [getPlaybackState, {data: playbackState}] = useLazyGetPlaybackStateQuery()
    const {data: userInfo} = useGetUserProfilQuery()
    
    const [open, setOpen] = useState(true);
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [getPlayerQueue, {data: currentQueue}] = useLazyGetPlayerQueueQuery()
    const state = {
        state: shuffle,
        device_id: localStorage.getItem('device_id') ?? ''
    }
    const stateRepeat = {
        repeat: repeat ? 'track' : 'off',
        device_id: localStorage.getItem('device_id') ?? ''
    }
    const {refetch: refetchShuffle} = useShuffleQueueQuery(state);    
    const {refetch: refetchRepeat} = useRepeatModeQuery(stateRepeat);    
    const currentDataInfo = useSelector((state: RootState) => state.playerInfoReadSong);
    const playerReady = useSelector((state: RootState) => state.playerReady);
    const { data: dataLyrics, error: lyriscError, refetch: refetchLyrics } = useGetTrackLyricsQuery({track_band: currentDataInfo.track_window.current_track.artists[0].name, track_name: currentDataInfo.track_window.current_track.name})
    const [isPlaying, setIsPlaying] = useState<boolean>(!currentDataInfo?.paused);
    const intervalRef = useRef<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(currentDataInfo.position);
    const [sliderTimeValue, setSliderTimeValue] = useState<number>(currentDataInfo.position);
    const [sliderVolumeValue, setSliderVolumeValue] = useState<number | number[]>(playbackState?.device?.volume_percent !== undefined ? playbackState?.device?.volume_percent : 50);
    const [nextTrackPlayback] = useNextTrackPlaybackMutation()
    const [prevTrackPlayback] = usePrevTrackPlaybackMutation()
    const [volumePlayback] = useVolumePlaybackMutation()
    const [seekPositionPlayback] = useSeekPositionPlaybackMutation()

    function getStatePosition() {
        if (isPlaying) {
            const position = currentDataInfo.position + (performance.now() - currentDataInfo.updateTime)
            setElapsedTime(position > currentDataInfo.duration ? currentDataInfo.duration : position);
            setSliderTimeValue(position > currentDataInfo.duration ? currentDataInfo.duration : position)
        }
    }

    const startTimer = () => {
        intervalRef.current = setInterval(() => {
            getStatePosition()
        }, 1000);
    };

    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if(currentDataInfo){
            setElapsedTime(currentDataInfo.position);
            setSliderTimeValue(currentDataInfo.position); 
        }
    };

    const setNewPositionTrack = (value: number) => {
        seekPositionPlayback({device_id: localStorage.getItem('device_id') || '', timerTrack: value})
    }

    useEffect(() => {
        if (isPlaying) {
            startTimer()
        } else {
            stopTimer()
        }
        refetchLyrics()
        getPlaybackState()
        getPlayerQueue()

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying, currentDataInfo, getPlayerQueue]);

    useEffect(() => {
        setIsPlaying(!currentDataInfo?.paused);
    }, [currentDataInfo?.paused]);

    const setVolume = (value: number) => {
        volumePlayback({device_id: localStorage.getItem('device_id') || '', volume_percent: value})
    }

    const handleSliderChangeVolume = (value: number) => {
        setSliderVolumeValue(value);
    };

    const handleSliderChange = (value: number) => {
        stopTimer()
        setSliderTimeValue(value);
        setElapsedTime(value)
        setSliderTimeValue(value)
    };
    
    const openDrawer = () => {
          setOpen(true)
          toggleDrawer(open);         
    }

    const toggleShuffle = () => {
        setShuffle(!shuffle)
        refetchShuffle()
    }

    const toggleRepeat = () => {
        setRepeat(!repeat)
        refetchRepeat()
    }

    const nextTrack = () => {
        nextTrackPlayback({device_id: localStorage.getItem('device_id') || ''}).then(() => {
            getPlaybackState()
            setElapsedTime(0)
            setSliderTimeValue(0)
        })
    }

    const prevTrack = () => {
        prevTrackPlayback({device_id: localStorage.getItem('device_id') || ''}).then(() => {
            getPlaybackState()
            setElapsedTime(0)
            setSliderTimeValue(0)
        })
    }

    const [openLyrics, setOpenLyrics] = useState(false);
    const handleClose = () => {
        setOpenLyrics(false);
    };
    const handleOpen = () => {
        setOpenLyrics(true);
    }; 



    if (!playerReady.playerReady) {
        return (<>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 15}}>
            <CircularProgress  color='success' />
        </div>
        </>)
    }

    if(userInfo?.product === 'free' && playerReady.playerReady) {
        return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px', height: '100%', maxHeight: '77px', overflow: 'auto'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{paddingLeft: '20px', width: '500px'}}>
            Vous devez avoir un compte Spotify premium pour pouvoir écouter de la musique

            </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <IconButton disabled onClick={() => prevTrack()} aria-label="prev">
                <SkipPreviousRoundedIcon />
            </IconButton>
            <IconButton disabled color="info">
                    <PlayCircleFilledWhiteIcon color='disabled' sx={{fontSize: 60}} />                                
            </IconButton>
            <IconButton disabled onClick={() => nextTrack()} aria-label="next">
                <SkipNextRoundedIcon />
            </IconButton>
        </div>

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{marginLeft: 10}}>
                <Box sx={{ width: 200 }}>
                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                        <VolumeDown color='disabled'/>
                            <Slider disabled color='info' aria-label="Volume" />
                        <VolumeUp color='disabled'/>
                    </Stack>
                </Box>
            </div>

        </div>
    </div>)
    } 
    
    if (userInfo?.product === 'premium' && playerReady.playerReady) {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px', height: '100%', maxHeight: '77px', overflow: 'hidden'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                    {
                        currentDataInfo?.track_window.current_track.uri === '' ?
                            null
                        :   
                        <Link to={`/home/album?id=${playbackState?.item.album.id}`}>
                            <img style={{width: '70px', height: '70px', marginTop: '9px'}} src={currentDataInfo?.track_window?.current_track?.album.images[0].url} alt="poster album" />
                        </Link>
                    }
                </div>
                <div style={{paddingLeft: '20px', width: '300px'}}>
                    <Tooltip title={currentDataInfo?.track_window?.current_track?.name}>
                        <Link to={`/home/track?id=${playbackState?.item?.id}&band=${playbackState?.item.artists[0].name}&title=${playbackState?.item.name}&artistId=${playbackState?.item.artists[0].id}&artistIds=${playbackState?.item.artists[0].id}`}>
                            <Typography noWrap>{currentDataInfo?.track_window?.current_track?.name}</Typography>
                        </Link>
                    </Tooltip>
                    <Link to={`/home/artist?id=${playbackState?.item.artists[0].id}`}>
                    <Typography>{currentDataInfo?.track_window?.current_track?.artists[0].name}</Typography>        
                    </Link>
                </div>
            </div>
            <div style={{maxWidth: '400px',zIndex: 999999999999, width: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40px', paddingTop: 7}}>
                    <IconButton onClick={toggleShuffle} disabled={currentDataInfo?.track_window.current_track.uri === ''}>
                        <Tooltip placement="top" title={shuffle ? 'Désactiver la lecture aléatoire' : 'Activer la lecture aléatoire'}>
                            <ShuffleRoundedIcon style={{color: shuffle ? 'green' : '#dedede'}} />
                        </Tooltip>
                    </IconButton>
                    <IconButton disabled={currentDataInfo?.track_window.current_track.uri === ''} onClick={() => prevTrack()} aria-label="prev">
                        <Tooltip placement="top" title='Précédent'>
                            <SkipPreviousRoundedIcon />
                        </Tooltip>
                    </IconButton>
                        
                            <BtnPlayPause key={currentDataInfo?.track_window.current_track.uri}/>
                    <IconButton disabled={currentDataInfo?.track_window.current_track.uri === ''} onClick={() => nextTrack()} aria-label="next">
                        <Tooltip placement="top" title='Suivant'>
                            <SkipNextRoundedIcon />
                        </Tooltip>
                    </IconButton>
                    <IconButton onClick={toggleRepeat} disabled={currentDataInfo?.track_window.current_track.uri === ''}>
                        <Tooltip placement="top" title={repeat ? 'Désactiver la répetition' : 'Activer la répetition'}>
                                <RepeatRoundedIcon style={{color: repeat ? 'green' : '#dedede'}} />
                        </Tooltip>
                    </IconButton>
                </div>

                <Box sx={{ width: '100%' }}>
                        <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                            <Typography style={{width: 40}} variant='body1' fontSize={12}>{convertirMillisecondes(elapsedTime)} </Typography>
                            <Slider
                             min={0}
                             max={currentDataInfo?.duration}
                             size='small'
                             disabled={currentDataInfo?.track_window.current_track.uri === ''}
                             onChange={(_, value) => handleSliderChange(typeof value === 'number' ? value : value[0])}
                             onChangeCommitted={(_, value) => setNewPositionTrack(typeof value === 'number' ? value : value[0])}
                             color='info'
                             aria-label="timer"
                             value={sliderTimeValue}
                            />
                            <Typography style={{width: 40}} variant='body1' fontSize={12}>{convertirMillisecondes(currentDataInfo?.duration)}</Typography>
                        </Stack>
                </Box>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div>
                    {
                        currentDataInfo?.track_window.current_track.uri === '' ?
                            null
                        :
                        <div style={{display: 'flex'}}>
                            <div style={{marginRight: '10px', marginTop: 3, cursor: 'pointer'}}>
                                {
                                    !lyriscError && dataLyrics ? 
                                    <>
                                    <Tooltip title="Paroles">
                                        <div>
                                            <LyricsRoundedIcon fontSize='medium' style={{color: openLyrics ? 'green' : 'grey'}} onClick={handleOpen}/>
                                            <div>
                                                <div className={currentQueue?.queue && currentQueue.queue?.length > 0 ? 'pastille-on' : 'pastille-off'}></div>
                                            </div>
                                        </div>
                                    </Tooltip>
                                    <Backdrop
                                        sx={(theme) => ({ color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.77)', zIndex: theme.zIndex.drawer + 1 })}
                                        open={openLyrics}
                                        onClick={handleClose}
                                    >
                                        <div style={{maxWidth: '400px'}}>
                                            {formatText(dataLyrics.lyrics)}
                                        </div>
                                    </Backdrop></>
                                    :
                                    null
                                }

                            </div>
                            <div onClick={openDrawer} style={{marginRight: '10px', cursor: 'pointer'}}>
                                <Tooltip title="Ouvrir la fille d'attente">
                                    <div>
                                        <QueueMusicIcon fontSize='medium' style={{color: drawer ? 'green' : 'grey'}} />
                                        <div>
                                            <div className={currentQueue?.queue && currentQueue.queue?.length > 0 ? 'pastille-on' : 'pastille-off'}></div>
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    }
                </div>
                <div style={{zIndex: 999999999999,marginLeft: 10}}>
                    <Box sx={{ width: 200 }}>
                        <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                            <VolumeDown color={currentDataInfo?.track_window.current_track.uri === '' ? 'disabled' : 'inherit'}/>
                                <Slider 
                                disabled={currentDataInfo?.track_window.current_track.uri === ''} 
                                color='success' 
                                aria-label="Volume" 
                                value={sliderVolumeValue}
                                onChange={(_, value) => handleSliderChangeVolume(typeof value === 'number' ? value : value[0])}
                                onChangeCommitted={(_, value) => setVolume(typeof value === 'number' ? value : value[0])} />
                            <VolumeUp color={currentDataInfo?.track_window.current_track.uri === '' ? 'disabled' : 'inherit'}/>
                        </Stack>
                    </Box>
                </div>

            </div>
        </div>
    )
    }
}
