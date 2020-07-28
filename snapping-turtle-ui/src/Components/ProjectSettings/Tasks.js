import React from 'react';
import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Fab, makeStyles, TextField, Switch } from '@material-ui/core';
import { Remove as RemoveIcon, Add as AddIcon } from '@material-ui/icons'

import NoTasks from '../../Assets/NoTasks.svg';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        margin: theme.spacing(2)
    },
    fabButtonSuperSmall: {
        width: '20px',
        height: '20px',
        minHeight:'20px'
    },
    noTasks: {
        height: '70px',
        width: '70px'
    },
    centerCell: {
        textAlign: 'center'
    }
}));

const Tasks = (props) => {
    const { tasks, editState, handleEditTaskName, handleEditTaskRequireDesc, handleAddTask, handleDeleteTask } = props;
    const classes = useStyles();

    const nonEditTasks = (
        tasks.map(task => {
            return (
                <TableRow key={task.id}>
                    <TableCell>{task.taskDescription}</TableCell>
                    <TableCell>{task.requireAdditionalDescription ? 'Yes' : 'No'}</TableCell>
                </TableRow>
            )
        })
    );

    const editTasks = (
        tasks.map(task => {
            return (
                <TableRow key={task.id}>
                    <TableCell><TextField value={task.taskDescription} onChange={(e) => handleEditTaskName(e, task.id)} /></TableCell>
                    <TableCell><Switch checked={task.requireAdditionalDescription} onChange={(e) => handleEditTaskRequireDesc(e, task.id)} /></TableCell>
                    <TableCell><Fab onClick={() => handleDeleteTask(task.id)} className={classes.fabButtonSuperSmall} color="secondary" aria-label="remove"><RemoveIcon /></Fab></TableCell>
                </TableRow>
            )
        })
    );

    return (
        <div>
            <TableContainer className={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task name</TableCell>
                            <TableCell>Require description</TableCell>
                            {editState ? <TableCell><Fab onClick={handleAddTask} className={classes.fabButtonSuperSmall} color="primary" aria-label="remove" ><AddIcon /></Fab></TableCell> : null }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.length === 0 ? 
                            <TableRow><TableCell colSpan={editState ? 3 : 2} className={classes.centerCell}><img src={NoTasks} alt="No Tasks" className={classes.noTasks} /></TableCell></TableRow> :
                            null}
                        { editState ? editTasks : nonEditTasks }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Tasks;