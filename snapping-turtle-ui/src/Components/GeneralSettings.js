import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Fab, FormControlLabel, FormControl, FormLabel, FormGroup, Checkbox, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Add as AddIcon} from '@material-ui/icons';

import { getGeneralSettings } from '../Common/TrackingSettings';
import { daysOfWeek } from '../Common/GeneralUtils';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column'
    },    
    fab: {
        alignSelf: 'flex-end'
    },
    formControl: {
      margin: theme.spacing(3),
    },
    modalPaper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      }
}));

const GeneralSettings = props => {
    const classes = useStyles();

    const [modalStyle] = useState(getModalStyle);
    const [generalSettings, setGeneralSettings] = useState({});

    useEffect(() => {
        getGeneralSettings()
        .then(response => {
            console.log(response);
            setGeneralSettings(response);
        });
    }, []);
    
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(!open);
    };

    const modalBody = (
        <Paper style={modalStyle} className={classes.modalPaper}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Select applicable days</FormLabel>
                <FormGroup>
                    {daysOfWeek.map(dow => { return <FormControlLabel control={<Checkbox name={dow.day} />} label={dow.day} />})}
                </FormGroup>
            </FormControl>
        </Paper>
    );

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper elevation={4} className={classes.paper}>
                        <Typography>Work Hours</Typography>
                        <Fab onClick={handleOpen} className={classes.fab} size="small" color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                        <Modal
                            open={open}
                            onClose={handleOpen}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            {modalBody}
                        </Modal>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={4} className={classes.paper}>
                        <Typography>Sleep Hours</Typography>
                        <Fab className={classes.fab} size="small" color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default GeneralSettings;