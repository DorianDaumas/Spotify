import { useGetGlobalSearchQuery } from "../../redux/services/spotifyApi";
import { useAppSelector } from "../../redux/store";
import { SearchResultBestResult } from "../../components/search/searchResultBestResult";
import { SearchResultArtist } from "../../components/search/searchResultArtist";
import { SearchResultAlbum } from '../../components/search/searchResultAlbum';
import { SearchResultPlaylist } from '../../components/search/searchResultPlaylist';
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { Stack, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";

export const SearchResult = () => {
    const searchQuery = useAppSelector((state) => state.searchQuery.query);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchQueryFromUrl = urlParams.get('q') ?? '';    
    const shouldFetch = searchQuery.length > 0 || searchQueryFromUrl;
    const [type, setType] = useState('artist,album,playlist,track')

    useEffect(() => {
        if (searchQuery.includes('playlist') || searchQueryFromUrl.includes('playlist')) {
            setType('playlist');
        } else if (searchQuery.includes('album') || searchQueryFromUrl.includes('album')) {
            setType('album');

        } else {
            setType('artist,album,playlist,track');
        }
    }, [searchQuery, searchQueryFromUrl]);

    const { data, isLoading, error } = useGetGlobalSearchQuery(shouldFetch ? searchQuery || searchQueryFromUrl : '', {
        skip: !shouldFetch,
    });

    console.log(data);
    

    if (isLoading) return (
        <div style={{height: '100vh'}}>
            <div className="center-absolute">
                <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <CircularProgress size={100} color="success" />
                </Stack>
            </div>
        </div>
      );
    
      if (error || !data) return null;
    

    return (
        <div style={{margin: '40px 40px 10px 40px', marginLeft: 130, marginRight: 130}}>
            {type === 'playlist' ? 
                <div>
                    {data?.playlists.items[0] && <SearchResultBestResult data={data.playlists.items[0]} type={type} />}
                </div>
            : type === 'album' ?
                <div>
                    {data?.albums.items[0] && <SearchResultBestResult data={data.albums.items[0]} type={type} />}
                </div>
            :
                <div>
                    {data?.artists.items[0] && <SearchResultBestResult data={data.artists.items[0]} type={type} />}
                </div>
            }
            <br></br>
            <br></br>
            <br></br>
            <div>
                {data?.artists && <SearchResultArtist {...data.artists} />}
            </div>
            <br></br>
            <br></br>
            <div>
                {data?.albums && <SearchResultAlbum {...data.albums} />}
            </div>
            <br></br>
            <br></br>
            <div>
                <Typography variant="h5" mb={2}>
                    Playlists
                </Typography>
                <div style={{display: 'flex', flex: 'wrap', width: '100%', overflow: 'auto'}}>
                    {data?.playlists && data?.playlists.items.map((item, index) => (
                        <Grid key={index}>
                            <SearchResultPlaylist {...item} />
                        </Grid>
                    ))}
                </div>
            </div>

        </div>
    )
}
