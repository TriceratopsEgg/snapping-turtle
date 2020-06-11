import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import GeneralSettings from '../Components/GeneralSettings';
import ProjectSettings from '../Components/ProjectSettings';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    }
  }));

const Settings = props => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                <Typography className={classes.heading}>General Settings</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionDetails}>
                    <GeneralSettings></GeneralSettings>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                <Typography className={classes.heading}>Project Settings</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionDetails}>
                    <ProjectSettings></ProjectSettings>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
}

export default Settings;