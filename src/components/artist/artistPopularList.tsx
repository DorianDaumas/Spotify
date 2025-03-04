import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router';
import Tooltip from '@mui/material/Tooltip';
import type { Item } from '../../redux/interfaces/search/searchPopularArtist.interface';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { BtnPlay } from '../player/btnPlay';

export const ArtistPopularList = (data: Item) => {
    const [hovered, setHovered] = useState({
        hovered: false,
        id: ''
    })

    return (
        <Box>
            <Card onMouseEnter={() => (setHovered({hovered: true, id: data.id}))} onMouseLeave={() => (setHovered({hovered: false, id: data.id}))} elevation={0} sx={{ minHeight: '170', width: 170 }}>
                <CardActionArea>
                    <Link color='white' to={`/home/artist?id=${data.id}`}>
                        <CardMedia
                            style={{width: 170,borderRadius: '50%', padding: '10px'}}
                            component="img"
                            width={170}
                            loading="lazy" 
                            height={170}
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
                                        <BtnPlay info={{context_uri: data.uri, uri: data.uri, name: data.name, type: "miniature"}}/>
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
    );
}