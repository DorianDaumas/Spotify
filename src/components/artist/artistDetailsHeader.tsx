import { useEffect, useState } from "react";
import { getImageGradient } from "../../utils/getBackgroundColor";
import { RootArtistDetail } from "../../redux/slices/artist/artist.interface";
import { Box, Card, CardActionArea, CardMedia, Typography } from "@mui/material";

export const ArtistHeader = (props: RootArtistDetail) => {
    const [backgroundGradient, setBackgroundGradient] = useState<string>('');
    const imageUrl = props.artists[0].images[2].url;
     
    useEffect(() => {
      getImageGradient(imageUrl, (gradient) => {        
        setBackgroundGradient(gradient);
      });
    }, [imageUrl]);
  return (
    <Box sx={{ flexGrow: 1 }} 
      style={{
        background: backgroundGradient, 
        minHeight: '300px',
        paddingLeft: '40px',
        paddingTop: '75px',
        padding: '20px',
      }} 
      className="header-playlist"
  >
    <div style={{ 
        marginLeft: '40px',
        marginTop: '75px',
        display: 'flex',
        alignItems: 'end',
      }}>   
        <Card sx={{ maxWidth: 240, minWidth: 240, borderRadius: 50 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="250"
                    style={{borderRadius: 20}}
                    image={props?.artists[0].images[0].url}
                    alt="poster playlist"
                />
            </CardActionArea>
        </Card>

        <div style={{ marginLeft: '20px'}}>
          <Typography variant='subtitle1' fontWeight={'medium'}>Artist</Typography>
          <Typography variant='h2' fontWeight={'bold'}>{props?.artists[0].name}</Typography>
          <Typography variant='subtitle1' fontWeight={'medium'}>{props.artists[0].followers.total.toLocaleString()} Followers</Typography>
          <div style={{display: 'flex', alignItems: 'center'}}>
          </div>
        </div>
      </div> 

  </Box>
  )
}
