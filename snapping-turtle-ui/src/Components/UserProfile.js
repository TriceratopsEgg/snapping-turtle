import React, { useState, useEffect } from 'react';
import { TextField, Grid, Paper, FormLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { patchUser, getUser } from '../Common/UserUtils';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },    
    errorLabel: {
        color: 'salmon'
    },
    textBox: {
        width: '100%'
    }
  }));

const TextFieldData = (label, value, changeHandler, blurHandler) => {
    const classes = useStyles();
    return (
        <TextField onBlur={ blurHandler } onChange={ changeHandler } value={ value } className={ classes.textBox } label={label} key={label} />
    );
}

const UserProfile = () => {
    const classes = useStyles();

    const [ firstName, setFirstName ] = useState('');
    const [ surname, setSurname ] = useState('');
    const [ email, setEmail ] = useState('');

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }
    const handleSurnameChange = (e) => {
        setSurname(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleFirstNameBlur = () => {
        patchUser({ firstname: firstName });
    }
    const handleSurnameBlur = () => {
        patchUser({ surname });
    }
    const handleEmailBlur = () => {
        patchUser({ email });
    }
    
    useEffect(() => {
        getUser()
        .then((data) => {
            setFirstName(data.firstname);
            setSurname(data.surname);
            setEmail(data.email);
        })
    }, []);

    const textBoxes = [
        TextFieldData('First Name', firstName, handleFirstNameChange, handleFirstNameBlur),
        TextFieldData('Surname', surname, handleSurnameChange, handleSurnameBlur),
        TextFieldData('Email', email, handleEmailChange, handleEmailBlur)
    ];
    
    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <form className={ classes.form }>
                        {textBoxes}
                    </form>
                </Paper>
            </Grid>
        </Grid>
        
    );
}

export default UserProfile;