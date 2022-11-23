import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { Paper, TextField, Typography, Button } from '@material-ui/core';
import FileBase64 from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../reducers/postsSlice';

const Form = ({ currentID, setCurrentID }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    let user = JSON.parse(localStorage.getItem('profile'));
    console.log('Who >> ', user);
    const initialState = {
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    }

    const [postData, setPostData] = useState(initialState)

    const handleOnchange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'tags') {
            setPostData({ ...postData, [name]: value.split(',') })
        }
        else {
            setPostData({ ...postData, [name]: value })
        }
    }

    const post = useSelector((state) => currentID ? state.posts.posts.find(post => post._id === currentID) : null)

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log("Post Data", postData)

        if (currentID) {
            dispatch(updatePost({ ...postData, name: user?.result?.name, currentID }))
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }))
        }

        clear();
    }


    const clear = () => {
        setCurrentID(null);
        setPostData(initialState);
    }


    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please Sign in to create memories
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form noValidate autoComplete='off' className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentID ? 'Editing' : 'Creating'} a Memory</Typography>
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
                    label='Tags (coma separated)'
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