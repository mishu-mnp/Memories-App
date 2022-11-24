import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import moment from 'moment';
import useStyles from './styles'
import { getPost, getPostsBySearch } from '../../actions/posts';


const PostDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useStyles();

    const { id } = useParams();

    const { post, posts, loading } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getPost(id));
    }, [id])

    // useEffect(() => {
    //     if (post) {
    //         dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
    //     }
    // }, [post])

    if (!post) return null;

    console.log('POST DATA in Details ', post)
    console.log('Loading ', loading);
    if (loading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size='7em' />
            </Paper>
        )
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)
    // console.log('Recommended Posts ', recommendedPosts)

    const openPost = (_id) => {
        navigate(`/posts/${_id}`)
    }

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">Created by: {post.name}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
            </div>

            {recommendedPosts.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant='h5'>You might also like</Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
                            <div style={{ margin: '20px', curson: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant='h6'>{title}</Typography>
                                <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                                <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                                <Typography gutterBottom variant='subtitle1'>Likes {likes.length}</Typography>
                                <img src={selectedFile} width='200px' />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
    )
}

export default PostDetails