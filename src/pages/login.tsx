import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardActions from "@mui/material/CardActions"
import CardMedia from "@mui/material/CardMedia"
import img from '../assets/charts_square_400x400.gif'
import Grid from "@mui/material/Grid2"
import Box from "@mui/material/Box"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { clearToken } from "../redux/slices/auth/authSlice"

export const Login = () => {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(clearToken())
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

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid size={6}>
                    <div className="mask-image">
                        <img src={img}/>
                    </div>
                </Grid>
                <Grid size={6}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://miro.medium.com/v2/resize:fit:1400/1*xlsvfw090Y_ONaPnXJmsTA.png"
                        />
                    </CardActionArea>
                    <CardActions>
                    <button onClick={handleLogin}>Login to Spotify</button>
                    </CardActions>
                </Card>
                </Grid>
            </Grid>
        </Box>
    )
}
