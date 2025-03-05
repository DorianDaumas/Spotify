import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { PlaylistDetails } from '../interfaces/playlist/playlist.interface'
import type { RootState } from '../store'
import { RootArtistDetail } from '../interfaces/artist/artist.interface';
import { RootTopTrack } from '../interfaces/artist/artistTopTracks.interface';
import { Discographie } from '../interfaces/artist/artistDiscographie.interface';
import { AlbumTracks } from '../interfaces/artist/albumTracks.interface';
import type { AlbumDetailsType } from '../interfaces/album/album.interface';
import { TrackDetails } from '../interfaces/track/trackDetails.interface';
import { Lyrics } from '../slices/track/trackLyricsSlice';
import { UserSavedTracks } from '../interfaces/user/userSavedTracks.interface';
import { UserSavedAlbums} from '../interfaces/user/userSavedAlbums.interface';
import { UserProfil } from '../interfaces/user/userProfil.interface';
import { RootAlbumsNewReleases } from '../interfaces/album/albumNewReleases.interface';
import { RootSearchPopularPlaylist } from '../interfaces/search/searchPopularPlaylist.interface';
import { RootGlobalSearch } from '../interfaces/search/searchGlobal.interface';
import { refreshSpotifyToken } from './auth';
import { clearToken } from '../slices/auth/authSlice';
import { UserPlaylist } from '../interfaces/user/userPlaylist.interface';
import { RootDevice } from '../slices/player/playerDeviceSlice';
import { RootUserTopArtist } from '../interfaces/user/userTopArtist.interface';
import { RootUserTopTrack } from '../interfaces/user/userTopTrack.interface';
import { RootRecommendationByGenre } from '../interfaces/recommendationByGenre.interface';
import { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query';
import { RootPlayerState } from '../interfaces/player/playbackState.interface';
import { RootStartPlayer } from '../interfaces/player/startPlayback.interface';
import { RootQueue } from '../interfaces/player/playerQueue.interface';
import { RootCurrentPlayingTrack } from '../interfaces/player/currentPlayingTrack.interface';

const baseQueryConfig = fetchBaseQuery({
  baseUrl: 'https://api.spotify.com/v1/',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
})

const baseQueryConfigLyrics = fetchBaseQuery({
  baseUrl: 'https://api.lyrics.ovh/v1/',
  prepareHeaders: (headers) => {
    return headers;
  },
})

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: { shout?: boolean } = {}
) => {
  let result = await baseQueryConfig(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    if (refreshToken) {
      try {
        const newToken = await (refreshSpotifyToken(refreshToken));
        if (newToken) {
          result = await baseQueryConfig(args, api, extraOptions);
        }
      } catch {
        api.dispatch(clearToken());
      }
    }
  }
  return result;
};

export const fetchPlaylist = createApi({
  reducerPath: 'fetchPlaylist',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Playlist'],
  endpoints: (builder) => ({
    getPlaylistDetails: builder.query<PlaylistDetails, string>({
      query: (playlist_id) => `playlists/${playlist_id}`,
      providesTags: ['Playlist'],
    }),
  }),
})

export const getArtistInfo = createApi({
  reducerPath: 'getArtistInfo',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Artist', 'ArtistTopTracks', 'ArtistAlbum'],
  endpoints: (builder) => ({
    getArtistDetails: builder.query<RootArtistDetail, string>({
      query: (artist_id) => `artists?ids=${artist_id}`,
      providesTags: ['Artist'],
    }),
    getArtistTopTracks: builder.query<RootTopTrack, string>({
      query: (artist_id) => `artists/${artist_id}/top-tracks`,
      providesTags: ['ArtistTopTracks'],
    }),
    getArtistAlbums: builder.query<Discographie, { artist_id: string; sort: string }>({
      query: ({ artist_id, sort }) => `artists/${artist_id}/albums?include_groups=${sort}`,
      providesTags: ['ArtistAlbum'],
    }),
  }),
})

