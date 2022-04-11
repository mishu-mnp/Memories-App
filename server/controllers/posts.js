import PostMessage from "../models/PostMessage.js"


// Get Posts 
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages)
    } catch (e) {
        res.status(404).json({ message: e.message })
    }

}

// Create Posts
export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (e) {
        res.status(409).send({ message: e.message })
    }
}

