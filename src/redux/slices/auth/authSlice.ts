import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  token: window.localStorage.getItem("token"),
  refreshToken: window.localStorage.getItem("refresh_token")
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      window.localStorage.setItem("token", state.token);
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      window.localStorage.setItem("refresh_token", state.refreshToken);
    },
    clearToken: (state) => {
      state.token = null;
      state.refreshToken = null;
      window.localStorage.removeItem("token")
      window.localStorage.removeItem("refresh_token")
    },
  },
});

export const { setToken, clearToken, setRefreshToken } = authSlice.actions;
export default authSlice.reducer;
