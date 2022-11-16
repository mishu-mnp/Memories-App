import { Avatar, Button, Container, Typography, Paper, Grid } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import Input from './Input';
import useStyles from './styles';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Icon from './icon';
import { useDispatch } from 'react-redux'
import { addProfile } from '../../reducers/authSlice';
import { useNavigate } from 'react-router-dom';

const Auth = () => {

    const classes = useStyles();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [userData, setUserData] = useState(initialState)

    const handleOnchange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User Data >>> ', userData);
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    }

    const [isSignup, setIsSignup] = useState(true);
    const switchMode = () => {
        setIsSignup((prev) => !prev);
        setUserData(initialState);
    }


    // Google Sign In
    const googleSuccess = (res) => {
        console.log('Success: ', res);
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch(addProfile({ result, token }));
            navigate('/')
        } catch (error) {
            console.log('Err : ', error)
        }
    }

    const googleFailure = (error) => {
        console.log('Error : ', error);
    }


    const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    // console.log('CLIENT ID >>> ', clientID)

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientID,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    return (
        <Container component='main' maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign up' : 'Login'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input
                                        name='firstName'
                                        label='First Name'
                                        value={userData.firstName}
                                        handleOnchange={handleOnchange}
                                        autoFocus
                                        half
                                    />
                                    <Input
                                        name='lastName'
                                        label='Last Name'
                                        value={userData.lastName}
                                        handleOnchange={handleOnchange}
                                        half
                                    />
                                </>
                            )
                        }
                        <Input
                            name='email'
                            label='Email'
                            value={userData.email}
                            handleOnchange={handleOnchange}
                            type='email'
                        />

                        <Input
                            name='password'
                            label='Password'
                            value={userData.password}
                            handleOnchange={handleOnchange}
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword}
                        />
                        {
                            isSignup &&
                            <Input
                                name='confirmPassword'
                                label='Confirm Password'
                                value={userData.confirmPassword}
                                handleOnchange={handleOnchange}
                                type={showPassword ? 'text' : 'password'}
                            />
                        }
                    </Grid>
                    <Button type='submit' className={classes.submit} variant='contained' color='primary' fullWidth>
                        {isSignup ? 'Login' : 'Sign Up'}
                    </Button>
                    <GoogleLogin
                        clientId={clientID}
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color='primary'
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant='contained'>
                                Google Sign in
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    // isSignedIn={true}
                    />
                    <Grid container justifyContent='flex-end'>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign In' : 'New User? Create Account'}
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth