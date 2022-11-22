import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { getPosts } from "../../reducers/postsSlice";
import Form from "../Form/Form"
import Posts from "../Posts/Posts";
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import Pagination from '../Pagination/Pagination';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'
import { getPostsBySearch } from '../../actions/posts'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const dispatch = useDispatch();

    const [currentID, setCurrentID] = useState(null);

    const query = useQuery();
    const location = useLocation();
    const navigate = useNavigate();

    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const handleAdd = (tag) => {
        setTags([...tags, tag])
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag != tagToDelete))
    }


    useEffect(() => {
        dispatch(getPosts())
        // eslint-disable-next-line
    }, [currentID, dispatch])

    const classes = useStyles();

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
            navigate(`/posts/search?searchQuery=${search}&tags=${tags.join(',')}`)
        } else {
            navigate('/');
        }
    }

    const handleKey = (e) => {
        if (e.key === 13) {
            searchPost()
        }
    }





    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentID={setCurrentID} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField
                                name='search'
                                variant='outlined'
                                label='Search Memories'
                                onKeyDown={handleKey}
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label='Search Tags'
                                variant='outlined'
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant='contained' color='primary'>
                                Search
                            </Button>
                        </AppBar>
                        <Form currentID={currentID} setCurrentID={setCurrentID} />
                        <Paper elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home