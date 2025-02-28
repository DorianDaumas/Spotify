import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, Stack, CircularProgress } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useGetAlbumTracksQuery } from "../../redux/services/spotifyApi";
import { convertirDuree } from "../../utils/covertDuration";
import { Link } from 'react-router'
import { formatArtistIds } from "../../utils/formatArtistIds";
import { useDispatch } from "react-redux";
import { setNewUris } from "../../redux/slices/player/playerSice";
import { useState } from "react";
import { TableRowPlay } from "../player/tableRowPlay";
export const AlbumTracks = ({  albumId, allUris }: { uri: string, albumId: string, allUris: string | string[] }) => {
    const { data, isLoading } = useGetAlbumTracksQuery(albumId);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const dispatch = useDispatch();
    
    const listenSong = (offset: number) => {
        const state = {
            offset: offset,
            info: {
                type: 'track',
                uri: allUris
            },
            uris: allUris
        }       
        dispatch(setNewUris(state))
    }

    if (isLoading) return (
        <div className="center-absolute">
            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress size={100} color="success" />
            </Stack>
        </div>
    );

    
    return (
        <div>
            <br></br>
            <div>
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
                        {data?.items.map((row, index) => (
                            <TableRow
                                hover
                                onMouseEnter={() => setHoveredRow(index+1)}
                                onMouseLeave={() => setHoveredRow(null)}              
                                key={index}
                                sx={{ '& td, &:last-child th': { border: 0} }}
                            >
                            <TableCell onClick={() => listenSong(index)} align="left" color="#bdbdbd">
                                <TableRowPlay hoveredRow={hoveredRow} index={index} id={row.id} />
                            </TableCell>
                            <TableCell align="left">
                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                    <Link color='white' to={`/home/track?id=${row.id}&band=${row.artists[0].name}&title=${row.name}&artistId=${row.artists[0].id}&artistIds=${formatArtistIds(row.artists)}`}>
                                        <Typography variant='subtitle1'>{row.name}</Typography>
                                    </Link>
                                    <Typography color='#e6e6e6' style={{color: 'red!important'}} variant='subtitle2' fontSize={11}>
                                        {row.artists.map((artist, index) => (
                                            <Link key={index} to={`/home/artist?id=${artist.id}`}>
                                                {artist.name}{index < row.artists.length - 1 ? ', ' : ''}
                                            </Link>
                                        ))}
                                    </Typography>
        
                                </div>
                            </TableCell>
                            <TableCell width={'100px'} align="center"><Typography variant='subtitle1' fontSize={13} color="#bdbdbd">{convertirDuree(row.duration_ms)}</Typography></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
} 