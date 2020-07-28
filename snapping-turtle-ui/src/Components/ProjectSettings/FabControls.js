import React from 'react';
import { Zoom, Fab, Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Edit as EditIcon, ArrowUpward as SubmitIcon, ExpandMore as ExpandIcon, Delete as DeleteIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({ 
    paper: {
        padding: theme.spacing(2),
        textAlign: 'right',
    },    
    fab: {       
        width: '30px',
        height: '30px',
        minHeight:'30px',
        margin: theme.spacing(1)
    },  
}));

const FabControls = (props) => {
    const { value, handleEditStateChange, controlValue, handleExpandState } = props;
    const classes = useStyles();
    const theme = useTheme();
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };
    const editFabs = [
        {
          color: 'secondary',
          className: classes.fab,
          icon: <EditIcon />,
          label: 'Edit',
        },
        {
          color: 'primary',
          className: classes.fab,
          icon: <SubmitIcon />,
          label: 'Submit',
        }
    ];

    
    const controlFabs = [
        {
          color: 'primary',
          className: classes.fab,
          icon: <ExpandIcon />,
          label: 'Show more',
        },
        {
          color: 'warning',
          className: classes.fab,
          icon: <DeleteIcon />,
          label: 'Delete',
        }
    ];

    return (
        <Paper elevation={0} className={classes.paper}>
            {controlFabs.map((fab, index) => (
                <Zoom
                key={fab.color}
                in={controlValue === index}
                timeout={transitionDuration}
                style={{
                    transitionDelay: `${controlValue === index ? transitionDuration.exit : 0}ms`,
                }}
                unmountOnExit
                >
                <Fab onClick={handleExpandState} aria-label={fab.label} className={fab.className} color={fab.color}>
                    {fab.icon}
                </Fab>
                </Zoom>
            ))}
            {editFabs.map((fab, index) => (
                <Zoom
                key={fab.color}
                in={value === index}
                timeout={transitionDuration}
                style={{
                    transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
                }}
                unmountOnExit
                >
                <Fab onClick={handleEditStateChange} aria-label={fab.label} className={fab.className} color={fab.color}>
                    {fab.icon}
                </Fab>
                </Zoom>
            ))}
        </Paper>
    )

}

export default FabControls;