import React, { useState } from 'react';
import {
    Paper,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { daysOfWeek } from '../../Common/GeneralUtils';
import { addTime } from '../../Common/TrackingSettings';

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
    formControl: {
      margin: theme.spacing(3),
      width: '100%'
    },
    modalPaper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: 'flex',
        flexDirection: 'column'
    },
    timeInput: {
        margin: theme.spacing(1)
    }
}));

const DaysInputModal = React.forwardRef((props, ref) => {
    const { generalSettings, setGeneralSettings, setModalSettings, type } = props;
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const [ days, setDays ] = useState({});
    const handleDayChange = (event) => {
        setDays({ ...days, [event.target.name]: event.target.checked });
    };

    const [time, setTime] = useState({ 
        start: '08:00', 
        end: '17:00'
    });
    const handleStartChange = (e) => {
        setTime({ ...time, start: e.target.value });
    }
    const handleEndChange = (e) => {
        setTime({ ...time, end: e.target.value });
    }  

    const handleTimeModal = (type) => {
        const internalGeneralSettings = {...generalSettings};
        addTime(internalGeneralSettings, type, days, time).then(settingsReturned => {
            setGeneralSettings(settingsReturned);
            setModalSettings({open: false, type: ''});
        });
        setDays({});
        setTime({ 
            start: '08:00', 
            end: '17:00'
        });
    }

    return (
        <Paper style={modalStyle} className={classes.modalPaper}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Select applicable days</FormLabel>
                <FormGroup>
                    {daysOfWeek.map(dow => { return <FormControlLabel key={`${type}-${dow.value}`} control={<Checkbox onChange={handleDayChange} name={"" + dow.value} />} label={dow.day} />})}
                </FormGroup>
            </FormControl>
            <TextField
                label="Start time"
                type="time"
                defaultValue="08:00"
                className={classes.timeInput}
                onChange={handleStartChange}
            />
            <TextField
                label="End time"
                type="time"
                defaultValue="17:00"
                className={classes.timeInput}
                onChange={handleEndChange}
            />
            <Button key={type} onClick={() => handleTimeModal(type)} color="primary" variant="contained">Submit</Button>
        </Paper>
    )
})

export default DaysInputModal;