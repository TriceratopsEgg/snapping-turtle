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
    TableCell,
    TableHead
} from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { deleteProjectCategory } from '../../Common/TrackingSettings';

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
    },
}));

const ProjectCategories = (props) => {
    const classes = useStyles();
    const { generalSettings, setGeneralSettings, handleOpen } = props;

    const handleDeleteProjectCategory = (categoryDescription, workRelated) => {
        const internalGeneralSettings = {...generalSettings};
        deleteProjectCategory(internalGeneralSettings, categoryDescription, workRelated).then(settingsReturned =>{
            setGeneralSettings(settingsReturned);
        });
    }

    const projectCategories = () => {
        if (!generalSettings.projectCategories || generalSettings.projectCategories.length === 0) {
            return (
                <TableContainer>
                    <Table>
                        <TableBody key="projectCategoriesTB">
                            <TableRow>
                                <TableCell>No project categories added yet</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        } else {
            return (                
                <TableContainer className={classes.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Category description</TableCell>
                                <TableCell>Work related</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody key="projectCategoriesTB">
                            {generalSettings.projectCategories.map(pc => {
                                return (
                                    <TableRow key={pc.categoryDescription}>
                                        <TableCell>{pc.categoryDescription}</TableCell>
                                        <TableCell>{pc.workRelated ? 'Yes' : 'No'}</TableCell>
                                        <TableCell><Fab onClick={() => handleDeleteProjectCategory(pc.categoryDescription, pc.workRelated)} className={classes.fabButtonSuperSmall} color="secondary" aria-label="remove"><RemoveIcon /></Fab></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
    }

    return (
        <Grid item xs={6} key="projectCategories">
            <Paper elevation={4} className={classes.paper}>
                <Typography>Project categories</Typography>
                {projectCategories()}
                <Fab onClick={() => handleOpen('projectCategories')} className={classes.fab} size="small" color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Paper>
        </Grid>
    );
}

export default ProjectCategories;