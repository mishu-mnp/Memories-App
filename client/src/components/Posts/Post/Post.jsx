import React from 'react'
import useStyles from './styles'
import { Card, CardActions, CardMedia, Typography, CardContent, Button } from '@material-ui/core';
import { ThumbUpAlt, Delete, MoreHoriz, ThumbUpAltOutlined } from '@material-ui/icons'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../reducers/postsSlice';

const Post = ({ post, setCurrentID }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result._id))
                ? (
                    <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    return (
        <Card className={classes.card} raised elevation={6}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button style={{ color: 'white' }} size='small' onClick={() => setCurrentID(post._id)}>
                        <MoreHoriz fontSize="medium" />
                    </Button>
                </div>)}

            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant='h5'>{post.title}</Typography>
            <CardContent>
                <Typography gutterBottom variant='body2' color='textSecondary' component='p'>{post.message.length > 100 ? post.message.substring(0, 100) + ' ...' : post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
                        <Delete fontSize='small' />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post