export const getAlbumInfo = createApi({
  reducerPath: 'getAlbumInfo',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Album', 'AlbumTracks', 'AlbumsNewReleases'],
  endpoints: (builder) => ({
    getAlbumsDetails: builder.query<AlbumDetailsType, string>({
      query: (album_id) => `albums/${album_id}`,
      providesTags: ['Album'],
    }),
    getAlbumTracks: builder.query<AlbumTracks, string>({
      query: (album_id) => `albums/${album_id}/tracks`,
      providesTags: ['AlbumTracks'],
    }),
    getAlbumsNewReleases: builder.query<RootAlbumsNewReleases, void>({
      query: () => `browse/new-releases`,
      providesTags: ['AlbumsNewReleases'],
    }),
  }),
})

export const tracksInfo = createApi({
  reducerPath: 'tracksInfo',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Track', 'SavedTracks'],
  endpoints: (builder) => ({
    getTrackDetails: builder.query<TrackDetails, string>({
      query: (tracks_id) => `tracks/${tracks_id}`,
      providesTags: ['Track'],
    }),
    getMySavedTracks: builder.query<TrackDetails, string>({
      query: () => `me/tracks`,
      providesTags: ['SavedTracks'],
    }),
  }),
})

export const tracksLyrics = createApi({
  reducerPath: 'tracksLyrics',
  baseQuery: baseQueryConfigLyrics,
  tagTypes: ['TrackLyrics'],
  endpoints: (builder) => ({
    getTrackLyrics: builder.query<Lyrics, {track_band: string, track_name: string}>({
      query: ({track_band, track_name}) => `${track_band}/${track_name}`,
      providesTags: ['TrackLyrics'],
    }),
  }),
})

export const search = createApi({
  reducerPath: 'search',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['GlobalSearch', 'SearchPopularPlaylist', 'recommendationByGenre'],
  endpoints: (builder) => ({
    getPopularPlaylist: builder.query<RootSearchPopularPlaylist, void>({
      query: () => `search?q=popular+2025+top+hits&type=playlist&limit=20&offset=2`,
      providesTags: ['SearchPopularPlaylist'],
    }),
    getRecommendationOnGenre: builder.query<RootRecommendationByGenre, void>({
      query: () => `search?q=genre:metal&type=track&limit=8`,
      providesTags: ['recommendationByGenre'],
    }),
    getGlobalSearch: builder.query<RootGlobalSearch, string>({
      query: (search) => `search?q=${search}&type=artist,album,playlist,track&market=NO&limit=5`,
      providesTags: ['GlobalSearch'],
    }),
  }),
})

