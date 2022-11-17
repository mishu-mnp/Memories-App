import { createAsyncThunk } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom';
import * as api from '../api';


export const signin = createAsyncThunk('user/signin', async (formData, navigate) => {
    try {
        const { data } = await api.signin(formData);
        // navigate('/')
        return data;
    } catch (error) {
        console.log(error)
        alert('Check your Credentials')
    }
})

export const signup = createAsyncThunk('user/signup', async (formData, navigate) => {
    try {
        console.log('Coming Data formData >>> ', formData)
        const { data } = await api.signup(formData);
        // navigate('/')
        return data;
    } catch (error) {
        console.log('Error >>> ', error)
    }
})