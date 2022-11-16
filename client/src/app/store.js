import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../reducers/postsSlice";
import authReducer from "../reducers/authSlice";


const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})


export default store