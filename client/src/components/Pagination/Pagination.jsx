import React from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import useStyles from './styles';
import { Link } from 'react-router-dom';

const Paginate = () => {
    const classes = useStyles();
    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={10}
            page={1}
            variant='outlined'
            color='primary'
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/oosts?page=${1}`} />
            )}
        />
    )
}

export default Paginate