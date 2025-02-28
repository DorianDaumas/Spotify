import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import type { AlbumDetailsType } from "../../redux/slices/album/album.interface";
import { useEffect, useState } from "react";
import { getImageGradient } from "../../utils/getBackgroundColor";
import Typography from "@mui/material/Typography";
import { convertDateReturnYears } from '../../utils/convertDate';
import { Link } from "react-router";

export const AlbumHeader = (props: AlbumDetailsType) => {
    const [backgroundGradient, setBackgroundGradient] = useState<string>('');
    const imageUrl = props.images[2].url;
  
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
    <div style={{display: 'flex', alignItems: 'end', flexWrap: "wrap", marginLeft: '40px', marginTop: '75px'}}>
      <Card elevation={0} sx={{ maxWidth: 240, minWidth: 240, borderRadius: 5 }}>
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
      <div style={{marginLeft: '20px'}}>
        <Typography variant='subtitle1' fontWeight={'medium'}>Album</Typography>
        <Typography variant='h2' fontWeight={'bold'}>{props?.name}</Typography>
        <div style={{display: 'flex', alignItems: 'center'}}>
          {props?.artists.map((artist, index) => (
            <Link key={index} to={`/home/artist?id=${artist.id}`}>
              <Typography variant='subtitle1'>{artist.name} {index < props.artists.length - 1 ? ', ' : ' '}&nbsp;  </Typography>
            </Link>
          ))}
          <span>&nbsp;• {convertDateReturnYears(props?.release_date)} • {props?.total_tracks} Titres</span>
        </div>
      </div>      
    </div>
  </div>
  )
}
