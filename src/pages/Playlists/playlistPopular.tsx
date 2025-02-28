import { useGetPopularPlaylistQuery } from '../../redux/services/spotifyApi';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router';
import { Box, Card, CardActionArea, CardMedia, CardContent, Typography, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid2';

export const PlaylistPopular = () => {
    const { data, isLoading, error } = useGetPopularPlaylistQuery();

    if (isLoading) return (
      <div className="center-absolute">
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
          <CircularProgress size={100} color="success" />
        </Stack>
      </div>
    );
  
    if (error || !data) return null;
    
  return (
    <>
    <div style={{margin: '40px 40px 40px 40px'}} >
        <Typography variant='h5'>Playlist populaires </Typography>
        <br></br>
        <br></br>
        <Grid container justifyContent={'start'} spacing={2}>
            {data.playlists.items.map((item, index) => (
                <Grid key={index}>
                    <Box>
                        <Link color='white' to={`/home/playlist?id=${item?.id}`}>
                            <Card elevation={0} sx={{ maxHeight: 250, width: 170 }}>
                                <CardActionArea color='red'>
                                    <CardMedia
                                    component="img"
                                    image={item?.images?.[0]?.url}
                                    alt="green iguana"
                                    style={{padding: 10, borderRadius: "20px"}}
                                    />
                                    <CardContent sx={{padding: '0px 0px 0px 10px'}}>
                                        <Typography noWrap variant="subtitle1">
                                            <Tooltip title={item?.name} placement="bottom">
                                                <span>{item?.name}</span>
                                            </Tooltip>
                                        </Typography>
                                        <Typography variant='subtitle2' fontSize={12} color='#b7b7b7'>
                                            Par {item?.owner?.display_name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Box>  
                </Grid>
            ))}
        </Grid>
    </div>
    </>)
}
