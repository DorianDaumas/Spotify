import Card from "@mui/material/Card";
import { Discographie } from "../../redux/interfaces/artist/artistDiscographie.interface"
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";
import { convertDateReturnYears } from '../../utils/convertDate';
import { Link } from 'react-router'
import { AnimatePresence, motion } from "framer-motion";
import { BtnPlay } from "../player/btnPlay";
import { useState } from "react";


export const ArtistDiscographie = (props: Discographie) => {

  const [hovered, setHovered] = useState({
      hovered: false,
      id: ''
  })

  return (
    <div>
      <br></br>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        overflow: 'auto',
        whiteSpace: 'nowrap',
        width: '100%'
      }}>
        {props.items?.map((album, index) => (
              <div style={{width: 180}}>
                <Card onMouseEnter={() => (setHovered({hovered: true, id: album?.id ?? ''}))} onMouseLeave={() => (setHovered({hovered: false, id: album?.id ?? ''}))}
                  sx={{ 
                    width: 180,
                    height: 180,
                    flexShrink: 0 
                  }} 
                  style={{borderRadius: 10}}
                >
                  <CardActionArea>
                    <Link key={index} to={`/home/album?id=${album.id}`}>
                    <CardMedia
                      component="img"
                      image={album.images[0].url}
                      alt="poster album"
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
                        <div style={{position: 'absolute', right: 0, top: '40%'}}>
                            <BtnPlay info={{context_uri: album.uri, uri: album.uri, name: album.name}}/>
                        </div>
                        : null 
                    }                                        
                        </motion.div>
                    </AnimatePresence>
                  </CardActionArea>

                </Card>
                <Typography variant="body1" style={{
                    textTransform: 'capitalize',
                    textWrap: 'wrap',
                    lineHeight: 1.2,
                    marginTop: 7,
                  }}>{album.name}</Typography>
                <Typography variant="subtitle1" style={{textTransform: 'capitalize'}} color="#a4a4a4">{convertDateReturnYears(album.release_date)} - {album.album_type}</Typography>
                  <br></br>
              </div>
        ))}
      </div>
    </div>
  )
}
