import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' })

// authorization
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
});

// Posts Requests
export const fetchPosts = async (page) => await API.get(`/posts?page=${page}`);
export const fetchPost = async (id) => await API.get(`/posts/${id}`);
export const fetchPostsBySearch = async (searchQuery) => await API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = async (post) => await API.post('/posts', post);
export const updatePost = async (id, updatedPost) => await API.patch(`/posts/${id}`, updatedPost);
export const deletePost = async (id) => await API.delete(`/posts/${id}`);
export const likePost = async (id) => await API.patch(`/posts/${id}/likePost`);

// Authenticate Requests
export const signin = async (formData) => await API.post('/user/signin', formData);
export const signup = async (formData) => await API.post('/user/signup', formData);
