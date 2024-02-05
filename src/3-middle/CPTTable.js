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

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

import { useParams } from 'react-router-dom';

import useGetReferral from '../hooks/useGetReferral';
import useGetCptForState from '../hooks/useGetCptForState';
import useAddCPT from '../hooks/useAddCPT';
import useUpdateCPT from '../hooks/useUpdateCPT';
import useGetDOSDropdown from '../hooks/useGetDOSDropdown';

const AddCodeInput = ({ label, ...props }) => {

  const [field, meta] = useField(props);

  return (
    <>
        <label htmlFor={props.name} style={{display: 'block'}}>{label}</label>
        {meta.touched && meta.error ? (
         <input className="redBorder" {...field} {...props} />
       ) : <input {...field} {...props} />}
    </>
  );
};

export default function CPTTable(props) {

    let { id: linkId } = useParams();

    const { status: statusReferrals, data: selectedClaim, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferral(+linkId);

    const { status: statusCpt, data: feeSchedule, error: errorCpt, isFetching: isFetchingCpt } = useGetCptForState(selectedClaim?.jurisdiction);

    const { status: statusVisits, data: visits, error: errorVisits, isFetching: isFetchingVisits } = useGetDOSDropdown(linkId);
    
    const filteredVisits = visits?.filter(v => v?.attend === "Yes" && v.v1500?.length > 0);

    const cptAdd = useAddCPT();
    const cptUpdate = useUpdateCPT();

    const { cptRows, setCptRows } = useContext(SelectedClaimContext);

    const rowCodes =  cptRows?.map((row) => row.cpt);
    const rowUnits = cptRows?.map((row) => row.units);

    // console.log("cptRows:", cptRows);

    const jurisdiction = selectedClaim?.jurisdiction;

    const [anchorEl, setAnchorEl] = useState(null);
    const [menuType, setMenuType] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [updateRow, setUpdateRow] = useState(null);

    const open = Boolean(anchorEl);

    const handleOpenMenu = (event, type, row) => {
        setAnchorEl(event.currentTarget);
        setMenuType(type);
        setUpdateRow(row);
        console.log(row);

        if (type === 'code') {
            
        }
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

        const rateBase = feeSchedule?.filter(c => c?.Code === +updateRow.code)[0][selectedClaim?.jurisdiction];
        const rateTotal = (rateBase * updateRow.numUnits).toFixed(2);

        // const newRows = [...cptRows, {} ];
        // setCptRows(newRows);
        handleCloseMenu();
    };

    const handleRemoveRow = () => {
        const newRows = cptRows.filter(c => c.cpt !== updateRow.code);
        setCptRows(newRows);
        handleCloseMenu();
    };

    const handleUpdateRow = () => {

        const index = cptRows.findIndex(c => +c.cpt === +updateRow.code);
        console.log("index:", index);

        const rateBase = feeSchedule?.filter(c => c?.Code === +updateRow.code)[0][selectedClaim?.jurisdiction];
        const rateTotal = (rateBase * updateRow.numUnits).toFixed(2);

        const newRows = [...cptRows.slice(0, index), {...cptRows[index], units: updateRow.numUnits, charges: rateTotal}, ...cptRows.slice(index+1)]

        console.log("oldRows:", cptRows);
        console.log("newRows:", newRows);

        setCptRows(newRows);
        
        handleCloseMenu();
    };

    return (
        <div>
        {selectedClaim && 
        <>
        <Grid container>
            <Grid item xs={10} sx={{textAlign: 'left', paddingLeft: 1}}>
                <u>Fee Schedule</u> ({selectedClaim.jurisdiction})
            </Grid>
            <Grid item xs={2}>
                <IconButton
                onClick={(e) => handleOpenMenu(e, 'add')}
                >
                <AddBoxIcon fontSize='small' />
                </IconButton>
            </Grid>
        </Grid>
        <TableContainer component={Paper}>
            <Table aria-label="cpt table" size='small'>
                <TableHead>
            <TableRow>
                <TableCell sx={{ paddingLeft: 0.5 }}>CPT</TableCell>
                <TableCell sx={{ paddingLeft: 0.5, paddingRight: 0 }}>x1</TableCell>
                <TableCell sx={{ paddingLeft: 0.5, paddingRight: 0 }}>x2</TableCell>
                <TableCell sx={{ paddingLeft: 0.5, paddingRight: 0 }}>x3</TableCell>
                <TableCell sx={{ paddingLeft: 0.5, paddingRight: 0 }}>x4</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {feeSchedule && feeSchedule.map((row) => {

                    let hasCode = false; 
                    let codeUnits = -1;

                    rowCodes?.forEach((code, index) => {
                        if (+code === row.Code) {
                            hasCode = true;
                            codeUnits = +rowUnits[index];
                        }
                    })

                    const twoUnits =  (Math.round((row[selectedClaim?.jurisdiction] * 2) * 100) / 100).toFixed(2);
                    const threeUnits =  (Math.round((row[selectedClaim?.jurisdiction] * 3) * 100) / 100).toFixed(2);
                    const fourUnits =  Math.round(((row[selectedClaim?.jurisdiction] * 4) * 100) / 100).toFixed(2);

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
                        backgroundColor: '#D5F5E3'
                    }
                    const normalStyle = {
                        paddingLeft: 0.5,
                        fontSize: 'small',
                        border: '1px solid #D7DBDD',
                        backgroundColor: 'none'
                    }
            
                    return (
                        <TableRow
                            key={row.Code}
                        >
                            <TableCell 
                            align="left" 
                            sx={hasCode ? { ...selectedCodeStyle, cursor: 'pointer'} : { ...normalStyle, cursor: 'pointer'} }
                            onClick={(e) => handleOpenMenu(e, 'code', {code: row.Code, maxUnit: row.MaxUnit, rate: row[jurisdiction], state: jurisdiction})}
                            >
                                <u>{row?.Code}</u>
                            </TableCell>

                            <TableCell 
                            align="left" 
                            sx={codeUnits === 1 ? {...selectedRateStyle} : {...normalStyle}}
                            onClick={(e) => handleOpenMenu(e, 'rate', {code: row.Code, hasCode: hasCode, numUnits: 1, isSameUnits: codeUnits === 1})}
                            >
                                ${row[jurisdiction]}
                            </TableCell>

                            {(row.MaxUnit > 1) &&
                            <TableCell 
                            align="left" 
                            sx={codeUnits === 2 ? {...selectedRateStyle} : {...normalStyle}}
                            onClick={(e) => handleOpenMenu(e, 'rate', {code: row.Code, hasCode: hasCode, numUnits: 2, isSameUnits: codeUnits === 2})}
                            >
                                ${twoUnits}
                            </TableCell>
                            }
                            {(row.MaxUnit > 2) &&
                            <TableCell 
                            align="left" 
                            sx={codeUnits === 3 ? {...selectedRateStyle} : {...normalStyle}}
                            onClick={(e) => handleOpenMenu(e, 'rate', {code: row.Code, hasCode: hasCode, numUnits: 3, isSameUnits: codeUnits === 3})}
                            >
                                ${threeUnits}
                            </TableCell>
                            }
                            {(row.MaxUnit > 3) &&
                            <TableCell 
                            align="left" 
                            sx={codeUnits === 4 ? {...selectedRateStyle} : {...normalStyle}}
                            onClick={(e) => handleOpenMenu(e, 'rate', {code: row.Code, hasCode: hasCode, numUnits: 4, isSameUnits: codeUnits === 4})}
                            >
                                ${fourUnits}
                            </TableCell>
                            }
                            
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
            {menuType === 'add' &&
            <MenuItem>
                <Formik
                enableReinitialize
                initialValues={{
                    Code: '',
                    MaxUnit: '',
                    Rate: '',
                    State: selectedClaim.jurisdiction,
                }}
                validationSchema={Yup.object({
                    Code: Yup.number().required(),
                    MaxUnit: Yup.number().required(),
                    Rate: Yup.number().required(),
                    State: Yup.string().required(),
                })}
                onSubmit={(values, actions) => {

                    const matches = feeSchedule.filter(f => f.Code === +values.Code && f[selectedClaim.jurisdiction] !== null);

                    // console.log("values:", values)
                    // console.log("Code:", +values.Code);
                    // console.log("matches:", matches);

                    if (matches.length === 0) {
                        console.log("adding CPT Code...", values);
                        cptAdd.mutate(values);
                        handleCloseMenu();   
                    }

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
                                    <Button type="submit">Add</Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
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

                    const matches = feeSchedule.filter(f => f.Code === +values.Code);

                    // console.log("values:", values)
                    // console.log("Code:", +values.Code);
                    // console.log("matches:", matches);

                    if (values.Code !== values.OriginalCode) {
                        if (matches.length === 0) {
                            console.log("updating CPT Code...", values);
                            cptUpdate.mutate(values);
                            handleCloseMenu();
                        }
                    }
                    else {
                        console.log("updating CPT Code...", values);
                        cptUpdate.mutate(values);
                        handleCloseMenu();
                    }

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

            {/* clicked on green box - remove row option */}
            {menuType === 'rate' && updateRow.hasCode && updateRow.isSameUnits &&
            <MenuItem
            onClick={handleRemoveRow}
            >
            Remove CPT code from HCFA?
            </MenuItem>
            }

            {/* clicked on white box with green box in same row - update row option */}
            {menuType === 'rate' && updateRow.hasCode && !updateRow.isSameUnits &&
            <MenuItem
            onClick={handleUpdateRow}
            >
            Update # units?
            </MenuItem>
            }

            {/* clicked on white box with no green box in same row - add row option */}
            {menuType === 'rate' && !updateRow.hasCode &&
            <MenuItem
            // onClick={}
            >
            {/* Add CPT code to HCFA? */}
                <Formik
                // innerRef={formRef}
                initialValues={{
                dos: cptRows.length > 0 ? cptRows[cptRows.length - 1].dos : '',
                pos: '11',
                mod1: '',
                mod2: '',
                mod3: '',
                mod4: '',
                diag: cptRows.length > 0 ? cptRows[cptRows.length - 1].diag : '',
                provider_npi: cptRows.length > 0 ? cptRows[cptRows.length - 1].provider_npi : '',
                }}
                validationSchema={Yup.object({
                    dos: Yup.string().required('Req'),
                    pos: Yup.string().required('Req'),
                    mod1: Yup.string(),
                    mod2: Yup.string(),
                    mod3: Yup.string(),
                    mod4: Yup.string(),
                    diag: Yup.string().required('Req'),
                    provider_npi: Yup.string().required('Req'),
                })}
                onSubmit={(values, actions) => {
                    if (cptRows?.length < 6) {
                        console.log('adding row...');
                        const rateBase = feeSchedule?.filter(c => c?.Code === +updateRow.code)[0][selectedClaim?.jurisdiction];
                        const rateTotal = (rateBase * updateRow.numUnits).toFixed(2);

                        const newRows = [...cptRows, {...values, cpt: updateRow.code, units: updateRow.numUnits, charges: rateTotal}];
                        setCptRows(newRows);
                        // alert(JSON.stringify(values, null, 2));
                    }
                    actions.setSubmitting(false);
                    handleCloseMenu();
                }}
                >
                    {({
                        setFieldValue,
                        setFieldTouched,
                        values,
                        errors,
                        touched,
                    }) => (
                    <Form>
                        <Grid container spacing={0.5}>
                            <Grid item xs="auto">
                                <label htmlFor="dos" style={{display: 'block'}}>DOS:</label>
                                <Field 
                                as="select" 
                                id="dos"
                                name="dos"
                                // className="redBorder"
                                >
                                    <option value="">Select</option>
                                    {filteredVisits?.map(v => {
                                        return (
                                            <option key={v.billingId} value={v.dos}>{v.dos}</option>
                                        );
                                    })}
                                </Field>
                            </Grid>
                            <Grid item xs="auto">
                                <label htmlFor="pos" style={{display: 'block'}}>POS:</label>
                                <Field 
                                as="select" 
                                id="pos"
                                name="pos"
                                // className="redBorder"
                                >
                                    <option value={11}>11</option>
                                    <option value={12}>12</option>
                                </Field>
                            </Grid>
                            <Grid item xs="auto">
                                <AddCodeInput
                                    id="mod1"
                                    label="M1:"
                                    name="mod1"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <AddCodeInput
                                    id="mod2"
                                    label="M2:"
                                    name="mod2"
                                    type="text"
                                    disabled={values.mod1 ? false : true}
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <AddCodeInput
                                    id="mod3"
                                    label="M3:"
                                    name="mod3"
                                    type="text"
                                    disabled={values.mod2 ? false : true}
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <AddCodeInput
                                    id="mod4"
                                    label="M4:"
                                    name="mod4"
                                    type="text"
                                    disabled={values.mod3 ? false : true}
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <AddCodeInput
                                    id="diag"
                                    label="D.P.:"
                                    name="diag"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <AddCodeInput
                                    id="provider_npi"
                                    label="Provider NPI:"
                                    name="provider_npi"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs="auto" className='container'>
                                <button type='submit' className='addRowButton'>+</button>
                            </Grid>
                        </Grid>

                    </Form>
                    )}
                </Formik>
            </MenuItem>
            }
            
        </Menu>

        </>
        }
        </div>
    )
}