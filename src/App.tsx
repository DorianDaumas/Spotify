import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation } from '@toolpad/core/AppProvider';
import { createTheme, ThemeProvider } from '@mui/material';


const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'home',
    title: 'Accueil',
    icon: <DashboardIcon />,
  },
  {
    segment: 'home/profil',
    title: 'Profil',
    icon: <PersonIcon />,
  },
  {
    kind: 'header',
    title: 'Bibliothèque',
  },
];

const BRANDING = {
  title: 'My music App',
};

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
  
});


export default function App() {
  
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </ReactRouterAppProvider>
  );
}