export const userInfos = createApi({
  reducerPath: 'userInfos',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['userSavedTracks',
    'userSavedAlbums',
    'userPlaylist',
    'userProfil',
    'userTopArtist',
    'userTopTrack',
    'userSaveAlbums',
    'userRemoveAlbums',
    'checkSaveAlbum',
    'userSaveTrack',
    'userRemoveTracks',
    'checkSaveTrack',
    'userSavePlaylist',
    'userRemovePlaylist',
    'checkSavePlaylist'
  ],
  endpoints: (builder) => ({
    getUserSavedTracks: builder.query<UserSavedTracks, void>({
      query: () => `me/tracks`,
      providesTags: ['userSavedTracks'],
    }),
    getUserProfil: builder.query<UserProfil, void>({
      query: () => `me`,
      providesTags: ['userProfil'],
    }),
    getUserSaveAlbums: builder.query<UserSavedAlbums, void>({
      query: () => `me/albums?limit=50`,
      providesTags: ['userSavedAlbums'],
    }),
    getUserPlaylist: builder.query<UserPlaylist, string>({
      query: (user_id) => `users/${user_id}/playlists`,
      providesTags: ['userPlaylist'],
    }),
    getUserTopArtist: builder.query<RootUserTopArtist, void>({
      query: () => `me/top/artists?limit=5`,
      providesTags: ['userTopArtist'],
    }),
    getUserTopTrack: builder.query<RootUserTopTrack, void>({
      query: () => `me/top/tracks?limit=8`,
      providesTags: ['userTopTrack'],
    }),
    saveAlbums: builder.mutation<string, { id: string; data: string[] }>({
      query: ({ id, data }) => ({
        url: `me/albums?ids=${id}`,
        method: 'PUT',
        body: data,
        providesTags: ['userSaveAlbums'],
      }),
    }),
    deleteAlbums: builder.mutation<string, { id: string; data: string[] }>({
      query: ({ id, data }) => ({
        url: `me/albums?ids=${id}`,
        method: 'DELETE',
        body: data,
        providesTags: ['userRemoveAlbums'],
      }),
    }),
    checkIsSavedAlbum: builder.query<string, string>({
      query: (id) => `me/albums/contains?ids=${id}`,
      providesTags: ['checkSaveAlbum'],
    }),
    saveTracks: builder.mutation<string, { id: string; data: string[] }>({
      query: ({ id, data }) => ({
        url: `me/tracks?ids=${id}`,
        method: 'PUT',
        body: data,
        providesTags: ['userSaveTrack'],
      }),
    }),
    deleteTracks: builder.mutation<string, { id: string; data: string[] }>({
      query: ({ id, data }) => ({
        url: `me/tracks?ids=${id}`,
        method: 'DELETE',
        body: data,
        providesTags: ['userRemoveTracks'],
      }),
    }),
    checkIsSavedTrack: builder.query<string, string>({
      query: (id) => `me/tracks/contains?ids=${id}`,
      providesTags: ['checkSaveTrack'],
    }),
    savePlaylist: builder.mutation<string, { id: string; data: boolean }>({
      query: ({ id, data }) => ({
        url: `playlists/${id}/followers`,
        method: 'PUT',
        body: data,
        providesTags: ['userSavePlaylist'],
      }),
    }),
    deletePlaylist: builder.mutation<string, { id: string; data: boolean }>({
      query: ({ id, data }) => ({
        url: `playlists/${id}/followers`,
        method: 'DELETE',
        body: data,
        providesTags: ['userRemovePlaylist'],
      }),
    }),
    checkIsSavedPlaylist: builder.query<string, string>({
      query: (id) => `playlists/${id}/followers/contains`,
      providesTags: ['checkSavePlaylist'],
    }),
  }),
})

