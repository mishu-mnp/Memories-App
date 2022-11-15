import { Container, Grid, Grow } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { getPosts } from "../../reducers/postsSlice";
import Form from "../Form/Form"
import Posts from "../Posts/Posts";
import { useDispatch } from 'react-redux';
import useStyles from '../../styles';

const Home = () => {
    const dispatch = useDispatch();

    const [currentID, setCurrentID] = useState(null);

    useEffect(() => {
        dispatch(getPosts())
        // eslint-disable-next-line
    }, [currentID, dispatch])

    const classes = useStyles();

    return (
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentID={setCurrentID} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentID={currentID} setCurrentID={setCurrentID} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home