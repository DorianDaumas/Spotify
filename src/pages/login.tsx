import Typography from '@mui/material/Typography';

import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import Box from "@mui/material/Box"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { clearToken } from "../redux/slices/auth/authSlice"
import { Button, Stack } from "@mui/material"

export const Login = () => {
    const dispatch = useDispatch()
    const token = window.localStorage.getItem("token")
    useEffect(() => {
        if (!token) {
            dispatch(clearToken())            
        }
        const body = document.getElementsByTagName('body')[0];
        body.style.background = "radial-gradient(at 50% 50%, hsla(129.5, 100%, 16.1%, 0.5), hsl(220, 30%, 5%))"
    }, [])
    
    const CLIENT_ID = import.meta.env.VITE_CLIENT_ID 
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI
    const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT
    const SCOPE = [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-library-read',
        'user-library-modify',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
        'user-top-read',
        'playlist-modify-public',
        'playlist-modify-private',
    ]
    const STATE = Math.random().toString(36).substr(2, 16)

    const handleLogin = () => {
        window.location.href = `${AUTH_ENDPOINT}?${new URLSearchParams({
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            response_type: 'code',
            scope: SCOPE.join(' '),
            state: STATE
        }).toString()}`
    }

    const items = [
        {
          icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary' }} />,
          title: 'Spotify',
          description:
            "Cette application utilise l'API de Spotify et les informations liée au compte connecté (Utilisateur, playlist, album etc).",
        },
        {
          icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
          title: 'Technologie',
          description:
            'Créer avec React, son écosystème et Material UI.',
        },
        {
          icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
          title: 'Experience utilisateur',
          description:
            'Interface intuitive et facile à utiliser.',
        },
        {
          icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
          title: 'Fonctionnalitée',
          description:
            "Les fonctionnalitées principales que propose Spotify et d'autre à venir",
        },
      ];
      

    return (
        <div style={{position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'}}>
        <Stack
            direction="column"
            component="main"
            sx={[
            {
                justifyContent: 'center',
                height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
                marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
                minHeight: '100%',
            },
            () => ({
                '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                zIndex: -1,
                inset: 0,
                background:'#0000001c',
                borderRadius:'10px',
                },
            }),
            ]}
        >
            <Stack
            direction={{md: 'column-reverse'}}
            sx={{
                justifyContent: 'center',
                gap: { xs: 6, sm: 12 },
                p: 2,
                mx: 'auto',
            }}
            >
            <Stack
                direction={{ md: 'column-reverse' }}
                sx={{
                justifyContent: 'center',
                gap: { xs: 6, sm: 12 },
                p: { xs: 2, sm: 4 },
                m: 'auto',
                }}
            >
             <Stack
                sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
                >
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {/* <SitemarkIcon /> */}
                </Box>
                {items.map((item, index) => (
                    <Stack key={index} direction="row" sx={{ gap: 2 }}>
                    {item.icon}
                    <div>
                        <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                        {item.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {item.description}
                        </Typography>
                    </div>
                    </Stack>
                ))}
                </Stack>
                <div style={{margin: 'auto'}}>
                    <Button onClick={handleLogin} color='primary' variant="outlined">Connexion à Spotify</Button>
                </div>
                
            </Stack>
            </Stack>
        </Stack>
        </div>
    )
}
