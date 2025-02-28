import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store"
import { List, Tooltip, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, ListSubheader } from "@mui/material"
import { Link } from "react-router"
import { CurrentQueueItem } from '../../redux/slices/player/playerQueue.interface';
import { formatArtistIds } from '../../utils/formatArtistIds';
// import { CurrentQueueItem } from '../../redux/slices/player/playerQueue.interface';

export const PlayerQueue = () => {
    const currentSong = useSelector((state: RootState) => state.playerQueue.currently_playing)
    const currentQueue = useSelector((state: RootState) => state.playerQueue.queue)

    const cleanedArray = currentQueue.reduce((accumulateur: CurrentQueueItem[], element) => {
        if (!accumulateur.find((item: CurrentQueueItem) => item.name === element.name)) {
          accumulateur.push(element);
        }
        return accumulateur.filter((acc) => acc.name !== currentSong?.name);
      }, []);
      
    return (
    <>
    <List>
        <ListSubheader sx={{background: 'transparent'}}><Typography variant="subtitle1" color="white" fontWeight={'medium'}>Titre en cours de lecture :</Typography></ListSubheader>
    </List>
    <List sx={{overflow: 'auto', ml: 1}} disablePadding>
        <Tooltip title={currentSong?.name} placement="right">
            <ListItem disablePadding>
                <ListItemButton sx={{padding: '5px 0px 5px 15px'}}>
                    <ListItemIcon>
                        <img style={{marginLeft: '-6px', borderRadius: 5}} width={53} height={53} src={currentSong?.album.images[0].url}/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography fontWeight={'medium'} noWrap>{currentSong?.name}</Typography>
                        <Link className="track-link" to={`/home/artist?id=${currentSong?.artists[0].id}`}>
                            <Typography variant="body1" fontSize={14} style={{textTransform: 'capitalize'}} color="#dedede" noWrap>{currentSong?.artists[0].name}</Typography>
                        </Link>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
        </Tooltip>
    
    </List>
    <List>
        <ListSubheader sx={{background: 'transparent'}}><Typography variant="subtitle1" color="white" fontWeight={'medium'}>À suivre :</Typography></ListSubheader>
    </List>
    <List sx={{overflow: 'auto', ml: 1}} disablePadding>
        {cleanedArray?.map((item, index) => (
            <Link className="track-link" to={`/home/track?id=${item.id}&band=${item.artists[0].name}&title=${item.name}&artistId=${item.artists[0].id}&artistIds=${formatArtistIds(item.artists)}`}>
                <Tooltip key={index} title={item.name} placement="left">
                    <ListItem style={{marginRight: 5}} disablePadding>
                        <ListItemButton sx={{padding: '5px 0px 5px 15px'}}>
                            <ListItemIcon>
                                <img style={{marginLeft: '-6px', borderRadius: 5}} width={45} height={45} src={item.album.images[0].url}/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography fontWeight={'medium'} noWrap>{item.name}</Typography>
                                
                                    <Typography variant="body1" fontSize={13} style={{textTransform: 'capitalize'}} color="#dedede" noWrap>{item.artists[0].name}</Typography>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </Tooltip>
            </Link>

        ))}
    </List>
    </>)
}
