import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {
        addProfile: (state, action) => {
            state.value = action.payload;
            localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
            console.log('Profile Data >>> ', action.payload);
        },
        removeProfile: (state, action) => {
            localStorage.clear();
            state.value = {};
        }
    }
})

export const { addProfile, removeProfile } = authSlice.actions;
export default authSlice.reducer;

