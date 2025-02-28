import TextField from "@mui/material/TextField"
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { searchQuery } from "../../redux/slices/search/searchQuery";
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

export const Search = () => {
  const { query } = useAppSelector((state: RootState) => state.searchQuery);
  const [search, setSearch] = useState('');
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
    <div style={{display: "flex", alignItems: "center"}}>
        <Link to='/home'>
          <IconButton color="primary" aria-label="add to shopping cart">
            <HomeOutlinedIcon sx={{ color: 'text.secondary' }} />
          </IconButton>
        </Link>
        <TextField
        autoFocus={true}
          id="search-input"
          fullWidth
          style={{maxWidth: '400px', width: '100%'}}
          size="small"
          value={valueInput}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Rechercher une chanson, un artiste..."
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
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
  )
}
