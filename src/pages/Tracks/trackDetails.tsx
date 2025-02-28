import { useDeleteTracksMutation, useGetArtistDetailsQuery, useGetArtistTopTracksQuery, useGetTrackDetailsQuery, useLazyCheckIsSavedTrackQuery, useSaveTracksMutation } from "../../redux/services/spotifyApi"
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Alert, CardActionArea, IconButton, Snackbar, SnackbarCloseReason, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { TrackHeader } from "../../components/track/trackHeader";
import { TrackLyrics } from "../../components/track/trackLyrics";
import { ArtistDetailsTopTracks } from "../../components/artist/artistDetailsTopTracks";
import { BtnPlay } from "../../components/player/btnPlay";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useDispatch, useSelector } from "react-redux";
import { setRefreshComponent } from "../../redux/slices/refreshComponentSlice";
import { RootState } from "../../redux/store";

export const TrackDetails = () => {
    const dispatch = useDispatch()
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const trackId = urlParams.get('id') ?? '';
    const artistId = urlParams.get('artistId') ?? '';
    const artistIds = urlParams.get('artistIds') ?? '';
    const { data, isLoading, error } = useGetTrackDetailsQuery(trackId)
    const { data: dataArtist, isLoading: isLoadingArtist, error: errorArtist } = useGetArtistDetailsQuery(artistIds)
    const { data: dataArtistTopTracks, isLoading: isLoadingArtistTopTracks, error: errorArtistTopTracks } = useGetArtistTopTracksQuery(artistId)
    const [trackIdToCheck, setTrackIdToCheck] = useState('');
    const [checkIsSavedTrack, { data: alreadyInLibrary }] = useLazyCheckIsSavedTrackQuery()
    const [saveTracks, { isSuccess: isSuccessAdd, reset: resetAdd }] = useSaveTracksMutation();
    const [deleteTracks, { isSuccess: isSuccessRemove, reset: resetRemove }] = useDeleteTracksMutation();
    const refreshComponent = useSelector((state: RootState) => state.refreshComponent.refresh);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');


    const [refreshComp, setrefreshComp] = useState<number>(0);
    useEffect(() => {
        if (data?.id && !isLoading) {
            setTrackIdToCheck(data.id);
            checkIsSavedTrack(data.id)            
        }
    }, [data])

    useEffect(() => {
        resetRemove()
        resetAdd()
    }, [open])

    
    const handleRefresh = (newValue: number) => {
        setrefreshComp(newValue);
    };

    if (isLoading || isLoadingArtist || isLoadingArtistTopTracks) return (
        <div style={{height: '100vh'}}>
            <div className="center-absolute">
                <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <CircularProgress size={100} color="success" />
                </Stack>
            </div>
        </div>
    );
    if (error || !data || !dataArtistTopTracks || !dataArtist || errorArtist || errorArtistTopTracks) return null
    
    const addSnackbar = () => {
        setAlertMessage('Ajouté dans la Bibliothèque.');
        setOpen(true);
    };
    
    const removeSnackbar = () => {
        setAlertMessage('Supprimé de la Bibliothèque.');
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const addRemoveLibrary = () => {
        const state = {
            id: data.id,
            data: [data.id]
        }        
        if (alreadyInLibrary && alreadyInLibrary[0]) {
            deleteTracks(state)
        } else {
            saveTracks(state)
        }
        checkIsSavedTrack(trackIdToCheck)
        const refresh = {
            refresh: refreshComponent +1
        }
        dispatch(setRefreshComponent(refresh))
    }

    return (
        <div>
            <div >
                <TrackHeader {...data} />
            </div>
            <div style={{margin: '0px 60px'}}>
            <div style={{margin: '0px 40px 0px 0px', display: 'flex', alignItems: 'center'}}>
                <BtnPlay info={{type: data.type, uri: data.album.uri}} ids={data.id} offset={data.track_number-1} uris={data.album.uri}/>

                <Tooltip title={alreadyInLibrary && alreadyInLibrary[0] ? "Supprimer de la Bibliothèque" : "Sauvegarder dans la Bibliothèque"} placement='right'>
                    {
                        alreadyInLibrary && alreadyInLibrary[0] ?
                        <IconButton loading={isSuccessRemove} color='success' onClick={() => {addRemoveLibrary(); removeSnackbar()}}>
                            <CheckCircleRoundedIcon sx={{fontSize: 40}}/>
                        </IconButton>
                        :
                        <IconButton loading={isSuccessAdd} onClick={() => {addRemoveLibrary(); addSnackbar()}}>
                            <AddCircleOutlineOutlinedIcon sx={{color: '#9d9d9d', fontSize: 40}}/>
                        </IconButton>
                    }
                </Tooltip>
            </div>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container justifyContent={"space-between"} spacing={4} columns={12}>
                        <Grid>
                            <TrackLyrics />
                        </Grid>
                        <Grid >
                            <div >
                                {dataArtist?.artists?.map((artist, index) => (
                                    <Link to={`/home/artist?id=${artist.id}`} style={{textDecoration: 'none!important'}}>
                                        <Card key={index} elevation={0}>
                                            <CardActionArea>
                                                <CardContent style={{display: 'flex', alignItems: 'center'}}>
                                                    <div>
                                                        <img height={100} width={100} style={{borderRadius: 50}} src={artist?.images && artist?.images[0]?.url}/>
                                                    </div>
                                                    <div>
                                                        <CardContent>
                                                            <Typography variant="body1" style={{textTransform: 'capitalize'}}>{artist?.type}</Typography>
                                                            <Typography variant="h5">{artist?.name}</Typography>
                                                        </CardContent>
                                                    </div>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            <div style={{margin: '40px 60px'}}>
                <ArtistDetailsTopTracks key={refreshComp} {...dataArtistTopTracks} onRefresh={handleRefresh}/>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                onClose={handleClose}
                severity='success'
                sx={{ width: '100%' }}
                >
                {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}
