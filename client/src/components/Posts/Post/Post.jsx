import React from 'react'
import useStyles from './styles'
import { Card, CardActions, CardMedia, Typography, CardContent, Button } from '@material-ui/core';
import { ThumbUpAlt, Delete, MoreHoriz } from '@material-ui/icons'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../reducers/postsSlice';

const Post = ({ post, setCurrentID }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.creator}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size='small' onClick={() => setCurrentID(post._id)}>
                    <MoreHoriz fontSize="medium" />
                </Button>
            </div>

            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant='h5'>{post.title}</Typography>
            <CardContent>
                <Typography gutterBottom variant='body2' color='textSecondary' component='p'>{post.message.length > 100 ? post.message.substring(0, 100) + ' ...' : post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUpAlt fontSize='small' />
                    Like {post.likeCount}
                </Button>
                <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
                    <Delete fontSize='small' />
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post