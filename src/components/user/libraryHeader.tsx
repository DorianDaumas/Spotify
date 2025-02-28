import { Avatar, Card, CardActionArea, Typography } from '@mui/material'
import { Link } from 'react-router'
import FavoriteIcon from '@mui/icons-material/Favorite';

export const LibraryHeader = () => {

  return (
    <div 
    style={{
      background: "rgba(80, 56, 160, .8)", 
      minHeight: '300px',
      width: '100%',
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      padding: '20px',
    }} 
    className="header-playlist"
  >
    <div style={{display: 'flex', alignItems: 'end', marginLeft: '40px', flexWrap: "wrap", marginTop: '75px'}}>
      <Card elevation={0} sx={{ maxWidth: 240, minWidth: 240, borderRadius: 5 }}>
          <CardActionArea>
            <Avatar sizes="64px" variant="square" sx={{ width: 240, height: 240,  background: "linear-gradient(342deg, rgb(255, 255, 255) 0%, rgb(78, 28, 240) 70%)" }}>
                <FavoriteIcon sx={{fontSize: '64px', color: "white" }} />
            </Avatar>
          </CardActionArea>
      </Card>
      <div style={{marginLeft: '20px'}}>
        <Typography variant='subtitle1' fontWeight={'medium'}>Playlist</Typography>
        <Typography variant='h2' fontWeight={'bold'}>Titres Likés</Typography>
        <div style={{display: 'flex', flexWrap: "wrap", alignItems: 'center'}}>
            <Link to={`/home/artist?id=`}>
              <Typography variant='subtitle1'> </Typography>
            </Link>
        </div>
      </div>      
    </div>
  </div>
  )
}
