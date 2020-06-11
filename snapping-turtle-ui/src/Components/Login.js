import React, { useState } from 'react';
import { TextField, Button, FormLabel, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const { colours } = require('../Common/UISettings');
const { authenticateUser } = require('../Common/AuthenticationUtils');
const { registerUser } = require ('../Common/UserUtils');

const useStyles = makeStyles((theme) => ({
    
    form: {
        width: '300px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    textField: {
        margin: '5px',
        width: '280px'
    },
    button: {
        margin: '10px'
    },
    errorLabel: {
        color: 'salmon'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '320px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
}));

const Login = props => {
    const classes = useStyles();

    const [ email, setEmail ] = useState('');
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const [ password, setPassword ] = useState('');
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const [ firstName, setFirstName ] = useState('');
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const [ surname, setSurname ] = useState('');
    const handleSurnameChange = (e) => {
        setSurname(e.target.value);
    }

    const [ checkPassword, setCheckPassword ] = useState('');
    const handleCheckPasswordChange = (e) => {
        setCheckPassword(e.target.value);
    }

    const [errorData, setErrorData] = useState({
        errorMessage: '',
        loginError: false,
        registerError: false
    });

    const resetErrorData = () => {
        setErrorData({
            errorMessage: '',
            loginError: false,
            registerError: false
        });
    }
    const handleLogin = () => {
        resetErrorData();
        authenticateUser(email, password, setErrorData)
        .then(response => {   
            if (response === 'success') {
                props.history.push('/app');
            }
        });
    };

    const [showRegister, setRegisterShow] = useState(false);
    const handleRegisterClick = () => {
        resetErrorData();
        setRegisterShow(!showRegister);
    }

    const [ registerSuccess, setRegisterSuccess ] = useState(false);
    const handleRegistering = () => {
        resetErrorData();
        if (password !== checkPassword) {
            setErrorData({
                errorMessage: 'Passwords do not match',
                loginError: false,
                registerError: true
            });
        }

        registerUser(firstName, surname, email, password, setErrorData)
        .then((response) => {
            if (response === 'success') {
                setPassword('');
                setCheckPassword('');
                setRegisterSuccess(true);
                setRegisterShow(false);
            }
        })
    }

    const showError = (
        <FormLabel className={ classes.errorLabel }>{errorData.errorMessage}</FormLabel>
    );

    const showSuccess = (
        <FormLabel>Sucessfully registered. Please login.</FormLabel>
    );

    if (showRegister) {
        return (
            <Paper className={classes.paper}>
                {errorData.registerError ? showError : null }
                <TextField onChange={ handleFirstNameChange } className= { classes.textField } label="First Name" value={firstName} />
                <TextField onChange={ handleSurnameChange } className= { classes.textField } label="Surname" value={surname} />
                <TextField onChange={ handleEmailChange } className={ classes.textField } label="Email" value={email} />
                <TextField onChange={ handlePasswordChange } className={ classes.textField } label="Password" type="password" value={password} />
                <TextField onChange={ handleCheckPasswordChange } className={ classes.textField } label="Confirm Password" type="password" value={checkPassword} />
                <Button onClick={ handleRegistering } className={ classes.button } color="primary"  variant="outlined">Register</Button>
                <Button onClick={ handleRegisterClick } className={ classes.button }  color="primary" variant='outlined'>Cancel</Button>
            </Paper>
        );
    } else {
        return (
            <Paper className={classes.paper}>
                {errorData.loginError ? showError : null }
                {registerSuccess ? showSuccess : null}
                <TextField onChange={ handleEmailChange } className={ classes.textField } label="Email" value={email} />
                <TextField onChange={ handlePasswordChange } className={ classes.textField } label="Password" type="password" value={password} />
                <Button onClick={ handleLogin } className={ classes.button } color="primary" variant="contained">Login</Button>
                <Button onClick={ handleRegisterClick } className={ classes.button } color="primary"  variant="contained">Register</Button>
            </Paper>
        );
    }    
};

export default Login;