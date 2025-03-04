import { ListItemIcon, ListItemText, ListItemButton, List, Typography, Box, Skeleton } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useGetUserTopTrackQuery } from '../../redux/services/spotifyApi'
import { useDispatch } from 'react-redux';
import { setImage } from '../../redux/slices/others/getImageHoveredSlice';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BtnPlay } from '../player/btnPlay';
import { Link } from 'react-router';

export const UserRecommendedTracks = () => {
    const {data: dataTopTracks, isLoading: isLoadingReco, error: errorReco} = useGetUserTopTrackQuery()
    const [hoveredRow, setHoveredRow] = useState<string>('');
    const dispatch = useDispatch();
    const imageData = {
        image: hoveredRow,
    }
    dispatch(setImage(imageData))

    const [hovered, setHovered] = useState({
        hovered: false,
        id: ''
    })
    
    
    if (isLoadingReco) return (
        <div style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,.4) 0,#121212 100%)',
            transitionDuration: '1s',
            transitionProperty: 'background',
            transitionTimingFunction: 'ease',
        }}>
            <div style={{padding: '35px'}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 6, md: 12, xl: 12 }}>
                    {Array.from(Array(8)).map((_, index) => (
                        <Grid key={index} sx={{padding: 0}} size={3}>
                            <Skeleton animation="wave"  variant="rounded"  height={80} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
    
    if (errorReco) return null;

    return (<>
        <div style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,.4) 0,#121212 100%)',
            transitionDuration: '1s',
            transitionProperty: 'background',
            transitionTimingFunction: 'ease',
        }}>
            <div style={{padding: '35px', paddingBottom: 100}}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container justifyContent={'space-between'} spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 6, md: 12, xl: 12 }}>
                    {dataTopTracks?.items.map((data, index) => (
                        <Grid onMouseEnter={() => setHoveredRow(data?.album.images[2].url)} key={index} sx={{padding: 0}} size={3}>
                            <div>
                                <List sx={{padding: 0, background: "#ffffff14", borderRadius: 2}} >
                                    <ListItemButton onMouseEnter={() => (setHovered({hovered: true, id: data?.id ?? ''}))} onMouseLeave={() => (setHovered({hovered: false, id: data?.id ?? ''}))} sx={{padding: 0}} alignItems='center'>
                                        <ListItemIcon >
                                            <img style={{width: '75px'}} src={data?.album.images[0].url} />
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
                                                        <div style={{position: 'absolute', left: 0}}>
                                                            <BtnPlay info={{context_uri: data.album.uri, uri: data.album.uri, offset: data.track_number, name: data.name, type: "miniature"}}/>
                                                        </div>
                                                        : null 
                                                    }                                        
                                                </motion.div>
                                            </AnimatePresence>
                                        </ListItemIcon>
                                        <Link to={`/home/album?id=${data?.album.id}`}>
                                            <ListItemText><Typography style={{marginLeft: 20}} >{data?.name}</Typography></ListItemText>
                                        </Link>
                                    </ListItemButton>
                                </List>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            </div>
        </div>
    </>)
}
