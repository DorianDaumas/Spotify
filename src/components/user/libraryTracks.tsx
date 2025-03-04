import { Item } from '../../redux/interfaces/user/userSavedTracks.interface'
import { TableRow, TableCell, TableBody, Typography } from '@mui/material'
import { Link } from 'react-router'
import { convertirDuree } from '../../utils/covertDuration'
import { formatArtistIds } from '../../utils/formatArtistIds'
import { afficherDuree } from '../../utils/convertTime'
import { TableRowPlay } from '../player/tableRowPlay'
import { useState } from 'react'

export const LibraryTracks = ({data, index, uris}: {uris: string[], data: Item, index:number}) => {
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    
    return (
        <TableBody >
            <TableRow
                hover
                onMouseEnter={() => setHoveredRow(index+1)}
                onMouseLeave={() => setHoveredRow(null)}     
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell align="left">
                <TableRowPlay hoveredRow={hoveredRow} uris={uris} type='user-liked-tracks' uri={data?.track.uri} index={index} id={data?.track.id} />
            </TableCell>
            <TableCell align="left">
                <div style={{display: 'flex', alignItems: "center"}}>
                <div>
                    <img style={{borderRadius: 10}} height={64} width={64} src={data.track.album.images[0].url} />
                </div>
                <div style={{marginLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <Typography variant='h6'>
                    <Link color='white' to={`/home/track?id=${data.track.id}&band=${data.track.artists[0].name}&title=${data.track.name}&artistId=${data.track.artists[0].id}&artistIds=${formatArtistIds(data.track.artists)}`}>
                        <Typography variant='subtitle1'>{data.track.name}</Typography>
                    </Link>
                    </Typography>
                    <Link color='#dedede' to={`/home/artist?id=${data.track.artists[0].id}`}>
                        <Typography variant='subtitle1' fontSize={13}>{data.track.album.artists[0].name}</Typography>
                    </Link>
                </div>
                </div>
            </TableCell>
            <TableCell align="left">
                <Link to={`/home/album?id=${data.track.album.id}`}>
                    <Typography color='#e6e6e6' noWrap variant='subtitle1'>{data.track.album.name}</Typography>
                </Link>                            
            </TableCell>
            <TableCell align="center"><Typography variant='subtitle1' color="#dedede" fontSize={13}>{afficherDuree(data.added_at)}</Typography></TableCell>
            <TableCell align="center"><Typography variant='subtitle1' color="#dedede" fontSize={13}>{convertirDuree(data.track.duration_ms)}</Typography></TableCell>
            </TableRow>
        </TableBody>  
    )
}