interface state {
  state: boolean,
  device_id: string
}
export const playerData = createApi({
  reducerPath: 'playerData',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['shuffleQueue', 'getDevice', 'getPlayerState', 'startPlayback', 'resumePlayback', 'seekPositionPlayback', 'playerQueue', 'repeatMode', 'pausePlayback', 'currentTrack', 'nextTrackPlayback', 'prevTrackPlayback', 'volumePlayback'],
  endpoints: (builder) => ({
    getdevice: builder.query<RootDevice , void>({
      query: () => `me/player/devices`,
      providesTags: ['getDevice'],
    }),
    getPlaybackState: builder.query<RootPlayerState , void>({
      query: () => `me/player`,
      providesTags: ['getPlayerState'],
    }),
    startPlayback: builder.mutation<string, { data: RootStartPlayer, device_id: string }>({
      query: ({ data, device_id }) => ({
        url: `me/player/play?device_id=${device_id}`,
        method: 'PUT',
        body: data,
        providesTags: ['startPlayback'],
      }),
    }),
    resumePlayback: builder.mutation<string, { data: RootStartPlayer, device_id: string }>({
      query: ({ data, device_id }) => ({
        url: `me/player/play?device_id=${device_id}`,
        method: 'PUT',
        body: data,
        providesTags: ['resumePlayback'],
      }),
    }),
    pausePlayback: builder.mutation<string, { device_id: string }>({
      query: ({ device_id }) => ({
        url: `me/player/pause?device_id=${device_id}`,
        method: 'PUT',
        providesTags: ['pausePlayback'],
      }),
    }),
    nextTrackPlayback: builder.mutation<string, { device_id: string }>({
      query: ({ device_id }) => ({
        url: `me/player/next?device_id=${device_id}`,
        method: 'POST',
        providesTags: ['nextTrackPlayback'],
      }),
    }),
    prevTrackPlayback: builder.mutation<string, { device_id: string }>({
      query: ({ device_id }) => ({
        url: `me/player/previous?device_id=${device_id}`,
        method: 'POST',
        providesTags: ['prevTrackPlayback'],
      }),
    }),
    volumePlayback: builder.mutation<string, { device_id: string, volume_percent: number }>({
      query: ({ device_id, volume_percent }) => ({
        url: `me/player/volume?device_id=${device_id}&volume_percent=${volume_percent}`,
        method: 'PUT',
        providesTags: ['volumePlayback'],
      }),
    }),
    seekPositionPlayback: builder.mutation<string, { device_id: string, timerTrack: number }>({
      query: ({ device_id, timerTrack }) => ({
        url: `me/player/seek?device_id=${device_id}&position_ms=${timerTrack}`,
        method: 'PUT',
        providesTags: ['seekPositionPlayback'],
      }),
    }),
    getPlayerQueue: builder.query<RootQueue , void>({
      query: () => `me/player/queue`,
      providesTags: ['playerQueue'],
    }),
    getCurrentPlayingTrack: builder.query<RootCurrentPlayingTrack , void>({
      query: () => `me/player/currently-playing`,
      providesTags: ['currentTrack'],
    }),
    shuffleQueue: builder.query<state, state>({
      query: (shuffle) => ({
        url: `me/player/shuffle?state=${shuffle.state}&device_id=${shuffle.device_id}`,
        method: 'PUT',
      }),
      providesTags: ['shuffleQueue'],
    }),
    repeatMode: builder.query<string, { device_id: string, repeat: string }>({
      query: ({device_id, repeat}) => ({
        url: `me/player/repeat?state=${repeat}&device_id=${device_id}`,
        method: 'PUT',
      }),
      providesTags: ['repeatMode'],
    }),
  }),
})


export const {
  useGetUserSavedTracksQuery,
  useGetUserProfilQuery,
  useGetUserSaveAlbumsQuery,
  useGetUserPlaylistQuery,
  useGetUserTopArtistQuery,
  useGetUserTopTrackQuery,
  useSaveAlbumsMutation,
  useLazyCheckIsSavedAlbumQuery,
  useDeleteAlbumsMutation,
  useLazyCheckIsSavedTrackQuery,
  useDeleteTracksMutation,
  useSaveTracksMutation,
  useSavePlaylistMutation,
  useDeletePlaylistMutation,
  useLazyCheckIsSavedPlaylistQuery
  } = userInfos
export const { useGetPopularPlaylistQuery, useGetRecommendationOnGenreQuery, useGetGlobalSearchQuery } = search
export const { useShuffleQueueQuery, 
  useGetdeviceQuery, 
  useGetPlaybackStateQuery, 
  useStartPlaybackMutation, 
  useGetPlayerQueueQuery, 
  usePausePlaybackMutation,
  useGetCurrentPlayingTrackQuery,
  useNextTrackPlaybackMutation,
  usePrevTrackPlaybackMutation,
  useVolumePlaybackMutation,
  useSeekPositionPlaybackMutation,
  useRepeatModeQuery
} = playerData
export const { useGetTrackLyricsQuery } = tracksLyrics
export const { useGetTrackDetailsQuery } = tracksInfo
export const { useGetPlaylistDetailsQuery } = fetchPlaylist
export const { useGetAlbumsDetailsQuery, useGetAlbumTracksQuery, useGetAlbumsNewReleasesQuery } = getAlbumInfo
export const { useGetArtistDetailsQuery, useGetArtistTopTracksQuery, useGetArtistAlbumsQuery } = getArtistInfo
