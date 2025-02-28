import CircularProgress from "@mui/material/CircularProgress/CircularProgress"
import Stack from "@mui/material/Stack"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useGetTokenQuery } from "../../redux/services/auth";
import { setToken, setRefreshToken } from "../../redux/slices/auth/authSlice";

export const CallbackLoader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    const { data } = useGetTokenQuery(code ?? '', { skip: !code });
    const storageToken = window.localStorage.getItem("token");

    useEffect(() => {
      if (!storageToken && data?.access_token) {
        dispatch(setToken(data.access_token));
        dispatch(setRefreshToken(data.refresh_token));
        navigate('/home', { replace: true });            
      }
    }, [data, storageToken, dispatch, navigate]);
  
  return (
    <div className="center-absolute">
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
            <CircularProgress size={100} color="success" />
        </Stack>
    </div>
  )
}
