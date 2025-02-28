import { Box, Card, CardActionArea, CardMedia, CardContent, Typography, Tooltip } from "@mui/material"
import { Link } from "react-router"
import { Albums, Item3 } from "../../redux/slices/search/searchGlobal.interface"
import { AnimatePresence, motion } from "framer-motion";
import { BtnPlay } from "../player/btnPlay";
import { setInfoBtn } from "../../redux/slices/player/playerInfoReadSong";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const SearchResultAlbum = (albums: Albums) => {
    const dispatch = useDispatch();

    const [hovered, setHovered] = useState({
        hovered: false,
        id: ''
    })

   const songData = (album: Item3) => {
    const info = {
        info: {
            name: album.name,
            uri: album.uri,
            type: album.type,
            id: album.id
        }
    }
        dispatch(setInfoBtn(info))
   }
    
    return (
    <>
    <Typography variant="h5" mb={2}>
        Albums
    </Typography>
    <div style={{display: 'flex', flex: 'wrap', width: '100%', overflow: 'auto'}}>
        {albums.items.map((album, index) => (    
        <Box mr={5} key={index} >
            <Card onMouseEnter={() => (setHovered({hovered: true, id: album?.id ?? ''}))} onMouseLeave={() => (setHovered({hovered: false, id: album?.id ?? ''}))} elevation={0} sx={{ minHeight: '200', width: 200 }}>
                <CardActionArea>
                    <Link to={`/home/album?id=${album.id}`}>
                        <CardMedia
                            component="img"
                            image={album?.images[0].url}
                            alt="green iguana"
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
                                hovered.hovered && hovered.id === album.id ?
                                <div onClick={() => songData(album)} style={{position: 'absolute', right: 0, top: '40%'}}>
                                    <BtnPlay info={{type: album?.type ?? '' , uri: album?.uri ?? '', name: album.name}} ids={album.id} offset={0} uris={album?.uri ?? ''}/>
                                </div>
                                : null 
                            }                                        
                            </motion.div>
                        </AnimatePresence>
                    <CardContent>
                        <Typography noWrap variant="subtitle1">
                            <Tooltip title={album?.name} placement="bottom">
                                <span>{album?.name}</span>
                            </Tooltip>
                        </Typography>
                        <Typography variant='subtitle2' fontSize={12} color='#b7b7b7'>
                            {album?.artists.map((artist, index) => (
                                <Link key={index} color='white' to={`/home/artist?id=${artist.id}`}>
                                    {artist.name}{index < album?.artists.length - 1 ? ', ' : ''}
                                </Link>
                            ))}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
        ))}
    </div>
    </>
    )   
}
