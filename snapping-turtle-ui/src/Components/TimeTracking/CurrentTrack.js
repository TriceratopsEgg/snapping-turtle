import React, { useState, useEffect } from 'react';
import { TableCell, TableRow, TextField, Button } from '@material-ui/core';
import { Timer as TimeIcon } from '@material-ui/icons';
import moment from 'moment';

const CurrentTrack = (props) => {
    const { track, handleEndTrack } = props;

    const getSecondsDisplay = () => {
        const ms = moment().diff(moment(track.start));
        const d = moment.duration(ms);
        return Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
    }
    const [seconds, setSeconds] = useState(getSecondsDisplay());
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        let interval = null;
        if (isActive) {
          interval = setInterval(() => {              
            setSeconds(seconds => getSecondsDisplay());
          }, 1000);
        } else if (!isActive && seconds !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [isActive, seconds]);

    const internalEndTrack = (track) => {
        setIsActive(false);
        handleEndTrack(track);
    }

    return (
        <TableRow key={track._id}>
            <TableCell>{track.category || 'None'}</TableCell>
            <TableCell>{track.project}</TableCell>
            <TableCell>{track.task}</TableCell>
            <TableCell>{track.requireDescription ? <TextField label="" value={track.description}/> : null}</TableCell>
            <TableCell>{seconds}</TableCell>
            <TableCell><Button onClick={() => internalEndTrack(track)} variant="contained" color="primary"><TimeIcon /></Button></TableCell>
        </TableRow>
    );
}

export default CurrentTrack;