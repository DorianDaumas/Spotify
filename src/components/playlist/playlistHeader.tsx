import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import { PlaylistDetails } from "../../redux/interfaces/playlist/playlist.interface";
import { useEffect, useState } from "react";
import { getImageGradient } from "../../utils/getBackgroundColor";
import { Typography } from "@mui/material";

export const PlaylistHeader = (props: PlaylistDetails) => {
    const [backgroundGradient, setBackgroundGradient] = useState<string>('');
    
    const imageUrl = props?.images[0].url;
  
    useEffect(() => {
      getImageGradient(imageUrl, (gradient) => {        
        setBackgroundGradient(gradient);
      });
    }, [imageUrl]);
  return (
    <div 
      style={{
        background: backgroundGradient, 
        minHeight: '300px',
        width: '100%',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        padding: '20px',
      }} 
      className="header-playlist"
  >
    <div style={{display: 'flex', alignItems: 'end', marginLeft: '40px', flexWrap: "wrap", marginTop: '75px'}}>
      <Card elevation={0} sx={{ maxWidth: 240, minWidth: 240 }}>
          <CardActionArea>
              <CardMedia
                  component="img"
                  height="250"
                  style={{borderRadius: 20}}
                  image={props?.images[0].url}
                  alt="poster playlist"
              />
          </CardActionArea>
      </Card>
      <div style={{marginLeft: '20px', width:'60%'}}>
        <Typography variant='subtitle1' fontWeight={'medium'}>Playlist</Typography>
        <Typography variant='h2' fontWeight={'bold'}>{props?.name}</Typography><br></br>
        <Typography variant='subtitle1'>{props?.description}</Typography>
        <br></br>
        <div style={{display: 'flex', alignItems: 'center'}}>
            
        <Typography variant='subtitle1' fontSize={12} color="#dedede">• {props?.owner.display_name} • {props?.followers.total.toLocaleString()} Sauvegardes • {props?.tracks.total} Titres •</Typography>
        </div>
      </div>      
    </div>
  </div>
  )
}
