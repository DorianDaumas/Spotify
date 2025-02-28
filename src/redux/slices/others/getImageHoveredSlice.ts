import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UrlImage {
  image: string;
}

const initialState: UrlImage = {
  image: ''
}

export const getImageHoveredSlice = createSlice({
  name: 'hoveredImage',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<UrlImage>) => {
      state.image = action.payload.image
    },
    getImage: (state) => state
  }
});

export const { setImage, getImage } = getImageHoveredSlice.actions

export default getImageHoveredSlice.reducer