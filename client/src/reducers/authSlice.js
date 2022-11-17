import { createSlice } from '@reduxjs/toolkit';
import { signin, signup } from '../actions/auth';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        profile: {},
        authData: {}
    },
    reducers: {
        addProfile: (state, action) => {
            state.profile = action.payload;
            localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
            // console.log('Profile Data >>> ', action.payload);
        },
        removeProfile: (state, action) => {
            localStorage.clear();
            state.value = {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signin.fulfilled, (state, action) => {
            localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
            // console.log('Profile Data >>> ', action.payload)
        }).addCase(signup.fulfilled, (state, action) => {
            localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
            // console.log('Profile Data >>> ', action.payload)
        })
    }
})

export const { addProfile, removeProfile } = authSlice.actions;
export { signin, signup };
export default authSlice.reducer;

