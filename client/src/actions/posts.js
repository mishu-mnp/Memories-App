import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api';


export const getPosts = createAsyncThunk('posts/getAll', async () => {
    try {
        const { data } = await api.fetchPosts();
        console.log('ASYNC DATA >>> ', data)
        return data;
    } catch (error) {
        return error.response.data;
    }
})

export const createPost = createAsyncThunk('posts/create', async (post) => {
    try {
        const res = await api.createPost(post);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
})

export const updatePost = createAsyncThunk('post/update', async (data) => {
    const { currentID, postData } = data;
    console.log("ID ", currentID)
    console.log("POST ", postData)
    try {
        const res = await api.updatePost(currentID, postData);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
})


export const deletePost = createAsyncThunk('post/delete', async (id) => {
    console.log("ID ", id)
    try {
        const res = await api.deletePost(id);
        return { data: res.data, id: id };
    } catch (error) {
        return error.response.data;
    }
})


export const likePost = createAsyncThunk('post/like', async (id) => {
    try {
        const res = await api.likePost(id)
        return res.data;
    } catch (error) {
        return error.response.data;
    }
})