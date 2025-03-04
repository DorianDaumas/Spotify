// import Card from "@mui/material/Card"
import { RootTopTrack } from "../../redux/interfaces/artist/artistTopTracks.interface"
// import CardActionArea from "@mui/material/CardActionArea"
// import CardMedia from "@mui/material/CardMedia"
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { Link, useLocation } from 'react-router'
import { convertirDuree } from "../../utils/covertDuration"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import { formatArtistIds } from "../../utils/formatArtistIds"
import { TableRowPlay } from "../player/tableRowPlay"

interface ArtistDetailsTopTracksProps extends RootTopTrack {
    onRefresh?: (value: number) => void; // Rendre onRefresh optionnel
}

export const ArtistDetailsTopTracks = (props: ArtistDetailsTopTracksProps) => {
    const location = useLocation();
    const [refreshComp, setrefreshComp] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    
    useEffect(() => {
        setrefreshComp(+1)
        if (props.onRefresh) {
            props.onRefresh(refreshComp + 1);
        }
    }, [location, props]);

    const popularity = <span>Le score de popularité d'une track est une valeur compris entre 0 et 100 obtenue par l'algorythme de spotify.<br></br> Plus la track est streamé plus le score augmente"</span>;



  return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid size={12}>
                <div style={{maxHeight: !open ? '300px': '100%', overflow: 'hidden'  }}>
                    <Typography variant="h5">Titres les plus populaires</Typography><br></br>
                    <TableContainer elevation={0} component={Paper}>
                        <Table stickyHeader sx={{ background: '#121212' }} size="small" aria-label="a dense table">
                            <TableHead>
                            <TableRow>
                                <TableCell style={{width: '10px'}}>#</TableCell>
                                <TableCell align="left">Titre</TableCell>
                                <TableCell align="left">Album</TableCell>
                                <TableCell align="center">
                                    <Tooltip title={popularity} placement="bottom">
                                        <span>Popularité</span>
                                    </Tooltip>
                                    
                                </TableCell>
                                <TableCell width={120} align="center"><AccessTimeIcon/></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody >
                            {props.tracks.map((row, index) => (
                                <TableRow
                                    hover
                                    onMouseEnter={() => setHoveredRow(index+1)}
                                    onMouseLeave={() => setHoveredRow(null)}                  
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="left">
                                    <TableRowPlay type='playlist' hoveredRow={hoveredRow} uri={row.uri} index={index} id={row.id} />
                                </TableCell>
                                <TableCell align="left">
                                    <div style={{display: 'flex', alignItems: "center"}}>
                                    <div>
                                        <img style={{borderRadius: 10}} height={40} width={40} src={row.album.images[0].url} />
                                    </div>
                                    <div style={{marginLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                        <Typography variant='h6'>
                                        <Link color='white' to={`/home/track?id=${row.id}&band=${row.artists[0].name}&title=${row.name}&artistId=${row.artists[0].id}&artistIds=${formatArtistIds(row.artists)}`}>
                                            <Typography variant='subtitle1'>{row.name}</Typography>
                                        </Link>
                                        </Typography>
                                    </div>
                                    </div>
                                </TableCell>
                                <TableCell align="left">
                                    <Link to={`/home/album?id=${row.album.id}`}>
                                        <Typography color='#e6e6e6' noWrap variant='subtitle1'>{row.album.name}</Typography>
                                    </Link>                            
                                </TableCell>
                                <TableCell align="center"><Typography variant='subtitle1' color="#dedede" fontSize={13}>{row.popularity} %</Typography></TableCell>
                                <TableCell align="center"><Typography variant='subtitle1' color="#dedede" fontSize={13}>{convertirDuree(row.duration_ms)}</Typography></TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <br></br>
                <Typography style={{cursor: 'pointer'}} variant="subtitle1" fontSize={12} onClick={() => setOpen(!open)}>{open ? 'Afficher moins' : 'Afficher plus'}</Typography>
            </Grid>
        </Grid>
    </Box>
  )
}
