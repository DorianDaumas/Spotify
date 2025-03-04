import { Typography, Box, Card, CardActionArea, CardMedia, CardContent, Tooltip } from "@mui/material"
import { Link } from "react-router"
import { Item4 } from "../../redux/interfaces/search/searchGlobal.interface"
import { AnimatePresence, motion } from "framer-motion";
import { BtnPlay } from "../player/btnPlay";
import { useState } from "react";

export const SearchResultPlaylist = (playlist: Item4) => {

    const [hovered, setHovered] = useState({
        hovered: false,
        id: ''
    })

   
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
                        <div style={{position: 'absolute', right: 0, top: '40%'}}>
                            <BtnPlay info={{context_uri: playlist.uri ?? '', uri: playlist.uri ?? '', name: playlist.name ?? ''}}/>
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
