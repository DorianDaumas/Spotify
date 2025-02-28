import { IconButton, Divider, Typography } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export const Footer = () => {
  return (<>
  <div style={{padding: 20}}>
    <footer>
    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: "wrap", padding: '20px'}}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant='subtitle1'>Abonnement</Typography>
        <a className='subtitle-footer-item' style={{fontSize: 14}} href="#">Découvrir</a>
        <a className='subtitle-footer-item' href="#">Gérer mon abonnement</a>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant='subtitle1'>Liens utiles</Typography>
        <a className='subtitle-footer-item' href="#">Aide</a>
        <a className='subtitle-footer-item' href="#">Conditions d'utilisation</a>
        <a className='subtitle-footer-item' href="#">Politique de confidentialité</a>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant='subtitle1'>Communautés</Typography>

        <a className='subtitle-footer-item' href="#">Forums</a>
        <a className='subtitle-footer-item' href="#">Blog</a>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant='subtitle1'>Société</Typography>

        <a className='subtitle-footer-item' href="#">À propos de nous</a>
        <a className='subtitle-footer-item' href="#">Carrières</a>
        <a className='subtitle-footer-item' href="#">Investisseurs</a>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant='subtitle1'>Réseaux sociaux</Typography>

        <div style={{display: 'flex'}}>
          <IconButton href="#" style={{ display: 'flex', alignItems: 'center' }}>
            <FacebookIcon  />
          </IconButton>
          <IconButton href="#" style={{ display: 'flex', alignItems: 'center' }}>
            <TwitterIcon />
          </IconButton>
          <IconButton href="#" style={{ display: 'flex', alignItems: 'center' }}>
            <InstagramIcon />
          </IconButton>
        </div>
      </div>
    </div>
    </footer>
    <Divider variant='middle'></Divider>
    <div>
    <div style={{ display: 'flex', justifyContent: 'start', flexWrap: "wrap", padding: '20px' }}>
      <a className='subtitle-footer-item' href="#">Légal &nbsp;</a>
      <a className='subtitle-footer-item' href="#">Centre de sécurité et de confidentialité &nbsp;</a>
      <a className='subtitle-footer-item' href="#">Protection des données &nbsp;</a>
      <a className='subtitle-footer-item' href="#">Paramètres des cookies &nbsp;</a>
      <a className='subtitle-footer-item' href="#">À propos des pubs &nbsp;</a>
      <a className='subtitle-footer-item' href="#">Accessibilité &nbsp;</a>
    </div>
    </div>
    </div>
    </>
  )
}
