import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { LibraryHeader } from "../../components/user/libraryHeader";
import { LibraryTracks } from "../../components/user/libraryTracks";
import { useGetUserSavedTracksQuery } from "../../redux/services/spotifyApi";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { BtnPlay } from "../../components/player/btnPlay";
import { useEffect, useState } from "react";

export const UserLibrary = () => {
    const { data, isLoading, error } = useGetUserSavedTracksQuery()
    const [uris, setUris] = useState<string[]>([])

    
    useEffect(() => {
        const retriveUris = data?.items?.map((item) => item.track.uri) ?? []
        setUris(retriveUris)        
    }, [data])

    const ids = data?.items.map((el) => el.track.id)
        
    if (isLoading) return (
        <div style={{height: '100vh'}}>
            <div className="center-absolute">
                <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <CircularProgress size={100} color="success" />
                </Stack>
            </div>
        </div>
    );

    if (error || !data) return null

  return (
    <div>
        <div style={{marginBottom: 120}}>
            <LibraryHeader />
        </div>
        <div style={{margin: '30px'}}>
        <BtnPlay info={{type: 'playlist' , uri: uris, name: 'user_playlist'}} ids={ids} offset={0} uris={uris}/>
        <TableContainer elevation={0} component={Paper}>
              <Table stickyHeader sx={{ background: '#121212' }} size="small" aria-label="a dense table">
                  <TableHead>
                  <TableRow>
                      <TableCell style={{width: '10px'}}>#</TableCell>
                      <TableCell align="left">Titre</TableCell>
                      <TableCell align="left">Album</TableCell>
                      <TableCell align="center">Date d'ajout</TableCell>
                      <TableCell width={120} align="center"><AccessTimeIcon/></TableCell>
                  </TableRow>
                  </TableHead>
            {data?.items.map((item, index) => (
                <LibraryTracks key={index} index={index} data={item}/>
            ))}
              </Table>
              </TableContainer>
        </div>
        <br></br>
    </div>
  )
}
