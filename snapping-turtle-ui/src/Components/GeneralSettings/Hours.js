import React from 'react';
import { 
    Grid,
    Paper,
    Typography,
    Fab,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';

import { getTimeDisplay, deleteTime } from '../../Common/TrackingSettings';
import { timeTypes } from '../../Common/GeneralUtils';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column'
    },    
    fab: {
        alignSelf: 'flex-end'
    },
    tableContainer: {
        margin: theme.spacing(2)
    },
    fabButtonSuperSmall: {
        width: '20px',
        height: '20px',
        minHeight:'20px'
    }
}));

const Hours = (props) => {    
    const classes = useStyles();
    const { type, generalSettings, setGeneralSettings, handleOpen } = props;

    const handleDeleteDay = (type, day) => {
        const internalGeneralSettings = {...generalSettings};
        deleteTime(internalGeneralSettings, type, day).then(settingsReturned => {
            setGeneralSettings(settingsReturned);
        });
    }
    
    const daysDescription = (type) => {   
        const daysApplicable = type === timeTypes[0]
            ? generalSettings.workHours 
            : generalSettings.sleepHours;
        if (daysApplicable === undefined || daysApplicable.length === 0) {
            return (
                <TableContainer className={classes.tableContainer}>
                    <Table>
                        <TableBody key={`${type}-TimeTB`}>
                            <TableRow>
                                <TableCell>No hour ranges captured yet</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        } else {
            const transformedDays = getTimeDisplay(daysApplicable);
            return (
                <TableContainer className={classes.tableContainer}>
                    <Table>
                        <TableBody key={`${type}-TimeTB`}>
                        { transformedDays.map(td => { 
                            return (
                                <TableRow key={`${type}-${td.day}`}>
                                    <TableCell>{td.dayDescription}</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{td.time}</TableCell>
                                    <TableCell><Fab onClick={() => handleDeleteDay(type, td.day)} className={classes.fabButtonSuperSmall} color="secondary" aria-label="remove"><RemoveIcon /></Fab></TableCell>
                                </TableRow>
                            )
                        }) }
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
    }

    return (
        <Grid item xs={6} key={type}>
            <Paper elevation={4} className={classes.paper}>
                <Typography>{type === timeTypes[0] ? 'Work hours' : 'Sleep hours'}</Typography>
                {daysDescription(type)}
                <Fab onClick={() => handleOpen(type)} className={classes.fab} size="small" color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Paper>
        </Grid>
    )
}

export default Hours;