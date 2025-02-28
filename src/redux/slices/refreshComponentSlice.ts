import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Refresh {
    refresh: number
}
const initialState: Refresh = {
    refresh: 0,
};

export const refreshComponentSlice = createSlice({
    name: 'refreshComponent',
    initialState,
    reducers: {
        setRefreshComponent: (state, action: PayloadAction<Refresh>) => {
            state.refresh = action.payload.refresh;
        },
    },
});

export const { setRefreshComponent } = refreshComponentSlice.actions;
export default refreshComponentSlice.reducer; 