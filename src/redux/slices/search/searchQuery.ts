import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
}

const initialState: SearchState = {
  query: '',
};

export const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState,
  reducers: {
    searchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { searchQuery } = searchQuerySlice.actions;

export default searchQuerySlice.reducer; 