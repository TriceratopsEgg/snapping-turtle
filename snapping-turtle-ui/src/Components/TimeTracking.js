import React, { useState, useEffect } from 'react';
import { TableContainer, TableHead, TableRow, TableCell, TableBody, Grid, Table } from '@material-ui/core';

import RenderButtons from './TimeTracking/RenderButtons';
import CurrentTrack from './TimeTracking/CurrentTrack';

import { getProjectSettings, getOngoingTracks, startTrack, endTrack } from '../Common/TrackingSettings';

const TimeTracking = (props) => {
    const [currentTracks, setCurrentTracks] = useState([]);
    useEffect(() => {
        getOngoingTracks()
        .then(response =>{
            setCurrentTracks(response);
        });
    }, []);

    const [trackSettings, setTrackSettings] = useState({});

    const startButton = [{ text: "Start Tracking", action: 'workRelated', colour: "primary", size: 2, key: '1' }];
    const workRelatedButtons = [
        { text: "Work Related", action: 'project', params: true, colour: "secondary", size: 2, key: '1' },
        { text: "Personal Related", action: 'project', params: false, colour: "secondary", size: 2, key: '2' }
    ];

    const [ currentButtons, setButtons ] = useState(startButton);
    const setWorkRelatedButtons = () => {
        setButtons(workRelatedButtons);
    }

    const setTrack = (task) => {
        const internalTrackSettings = {...trackSettings, task: task.taskDescription, requireDescription: task.requireAdditionalDescription};

        startTrack(internalTrackSettings).then(response => {
            const internalTracks = [...currentTracks];
            internalTracks.push(response);
            setCurrentTracks(internalTracks);
            setTrackSettings({});
            setButtons(startButton);
        });
    }

    const setTaskButtons = (project) => {
        setTrackSettings({...trackSettings, project: project.name, category: project.category});

        const taskButtons = project.taskTypes.map(t => {
            return {
                text: t.taskDescription,
                action: 'track',
                params: t,
                colour: "secondary",
                size: 2,
                key: t._id
            }
        });
        setButtons(taskButtons);
    }

    const setProjectButtons = (isWorkRelated) => {
        setTrackSettings({...trackSettings, workRelated: isWorkRelated});

        getProjectSettings({workRelated: isWorkRelated})
        .then(response => {
            const projectButtons = response.map(p => {
                return {
                    text: p.name,
                    action: 'tasks',
                    params: p,
                    colour: "primary",
                    size: 2,
                    key: p._id
                }
            });
            setButtons(projectButtons);
        });
    }

    const handleEndTrack = (track) => {
        endTrack(track)
        .then(response => {
            let internalTracks = [...currentTracks];
            internalTracks = internalTracks.filter(it => it._id !== response._id);
            setCurrentTracks(internalTracks);
        });
    }

    return (
        <Grid container spacing={3}>
            <RenderButtons 
                buttons={currentButtons} 
                workRelated={setWorkRelatedButtons}
                project={setProjectButtons}
                tasks={setTaskButtons}
                track={setTrack} />
            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>Project</TableCell>
                                <TableCell>Task</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Start time</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentTracks.map(ct => {
                                return ( <CurrentTrack key={ct._id} track={ct} handleEndTrack={handleEndTrack} /> );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>

    )
}

export default TimeTracking;