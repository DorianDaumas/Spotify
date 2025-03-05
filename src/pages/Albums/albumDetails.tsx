import { AlbumHeader } from '../../components/Album/albumHeader';
import { useDeleteAlbumsMutation, useGetAlbumsDetailsQuery, useLazyCheckIsSavedAlbumQuery, useSaveAlbumsMutation } from "../../redux/services/spotifyApi"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { AlbumTracks } from '../../components/Album/AlbumTracks';
import { BtnPlay } from '../../components/player/btnPlay';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Alert, IconButton, Snackbar, SnackbarCloseReason, TableCell, TableRow, TableBody, Table, TableContainer, Tooltip, TableHead, Paper, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRefreshComponent } from '../../redux/slices/refreshComponentSlice';
import { RootState } from '../../redux/store';
import { useSearchParams } from 'react-router';

export const AlbumDetails = () => {
    const dispatch = useDispatch()
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const albumId = urlParams.get('id') ?? '';
    const [searchParams] = useSearchParams();
    const [albumIdToCheck, setAlbumIdToCheck] = useState('');
    const { data, isLoading, error } = useGetAlbumsDetailsQuery(albumId)
    const [checkIsSavedAlbum, { data: alreadyInLibrary }] = useLazyCheckIsSavedAlbumQuery()
    const [saveAlbums, { isLoading: isLoadingAdd, reset: resetAdd }] = useSaveAlbumsMutation();
    const [deleteAlbums, { isLoading: isLoadingRemove, reset: resetRemove }] = useDeleteAlbumsMutation();
    const refreshComponent = useSelector((state: RootState) => state.refreshComponent.refresh);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const contentElement = document.querySelector('#container-app-page');
        if (contentElement) {
            contentElement.scrollTo({
            top: 0,
            behavior: 'smooth'
            });
        }
      }, [location.search, searchParams]);

    useEffect(() => {
        if (data?.id && !isLoading) {
            setAlbumIdToCheck(data.id);
            checkIsSavedAlbum(data.id)            
        }
    }, [data])

    useEffect(() => {
        resetRemove()
        resetAdd()
    }, [open])
    
        
    if (isLoading) return (
        <TableContainer elevation={0} component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650, background: '#121212' }} size="small" aria-label="a dense table">
        <TableHead>
            <TableRow>
                <TableCell style={{width: '10px'}}>#</TableCell>
                <TableCell align="left">Titre</TableCell>
                <TableCell align="center"><AccessTimeIcon/></TableCell>
            </TableRow>
        </TableHead>
            <TableBody >
            {Array.from(Array(10)).map((_, index) => (
                <TableRow sx={{height: 50}} key={index}>
                <TableCell align="left" color="#bdbdbd">
                    <Skeleton variant='text'></Skeleton>
                </TableCell>
                <TableCell align="left">
                    <Skeleton variant='text'></Skeleton>
                </TableCell>
                <TableCell width={'100px'} align="center">
                    <Skeleton variant='text'></Skeleton>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
    );
    
    if (error || !data) return null

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
            deleteAlbums(state)
            
        } else {
            saveAlbums(state)

        }
        checkIsSavedAlbum(albumIdToCheck)
        const refresh = {
            refresh: refreshComponent +1
        }
        dispatch(setRefreshComponent(refresh))
    }
    
    return (
        <div>
            <div>
                <AlbumHeader {...data} />
            </div>
            <div style={{margin: '0px 40px 0px 40px', display: 'flex', alignItems: 'center'}}>
                <BtnPlay info={{context_uri: data.uri, uri: data.uri, name: data.name, type: 'album'}}/>
                <Tooltip title={alreadyInLibrary && alreadyInLibrary[0] ? "Supprimer de la Bibliothèque" : "Sauvegarder dans la Bibliothèque"} placement='right'>
                    {
                        alreadyInLibrary && alreadyInLibrary[0] ?
                        <IconButton loading={isLoadingAdd} color='success' onClick={() => {addRemoveLibrary(); removeSnackbar()}}>
                            <CheckCircleRoundedIcon sx={{fontSize: 40}}/>
                        </IconButton>
                        :
                        <IconButton loading={isLoadingRemove} onClick={() => {addRemoveLibrary(); addSnackbar()}}>
                            <AddCircleOutlineOutlinedIcon sx={{color: '#9d9d9d', fontSize: 40}}/>
                        </IconButton>
                    }
                    
                </Tooltip>
            </div>
            
            <div style={{margin: '10px 80px'}}>
                <AlbumTracks uri={data.uri} albumId={data.id}/>
            </div>
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
