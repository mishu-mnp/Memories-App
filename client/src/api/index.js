import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' })


export const fetchPosts = async () => await API.get('/posts');
export const createPost = async (post) => await API.post('/posts', post);
export const updatePost = async (id, updatedPost) => await API.patch(`/posts/${id}`, updatedPost);
export const deletePost = async (id) => await API.delete(`/posts/${id}`);
export const likePost = async (id) => await API.patch(`/posts${id}/likePost`);

export const signin = async (formData) => await API.post('/user/signin', formData);
export const signup = async (formData) => await API.post('/user/signup', formData);
