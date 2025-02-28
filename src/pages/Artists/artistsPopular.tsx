import Typography from '@mui/material/Typography';
import { useGetArtistDetailsQuery } from '../../redux/services/spotifyApi';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router';
import { Box, Card, CardActionArea, CardMedia, CardContent, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid2';

export const ArtistsPopular = () => {
    const ids = '2YZyLoL8N0Wb9xBt1NhZWg,7tYKF4w9nC0nq9CsPZTHyP,1Xyo4u8uXC1ZmMpatF05PJ,4oUHIQIBe0LHzYfvXNW4QM,6qqNVTkY8uBg9cP3Jd7DAH,74KM79TiuVKeVCqs8QtB0B,1HY2Jd0NmPuamShAr6KMms,06HL4z0CvFAxyc27GXpf02,0du5cEVh5yTK9QJze8zA0C'
    const { data, isLoading, error } = useGetArtistDetailsQuery(ids);
      
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
        <Typography variant='h5'>Artists populaires </Typography>
        <br></br>
        <br></br>
                <br></br>
                <Grid container justifyContent={'start'} spacing={2}>
                    {data.artists.map((item, index) => (
                    <Box key={index}>
                        <Card elevation={0} sx={{ minHeight: '170', width: 170 }}>
                            <CardActionArea>
                                <Link color='white' to={`/home/artist?id=${item.id}`}>
                                    <CardMedia
                                        style={{width: 170,borderRadius: '50%', padding: '10px'}}
                                        component="img"
                                        width={170}
                                        loading="lazy" 
                                        height={170}
                                        image={item?.images?.[0]?.url}
                                        alt={item.name}
                                    />
                                </Link>
                                <CardContent>
                                    <Typography noWrap variant="subtitle1" fontSize={12}>
                                        <span>Artist</span>
                                    </Typography>
                                    <Link color='white' to={`/home/artist?id=${item.id}`}>
                                        <Typography noWrap variant="subtitle1">
                                            <Tooltip title={item.name} placement="bottom">
                                                <span>{item.name}</span>
                                            </Tooltip>
                                        </Typography>
                                    </Link>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Box>
                    ))}
                </Grid>
            </div>
        </>
    );
}

