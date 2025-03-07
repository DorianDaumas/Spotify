import { Box, Card, CardActionArea, CardContent, CardMedia, Skeleton, Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useGetUserTopArtistQuery } from '../../redux/services/spotifyApi'
import { Link } from 'react-router';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BtnPlay } from '../player/btnPlay';

export const UserTopArtists = () => {
    const {data, isLoading, error } = useGetUserTopArtistQuery();
    const [hovered, setHovered] = useState({
        hovered: false,
        id: '',
    })

    if (isLoading) return (
        <div style={{margin: '10px 40px 20px 40px'}}>
        <Grid container justifyContent={'start'} spacing={2}>
            {Array.from(Array(5)).map((_, index) => (
                <Box key={index} sx={{mr: 5}}>
                    <Skeleton animation="wave" variant="circular" width={150} height={150} />
                    <br></br>
                    <Skeleton width={'20%'} variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton width={'50%'} variant="text" sx={{ fontSize: '1rem' }} />
                </Box>
            ))}
        </Grid>
        </div>
    );    
    
    if (error || !data) return null;
    
    if (data?.total === 0) {
        return null
    } else {
        return (<>
            <div style={{margin: '-20px 40px 20px 40px'}}>
                <div>
                    <Typography variant='subtitle1'>Top artistes du mois</Typography>
                    <Typography variant='body2' fontSize={12} color='#dedede'>Visibles uniquement par vous</Typography>
                </div><br></br>
                <div>
                <Grid container justifyContent={'start'} spacing={2}>
                    {
                        data?.items.map((data, index) => (
                            <Box key={index}>
                            <Card onMouseEnter={() => (setHovered({hovered: true, id: data.id}))} onMouseLeave={() => (setHovered({hovered: false, id: data.id}))} elevation={0} sx={{ minHeight: '170', minWidth: 170 }}>
                                <CardActionArea>
                                    <Link color='white' to={`/home/artist?id=${data.id}`}>
                                        <CardMedia
                                            style={{borderRadius: '50%', width: 170, height: 170, padding: '10px'}}
                                            component="img"
                                            loading="lazy" 
                                            image={data?.images?.[0]?.url}
                                            alt={data.name}
                                        />
                                    </Link>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={location.pathname}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                            >
                                            {
                                                hovered.hovered && hovered.id === data.id ?
                                                <div style={{position: 'absolute', right: 0, top: '40%'}}>
                                                    <BtnPlay info={{context_uri: data.uri, uri: data.uri, name: data.name, type: data?.type}}/>
                                                </div>
                                                : null 
                                            }                                        
                                        </motion.div>
                                    </AnimatePresence>
                                    <CardContent>
                                        <Typography noWrap variant="subtitle1" fontSize={12}>
                                            <span>Artist</span>
                                        </Typography>
                                        <Link color='white' to={`/home/artist?id=${data.id}`}>
                                            <Typography noWrap variant="subtitle1">
                                                <Tooltip title={data.name} placement="bottom">
                                                    <span>{data.name}</span>
                                                </Tooltip>
                                            </Typography>
                                        </Link>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Box>
                        ))
                    }
                    </Grid>
                </div>
            </div>
        </>)
    }

}
