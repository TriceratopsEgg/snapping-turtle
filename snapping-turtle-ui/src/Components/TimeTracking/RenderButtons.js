import React from 'react';
import { Grid, Button } from '@material-ui/core';

const RenderButtons = (props) => {
    const { buttons, workRelated, project, tasks, track } = props;
    const actions = {
        workRelated: workRelated,
        project: project,
        tasks: tasks,
        track: track
    }
    return (
        <Grid container spacing={3}>
            {buttons.map(b => {
                return (
                    <Grid key={b.key} item xs={b.size}>
                        <Button size="large" variant="contained" color={b.colour} onClick={() => actions[b.action](b.params)}>{b.text}</Button>
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default RenderButtons;