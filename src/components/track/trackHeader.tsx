import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import { useEffect, useState } from "react";
import { getImageGradient } from "../../utils/getBackgroundColor";
import { TrackDetails } from "../../redux/slices/track/trackDetails.interface";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";
import { convertDateReturnYears } from "../../utils/convertDate";
import { convertirDuree } from '../../utils/covertDuration';

export const TrackHeader = (props: TrackDetails) => {
    const [backgroundGradient, setBackgroundGradient] = useState<string>('');
    
    const imageUrl = props?.album.images[2].url;
  
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
      <Card elevation={0} sx={{ maxWidth: 240, minWidth: 240, borderRadius: 5 }}>
          <CardActionArea>
              <CardMedia
                  component="img"
                  height="250"
                  style={{borderRadius: 20}}
                  image={props?.album.images[0].url}
                  alt="poster playlist"
              />
          </CardActionArea>
      </Card>
      <div style={{marginLeft: '20px'}}>
        <Typography variant='subtitle1' fontWeight={'medium'}>Titre</Typography>
        <Typography variant='h2' fontWeight={'bold'}>{props?.name}</Typography>
        <div style={{display: 'flex', flexWrap: "wrap", alignItems: 'center'}}>
          {props?.artists.map((artist, index) => (
            <Link key={index} to={`/home/artist?id=${artist.id}`}>
              <Typography variant='subtitle1'>{artist.name}{index < props.artists.length - 1 ? ', ' : ' '}&nbsp; </Typography>
            </Link>
          ))}
          <Typography variant="subtitle1" color="#dedede" fontSize={14}>&nbsp;• <Link to={`/home/album?id=${props?.album.id}`}>{props?.album.name}</Link> • {convertDateReturnYears(props?.album.release_date)} • {convertirDuree(props?.duration_ms)} •</Typography>
        </div>
      </div>      
    </div>
  </div>
  )
}
