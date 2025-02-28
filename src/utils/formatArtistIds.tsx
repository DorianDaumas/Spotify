import { Artist } from "../redux/slices/playlist/playlist.interface";

export const formatArtistIds = (artists: Artist[]) => {
    const artistIds = artists.map(artist => artist.id);
    return artistIds.join(',');
  }