import express from 'express';
import { getPosts, createPost } from '../controllers/posts.js';

const router = express.Router();

// Get Post Data Route
router.get('/', getPosts)

// Create Post
router.post('/', createPost)

export default router;