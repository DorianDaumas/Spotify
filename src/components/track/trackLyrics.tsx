import { Stack, CircularProgress, Typography } from "@mui/material";
import { useGetTrackLyricsQuery } from "../../redux/services/spotifyApi";
import { formatText } from "../../utils/formatLyrics";
import { useState, useRef, useEffect } from 'react';

export const TrackLyrics = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const trackBand = urlParams.get('band') ?? '';
    const trackName = urlParams.get('title') ?? '';
    
    const { data, isLoading, error } = useGetTrackLyricsQuery({track_band: trackBand, track_name: trackName})
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState('250px');

    useEffect(() => {
        if (contentRef.current) {
            setMaxHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : '250px');
        }
    }, [isExpanded]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    if (isLoading) return (
        <div className="center-absolute">
            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress size={100} color="success" />
            </Stack>
        </div>
    );
    if (error || !data) return <Typography variant="subtitle1" color="error"><span style={{margin: 'auto 0 auto 0!important'}}>Une erreur est survenu lors du chargements des paroles <br></br>Nous n'avons pas trouvé de parole dans notre base de donnée..</span></Typography>


    return (
        <div>
        <div style={{ maxHeight, overflow: 'hidden', transition: 'max-height 0.5s ease' }}>
            <div ref={contentRef} style={{ whiteSpace: 'pre-wrap', color: '#dededede' }}>
                {formatText(data.lyrics)}
            </div>
        </div>
        <br></br>
        <span style={{cursor: 'pointer'}} onClick={toggleExpand}>
            {isExpanded ? '...Afficher moins' : '...Voir plus'}
        </span>
    </div>

    )
}
