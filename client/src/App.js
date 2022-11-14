import React, { useEffect } from "react";
import { AppBar, Container, Grow, Typography, Grid } from '@material-ui/core'
import memories from './images/memories.png'
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import useStyles from './styles'
import { useDispatch } from 'react-redux';
import { getPosts } from "./reducers/postsSlice";
import { useState } from "react";


const App = () => {

  const dispatch = useDispatch();

  const [currentID, setCurrentID] = useState(null);


  useEffect(() => {
    dispatch(getPosts())
    // eslint-disable-next-line
  }, [currentID, dispatch])


  const classes = useStyles();

  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position="static" color='inherit' >
        <Typography className={classes.heading} variant='h2' align="center">
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt='memories' height="60" />
      </AppBar>

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
    </Container>
  );
}

export default App;
