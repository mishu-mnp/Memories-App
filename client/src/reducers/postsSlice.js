import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api';



const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: []
    },
    reducers: {
        addPosts: (state, action) => {
            state.posts.push(...action.payload)
        },
        createPost: async (state, action) => {
            try {
                console.log("Action >>>", action.payload)
                const { data } = await api.createPost(action.payload);
                state.posts = [...state.posts, data]

            } catch (error) {
                console.log("Err : ", error.message)
            }
        }
    }
});


export const { createPost, addPosts } = postsSlice.actions;
export default postsSlice.reducer