import CircularProgress from "@mui/material/CircularProgress";
import { useGetArtistAlbumsQuery, useGetArtistDetailsQuery, useGetArtistTopTracksQuery } from "../../redux/services/spotifyApi";
import { ArtistHeader } from "../../components/artist/artistDetailsHeader";
import { ArtistDetailsTopTracks } from "../../components/artist/artistDetailsTopTracks";
import Stack from "@mui/material/Stack";
import { Chip, Typography } from "@mui/material";
import { ArtistDiscographie } from "../../components/artist/artistDiscographie";
import { useState } from "react";
import { Link } from "react-router";
import { BtnPlay } from "../../components/player/btnPlay";
// import { RootDiscographie } from "../../redux/slices/artist/artistDiscographie.interface";

export const ArtistDetail = () => {
    const [selectedChip, setSelectedChip] = useState<string>('album,single')
    const [selectedChipOther, setSelectedChipOther] = useState<string>('appears_on')
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const artistId = urlParams.get('id') ?? '';
    const { data: artistData, isLoading: isLoadingArtist } = useGetArtistDetailsQuery(artistId, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 0,
    });

    const { data: topTracksData, isLoading: isLoadingTracks } = useGetArtistTopTracksQuery(artistId, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 0,
    });

    const { data: discographieData, isLoading: isLoadingDiscographie } = useGetArtistAlbumsQuery({artist_id: artistId, sort: selectedChip}, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 0,
    });

    const { data: discographieDataOther, isLoading: isLoadingDiscographieOther } = useGetArtistAlbumsQuery({artist_id: artistId, sort: selectedChipOther}, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 0,
    });

    const handleClick = (payload: string) => {
        setSelectedChip(payload)
    };

    const handleClickOther = (payload: string) => {
        setSelectedChipOther(payload)
    };

    if (isLoadingArtist || isLoadingTracks || isLoadingDiscographie || isLoadingDiscographieOther) return (
        <div style={{height: '100vh'}}>
            <div className="center-absolute">
                <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <CircularProgress size={100} color="success" />
                </Stack>
            </div>
        </div>
    );
    if (!artistData || !topTracksData || !discographieData || !discographieDataOther) return null;

    
    return (
        <div style={{marginBottom: '100px'}}>
            <div style={{marginBottom: 10}}>
                <ArtistHeader {...artistData} />
            </div>
            <div style={{margin: '40px 80px'}}>
                <BtnPlay info={{type: artistData.artists[0].type, uri: artistData.artists[0].uri}} offset={0} uris={artistData.artists[0].uri}/>
                <ArtistDetailsTopTracks {...topTracksData} />
            </div>
            <div style={{margin: '40px 80px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h5">Discographie</Typography>
                    <Link to={`/home/discographie?id=${artistId}&sort=album,single,appears_on,compilation`}>
                        <Typography variant="subtitle1" style={{marginTop: 6}}>Tout afficher</Typography>                
                    </Link>
                </div>
                <br></br>
                <Stack direction="row" spacing={1}>
                    <Chip label="Sorties populaires" color={selectedChip === 'album,single' ? 'success' : 'default'} variant="outlined" onClick={() => handleClick("album,single")} />
                    <Chip label="Albums" color={selectedChip === 'album' ? 'success' : 'default'} variant="outlined" onClick={() => handleClick("album")} />
                    <Chip label="Singles et EP" color={selectedChip === 'single' ? 'success' : 'default'} variant="outlined" onClick={() => handleClick("single")} />
                </Stack>
                <ArtistDiscographie {...discographieData} />

                <br></br>

                <div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="h5">Apparitions & Compilations</Typography>
                        <Link to={`/home/discographie?id=${artistId}&sort=album,single,appears_on,compilation`}>
                            <Typography variant="subtitle1" style={{marginTop: 6}}>Tout afficher</Typography>                
                        </Link>
                    </div>
                    <br></br>

                <Stack direction="row" spacing={1}>
                    <Chip label="Apparitions" color={selectedChipOther === 'appears_on' ? 'success' : 'default'} variant="outlined" onClick={() => handleClickOther("appears_on")} />
                    <Chip label="Compilations" color={selectedChipOther === 'compilation' ? 'success' : 'default'} variant="outlined" onClick={() => handleClickOther("compilation")} />
                </Stack>
                {
                discographieDataOther?.total === 0 ? 
                <Typography ml={1} mt={2} variant="subtitle1">{artistData?.artists[0].name} n'apparait dans aucune {selectedChipOther}</Typography>
                :
                <ArtistDiscographie {...discographieDataOther} />
                }
                </div>
            </div>
            <br></br>
        </div>
    );
}
