import React from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles';
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeProfile } from '../../reducers/authSlice';
import { decode } from 'jsonwebtoken';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    // console.log('User Profile >>> ', user)

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(removeProfile())
        setUser(null);
        navigate('/');
    }

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color='inherit' >
            <Link to='/' className={classes.brandContainer}>
                <img src={memoriesText} alt='icon' height='45px' />
                <img className={classes.image} src={memoriesLogo} alt='logo-text' height='40px' />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user?.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Login</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar