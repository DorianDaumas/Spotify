import Typography from '@mui/material/Typography';
import { useGetAlbumsNewReleasesQuery } from '../../redux/services/spotifyApi';
import { AlbumNewReleasesList } from './albumNewReleaseList';
import { Link } from 'react-router';
import Skeleton from '@mui/material/Skeleton';

export const AlbumsNewRelease = () => {
    const { data, isLoading, error } = useGetAlbumsNewReleasesQuery();
    
    if (isLoading) return (
        <div className='full-width' style={{marginTop: 50}}>
        <div className='full-width' style={{display: 'flex', overflow: 'auto'}}>
            {Array.from(Array(10)).map((_, index) => (
                <div style={{marginRight: 20}} key={index}>
                  <Skeleton animation="wave" variant="rounded" width={150} height={150} />
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
                <br></br>
                <div className='full-width'>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Typography variant='subtitle1' textAlign={'left'} ml={0}>Les dernières sorties d'albums ❕</Typography>
                        <Link to='/home/popular/albums'>
                            <Typography variant='subtitle1' fontSize={13} fontWeight={'medium'} color='#dedede' textAlign={'left'} ml={0}>Tout afficher</Typography>
                        </Link>
                    </div>
                <br></br>
                <div style={{display: 'flex', overflow: 'auto'}}>
                    {data.albums.items.map((item, index) => (
                    <div key={index}>
                        <AlbumNewReleasesList {...item} />
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </>
    );
}

