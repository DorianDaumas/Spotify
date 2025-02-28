import type { PlaylistDetails } from "../../redux/slices/playlist/playlist.interface";
import { PlaylistHeader } from "../../components/playlist/playlistHeader";
import { useDeletePlaylistMutation, useGetPlaylistDetailsQuery, useLazyCheckIsSavedPlaylistQuery, useSavePlaylistMutation } from "../../redux/services/spotifyApi";
import TablePlaylist from "../../components/playlist/tablePlaylist";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { BtnPlay } from "../../components/player/btnPlay";
import Tooltip from "@mui/material/Tooltip";
import { Alert, IconButton, Snackbar, SnackbarCloseReason } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { setRefreshComponent } from "../../redux/slices/refreshComponentSlice";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export const PlaylistDetail = () => {
  const dispatch = useDispatch()
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const playlistId = urlParams.get('id') ?? '';
  const { data, isLoading, error } = useGetPlaylistDetailsQuery(playlistId, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 0,
  });
  const [playlistIdToCheck, setAlbumIdToCheck] = useState('');
  const [checkIsSavedPlaylist, { data: alreadyInLibrary }] = useLazyCheckIsSavedPlaylistQuery()
  const [savePlaylists, { isSuccess: isSuccessAdd, reset: resetAdd }] = useSavePlaylistMutation();
  const [deletePlaylists, { isSuccess: isSuccessRemove, reset: resetRemove }] = useDeletePlaylistMutation();
  const refreshComponent = useSelector((state: RootState) => state.refreshComponent.refresh);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (data?.id && !isLoading) {
        setAlbumIdToCheck(data.id);
        checkIsSavedPlaylist(data.id)            
    }
  }, [data])

  useEffect(() => {
      resetRemove()
      resetAdd()
  }, [open])


  if (isLoading) return (
      <div style={{height: '100vh'}}>
          <div className="center-absolute">
              <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                  <CircularProgress size={100} color="success" />
              </Stack>
          </div>
      </div>
  );
  if (error || !data) return <span>Une erreur est survenu...</span>;

  const ids = data?.tracks.items.map((el) => el.track.id)


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
    if (data) {
      const state = {
        id: data.id,
        data: false
      }        
      if (alreadyInLibrary && alreadyInLibrary[0]) {
          deletePlaylists(state)
      } else {
          savePlaylists(state)
      }
      checkIsSavedPlaylist(playlistIdToCheck)
      const refresh = {
          refresh: refreshComponent +1
      }
      dispatch(setRefreshComponent(refresh))
    }

}
    
  return (
    <div>
      <div>
        <PlaylistHeader {...(data as PlaylistDetails)} />
      </div>
      <div style={{margin: '0px 60px'}}>
      <div style={{display: 'flex', alignItems: 'center'}}>
            <BtnPlay info={{type: data.type, uri: data.uri}} ids={ids} offset={0} uris={data?.uri ?? ""}/>
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
        <TablePlaylist {...(data as PlaylistDetails)} />
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
