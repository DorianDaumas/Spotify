import { Artist } from "../redux/interfaces/playlist/playlist.interface";

export const formatArtistIds = (artists: Artist[]) => {
    const artistIds = artists.map(artist => artist.id);
    return artistIds.join(',');
  }