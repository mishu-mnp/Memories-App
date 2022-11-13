import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { Paper, TextField, Typography, Button } from '@material-ui/core';
import FileBase64 from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../reducers/postsSlice';

const Form = ({ currentID, setCurrentID }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const initialState = {
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    }

    const [postData, setPostData] = useState(initialState)

    const handleOnchange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value })
    }

    const post = useSelector((state) => currentID ? state.posts.posts.find(post => post._id === currentID) : null)

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log("Post Data", postData)

        if (currentID) {
            dispatch(updatePost({ currentID, postData }))
        } else {
            dispatch(createPost(postData))
        }

        clear();
    }


    const clear = () => {
        setCurrentID(null);
        setPostData(initialState);
    }

    return (
        <Paper className={classes.paper}>
            <form noValidate autoComplete='off' className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentID ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField
                    name='creator'
                    label='Creator'
                    fullWidth
                    variant='outlined'
                    value={postData.creator}
                    onChange={handleOnchange}
                />
                <TextField
                    name='title'
                    label='Title'
                    fullWidth
                    variant='outlined'
                    value={postData.title}
                    onChange={handleOnchange}
                />
                <TextField
                    name='message'
                    label='Message'
                    fullWidth
                    variant='outlined'
                    value={postData.message}
                    onChange={handleOnchange}
                />
                <TextField
                    name='tags'
                    label='Tags'
                    fullWidth
                    variant='outlined'
                    value={postData.tags}
                    onChange={handleOnchange}
                />
                <div className={classes.fileInput}>
                    <FileBase64
                        type='file'
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>
                    Submit
                </Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form