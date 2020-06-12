import React, { useState, useEffect } from 'react';
import { 
    Grid,
    Modal
 } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Hours from './GeneralSettings/Hours';
import BreakWarningIntervals from './GeneralSettings/BreakWarningIntervals';
import ProjectCategories from './GeneralSettings/ProjectCategories';
import DaysInputModal from './GeneralSettings/DaysInputModal';
import ProjectCategoryModal from './GeneralSettings/ProjectCategoryModal';

import { getGeneralSettings } from '../Common/TrackingSettings';
import { timeTypes } from '../Common/GeneralUtils';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const GeneralSettings = props => {
    const classes = useStyles();

    const [generalSettings, setGeneralSettings] = useState({});

    useEffect(() => {
        getGeneralSettings()
        .then(response => {
            setGeneralSettings(response);
        });
    }, []);
    
    const [modalSettings, setModalSettings] = React.useState({open: false, type: ''});
    const handleOpen = (type) => {
        setModalSettings({ open: !modalSettings.open, type: type });
    };  

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {timeTypes.map(tt => {
                    return (
                        <Hours 
                            key={tt}
                            type={tt} 
                            generalSettings={generalSettings} 
                            setGeneralSettings={setGeneralSettings}
                            handleOpen={handleOpen} />
                    );
                })}
                <BreakWarningIntervals 
                    generalSettings={generalSettings} 
                    setGeneralSettings={setGeneralSettings} />
                <ProjectCategories
                    generalSettings={generalSettings} 
                    setGeneralSettings={setGeneralSettings}
                    handleOpen={handleOpen} />
            </Grid>
            <Modal
                open={modalSettings.open}
                onClose={() => handleOpen('')}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {modalSettings.type === 'projectCategories' 
                    ? <ProjectCategoryModal
                        generalSettings={generalSettings} 
                        setGeneralSettings={setGeneralSettings}
                        setModalSettings={setModalSettings} /> 
                    : <DaysInputModal
                        generalSettings={generalSettings} 
                        setGeneralSettings={setGeneralSettings}
                        setModalSettings={setModalSettings}
                        type={modalSettings.type} />}
            </Modal>
        </div>
    );
}

export default GeneralSettings;