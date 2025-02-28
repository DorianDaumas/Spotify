import { Typography, Box, Card, CardActionArea, CardMedia, CardContent, Tooltip } from "@mui/material"
import { Link } from "react-router"
import { Item4 } from "../../redux/slices/search/searchGlobal.interface"
import { AnimatePresence, motion } from "framer-motion";
import { BtnPlay } from "../player/btnPlay";
import { setInfoBtn } from "../../redux/slices/player/playerInfoReadSong";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const SearchResultPlaylist = (playlist: Item4) => {
    const dispatch = useDispatch();

    const [hovered, setHovered] = useState({
        hovered: false,
        id: ''
    })

   const songData = (playlist: Item4) => {
    const info = {
        info: {
            name: playlist.name ?? '',
            uri: playlist.uri ?? '',
            type: playlist.type ?? '',
            id: playlist.id ?? ''
        }
    }
        dispatch(setInfoBtn(info))
   }
   
  if (Object.keys(playlist).length === 0 || !playlist.public || playlist.owner?.display_name === 'Spotify') return null

  return (
    <>
    <div >
        <Box mr={5}>
            <Card onMouseEnter={() => (setHovered({hovered: true, id: playlist?.id ?? ''}))} onMouseLeave={() => (setHovered({hovered: false, id: playlist?.id ?? ''}))} elevation={0} sx={{ minHeight: '200', width: 200 }}>
                <CardActionArea>
                    <Link to={`/home/playlist?id=${playlist?.id}`}>
                        <CardMedia
                            component="img"
                            image={playlist?.images && playlist?.images[0].url}
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
                        hovered.hovered && hovered.id === playlist.id ?
                        <div onClick={() => songData(playlist)} style={{position: 'absolute', right: 0, top: '40%'}}>
                            <BtnPlay info={{type: playlist?.type ?? '' , uri: playlist?.uri ?? '', name: playlist.name}} ids={playlist.id} offset={0} uris={playlist?.uri ?? ''}/>
                        </div>
                        : null 
                    }                                        
                        </motion.div>
                    </AnimatePresence>
                    <CardContent>
                        <Typography noWrap variant="subtitle1">
                            <Tooltip title={playlist?.name} placement="bottom">
                                <span>{playlist?.name}</span>
                            </Tooltip>
                        </Typography>
                        <Typography variant='subtitle2' fontSize={12} color='#b7b7b7'>
                        {playlist?.owner?.display_name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    </div>
    </>
    )   
}
