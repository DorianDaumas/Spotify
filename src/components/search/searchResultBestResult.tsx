import { Box, Card, CardActionArea, CardMedia, CardContent, Typography, Tooltip, Stack, CircularProgress, TableBody, Table, TableContainer, Paper } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { Link } from "react-router"
import { Item2, Item3, Item4 } from "../../redux/interfaces/search/searchGlobal.interface"
import { useGetAlbumTracksQuery, useGetArtistTopTracksQuery, useGetPlaylistDetailsQuery } from "../../redux/services/spotifyApi";
// import { convertirDuree } from "../../utils/covertDuration";
// import { formatArtistIds } from "../../utils/formatArtistIds";
import { SearchBestResultTracks } from "./searchBestResultTracks";

type DataType = Item2 | Item4 | Item3;

interface SearchResultBestResultProps {
    data: DataType;
    type: string;
}

export const SearchResultBestResult = ({ data, type }: SearchResultBestResultProps) => {
    const { data: detailsPlaylist, isLoading: isLoadingPlaylistTracks } = useGetPlaylistDetailsQuery(
        type === 'playlist' ? data.id ?? '' : '',
        {
            skip: type !== 'playlist',
            refetchOnMountOrArgChange: true,
            pollingInterval: 0,
        }
    );

    const { data: detailsAlbum, isLoading: isLoadingAlbumTracks } = useGetAlbumTracksQuery(
        type === 'album' ? data.id ?? '' : '',
        {
            skip: type !== 'album',
            refetchOnMountOrArgChange: true,
            pollingInterval: 0,
        }
    );

    const { data: topTracksData, isLoading: isLoadingTracks } = useGetArtistTopTracksQuery(
        type !== 'playlist' ? data.id ?? '' : '',
        {
            skip: type !== 'artist,album,playlist,track',
            refetchOnMountOrArgChange: true,
            pollingInterval: 0,
        }
    );

    if (isLoadingTracks || isLoadingPlaylistTracks || isLoadingAlbumTracks) return (
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
         <Box>
            <Typography variant="h5" mb={2}>
                Meilleur résultat
            </Typography>
                <Link color='white' className="track-link" to={`/home/artist?id=${data.id}`}>
                    <Card elevation={1} sx={{ height: '400', width: 350 }}>
                        <CardActionArea color='red'>
                                <CardMedia
                                    component="img"
                                    style={{width: '150px', margin: '20px 20px 0px 20px', borderRadius: '50%'}}
                                    image={data?.images?.[0]?.url}
                                    alt="green iguana"
                                />
                            <CardContent>
                                <Typography variant="h4" fontWeight={'bold'}>
                                    <Tooltip title={data?.name} placement="bottom">
                                        <span>{data?.name}</span>
                                    </Tooltip>
                                </Typography>
                                <Typography variant='subtitle2' style={{textTransform: "capitalize"}} fontSize={13} color='#b7b7b7'>
                                    {data.type}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>
            </Box>
            <Box ml={5}>
                <div style={{height: '100vh'}}>
                    <div className="center-absolute">
                        <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                            <CircularProgress size={100} color="success" />
                        </Stack>
                    </div>
                </div>
            </Box>
        </div>
    );

    if ((type === 'playlist' && !detailsPlaylist) || (type === 'artist' && !topTracksData) || (type === 'album' && !detailsAlbum)) return null;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid size={4}>
                    <div style={{width: '300px'}}>
                        <Typography variant="h5" mb={2}>
                            Meilleur résultat
                        </Typography>
                        <Link color='white' className="track-link" to={
                            data?.type === 'playlist' ? `/home/playlist?id=${data.id}`
                            : data?.type === 'album' ? `/home/album?id=${data.id}`
                            : `/home/artist?id=${data.id}`
                            }>
                            <Card elevation={1} sx={{ height: '400'}} >
                                <CardActionArea color='red'>
                                        <CardMedia
                                            component="img"
                                            style={{width: '150px', margin: '20px 20px 0px 20px', borderRadius: '50%'}}
                                            image={data?.images?.[0]?.url}
                                            alt="green iguana"
                                        />
                                    <CardContent style={{marginLeft: 20}}>
                                        <Typography variant="h4" fontWeight={'bold'}>
                                            <Tooltip title={data?.name} placement="bottom">
                                                <span>{data?.name}</span>
                                            </Tooltip>
                                        </Typography>
                                        <Typography variant='subtitle2' style={{textTransform: "capitalize"}} fontSize={13} color='#b7b7b7'>
                                            {data?.type}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </div>
                </Grid>
                <Grid size={8}>
                    <div>
                        <Typography variant="h5" mb={2}>
                            Titres
                        </Typography>
                        <TableContainer elevation={0} style={{ width: '100%' }} component={Paper}>
                            <Table stickyHeader sx={{ minWidth: 650, background: '#121212' }} size="small" aria-label="a dense table">
                                <TableBody >
                                {type === 'playlist' ? 
                                    detailsPlaylist?.tracks.items.slice(0, 5).map((row, index) => (
                                        <SearchBestResultTracks key={index} data={row.track} type={type}/>
                                    ))
                            
                                    : type === 'album' ? 
                                        detailsAlbum?.items.slice(0, 5).map((row, index) => (
                                            <SearchBestResultTracks key={index} data={row} type={type}/>
                                        ))    
                                    :
                                    topTracksData?.tracks.slice(0, 5).map((row, index) => (
                                        <SearchBestResultTracks key={index} data={row} type={type}/>
                                    ))
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>           
                </Grid>
            </Grid>
        </Box>
    )
}
