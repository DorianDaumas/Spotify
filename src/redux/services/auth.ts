// import { Dispatch } from '@reduxjs/toolkit';
// import { setToken } from '../slices/auth/authSlice';
import { Base64 } from 'js-base64';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { RootState } from '../store';

const CLIENT_ID = "0c251ac328d64e659011bbf7b516430e"
const REDIRECT_URI = "http://localhost:5174/callback"
const CLIENT_SECRET = "d3bdb77e29c04113bd60052e474a4ce4"

const baseQueryConfig = fetchBaseQuery({ 
    baseUrl: 'https://accounts.spotify.com/',
    prepareHeaders: (headers) => {
        headers.set('content-Type', 'application/x-www-form-urlencoded');
        headers.set('Authorization', `Basic ${Base64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`)}`);
        return headers;
    },
  })

  export const getToken = createApi({
    reducerPath: 'getToken',
    baseQuery: baseQueryConfig,
    tagTypes: ['Token'],
    endpoints: (builder) => ({
      getToken: builder.query({ 
        query: (spotifyToken) => ({
          method: 'POST',
          url: 'api/token',
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: spotifyToken,
            redirect_uri: REDIRECT_URI,
          }).toString(),
        }),
        providesTags: ['Token'],
      }),
    }),
  })
  
  export const callRefreshToken = createApi({
    reducerPath: 'callRefreshToken',
    baseQuery: baseQueryConfig,
    tagTypes: ['RefreshToken'],
    endpoints: (builder) => ({
      postRefreshToken: builder.query({ 
        query: (refreshSpotifyToken) => ({
          method: 'POST',
          url: 'api/token',
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshSpotifyToken,
            client_id: CLIENT_ID,
          }).toString(),
        }),
        providesTags: ['RefreshToken'],
      }),
    }),
  })

  export const refreshSpotifyToken = async (refreshToken: string) => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Base64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
      }),
      cache: "no-cache"
    });
    const data = await response.json();
    window.localStorage.setItem("token", data.access_token);
    window.location.reload()
    return data
  }
  
export const { useGetTokenQuery } = getToken;
export const { usePostRefreshTokenQuery } = callRefreshToken;
  
// export const spotifyToken = async (spotifyToken: string, dispatch: Dispatch) => {
//     const response = await fetch('https://accounts.spotify.com/api/token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': 'Basic ' + Base64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`)
//       },
//       body: `grant_type=authorization_code&code=${spotifyToken}&redirect_uri=${REDIRECT_URI}`,
//     });
    
//     const data = await response.json();
//     if (data.access_token) {
//       dispatch(setToken(data.access_token));
//       return data.access_token;
//     }
//     throw new Error('Failed to refresh token');
// }; 

// export const refreshSpotifyToken = async (refreshToken: string, dispatch: Dispatch) => {
//   const response = await fetch('https://accounts.spotify.com/api/token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: new URLSearchParams({
//       grant_type: 'refresh_token',
//       refresh_token: refreshToken,
//       client_id: CLIENT_ID,
//     }),
//   });
  
//   const data = await response.json();
//   if (data.access_token) {
//     dispatch(setToken(data.access_token));
//     return data.access_token;
//   }
//   throw new Error('Failed to refresh token');
// }; 