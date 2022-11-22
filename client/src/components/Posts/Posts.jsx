import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import { CircularProgress, Grid } from '@material-ui/core'


const Posts = ({ setCurrentID }) => {
    const classes = useStyles();

    const posts = useSelector(state => state.posts.posts)
    console.log("POSTS >>> ", posts)


    return (
        !posts?.length ? <CircularProgress /> : (
            <Grid container className={classes.container} alignItems='stretch' spacing={3}>
                {posts?.map(post => (
                    <Grid item key={post._id} xs={12} sm={12} lg={3} md={6}>
                        <Post post={post} setCurrentID={setCurrentID} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts