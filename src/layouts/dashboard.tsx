import { Outlet, useNavigate, useLocation, Link } from 'react-router';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../redux/slices/auth/authSlice';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useState, useEffect } from 'react';
import { FooterPlayer } from '../components/player/footerPlayer';
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Avatar, Menu, MenuItem, LinearProgress, ListItemButton, Chip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetUserProfilQuery } from '../redux/services/spotifyApi';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Search } from '../components/search/search';
import { UserSavedAlbumsPlaylist } from '../components/user/userSavedAlbumsPlaylists';
import { UserSavedTracks } from '../components/user/userSavedTracks';
import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';
import { Footer } from '../components/footer';
import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded';
import CloseIcon from '@mui/icons-material/Close';
import { PlayerQueue } from '../components/player/playerQueue';
import { setQueue } from '../redux/slices/player/playerQueueSlice';
import { spotifyApi } from 'react-spotify-web-playback';
import { RootState } from '../redux/store';

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state: RootState) => state.auth.token);  
  const [history, setHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { data, isLoading, error } = useGetUserProfilQuery()
  

  useEffect(() => {
    if (`${location.pathname}${location.search}` !== history[currentIndex]) {      
      setHistory(prev => [...prev.slice(0, currentIndex + 1), `${location.pathname}${location.search}`]);
      setCurrentIndex(prev => prev + 1);
    }
  }, [location]);

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      navigate(history[currentIndex - 1]);
    }
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
      navigate(history[currentIndex + 1]);
    }
  };

  const logout = () => {
    dispatch(clearToken());
    navigate("/");
  }

  
 const ToolbarActions = () => {
  if (isLoading) {
    return (
      <LinearProgress></LinearProgress>
    )
  }

  if (error) {
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <ThemeSwitcher/>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <>
                <IconButton
                  {...bindTrigger(popupState)}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-haspopup="true"
                >
                  <Avatar sx={{ width: 55, height: 55, background: '#121212' }} >
                    <Avatar sx={{ width: 38, height: 38 }}></Avatar>
                  </Avatar>
                </IconButton>
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={() => { logout(); popupState.close(); }}><Typography fontSize={14}>Déconnexion</Typography></MenuItem>
                </Menu>
              </>
            )}
          </PopupState> 
        </Box>
      </>
    )
  } 
     
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {/* <ThemeSwitcher/> */}
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <>
              <IconButton
                {...bindTrigger(popupState)}
                size="small"
                sx={{ ml: 2 }}
                aria-haspopup="true"
              >
                <Avatar sx={{ width: 55, height: 55, background: '#121212' }} >
                  <Avatar sx={{ width: 38, height: 38 }} src={data?.images[0].url}></Avatar>
                </Avatar>
              </IconButton>
              <Menu {...bindMenu(popupState)}>
                  <Link to='profil'>              
                    <MenuItem onClick={popupState.close}><Typography fontSize={14}>Profil</Typography></MenuItem>
                  </Link>
                  <Divider></Divider>
                  <MenuItem onClick={() => { logout(); popupState.close(); }}><Typography fontSize={14}>Déconnexion</Typography></MenuItem>
              </Menu>
            </>
          )}
        </PopupState> 
      </Box>

    </>
  )
 }


  const [open, setOpen] = useState(false);

  const [selectedChip, setSelectedChip] = useState<string>('Tout')
  const chooseChip = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, payload: string) => {
      e.stopPropagation();  
      setSelectedChip(payload)
  };

  const DrawerList = (
    <Box 
      sx={{ 
        width: open ? 350 : 72,
        height: 'calc(100% - 76px)',  // Prend toute la hauteur
        display: 'flex',
        flexDirection: 'column',  // Organisation verticale
      }} 
      role="presentation"
    >

      <List sx={{cursor: 'pointer'}} onClick={() => setOpen(!open)}>
        <List>
        <ListItemButton sx={{padding: 0}} component="a" >
          <ListItem disablePadding>
            <ListItem alignItems='center'>
              <ListItemIcon>
                <QueueMusicRoundedIcon style={{fontSize: '30px'}}  />
              </ListItemIcon>
              <ListItemText><Typography noWrap>Bibliothèque</Typography></ListItemText>
            </ListItem>
          </ListItem>
          </ListItemButton>
        </List>

        <div style={{marginLeft: 8}}>
          {
            open ? 
            <Stack direction="row" spacing={1}>
              <Chip label="Tout" color={selectedChip === 'Tout' ? 'success' : 'default'} variant="outlined" onClick={(e) => chooseChip(e, "Tout")} />
              <Chip label="Albums" color={selectedChip === 'Albums' ? 'success' : 'default'} variant="outlined" onClick={(e) => chooseChip(e, "Albums")} />
              <Chip label="Playlists" color={selectedChip === 'Playlists' ? 'success' : 'default'} variant="outlined" onClick={(e) => chooseChip(e, "Playlists")} />
            </Stack>
            :
            null
          }
        </div>
        
      </List>

      <Box sx={{ 
        flexGrow: 1, 
        overflow: 'auto'  
      }}>
        {
          selectedChip !== 'Albums' ?
          <UserSavedTracks />
          : 
          null          
        }
        <UserSavedAlbumsPlaylist selectedChip={selectedChip} id={data?.id ?? ''} />

      </Box>

    </Box>
  );


  function CustomAppTitle() {    
    return (
        <Stack 
          direction="row" 
          alignItems="center"
          justifyContent="space-between"
          spacing={4}
          sx={{ width: '100%', px: 2,
             '& .MuiToolbar-root ': {background: 'black',
              '& .MuiStack-root' : {width: '100%'}
             }}}
        >
          <Stack direction="row" alignItems="center" spacing={1} >
            <div style={{marginLeft: "13px", marginTop: '8px'}}>
              <Link to='/home'>
                <GraphicEqRoundedIcon/>
              </Link>
            </div>
            <IconButton onClick={goBack} disabled={currentIndex <= 0}>
              <ArrowBackIosRoundedIcon />
            </IconButton>
            <IconButton onClick={goForward} disabled={currentIndex >= history.length - 1}>
              <ArrowForwardIosRoundedIcon />
            </IconButton>
          </Stack>

          {/* Center section - Search bar */}
          <Box sx={{ 
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}>
            
          <Search />
  
          </Box>    

          {/* Right section - Theme switcher */}
          <Box>
            <ToolbarActions/>
          </Box>
        </Stack>
    );
  }

  function NoToolBar () {
    return null
  }

  const DrawerList2 = (
    <Box sx={{ width: 400, mt: 18, backgroundColor: "#121212", position: "relative" }} role="presentation">
      <div style={{position: "fixed",
        background: "#121212",
        zIndex: 999,
        top: 66,
        width: "inherit"
      }}>
        <div style={{display: 'flex', alignItems: "center", justifyContent: "space-between", margin: 15}}>
            <Typography variant="subtitle1" color="white" fontWeight={'medium'}>Fille d'attente</Typography>
            <IconButton onClick={() => handleDataFromChild(false)} sx={{mr: 0}}  aria-label="close">
              <CloseIcon>close</CloseIcon>
            </IconButton>
          </div>
          
      </div>
      <PlayerQueue/>
    </Box>
  );

  async function getMyQueue() { // La fonction doit être async
    if (token) {
      try {
        const value = await spotifyApi.getQueue(token); // Attendre la résolution de la promesse
        const getQueue = value;
        const queue = {
          queue: getQueue.queue,
          currently_playing: getQueue.currently_playing
        }
        
        dispatch(setQueue(queue))
      } catch (error) {
        console.error("Error getting queue:", error);
      }
    }
  }

  const [dataFromChild, setDataFromChild] = useState(false);
  const handleDataFromChild = (data: boolean) => {
    setDataFromChild(data);
    getMyQueue();
  };

  return (
    <DashboardLayout 
      hideNavigation
      sx={{'& .MuiAppBar-root': { 
        background: 'black',
        '& .MuiToolbar-root': {
          marginLeft: '-25px',
        }
      }}}
      slots={{
        appTitle: CustomAppTitle,
        toolbarActions: NoToolBar,
      }}
    >

      <Box sx={{ display: 'flex', height: 'calc(100% - 91px)', marginTop: '15px' }}>

        <Drawer
          variant="permanent"
          sx={{
            width: open ? 350 : 72,
            flexShrink: 0,
            position: 'fixed',
            height: 'calc(100% - 155px)',
            '& .MuiDrawer-paper': {
              width: open ? 350 : 72,
              transition: 'width 0.2s ease',
              overflowX: 'hidden',
              backgroundColor: '#121212',
              position: 'static',
              borderRadius: '15px',
              marginLeft: '10px'
            }
          }}
        >
          {DrawerList}
        </Drawer>

        <Box 
          component={motion.div}
          sx={{ 
            flexGrow: 1,
            ml: `${open ? 370 : 92}px`,
            transition: 'margin-left 0.2s ease',
            width: `calc(100% - ${open ? 350 : 72}px)`,
            background: "#121212",
            marginRight: '10px',
            overflow: 'auto',
            borderRadius: '15px'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
              <Footer />
            </motion.div>
          </AnimatePresence>
        </Box>

        <Drawer open={dataFromChild} sx={{'& .MuiDrawer-paperAnchorRight': {
          height: 'calc(100% - 75px)',
          background: "#121212"
        }}}  anchor='right' >
        {DrawerList2}
      </Drawer>
      </Box>
      <FooterPlayer drawer={dataFromChild} toggleDrawer={handleDataFromChild}  />
    </DashboardLayout>
  );
}