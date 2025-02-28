import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './assets/index.css'
import App from './App.tsx'
import Layout from './layouts/dashboard.tsx';
import DashboardPage from './pages';
import { Login } from './pages/login.tsx';
import MyPage from './pages/profil.tsx';
import { PlaylistDetail } from './pages/Playlists/playlistDetails.tsx';
import { CallbackLoader } from './components/Home/callbackLoader.tsx';
import { ArtistDetail } from './pages/Artists/artistDetails.tsx';
import { ArtistDiscographieAll } from './pages/Artists/artistDiscographieAll.tsx';
import { AlbumDetails } from './pages/Albums/albumDetails.tsx';
import { TrackDetails } from './pages/Tracks/trackDetails.tsx';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { SearchResult } from './pages/SearchResult/searchResult.tsx';
import { UserLibrary } from './pages/User/userLibrary.tsx';
import { PlaylistPopular } from './pages/Playlists/playlistPopular.tsx';
import { AlbumsPopular } from './pages/Albums/albumsPopular.tsx';
import { ArtistsPopular } from './pages/Artists/artistsPopular.tsx';

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: '',
            Component: DashboardPage,
          },
          {
            path: 'search',
            Component: SearchResult,
          },
          {
            path: 'profil',
            Component: MyPage,
          },
          {
            path: 'playlist',
            Component: PlaylistDetail,
          },
          {
            path: 'popular/playlist',
            Component: PlaylistPopular,
          },
          {
            path: 'artist',
            Component: ArtistDetail,
          },
          {
            path: 'popular/artists',
            Component: ArtistsPopular,
          },
          {
            path: 'discographie',
            Component: ArtistDiscographieAll,
          },
          {
            path: 'album',
            Component: AlbumDetails,
          },
          {
            path: 'popular/albums',
            Component: AlbumsPopular,
          },
          {
            path: 'track',
            Component: TrackDetails,
          },
          {
            path: 'library',
            Component: UserLibrary,
          },
        ],
      },
      {
        path: '/',
        Component: Login,
      },
      {
        path: '/callback',
        Component: CallbackLoader,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
)
