import { createSlice } from '@reduxjs/toolkit'
import * as api from '../api';



const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: []
    },
    reducers: {
        addPosts: (state, action) => {
            state.posts = [...action.payload]
        },
        createPost: async (state, action) => {
            try {
                console.log("Action >>>", action.payload)
                const { data } = await api.createPost(action.payload);
                state.posts = [...state.posts, data]

            } catch (error) {
                console.log("Err : ", error)
            }
        },
        updatePost: async (state, action) => {
            try {
                const { currentID, postData } = action.payload
                // console.log("Action Update Data >>>", action.payload)
                // console.log("Before Update State >>> ", state.posts);
                const { data } = await api.updatePost(currentID, postData);

                const res = await api.fetchPosts();
                // console.log("POSTS AFTER UPDATE >>> ", res.data)
                state.posts = state.posts.filter(post => post._id !== currentID)
                // console.log("After Update State >>> ", state.posts);

            } catch (error) {
                console.log("Err : ", error)
            }
        },
        deletePost: async (state, action) => {
            const id = action.payload;
            try {
                await api.deletePost(action.payload)
                state.posts = state.posts.filter(post => post._id !== id)
            } catch (error) {
                console.log("Err: ", error)
            }
        },
        likePost: async (state, action) => {
            const id = action.payload;
            try {
                const { data } = await api.likePost(id)
                state.posts = state.posts.map(post => post._id === data._id ? data : post);
            } catch (error) {

            }
        }
    }
});


export const { createPost, addPosts, updatePost, deletePost, likePost } = postsSlice.actions;
export default postsSlice.reducer