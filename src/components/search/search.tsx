import TextField from "@mui/material/TextField"
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { searchQuery } from "../../redux/slices/search/searchQuerySlice";
import ClearIcon from '@mui/icons-material/Clear';
import { FormControl, IconButton, MenuItem, Select, Typography } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

export const Search = () => {
  const { query } = useAppSelector((state: RootState) => state.searchQuery);
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('artist');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [valueInput, setValueInput] = useState(query);

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(searchQuery(search));
      if (search.length > 0) {       
        navigate(`/home/search?q=${search}`);        
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [search, dispatch, navigate, location.pathname]);

  const handleSearch = (payload: string) => {
    setSearch(payload)
    setValueInput(payload)
  }

  const clearSearch = () => {
    setValueInput('')
  }

  return (
    <div style={{display: "flex", alignItems: "center", maxWidth: '520px', width: '100%'}}>
        <div style={{marginRight: 10}}>
          <Link to='/home'>
            <IconButton color="primary" aria-label="accueil">
              <HomeOutlinedIcon sx={{fontSize: "35px", color: 'white' }} />
            </IconButton>
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%'}}>
          <TextField
          autoFocus={true}
            id="search-input"
            fullWidth
            style={{maxWidth: '500px', width: '100%'}}
            size="small"
            value={valueInput}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Rechercher une chanson, un artiste..."
            InputProps={{
              startAdornment: (
                <FormControl size="small" variant="standard" sx={{ minWidth: 90, marginRight: 1 }}>
                    <Select
                      size="small"
                      id="search-type"
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                    >
                      <MenuItem value="artist"><Typography variant="body1">Artiste</Typography></MenuItem>
                      <MenuItem value="album">Album</MenuItem>
                      <MenuItem value="playlist">Playlist</MenuItem>
                      <MenuItem value="track">Track</MenuItem>
                    </Select>
                </FormControl>
              ),
              endAdornment: (
                <IconButton onClick={clearSearch}>
                <ClearIcon sx={{ color: 'text.secondary', mr: 1 }} />
                </IconButton>
              ),
              sx: {
                borderRadius: 20,
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                }
              }
            }}
          />
        </div>
    </div>
  )
}
