import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router';
import Tooltip from '@mui/material/Tooltip';
import type { Item } from '../../redux/interfaces/search/searchPopularPlaylist.interface';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BtnPlay } from '../player/btnPlay';


export const Playlist = (data: Item) => {
    const [hovered, setHovered] = useState({
        hovered: false,
        id: ''
    })

    if (Object.keys(data).length === 0 || data.owner?.display_name === 'Spotify') return null
    return (
        <Box>
            <Card onMouseEnter={() => (setHovered({hovered: true, id: data?.id ?? ''}))} onMouseLeave={() => (setHovered({hovered: false, id: data?.id ?? ''}))} elevation={0} sx={{ maxHeight: 250, width: 170 }}>
                <CardActionArea color='red'>
                    <Link color='white' to={`/home/playlist?id=${data.id}`}>
                        <CardMedia
                        component="img"
                        image={data?.images?.[0]?.url}
                        alt={data?.images?.[0]?.url}
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
                                hovered.hovered && hovered.id === data.id ?
                                <div style={{position: 'absolute', right: 0, top: '40%'}}>
                                    <BtnPlay info={{context_uri: data.uri ?? '', uri: data.uri ?? '', name: data.name ?? '', type: "miniature"}}/>
                                </div>
                                : null 
                            }                                        
                        </motion.div>
                    </AnimatePresence>
                    <CardContent sx={{padding: '0px 0px 0px 10px'}}>
                        <Typography noWrap variant="subtitle1">
                            <Tooltip title={data?.name} placement="bottom">
                                <span>{data?.name}</span>
                            </Tooltip>
                        </Typography>
                        <Typography variant='subtitle2' fontSize={12} color='#b7b7b7'>
                            Par {data?.owner?.display_name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
}