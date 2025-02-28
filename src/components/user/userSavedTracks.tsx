import { ListItemText, ListItem, List, Typography, ListItemAvatar, Avatar, ListItemButton, Tooltip } from "@mui/material";
import { Link } from "react-router";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useGetUserSavedTracksQuery } from "../../redux/services/spotifyApi";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const UserSavedTracks = () => {
    const { data, refetch } = useGetUserSavedTracksQuery();
    const refreshComponent = useSelector((state: RootState) => state.refreshComponent.refresh);

    useEffect(() => {
        refetch()
    }, [refreshComponent])
    return (
        <List disablePadding>
            <Tooltip title={
                <React.Fragment>
                    <Typography variant="body1" noWrap>Titres likés</Typography>
                    <Typography variant="body1" fontSize={13} style={{textTransform: 'capitalize'}} color="#dedede" noWrap>Playlist • {data?.total} Titres</Typography>
                </React.Fragment>} placement="right">
                    <Link 
                        className="track-link"
                        to={`/home/library`}>
                        <ListItemButton sx={{padding: 0}} component="a" >
                            <ListItem disablePadding sx={{padding: 1, borderRadius: 5}}>
                                <ListItemAvatar>
                                    <Avatar sizes="64px" variant="square" sx={{ width: 53, height: 53,  background: "linear-gradient(342deg, rgb(255, 255, 255) 0%, rgb(78, 28, 240) 70%)" }}>
                                        <FavoriteIcon sx={{fontSize: '24px', color: "white" }} />
                                    </Avatar>
                                </ListItemAvatar>
                                    <ListItemText sx={{ml: 1}}>
                                        <Typography fontWeight={'medium'} noWrap>Titres likés</Typography>
                                        <Typography variant="body1" fontSize={14} style={{textTransform: 'capitalize'}} color="grey" noWrap>Playlist • {data?.total} Titres</Typography>
                                    </ListItemText>
                            </ListItem>
                        </ListItemButton>
                    </Link>
                </Tooltip>
        </List>
    )
}
