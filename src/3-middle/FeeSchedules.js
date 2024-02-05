import React, { useContext, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import EditableGridItem from '../form-components/EditableGridItem';

import ReportIcon from '@mui/icons-material/Report';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';

import { Formik, Form, Field, useField } from 'formik';
import * as Yup from 'yup';

import useAddCPT from '../hooks/useAddCPT';
import useUpdateCPT from '../hooks/useUpdateCPT';
import useGetAllFeeSchedules from '../hooks/useGetAllFeeSchedules';


export default function FeeSchedules(props) {

    const { status: statusCpt, data: feeSchedules, error: errorCpt, isFetching: isFetchingCpt } = useGetAllFeeSchedules();

    const states = feeSchedules && Object.keys(feeSchedules[0]).filter(k => k !== 'Code' && k !== 'MaxUnit');

    const cptAdd = useAddCPT();
    const cptUpdate = useUpdateCPT();

    const [highlightedCell, setHighlightedCell] = useState({row: -1, col: -1});
    const [clickInfo, setClickInfo] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const [menuType, setMenuType] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [updateRow, setUpdateRow] = useState(null);

    const open = Boolean(anchorEl);

    const handleOpenMenu = (event, type, row) => {
        row.maxUnit > 1 && setAnchorEl(event.currentTarget);
        setMenuType(type);
        setClickInfo(row);
        // setUpdateRow(row);
        // console.log(row);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setMenuType(null);
        setUpdating(false);
    };

    const handleStartUpdateCode = () => {
        setUpdating(true);
    };

    const handleAddRow = () => {

        handleCloseMenu();
    };

    const handleRemoveRow = () => {

        handleCloseMenu();
    };

    const handleUpdateRow = () => {
        
        handleCloseMenu();
    };

    const handleHoverRate = (r, c) => {
        setHighlightedCell({row: r, col: c});
    };

    return (
        <div>
        {feeSchedules && 
        <>
        <Grid container>
            <Grid item xs={10} sx={{textAlign: 'left', paddingLeft: 1}}>
                <u>Fee Schedules</u>
            </Grid>
            <Grid item xs={2}>
                <IconButton
                onClick={(e) => handleOpenMenu(e, 'add')}
                >
                <AddBoxIcon fontSize='small' />
                </IconButton>
            </Grid>
        </Grid>
        <TableContainer component={Paper} sx={{height: 500}}>
            <Table aria-label="cpt table" size='small' stickyHeader>
                <TableHead>
            <TableRow>
                <TableCell sx={{ paddingLeft: 0.5, position: 'sticky', left: 0, background: '#FFFFFF' }}><u>Code</u></TableCell>
                {/* TableCell for each state */}
                {states.map((s, k) => (
                    <TableCell sx={{ paddingLeft: 0.5, fontWeight: highlightedCell.col === k ? 'bold' : 'normal' }}><u>{s}</u></TableCell>
                ))}
            </TableRow>
            </TableHead>
            <TableBody>
                {feeSchedules.map((row, i) => {

                    const isRow = highlightedCell.row === i;

                    

                    const selectedCodeStyle = {
                        paddingLeft: 0.5,
                        fontSize: 'small',
                        border: '1px solid #D7DBDD',
                        backgroundColor: '#EAECEE'
                    }
                    const selectedRateStyle = {
                        paddingLeft: 0.5,
                        fontSize: 'small',
                        border: '1px solid #D7DBDD',
                        backgroundColor: '#D5F5E3',
                        fontWeight: 'bold'
                    }
                    const normalStyle = {
                        paddingLeft: 0.5,
                        fontSize: 'small',
                        border: '1px solid #D7DBDD',
                        backgroundColor: 'none'
                    }
            
                    return (
                        <TableRow
                            hover
                            key={row.Code}
                        >
                            <TableCell 
                            align="left" 
                            sx={{ cursor: 'pointer', position: 'sticky', left: 0, fontWeight: 'bold', background: isRow ? '#D5F5E3' : '#FFFFFF'} }
                            // onClick={(e) => handleOpenMenu(e, 'code', {code: row.Code, maxUnit: row.MaxUnit, rate: row[jurisdiction], state: jurisdiction})}
                            >
                                <u>{row?.Code}</u>
                            </TableCell>

                            {/* TableCell for each state */}
                            {states.map((s, j) => 
                            {
                                const isCol = highlightedCell.col === j;

                                const isBullseye = highlightedCell.row === i && highlightedCell.col === j;

                                return (
                                    <TableCell 
                                    key={j}
                                    align="left" 
                                    sx={ isBullseye ? selectedRateStyle : (isCol ? {...selectedCodeStyle} : {...normalStyle}) }
                                    onMouseEnter={() => handleHoverRate(i, j)}
                                    onClick={(e) => handleOpenMenu(e, 'rateUnits', {code: row.Code, maxUnit: row.MaxUnit, rate: feeSchedules.filter(f => f.Code === row.Code)[0][s]})}
                                    >
                                        {feeSchedules.filter(f => f.Code === row.Code)[0][s]}
                                    </TableCell>
                                )
                            })}
                            
                        </TableRow>
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>

        <Menu
        id="add-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        >

            {menuType === 'rateUnits' &&
            <MenuItem>
                {clickInfo.maxUnit > 1 && `x2: ${(clickInfo.rate * 2).toFixed(2)}`}<br />
                {clickInfo.maxUnit > 2 && `x3: ${(clickInfo.rate * 3).toFixed(2)}`}<br />
                {clickInfo.maxUnit > 3 && `x4: ${(clickInfo.rate * 4).toFixed(2)}`}<br />
            </MenuItem>
            }

            {menuType === 'code' && updating &&
            <MenuItem>
                <Formik
                enableReinitialize
                initialValues={{
                    Code: updateRow.code,
                    OriginalCode: updateRow.code,
                    MaxUnit: updateRow.maxUnit,
                    Rate: updateRow.rate,
                    State: updateRow.state,
                }}
                validationSchema={Yup.object({
                    Code: Yup.number().required(),
                    OriginalCode: Yup.number().required(),
                    MaxUnit: Yup.number().required(),
                    Rate: Yup.number().required(),
                    State: Yup.string().required(),
                })}
                onSubmit={(values, actions) => {

                    // const matches = feeSchedule.filter(f => f.Code === +values.Code);

                    // console.log("values:", values)
                    // console.log("Code:", +values.Code);
                    // console.log("matches:", matches);

                    // if (values.Code !== values.OriginalCode) {
                    //     if (matches.length === 0) {
                    //         console.log("updating CPT Code...", values);
                    //         cptUpdate.mutate(values);
                    //         handleCloseMenu();
                    //     }
                    // }
                    // else {
                    //     console.log("updating CPT Code...", values);
                    //     cptUpdate.mutate(values);
                    //     handleCloseMenu();
                    // }

                    actions.setSubmitting(false);

                }}
                >
                    {formikProps => (
                        <Form>
                            <Grid container spacing={0.5}>
                                <EditableGridItem
                                field='Code'
                                label='Code'
                                type='text'
                                formikProps={formikProps}
                                currentlyEditing={true}
                                width='8ch'
                                />
                                <EditableGridItem
                                field='MaxUnit'
                                label='Max Unit'
                                type='text'
                                formikProps={formikProps}
                                currentlyEditing={true}
                                width='5ch'
                                />
                                <EditableGridItem
                                field='Rate'
                                label='Rate'
                                type='text'
                                formikProps={formikProps}
                                currentlyEditing={true}
                                width='7ch'
                                />
                                <Grid item>
                                    <Button type="submit">Update</Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </MenuItem>
            }

            {menuType === 'code' && !updating &&
            [
            <MenuItem
            onClick={handleStartUpdateCode}
            >
            Update code <ReportIcon color='error' />
            </MenuItem>,
            <MenuItem>
            Remove code <ReportIcon color='error' />
            </MenuItem>
            ]
            }
            
            
        </Menu>

        </>
        }
        </div>
    )
}