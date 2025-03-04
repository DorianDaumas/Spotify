import Box from '@mui/material/Box';
import { PlaylistPopular } from '../components/playlist/playlistPopular';
import { AlbumsNewRelease } from '../components/Album/albumsNewRelease';
import { ArtistPopular } from '../components/artist/artistPopular';
import { UserTopArtists } from '../components/user/userTopArtists';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../redux/store';
import { getImageGradient } from '../utils/getBackgroundColor';
import { AnimatePresence, motion } from 'framer-motion';
import { UserRecommendedTracks } from '../components/user/userRecommendedTracks';

export default function DashboardPage() {
    const imageUrl = useSelector((state: RootState) => state.hoveredImage.image);
    const [backgroundGradient, setBackgroundGradient] = useState<string>('linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(6, 255, 173, .5) 100%)');
    useEffect(() => {
      getImageGradient(imageUrl, (gradient) => {        
        setBackgroundGradient(gradient);
      });
    }, [imageUrl]);
    
    return <>
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ background: backgroundGradient }}
                animate={{ background: backgroundGradient }}
                exit={{ background: backgroundGradient }}
                transition={{ duration: .3 }}>
                <Box >
                    <UserRecommendedTracks/>
                </Box>
            </motion.div>
        </AnimatePresence>

        <Box>
            <UserTopArtists/>
        </Box>
        <Box>
            <PlaylistPopular/>
        </Box>
        <Box>
            <ArtistPopular/>
        </Box>
        <Box>
            <AlbumsNewRelease/>
        </Box>
    </>
}

