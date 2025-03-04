import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { useGetArtistAlbumsQuery } from "../../redux/services/spotifyApi";
import { AlbumTracks } from "../../components/Album/AlbumTracks";
import { Typography } from "@mui/material";
import { convertDateReturnYears } from '../../utils/convertDate';
import { Link } from 'react-router';
import { BtnPlay } from "../../components/player/btnPlay";

export const ArtistDiscographieAll = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const artistId = urlParams.get('id') ?? '';
    const sort = urlParams.get('sort') ?? '';
        
    const { data: discographieData, isLoading: isLoadingDiscographie } = useGetArtistAlbumsQuery({
        artist_id: artistId, 
        sort: sort
    });


    if (isLoadingDiscographie) return (
        <div style={{height: '100vh'}}>
            <div className="center-absolute">
                <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <CircularProgress size={100} color="success" />
                </Stack>
            </div>
        </div>
    );
    if (!discographieData) return null;

    // const allUris = [...discographieData.items.map((el) => el.uri)] 
    console.log();
    
    return (
        <div style={{margin: 40}}>
            <Typography variant="subtitle1" fontWeight={'medium'}>{discographieData.items[0].artists[0].name}</Typography>
            <br></br>
            {discographieData?.items.map((album) => (
                <div key={album.id}>
                    <div>
                        <div style={{display: 'flex'}}>
                            <div>
                                <img width="136px" height={136} src={album.images[0].url}/>
                            </div>
                            <div style={{marginLeft: 15}}>
                                <Link replace to={`/home/album?id=${album.id}`}>
                                    <Typography variant="h4" fontWeight={'bold'}>{album.name}</Typography>
                                </Link>
                                <Typography variant="subtitle1" style={{textTransform: "capitalize"}}>{album.album_type} • {convertDateReturnYears(album.release_date)} • {album.total_tracks} titres</Typography>
                                <br></br>
                                <div>
                                    <BtnPlay info={{context_uri: album.uri, uri: album.uri, name: album.name}}/>
                                </div>
                            </div>
                        </div>
                        <AlbumTracks uri={album.uri} albumId={album.id} />
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                </div>
            ))}
        </div>
    );
}
