import React from 'react'
import useStyles from './styles'
import { Card, CardActions, CardMedia, Typography, CardContent, Button } from '@material-ui/core';
import { ThumbUpAlt, Delete, MoreHoriz } from '@material-ui/icons'
import moment from 'moment'

const Post = ({ post }) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.creator}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size='small' onClick={() => { }}>
                    <MoreHoriz fontSize="default" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.message}</Typography>
            </div>
            <CardContent>
                <Typography className={classes.title} gutterBottom variant='h5'></Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' onClick={() => { }}>
                    <ThumbUpAlt fontSize='small' />
                    Like
                </Button>
                <Button size='small' color='primary' onClick={() => { }}>
                    <Delete fontSize='small' />
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post