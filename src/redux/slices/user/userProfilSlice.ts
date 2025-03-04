import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootUserProfil, UserProfil } from '../../interfaces/user/userProfil.interface';
export const initialState: RootUserProfil = {
    userProfil: {
        country: '',
        display_name: '',
        email: '',
        explicit_content: { filter_enabled: false, filter_locked: false },
        external_urls: { spotify: '' },
        followers: { total: 0, href: '' },
        href: '',
        id: '',
        images: [],
        product: '',
        type: '',
        uri: ''
    }
}

export const userProfilSlice = createSlice({
  name: 'userProfil',
  initialState,
  reducers: {
    getUserProfil: (state, action: PayloadAction<UserProfil>) => {
        state.userProfil = action.payload
    },
  }
});

export const {getUserProfil} = userProfilSlice.actions

export default userProfilSlice.reducer