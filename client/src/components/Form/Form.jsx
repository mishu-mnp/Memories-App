import React, { useState } from 'react';
import useStyles from './styles';
import { Paper, TextField, Typography, Button } from '@material-ui/core';
import FileBase64 from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost } from '../../reducers/postsSlice';

const Form = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })

    const handleOnchange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Post Data", postData)
        dispatch(createPost(postData))
    }


    const clear = () => {

    }

    return (
        <Paper className={classes.paper}>
            <form noValidate autoComplete='off' className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>Creating a Memory</Typography>
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