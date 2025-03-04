import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PlaylistDetails } from '../../redux/interfaces/playlist/playlist.interface';
import { convertirDuree } from '../../utils/covertDuration';
import { convertDate } from '../../utils/convertDate';
import { Typography } from '@mui/material';
import { Link } from 'react-router';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { formatArtistIds } from '../../utils/formatArtistIds';
import { useState } from 'react';
import { TableRowPlay } from '../player/tableRowPlay';

export default function TablePlaylist(props: PlaylistDetails) {    
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  
  return (
    <TableContainer elevation={0} style={{ height: 670, width: '100%' }} component={Paper}>
      <Table stickyHeader sx={{ background: '#121212' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >#</TableCell>
            <TableCell align="left">Titre</TableCell>
            <TableCell align="left">Album</TableCell>
            <TableCell sx={{minWidth: "160px"}} align="left">Date d'ajout</TableCell>
            <TableCell sx={{minWidth: "150px"}} align="center"><AccessTimeIcon/></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tracks.items.map((row, index) => (
            <TableRow
              hover
              onMouseEnter={() => setHoveredRow(index+1)} // Suivre le survol
              onMouseLeave={() => setHoveredRow(null)} // Réinitialiser le survol
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
                <TableRowPlay hoveredRow={hoveredRow} uri={row.track.uri} index={index} id={row.track.id} />
              </TableCell>
              <TableCell align="left">
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <div>
                    <img style={{borderRadius: 10}} height={64} width={64} src={row.track.album.images[0].url} />
                  </div>
                  <div style={{marginLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <Typography variant='subtitle1' fontSize={14}>
                      <Link color='white' to={`/home/track?id=${row.track.id}&band=${row.track.artists[0].name}&title=${row.track.name}&artistId=${row.track.artists[0].id}&artistIds=${formatArtistIds(row.track.artists)}`}>
                        {row.track.name}
                      </Link>
                    </Typography>
                    <Typography color='#e6e6e6' variant='subtitle2' fontSize={11}>
                        {row.track.artists.map((artist, index) => (
                            <Link key={index} to={`/home/artist?id=${artist.id}`}>
                                {artist.name}{index < row.track.artists.length - 1 ? ', ' : ''}
                            </Link>
                        ))}
                    </Typography>
                  </div>
                </div>
              </TableCell>
              <TableCell align="left">
              <Link color='white' to={`/home/album?id=${row.track.album.id}`}>
                <Typography color='#e6e6e6' noWrap variant='subtitle1' fontSize={13}>{row.track.album.name}</Typography>              
              </Link>
              </TableCell>
              <TableCell align="left"><Typography variant='subtitle1' fontSize={14} color='#dedede'>{convertDate(row.added_at)}</Typography></TableCell>
              <TableCell align="center"><Typography variant='subtitle1' fontSize={14} color='#dedede'>{convertirDuree(row.track.duration_ms)}</Typography></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

