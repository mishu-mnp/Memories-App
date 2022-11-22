import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api';


export const getPosts = createAsyncThunk('posts/getAll', async (page) => {
    try {
        const { data } = await api.fetchPosts(page);
        console.log('DATA >>> ', data)
        return data;
    } catch (error) {
        return error.response.data;
    }
})

export const getPostsBySearch = createAsyncThunk('posts/getBySearch', async (searchQuery) => {
    try {
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        console.log('BY SEARCH Data >>> ', data);
        return data;
    } catch (error) {
        console.log(error)
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
    console.log("DATA !!!", data)
    console.log("ID ", currentID)
    // console.log("POST ", postData)
    try {
        const res = await api.updatePost(currentID, data);
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