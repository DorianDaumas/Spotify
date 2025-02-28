// import { spotifyApi } from "react-spotify-web-playback";
// import { setQueue } from "../redux/slices/player/playerQueueSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../redux/store";

// export async function getMyQueue() {
//     const token = useSelector((state: RootState) => state.auth.token);
//     const dispatch = useDispatch();

//     if (token) {
//       try {
//         const value = await spotifyApi.getQueue(token);
//         const getQueue = value;
//         const queue = {
//           queue: getQueue.queue,
//           currently_playing: getQueue.currently_playing
//         }
        
//         dispatch(setQueue(queue))
//       } catch (error) {
//         console.error("Error getting queue:", error);
//       }
//     }
//   }