import React, { useState } from 'react';
import {
    Paper,
    Typography,
    TextField,
    FormControlLabel,
    Switch,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { createNewProjectCategory } from '../../Common/TrackingSettings';

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
    button: {
        alignSelf: 'flex-end'
    }
}));

const ProjectCategoryModal = React.forwardRef((props, ref) => {
    const { generalSettings, setGeneralSettings, setModalSettings } = props;
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const [ projectCategory, setProjectCategory ] = useState({ description: '', workRelated: false });
    const handlePCDescriptionChange = (e) => {
        setProjectCategory({...projectCategory, description: e.target.value });
    }
    const handlePCWorkRelatedChange = (e) => {
        console.log(e);
        setProjectCategory({...projectCategory, workRelated: e.target.checked });
    }

    const handleCategoryCreation = () => {
        const internalGeneralSettings = {...generalSettings};
        createNewProjectCategory(internalGeneralSettings, projectCategory).then(settingsReturned =>{
            setGeneralSettings(settingsReturned);
            setModalSettings({open: false, type: ''});
        })
        setProjectCategory({ description: '', workRelated: false });
    }

    return (
        <Paper key="projectCategories" style={modalStyle} className={classes.modalPaper}>
            <Typography>Project Category</Typography>
            <TextField onChange={handlePCDescriptionChange} label="Description" />
            <FormControlLabel
                control={<Switch color="primary" onChange={handlePCWorkRelatedChange} />}
                label="Work related"
                labelPlacement="start"
                />
            <Button onClick={handleCategoryCreation} color="primary" variant="contained">Submit</Button>
        </Paper>
    )
})

export default ProjectCategoryModal;