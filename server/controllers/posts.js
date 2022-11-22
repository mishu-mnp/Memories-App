import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const limit = 8;
        const startIndex = (Number(page) - 1) * limit;
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(limit).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / limit) })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i');   // i-> ignore case    
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] })
        res.json({ data: posts });
    } catch (error) {
        res.status(404).json(error);
    }
}


export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const id = req.params.id;
    console.log("Updating ID >>> ", id);
    const post = req.body;
    console.log("Updating POST >>> ", post);

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post found with this ID');

        const updatedPost = await PostMessage.findByIdAndUpdate(id, { ...post, id }, { new: true })
        res.json(updatedPost)
    } catch (error) {
        res.status(400).json({ message: error })
    }

}


export const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post found with this ID');

        await PostMessage.findByIdAndRemove(id);
        res.json({ message: 'Post Deleted Successfully!!!' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    // console.log('ID like ', id);
    // console.log('USER like ', req.userId);
    try {

        if (!req.userId) return res.json({ message: 'Not Authenticated' });
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post found with this ID');

        const post = await PostMessage.findById(id);

        const index = post.likes.findIndex((id) => id === String(req.userId));
        if (index === -1) {
            // like a post
            post.likes.push(req.userId);
        } else {
            // dislike a post
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, { ...post }, { new: true })
        res.json(updatedPost)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}