import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router';
import Tooltip from '@mui/material/Tooltip';
import type { Item } from '../../redux/slices/album/albumNewReleases.interface';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BtnPlay } from '../player/btnPlay';
import { useDispatch } from 'react-redux';
import { setInfoBtn } from '../../redux/slices/player/playerInfoReadSong';


export const AlbumNewReleasesList = (albumNewRelease: Item) => {
    const dispatch = useDispatch();

    const [hovered, setHovered] = useState({
        hovered: false,
        id: ''
    })

   const songData = (albumNewRelease: Item) => {
    const info = {
        info: {
            name: albumNewRelease.name,
            uri: albumNewRelease.uri,
            type: albumNewRelease.type,
            id: albumNewRelease.id
        }
    }
        dispatch(setInfoBtn(info))
   }
    return (
            <Box>
                <Card onMouseEnter={() => (setHovered({hovered: true, id: albumNewRelease?.id ?? ''}))} onMouseLeave={() => (setHovered({hovered: false, id: albumNewRelease?.id ?? ''}))} elevation={0} sx={{ minHeight: '200', width: 170 }}>
                    <CardActionArea>
                        <Link to={`/home/album?id=${albumNewRelease.id}`}>
                            <CardMedia
                                component="img"
                                image={albumNewRelease?.images[0].url}
                                alt="green iguana"
                                style={{padding: 10, borderRadius: "20px"}}
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
                                hovered.hovered && hovered.id === albumNewRelease.id ?
                                <div onClick={() => songData(albumNewRelease)} style={{position: 'absolute', right: 0, top: '40%'}}>
                                    <BtnPlay info={{type: albumNewRelease?.type ?? '' , uri: albumNewRelease?.uri ?? '', name: albumNewRelease.name}} ids={albumNewRelease.id} offset={0} uris={albumNewRelease?.uri ?? ''}/>
                                </div>
                                : null 
                            }                                        
                            </motion.div>
                        </AnimatePresence>
                        <CardContent sx={{padding: '0px 0px 10px 10px'}}>
                            <Typography noWrap variant="subtitle1">
                                <Tooltip title={albumNewRelease?.name} placement="bottom">
                                    <span>{albumNewRelease?.name}</span>
                                </Tooltip>
                            </Typography>
                            <Typography variant='subtitle2' fontSize={12} color='#b7b7b7'>
                                {albumNewRelease?.artists.map((artist, index) => (
                                    <Link key={index} color='white' to={`/home/artist?id=${artist.id}`}>
                                        {artist.name}{index < albumNewRelease?.artists.length - 1 ? ', ' : ''}
                                    </Link>
                                ))}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>

    );
}