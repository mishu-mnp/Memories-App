import React from 'react'
import useStyles from './styles'
import { Card, CardActions, CardMedia, Typography } from '@material-ui/core';
import { ThumbUpAlt, DeleteOutlined, MoreHoriz } from '@material-ui/icons'

const Post = () => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardMedia />
        </Card>
    )
}

export default Post