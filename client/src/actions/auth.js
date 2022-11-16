import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api';


export const signin = createAsyncThunk('user/signin', async (data) => {
    try {
        // user sign in 
    } catch (error) {
        console.log(error)
    }
})

export const signup = createAsyncThunk('user/signup', async (data) => {
    try {
        // user sign up 
    } catch (error) {
        console.log(error)
    }
})