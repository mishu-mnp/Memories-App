import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const PostDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { posts, loading } = useSelector((state) => state.posts);

    return (
        <div>
            Post Details
        </div>
    )
}

export default PostDetails