import { Stack, CircularProgress, ListItemIcon, ListItemText, ListItemButton, ListItem, List, Typography, Tooltip } from "@mui/material";
import { Link } from "react-router";

import { useGetUserPlaylistQuery, useGetUserSaveAlbumsQuery } from "../../redux/services/spotifyApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";

export const UserSavedAlbumsPlaylist = ({id, selectedChip}: {id:string, selectedChip:string}) => {
    const { data, isLoading, error, refetch: refetchAlbums } = useGetUserSaveAlbumsQuery()
    const { data: userPlaylist, isLoading: isLoadingUserPlaylist, error: errorUserPlaylist, refetch: refetchPlaylist } = useGetUserPlaylistQuery(id)
    const refreshComponent = useSelector((state: RootState) => state.refreshComponent.refresh);
    
    const albums = data?.items.map((album) => album.album)
    const playlists = userPlaylist?.items.map((playlist) => playlist)

    const mergedArray = [...albums ?? [], ...playlists ?? []];
    
    useEffect(() => {
        refetchAlbums()        
        refetchPlaylist()        
    }, [refreshComponent])
    
    if (isLoading || isLoadingUserPlaylist) return (
        <div className="center-absolute">
            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress size={50} color="success" />
            </Stack>
        </div>
    );

    if (error || errorUserPlaylist) return null


    if (selectedChip === 'Playlists') {
        return <>
            <List disablePadding>
            {userPlaylist?.items.map((item, index) => (
                <Tooltip key={index} title={item.name} placement="right">
                    <Link 
                        className="track-link"
                        key={index} 
                        replace
                        to={`/home/playlist?id=${item.id}`}
                    >
                        <ListItem disablePadding>
                            <ListItemButton sx={{padding: '5px 0px 5px 15px'}}>
                                <ListItemIcon>
                                    <img style={{marginLeft: '-6px'}} width={53} height={53} src={item.images[0].url}/>
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography fontWeight={'medium'} noWrap>{item.name}</Typography>
                                    <Typography variant="body1" fontSize={14} style={{textTransform: 'capitalize'}} color="grey" noWrap>{item.type} • {item.owner.display_name}</Typography>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </Tooltip>
            ))}
            </List>
        </>
    }

    if (selectedChip === 'Albums') {
        return <>
            <List disablePadding>
            {data?.items.map((item, index) => (
                <Tooltip key={index} title={item.album.name} placement="right">
                    <Link 
                        className="track-link"
                        key={index} 
                        replace
                        to={`/home/album?id=${item.album.id}`}
                    >
                        <ListItem disablePadding>
                            <ListItemButton sx={{padding: '5px 0px 5px 15px'}}>
                                <ListItemIcon>
                                    <img style={{marginLeft: '-6px'}} width={53} height={53} src={item.album.images[0].url}/>
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography fontWeight={'medium'} noWrap>{item.album.name}</Typography>
                                    <Typography variant="body1" fontSize={14} style={{textTransform: 'capitalize'}} color="grey" noWrap>{item.album.type} • {item.album.artists[0].name}</Typography>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </Tooltip>
            ))}
            </List>
        </>
    }

    return (<>
        <List disablePadding>
            {mergedArray.map((item, index) => (
                <Tooltip key={index} title={item.name} placement="right">
                    <Link 
                        className="track-link"
                        key={index} 
                        to={item.type === 'playlist' ? `/home/playlist?id=${item.id}` : `/home/album?id=${item.id}`}
                    >
                        <ListItem disablePadding>
                            <ListItemButton sx={{padding: '5px 0px 5px 15px'}}>
                                <ListItemIcon>
                                    <img style={{marginLeft: '-6px'}} width={53} height={53} src={item.images[0].url}/>
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography fontWeight={'medium'} noWrap>{item.name}</Typography>
                                    {
                                        item.type === 'playlist' ?
                                        <Typography variant="body1" fontSize={14} style={{textTransform: 'capitalize'}} color="grey" noWrap>{item.type} • {item.owner.display_name}</Typography>
                                        :
                                        <Typography variant="body1" fontSize={14} style={{textTransform: 'capitalize'}} color="grey" noWrap>{item.type} • {item.artists[0].name}</Typography>
                                    }
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </Tooltip>
            ))}
        </List>
    </>
    )
}
