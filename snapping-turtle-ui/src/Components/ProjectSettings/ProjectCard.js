import React, { useState } from 'react';
import { Grid, Paper, TextField, FormControlLabel, Switch, Select, FormControl, InputLabel, MenuItem, TableContainer, TableBody, TableRow, TableCell, Table, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';

import Tasks from './Tasks';
import FabControls from './FabControls';
import { updateProject, deleteProject } from '../../Common/TrackingSettings';

const useStyles = makeStyles((theme) => ({ 
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column'
    }
}));

const ProjectCard = (props) => {
    const classes = useStyles();
    const { project, updateProjectState, removeInternalProject, categories } = props;
    const [internalProject, setInternalProject] = useState(project);

    const [value, setValue] = useState(project.editState ? 1 : 0); 
    const [controlValue, setControlValue] = useState(project.editState ? 1 : 0);   
    const handleEditStateChange = () => {
        if (internalProject.editState) {
            updateProject(internalProject)
            .then(response => {
                updateProjectState(response, internalProject.internalId);
                setInternalProject({...response, editState: false});
                setValue(0);
                setControlValue(0);
            });
        } else {
            setInternalProject({...internalProject, editState: true, expanded: true});
            setValue(1);
            setControlValue(1);
        }
    }

    const handleExpandState = () => {
        if (controlValue === 1) {
            if (internalProject._id !== undefined) {
                deleteProject(internalProject);
            }
            removeInternalProject(internalProject, internalProject.internalId);
        } else {
            setInternalProject({...internalProject, expanded: true});
            setControlValue(1);
        }
    }

    const handleNameChange = (e) => {
        setInternalProject({...internalProject, name: e.target.value});
    }
    const handleWorkRelatedChange = (e) => {
        setInternalProject({...internalProject, workRelated: e.target.checked});
    }
    const handleCategoryChange = (e) => {
        setInternalProject({...internalProject, category: e.target.value});
    }

    const categoriesDisplay = () => {
        const relatedCategories =
            (internalProject.workRelated ?
            categories.workCategories :
            categories.nonWorkCategories);
        if (relatedCategories && relatedCategories.length > 0) {
            return relatedCategories
                .map(c => { return c.categoryDescription; })
                .map(category => {
                    return ( <MenuItem key={category} value={category}>{category}</MenuItem> )
                });
        } else {
            return null;
        }
    }

    const handleAddTask = () => {
        const currentProject = {...internalProject};
        if (!currentProject.taskTypes) {
            currentProject.taskTypes = [];
        }
        currentProject.taskTypes.push({
            taskDescription: '', 
            requireAdditionalDescription: true,
            id: uuidv4()
        });
        setInternalProject(currentProject);
    }
    const handleDeleteTask = (id) => {
        const currentProject = {...internalProject};
        currentProject.taskTypes = currentProject.taskTypes.filter(t => t.id !== id);
        setInternalProject(currentProject);
    }
    const handleEditTaskName = (e, id) => {
        const currentProject = {...internalProject};
        const index = currentProject.taskTypes.findIndex(t => t.id === id);
        currentProject.taskTypes[index].taskDescription = e.target.value;
        setInternalProject(currentProject);
    }
    const handleEditTaskRequireDesc = (e, id) => {
        const currentProject = {...internalProject};
        const index = currentProject.taskTypes.findIndex(t => t.id === id);
        currentProject.taskTypes[index].requireAdditionalDescription = e.target.checked;
        setInternalProject(currentProject);
    }

    const projectEditState = (
        <Paper elevation={0} className={classes.paper}>
            <TextField value={internalProject.name} label="Project Name" onChange={handleNameChange} />
            <FormControlLabel
                control={<Switch color="primary" checked={internalProject.workRelated} onChange={handleWorkRelatedChange} />}
                label="Work Related"
                labelPlacement="start" />
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="category-select">Category</InputLabel>
                <Select
                    labelId="category-select"
                    value={internalProject.category}
                    onChange={handleCategoryChange}>
                        <MenuItem value="">None</MenuItem>
                        {categoriesDisplay()}
                    </Select>
            </FormControl>
        </Paper>
    );

    const projectDisplayState = (
        <TableContainer>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>Project name</TableCell>
                        <TableCell>:</TableCell>
                        <TableCell>{internalProject.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Work related</TableCell>
                        <TableCell>:</TableCell>
                        <TableCell>{internalProject.workRelated ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>:</TableCell>
                        <TableCell>{internalProject.category}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );

    const expandedState = (
        <Paper elevation={0} className={classes.paper}>
            { internalProject.editState ? projectEditState : projectDisplayState }
            <Tasks tasks={internalProject.taskTypes === undefined ? [] : internalProject.taskTypes}
                editState={internalProject.editState}
                handleEditTaskName={handleEditTaskName}
                handleEditTaskRequireDesc={handleEditTaskRequireDesc}
                handleAddTask={handleAddTask}
                handleDeleteTask={handleDeleteTask} />
        </Paper>
    );

    const collapsedState = (
        <Typography variant="h5">Project: {internalProject.name}</Typography>
    );

    return (
        <Grid item xs={6}>
            <Paper elevation={4} className={classes.paper}>
                <FabControls 
                    value={value} 
                    handleEditStateChange={handleEditStateChange}
                    controlValue={controlValue}
                    handleExpandState={handleExpandState} />
                { internalProject.expanded ? expandedState : collapsedState }                    
            </Paper>
        </Grid>
    )
}

export default ProjectCard;