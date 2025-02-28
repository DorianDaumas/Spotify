import { Item } from '../../redux/slices/user/userSavedTracks.interface'
import { TableRow, TableCell, TableBody, Typography } from '@mui/material'
import { Link } from 'react-router'
import { convertirDuree } from '../../utils/covertDuration'
import { formatArtistIds } from '../../utils/formatArtistIds'
import { afficherDuree } from '../../utils/convertTime'
import { useDispatch } from 'react-redux'
// import { RootState } from '../../redux/store'
import { TableRowPlay } from '../player/tableRowPlay'
import { useState } from 'react'
import { setNewUris } from '../../redux/slices/player/playerSice'

export const LibraryTracks = ({data, index}: {data: Item, index:number}) => {
    // const currentTrack = useSelector((state: RootState) => state.playerTrackInfo.tracksInfo);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    const dispatch = useDispatch();

    const listenSong = (offset: number) => {
        const state = {
            offset: offset,
            info: {
                type: 'track',
                uri: data.track.uri
            },
            uris: data.track.uri
        }        
        dispatch(setNewUris(state))
    }

    return (
        <TableBody >
            <TableRow
                hover
                onMouseEnter={() => setHoveredRow(index+1)}
                onMouseLeave={() => setHoveredRow(null)}     
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell onClick={() => listenSong(index)} align="left">
                <TableRowPlay hoveredRow={hoveredRow} index={index} id={data?.track.id} />
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
