import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { getImageGradient } from '../utils/getBackgroundColor';
import { useGetUserProfilQuery } from '../redux/services/spotifyApi';
import { Card, CardActionArea, CardMedia, LinearProgress } from '@mui/material';
import { UserTopArtists } from '../components/user/userTopArtists';

export default function OrdersPage() {
  const [backgroundGradient, setBackgroundGradient] = useState<string>('');
  const { data, isLoading, error } = useGetUserProfilQuery();
  const imageUrl = data?.images[0]?.url;

  useEffect(() => {
    if (imageUrl) {
      getImageGradient(imageUrl, (gradient) => {        
        setBackgroundGradient(gradient);
      });
    }
  }, [imageUrl]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <Typography variant='h6'>Une erreur est survenue lors du chargement de vos données</Typography>;
  }

  return <>
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
      <div style={{display: 'flex', alignItems: 'end', marginLeft: '40px', marginTop: '75px'}}>
        <Card sx={{ maxWidth: 240, minWidth: 240, borderRadius: '50%', boxShadow: "rgb(1, 1, 1) 0px 4px 23px 4px" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="240"
                    style={{borderRadius: '50%'}}
                    image={data?.images[0].url}
                    alt="poster playlist"
                />
            </CardActionArea>
        </Card>
        <div style={{marginLeft: '20px'}}>
          <Typography variant='subtitle1' fontWeight={'medium'}>Profil</Typography>
          <Typography variant='h1' fontWeight={'bold'}>{data?.display_name}</Typography>
        </div>      
      </div>
    </div>
    <br></br>
    <br></br>
    <UserTopArtists/>

  </>
  }