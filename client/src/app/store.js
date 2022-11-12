import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../reducers/postsSlice";


const store = configureStore({
    reducer: {
        posts: postsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})


export default store