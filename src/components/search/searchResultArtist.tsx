import { Box, Typography, Card, CardActionArea, CardMedia, CardContent, Tooltip } from "@mui/material"
import { Link } from "react-router"
import { Artists, Item2 } from "../../redux/slices/search/searchGlobal.interface"
import { AnimatePresence, motion } from "framer-motion"
import { setInfoBtn } from "../../redux/slices/player/playerInfoReadSong"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { BtnPlay } from "../player/btnPlay"

export const SearchResultArtist = (artists: Artists) => {
    const dispatch = useDispatch();

    const [hovered, setHovered] = useState({
        hovered: false,
        id: ''
    })

   const songData = (artist: Item2) => {
    const info = {
        info: {
            name: artist.name ?? '',
            uri: artist.uri ?? '',
            type: artist.type ?? '',
            id: artist.id ?? ''
        }
    }
        dispatch(setInfoBtn(info))
   }
   
  return (
  <>
    <Typography variant="h5" mb={2}>
        Artistes
    </Typography>
        <div style={{display: 'flex', flex: 'wrap', width: '100%', overflow: 'auto'}}>
            {artists.items.map((artist, index) => (            
            <Box key={index} mr={5}>
                <div>
                    <Card onMouseEnter={() => (setHovered({hovered: true, id: artist?.id ?? ''}))} onMouseLeave={() => (setHovered({hovered: false, id: artist?.id ?? ''}))}  elevation={0} sx={{ minHeight: '150', minWidth: 150 }}>
                        <CardActionArea>
                            <Link color='white' to={`/home/artist?id=${artist.id}`}>
                                <CardMedia
                                    style={{borderRadius: '50%', width: '130px', height: '130px', margin: '10px auto'}}
                                    component="img"
                                    loading="lazy" 
                                    image={artist?.images?.[0]?.url}
                                    alt={artist.name}
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
                                hovered.hovered && hovered.id === artist.id ?
                                <div onClick={() => songData(artist)} style={{position: 'absolute', right: 0, top: '40%'}}>
                                    <BtnPlay info={{type: artist?.type ?? '' , uri: artist?.uri ?? '', name: artist.name}} ids={artist.id} offset={0} uris={artist?.uri ?? ''}/>
                                </div>
                                : null 
                            }                                        
                                </motion.div>
                            </AnimatePresence>
                            <CardContent>
                                <Typography noWrap variant="subtitle1" fontSize={12}>
                                    <span>Artist</span>
                                </Typography>
                                <Link color='white' to={`/home/artist?id=${artist.id}`}>
                                    <Typography noWrap variant="subtitle1">
                                        <Tooltip title={artist.name} placement="bottom">
                                            <span>{artist.name}</span>
                                        </Tooltip>
                                    </Typography>
                                </Link>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </Box>
            ))}
        </div>
        </>
    )
}
