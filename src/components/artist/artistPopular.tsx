import Typography from '@mui/material/Typography';
import { useGetArtistDetailsQuery } from '../../redux/services/spotifyApi';
import { ArtistPopularList } from './artistPopularList';
import { Link } from 'react-router';
import { Skeleton } from '@mui/material';


export const ArtistPopular = () => {
  const ids = '2YZyLoL8N0Wb9xBt1NhZWg,7tYKF4w9nC0nq9CsPZTHyP,1Xyo4u8uXC1ZmMpatF05PJ,4oUHIQIBe0LHzYfvXNW4QM,6qqNVTkY8uBg9cP3Jd7DAH,74KM79TiuVKeVCqs8QtB0B,1HY2Jd0NmPuamShAr6KMms,06HL4z0CvFAxyc27GXpf02,0du5cEVh5yTK9QJze8zA0C'
  const { data, isLoading, error } = useGetArtistDetailsQuery(ids);
  

  if (isLoading) return (
    <div className='full-width' style={{marginTop: 50}}>
      <div className='full-width' style={{display: 'flex', overflow: 'auto'}}>
          {Array.from(Array(10)).map((_, index) => (
              <div style={{marginRight: 20}} key={index}>
                <Skeleton animation="wave" variant="circular" width={150} height={150} />
                <br></br>
                <Skeleton width={'20%'} variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton width={'50%'} variant="text" sx={{ fontSize: '1rem' }} />
              </div>
          ))}
      </div>
    </div>
  );

  if (error || !data) return null;
  
  return (
    <>
      <div className='full-width'>
        <div className='full-width'>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant='subtitle1' textAlign={'left'} ml={0}>Artistes populaires 🎵</Typography>
            <Link to="/home/popular/artists">
              <Typography variant='subtitle1' fontSize={13} fontWeight={'medium'} color='#dedede' textAlign={'left'} ml={0}>Tout afficher</Typography>
            </Link>
          </div>
          <br></br>
          <div style={{display: 'flex', overflow: 'auto'}}>
            {data.artists.map((item, index) => (
              <div key={index}>
                <ArtistPopularList {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

