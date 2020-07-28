import React, { useState, useEffect } from 'react';
import { Grid, Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';

import { getProjectSettings, getGeneralSettings } from '../Common/TrackingSettings';
import emptyProjects from '../Assets/EmptyProjects.svg';
import ProjectCard from './ProjectSettings/ProjectCard';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    },      
    fab: {
        alignSelf: 'flex-end'
    },  
    images: {
        height: '300px',
        width: '300px'
    }
}));

const ProjectSettings = props => {
    const classes = useStyles();
    const [ projects, setProjects ] = useState([]);
    const [ categories, setCategories ] = useState({});
    useEffect(() => {
        getProjectSettings()
        .then(response => {
            const mappedResponse = response.map(p => {
                return {
                    ...p,
                    taskTypes: !p.taskTypes ? [] : p.taskTypes.map(t => { return {
                        ...t, 
                        id: t._id}})
                }
            });
            setProjects(mappedResponse);
        });

        getGeneralSettings()
        .then(response => {
            setCategories({
                workCategories: response.projectCategories.filter(c => c.workRelated),
                nonWorkCategories: response.projectCategories.filter(c => !c.workRelated)
            })
        });
    }, []);

    const handleAddEmptyProject = () => {
        const currentProjects = [...projects];
        currentProjects.push({
            name: "",
            category: "",
            workRelated: false,
            editState: true,
            expanded: true,
            internalId: uuidv4()
        });
        setProjects(currentProjects);
    }
    
    const updateProjectState = (project, internalId) => {
        const currentProjects = [...projects];
        const index = currentProjects.findIndex(i => i.internalId === internalId || project._id === i._id );
        currentProjects[index] = project;
        setProjects(currentProjects);
    }

    const removeInternalProject = (project, internalId) => {        
        const currentProjects = [...projects];
        if (internalId) {            
            const newProjects = currentProjects.filter(i => i.internalId !== internalId);
            setProjects(newProjects);
        } else {
            const newProjects = currentProjects.filter(i => i._id !== project._id);
            setProjects(newProjects);
        }
    }

    return (        
        <div className={classes.root}>            
            <Fab onClick={handleAddEmptyProject} className={classes.fab} size="small" color="primary" aria-label="add" variant="extended">
                <AddIcon />
                Add new project
            </Fab>
            <Grid container spacing={3}>
                {projects.length === 0 ? 
                <Grid item xs={12}>
                    <img src={emptyProjects} alt="Empty Projects" className={classes.images} />
                </Grid> : null}

                {projects.map(project => {
                    return (
                        <ProjectCard
                            key={project._id || project.internalId}
                            project={project}
                            updateProjectState={updateProjectState} 
                            removeInternalProject={removeInternalProject}
                            categories={categories}/>
                    );
                })}
            </Grid>
        </div>
    );
}

export default ProjectSettings;