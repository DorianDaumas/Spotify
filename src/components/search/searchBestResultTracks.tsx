import { TableCell, TableRow, Typography } from '@mui/material'
import { Link } from 'react-router'
import { convertirDuree } from '../../utils/covertDuration'
import { formatArtistIds } from '../../utils/formatArtistIds'
import { Track } from '../../redux/slices/artist/artistTopTracks.interface'
import { Track as TrackDetails } from '../../redux/slices/playlist/playlist.interface'
import { Item } from '../../redux/slices/album/album.interface'

type DataType = Track | TrackDetails | Item;

interface SearchResultBestResultProps {
    data: DataType;
    type: string;
}

export const SearchBestResultTracks = ({ data, type }: SearchResultBestResultProps) => {
 
    return (
        <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="left">
                <div style={{display: 'flex'}}>
                    <div>
                        {type !== 'album' ?
                            <img style={{borderRadius: 10}} height={60} width={60} src={(data as Track)?.album?.images?.[0]?.url} />
                            :
                            <span></span>
                        }
                    </div>
                    <div style={{marginLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <Typography variant='h6'>
                        <Link color='white' to={`/home/track?id=${data.id}&band=${data.artists[0].name}&title=${data.name}&artistId=${data.artists[0].id}&artistIds=${formatArtistIds(data.artists)}`}>
                            <Typography variant='subtitle1'>{data.name}</Typography>
                        </Link>
                        </Typography>
                        <Typography variant='h6'>
                        <Link color='white' to={`/home/artist?id=${type !== 'album' ? (data as Track)?.album?.artists?.[0]?.id : (data as Item)?.artists?.[0]?.id}`}>
                            <Typography variant='subtitle1' fontSize={14} color="#dedede">{type !== 'album' ? (data as Track)?.album?.artists?.[0]?.name : (data as Item)?.artists?.[0]?.name}</Typography>
                        </Link>
                        </Typography>
                    </div>
                </div>
                </TableCell>
            <TableCell align="right"><Typography variant='subtitle1' fontSize={14}>{convertirDuree(data.duration_ms)}</Typography></TableCell>
        </TableRow>
  )
}
