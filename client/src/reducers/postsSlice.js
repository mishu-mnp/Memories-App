import { createSlice } from '@reduxjs/toolkit'
import { getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch } from '../actions/posts';


const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        loading: true,
        posts: [],
        numberOfPages: 0,
        currentPage: 1
    },
    reducers: {
        // no reducers
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state, action) => {
            state.loading = true;
        }).addCase(getPosts.fulfilled, (state, action) => {
            state.loading = true;
            state.posts = action.payload.data;
            state.currentPage = action.payload.currentPage
            state.numberOfPages = action.payload.numberOfPages
            state.loading = false;
        }).addCase(getPosts.rejected, (state, action) => {
            state.loading = true;
        }).addCase(getPostsBySearch.fulfilled, (state, action) => {
            // console.log('SEARCH DATA All Posts >>> ', action.payload)
            state.loading = true;
            state.posts = action.payload;
            state.currentPage = action.payload.currentPage
            state.numberOfPages = action.payload.numberOfPages
            state.loading = false;
        }).addCase(createPost.fulfilled, (state, action) => {
            // console.log("CReated Data after >>> ", action.payload)
            state.loading = true;
            state.posts = [...state.posts, action.payload]
            state.loading = false;
        }).addCase(updatePost.fulfilled, (state, action) => {
            // console.log("UpDATed Data after >>> ", action.payload)
            state.posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        }).addCase(deletePost.fulfilled, (state, action) => {
            state.loading = true;
            state.posts = state.posts.filter(post => post._id !== action.payload.id)
            state.loading = false;
        }).addCase(likePost.fulfilled, (state, action) => {
            state.posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        })
    }
});


// export const { } = postsSlice.actions;
export { getPosts, createPost, updatePost, deletePost, likePost };
export default postsSlice.reducer