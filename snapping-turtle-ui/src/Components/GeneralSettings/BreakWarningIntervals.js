import React from 'react';
import {
    Grid,
    Paper,
    TextField,
    InputAdornment,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { updateBreaks } from '../../Common/TrackingSettings';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column'
    },
    inputField: {
        marging: theme.spacing(9)
    }
}));

const BreakWarningIntervals = (props) => {
    const { generalSettings, setGeneralSettings } = props;
    const classes = useStyles();    
    
    const handleWorkBreaksChange = (e) => {
        const internalGeneralSettings = {...generalSettings};
        internalGeneralSettings.breakIntervals.duringWorkHours = e.target.value;
        setGeneralSettings(internalGeneralSettings);
    }

    const handleAfterWorkBreaksChange = (e) => {
        const internalGeneralSettings = {...generalSettings};
        internalGeneralSettings.breakIntervals.afterWorkHours = e.target.value;
        setGeneralSettings(internalGeneralSettings);
    }

    const handleBreaksBlur = () => {
        const internalGeneralSettings = {...generalSettings};
        updateBreaks(internalGeneralSettings).then( settingsReturned => {
            setGeneralSettings(settingsReturned);
        });
    }

    return (        
        <Grid item xs={6} key="breakIntervals">
        <Paper elevation={4} className={classes.paper}>
            <Typography>Break warning intervals</Typography>
            <TextField 
                value={generalSettings.breakIntervals ? generalSettings.breakIntervals.duringWorkHours : 0} 
                onChange={handleWorkBreaksChange}
                onBlur={handleBreaksBlur}
                type="number" 
                label="During work hours" 
                InputProps={{
                    endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
                }} 
                className={classes.inputField} />
            <TextField 
                value={generalSettings.breakIntervals ? generalSettings.breakIntervals.afterWorkHours : 0} 
                onChange={handleAfterWorkBreaksChange}
                onBlur={handleBreaksBlur}
                type="number" 
                label="During off hours" 
                InputProps={{
                    endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
                }} 
                className={classes.inputField} />
        </Paper>
    </Grid>
    )
}

export default BreakWarningIntervals;