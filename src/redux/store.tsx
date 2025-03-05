import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { fetchPlaylist, getArtistInfo, getAlbumInfo, tracksInfo, tracksLyrics, userInfos, search, playerData } from './services/spotifyApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authSlice } from './slices/auth/authSlice';
import { getToken, callRefreshToken } from './services/auth';
import { searchQuerySlice } from './slices/search/searchQuerySlice';
import { playerSlice } from './slices/player/playerSice';
import { playerTrackInfoSlice } from './slices/player/playerTracksInfoSlice';
import {playerReady} from './slices/player/playerReady';
import { playerQueueSlice } from './slices/player/playerQueueSlice';
import { playerDeviceSlice } from './slices/player/playerShuffleSlice';
import { getImageHoveredSlice } from './slices/others/getImageHoveredSlice';
import {refreshComponentSlice} from './slices/refreshComponentSlice';
import { playerInfoReadSongSlice } from './slices/player/playerInfoReadSong';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        searchQuery: searchQuerySlice.reducer,
        refreshComponent: refreshComponentSlice.reducer,
        playerInfoReadSong: playerInfoReadSongSlice.reducer,
        hoveredImage: getImageHoveredSlice.reducer,
        player: playerSlice.reducer,
        playerReady: playerReady.reducer,
        playerTrackInfo: playerTrackInfoSlice.reducer,
        playerQueue: playerQueueSlice.reducer,
        playerShuffle: playerDeviceSlice.reducer,
        [playerData.reducerPath]: playerData.reducer,
        [userInfos.reducerPath]: userInfos.reducer,
        [tracksInfo.reducerPath]: tracksInfo.reducer,
        [fetchPlaylist.reducerPath]: fetchPlaylist.reducer,
        [getToken.reducerPath]: getToken.reducer,
        [callRefreshToken.reducerPath]: callRefreshToken.reducer,
        [getArtistInfo.reducerPath]: getArtistInfo.reducer,
        [getAlbumInfo.reducerPath]: getAlbumInfo.reducer,
        [tracksLyrics.reducerPath]: tracksLyrics.reducer,
        [search.reducerPath]: search.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(fetchPlaylist.middleware)
            .concat(getToken.middleware)
            .concat(callRefreshToken.middleware)
            .concat(getArtistInfo.middleware)
            .concat(getAlbumInfo.middleware)
            .concat(tracksInfo.middleware)
            .concat(tracksLyrics.middleware)
            .concat(userInfos.middleware)
            .concat(search.middleware)
            .concat(playerData.middleware)
});

setupListeners(store.dispatch)

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;

export type RootState = ReturnType<typeof store.getState>;