import { Avatar, Button, Container, Typography, Paper, Grid } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import Input from './Input';
import useStyles from './styles';

const Login = () => {

    const classes = useStyles();


    const handleOnchange = (e) => {

    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    }

    const [isSignup, setIsSignup] = useState(true);
    const switchMode = () => {
        setIsSignup((prev) => !prev);
    }

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
                                        onChange={handleOnchange}
                                        autoFocus
                                        half
                                    />
                                    <Input
                                        name='lastName'
                                        label='Last Name'
                                        onChange={handleOnchange}
                                        half
                                    />
                                </>
                            )
                        }
                        <Input
                            name='email'
                            label='Email'
                            handleOnchange={handleOnchange}
                            type='email'
                        />

                        <Input
                            name='password'
                            label='Password'
                            handleOnchange={handleOnchange}
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword}
                        />
                        {
                            isSignup &&
                            <Input
                                name='confirmPassword'
                                label='Confirm Password'
                                handleOnchange={handleOnchange}
                                type={showPassword ? 'text' : 'password'}
                            />
                        }
                    </Grid>
                    <Button type='submit' className={classes.submit} variant='contained' color='primary' fullWidth>
                        {isSignup ? 'Login' : 'Sign Up'}
                    </Button>
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

export default Login