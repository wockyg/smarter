import { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import Tooltip from '@mui/material/Tooltip';
import SaveIcon from '@mui/icons-material/Save';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

import useGetReferral from '../hooks/useGetReferral';
import useGetDOSDropdown from '../hooks/useGetDOSDropdown';
import useGetCptForState from '../hooks/useGetCptForState';
import useGetReferral_icd10 from '../hooks/useGetReferral_icd10';
import useAddD1500 from '../hooks/useAddD1500';
import useAddD1500Rows from '../hooks/useAddD1500Rows';

import { useParams } from 'react-router-dom';

import Skeleton from '@mui/material/Skeleton';

import HCFATemplate from './HCFATemplate';

import { Formik, Form, useField, Field, useFormikContext } from 'formik';
import * as Yup from 'yup';

import { PDFDownloadLink, pdf } from '@react-pdf/renderer';

import '../App.css';

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

export default function RowGenerator() {

    let { id: linkId } = useParams();

    const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);
    const { status: statusVisits, data: visits, error: errorVisits, isFetching: isFetchingVisits } = useGetDOSDropdown(linkId);
    const { status: statusReferral_icd10, data: codeList, error: errorReferral_icd10, isFetching: isFetchingReferral_icd10 } = useGetReferral_icd10(+linkId);
    const { status: statusCpt, data: codes, error: errorCpt, isFetching: isFetchingCpt } = useGetCptForState(selectedClaim?.jurisdiction);

    const hcfaAdd = useAddD1500();
    const rowAdd = useAddD1500Rows();

    const filteredVisits = visits?.filter(v => v?.attend === "Yes" && v.v1500?.length > 0);

    const [editIDx, setEditIDx] = useState(-1);
    const [currentEditRow, setCurrentEditRow] = useState({});
    const [revertData, setRevertData] = useState({});
    const [d1500SendFormat, setD1500SendFormat] = useState('');

    const { cptRows, setCptRows, selectedD1500, setSelectedD1500 } = useContext(SelectedClaimContext);

    const dos_array = cptRows?.map(row => row.dos).sort((a, b) => {
                                        if (a.dos === null){
                                            return 1;
                                        }
                                        if (b.dos === null){
                                            return -1;
                                        }
                                        if (a.dos === b.dos){
                                            return 0;
                                        }
                                        return a.dos < b.dos ? -1 : 1;
                                    });

    const uniqueDOS = Array.from(new Set(dos_array));

    const uniqueDOSReorder = uniqueDOS.map(x => `${x.substring(5,7)}-${x.substring(8,10)}-${x.substring(0,4)}`);

    // console.log(dos_array);
    // console.log("UNIQUE:", uniqueDOS);
    // console.log("REORDER:", uniqueDOSReorder);

    let total_charges = 0.0;

    let total_units = 0;

    cptRows?.forEach((row) => {
        total_charges = total_charges + (+row.charges);
        total_units = total_units + (+row.units);
    })

    total_charges = (Math.round(total_charges * 100) / 100).toFixed(2);

    const MyDoc = (
    <HCFATemplate
    selectedClaim={selectedClaim}
    codeList={codeList}
    cptRows={cptRows}
    />
    );

    pdf(MyDoc).toBlob().then(blob => console.log(blob));

    const tableHeadProps = {
    //  border: '1px solid black',
     padding: 0.5,   
    };

    const dummyRowProps = {
    //  color: '#138D75',
     color: '#FFFFFF',
    //  background: '#138D75',
     background: '#FFFFFF',
     padding: 0.5,   
    };

    const tableBodyProps = {
     border: '1px solid black',
     padding: 0.5,
    };

    const handleRemove = (i) => {
        const newData = cptRows?.filter((x, j) => j !== i);
        setCptRows(newData);
    }

    const handleSwap = (i, direction) => {
        console.log("swap", i, direction);
        const j = direction === 'up' ? i - 1 : (direction === "down" ? i + 1 : i)
        const tempRows = [...cptRows];
        const tempRow = tempRows[i];
        tempRows[i] = tempRows[j];
        tempRows[j] = tempRow;
        setCptRows(tempRows);
    }

    const startEditing = (i, row) => {
        console.log("start editing");
        setEditIDx(i);
        setRevertData(row);
        setCurrentEditRow(row);
        console.log(cptRows);
    }

    const stopEditing = (row) => {
        console.log("done editing");
        const filteredRows = cptRows.filter(r => r.rank !== currentEditRow.rank);
        setCptRows([...filteredRows, currentEditRow]);
        setEditIDx(-1);
        setRevertData({});
        setCurrentEditRow({});
    }

    const cancelEdit = () => {
        console.log("cancel edit");
        setEditIDx(-1);
        setRevertData({});
        setCurrentEditRow({});
    }

    const handleChangeInlineEdit = (event, key, i) => {
        if (key === 'cpt') {
            
            const maxUnit = codes?.filter(c => c?.Code === +event.target.value)[0].MaxUnit;

            const newUnits = maxUnit === 1 ? '1' : '';

            const rateBase = codes?.filter(c => c?.Code === +event.target.value)[0][selectedClaim?.jurisdiction];
            const rateTotal = (rateBase * +newUnits).toFixed(2);

            const newRow = {...currentEditRow, [key]: event.target.value === '' ? null : event.target.value, charges: rateTotal, units: newUnits};
            
            setCurrentEditRow(newRow);
        }
        else if (key === 'units') {

            const rateBase = codes?.filter(c => c?.Code === +currentEditRow.cpt)[0][selectedClaim?.jurisdiction];
            const rateTotal = (rateBase * +event.target.value).toFixed(2);

            const newRow = {...currentEditRow, [key]: event.target.value === '' ? null : event.target.value, charges: +rateTotal};
            
            setCurrentEditRow(newRow);
        }
        else {
            const newRow = {...currentEditRow, [key]: event.target.value === '' ? null : event.target.value};
            setCurrentEditRow(newRow);
        }
    };

    const handleUpdateD1500SendFormat = (event) => {
        setD1500SendFormat(event.target.value);
    };

    const handleDownload = (event) => {
        // console.log("ggglllllizzzyyy");
        if (cptRows.length > 0) {
            const values = {
                referralId: selectedClaim.referralId, 
                sendFormat: d1500SendFormat, 
                cptRows: cptRows, 
                dateApproved: new Date().toISOString(),
                physician_name: selectedD1500?.physician_name,
                physician_npi: selectedD1500?.physician_npi,
                patient_account_no: selectedD1500?.patient_account_no,
                diagnosis_a: selectedD1500?.diagnosis_a,
                diagnosis_b: selectedD1500?.diagnosis_b,
                diagnosis_c: selectedD1500?.diagnosis_c,
                diagnosis_d: selectedD1500?.diagnosis_d,
                diagnosis_e: selectedD1500?.diagnosis_e,
                diagnosis_f: selectedD1500?.diagnosis_f,
                diagnosis_g: selectedD1500?.diagnosis_g,
                diagnosis_h: selectedD1500?.diagnosis_h,
                diagnosis_i: selectedD1500?.diagnosis_i,
                diagnosis_j: selectedD1500?.diagnosis_j,
                diagnosis_k: selectedD1500?.diagnosis_k,
                diagnosis_l: selectedD1500?.diagnosis_l,
                v1500Id: selectedD1500?.v1500Id
            }
                
            hcfaAdd.mutate(values);
            setTimeout(() => {
              setCptRows([]);
              setSelectedD1500(null);
              setD1500SendFormat('');
            }, "500");
        }
        else{
            console.log("womp womp..");
        }
    };

    const CptInput = ({ label, ...props }) => {

        const { values, touched, setFieldValue } = useFormikContext();

        useEffect(() => {

            const maxUnit = values.cpt ? codes?.filter(c => c?.Code === +values?.cpt)[0]?.MaxUnit : -1;
            // set the value of charges, based on cpt and units
            if (values.cpt.trim() !== '') {
                if (maxUnit === 1) {
                    setFieldValue('units', '1');    
                }
                else {
                    setFieldValue('units', '');
                }
            }
        }, [values.cpt, setFieldValue]);

        return (
            <>
                <label htmlFor='cpt' style={{display: 'block'}}>CPT:</label>
                <Field
                as="select" 
                id="cpt"
                name="cpt"
                // className="redBorder"
                >
                    <option value="">Select</option>
                    {codes?.map(v => {
                        return (
                            <option key={v.Code} value={v.Code}>{v.Code}</option>
                        );
                    })}
                </Field>
            </>
        );
    };

    const ChargesInput = ({ label, ...props }) => {

        const { values, touched, setFieldValue } = useFormikContext();

        const [field, meta] = useField(props);

        useEffect(() => {

            // set the value of charges, based on cpt and units
            if (values.cpt.trim() !== '') {
                
                const rateBase = values.cpt ? codes?.filter(c => c?.Code === +values?.cpt)[0][selectedClaim?.jurisdiction] : -1;
                const rateTotal = (rateBase * +values.units).toFixed(2);
                // console.log(values.units);
                if (values.units) {
                    setFieldValue(props.name, +rateTotal);    
                }
                else {
                    setFieldValue(props.name, '');
                }
            }
        }, [values.cpt, values.units, setFieldValue, props.name]);

        return (
            <>
                <label htmlFor={props.name} style={{display: 'block'}}>{label}</label>
                {meta.touched && meta.error ? (
                <input className="redBorder" {...field} {...props} />
            ) : <input {...field} {...props} />}
            </>
        );
    };

    return (
      <div>
                    {/* <button onClick={() => {console.log(formRef?.current?.values.cpt)}}>check</button> */}

                    {/* ADD ROW FORM */}
                    <Formik
                    // innerRef={formRef}
                    initialValues={{
                    // rank: `${numRows+1}`,
                    dos: cptRows.length > 0 ? cptRows[cptRows.length - 1].dos : '',
                    pos: '11',
                    cpt: '',
                    mod1: '',
                    mod2: '',
                    mod3: '',
                    mod4: '',
                    diag: '',
                    charges: '',
                    units: '',
                    provider_npi: '',
                    }}
                    validationSchema={Yup.object({
                        dos: Yup.string().required('Req'),
                        pos: Yup.string().required('Req'),
                        cpt: Yup.string().required('Req'),
                        mod1: Yup.string(),
                        mod2: Yup.string(),
                        mod3: Yup.string(),
                        mod4: Yup.string(),
                        diag: Yup.string().required('Req'),
                        charges: Yup.number().required('Req'),
                        units: Yup.number().required('Req'),
                        provider_npi: Yup.string().required('Req'),
                    })}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            if (cptRows?.length < 6) {
                                console.log('adding row...');
                                const newRows = [...cptRows, values];
                                setCptRows(newRows);
                                // alert(JSON.stringify(values, null, 2));
                            }
                            actions.resetForm(
                                {values: {
                                    // rank: `${numRows+2}`,
                                    dos: values?.dos,
                                    pos: '11',
                                    cpt: '',
                                    mod1: '',
                                    mod2: '',
                                    mod3: '',
                                    mod4: '',
                                    diag: '',
                                    charges: '',
                                    units: '',
                                    provider_npi: values?.provider_npi,
                                }});
                            actions.setSubmitting(false);
                            
                        }, 1000);
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
                                    <CptInput />
                                </Grid>
                                <Grid item xs="auto">
                                    <label htmlFor="units" style={{display: 'block'}}>Unit:</label>
                                    <Field 
                                    as="select" 
                                    id="units"
                                    name="units"
                                    // className="redBorder"
                                    >
                                        {codes?.filter(c => c.Code === +values.cpt)[0]?.MaxUnit === 1 &&
                                        <option value={1}>1</option>
                                        }
                                        {codes?.filter(c => c.Code === +values.cpt)[0]?.MaxUnit > 1 &&
                                        <>
                                        <option value="">-</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        </>
                                        }
                                        {codes?.filter(c => c.Code === +values.cpt)[0]?.MaxUnit > 2 &&
                                        <option value={3}>3</option>
                                        }
                                        {codes?.filter(c => c.Code === +values.cpt)[0]?.MaxUnit > 3 &&
                                        <option value={4}>4</option>
                                        }
                                    </Field>
                                </Grid>
                                <Grid item xs="auto">
                                    <ChargesInput
                                        id="charges"
                                        label="Charges:"
                                        name="charges"
                                        type="text"
                                    />
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
                    <hr />

                    {/* <div style={{ height: 300, width: '100%' }}>
                        <DataGrid rowHeight={25} sx={{ fontSize: 8 }} rows={rows} columns={columns} hideFooter />
                    </div> */}

                    {/* ROWS */}
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                            <TableRow>
                                <TableCell sx={{...tableHeadProps}}><u>#</u></TableCell>
                                <TableCell sx={{...tableHeadProps}}><u>DOS</u></TableCell>
                                <TableCell sx={{...tableHeadProps}}><u>POS</u></TableCell>
                                <TableCell sx={{...tableHeadProps}}><u>CPT</u></TableCell>
                                <TableCell sx={{...tableHeadProps}}><u>MOD</u></TableCell>
                                <TableCell sx={{...tableHeadProps}}></TableCell>
                                <TableCell sx={{...tableHeadProps}}></TableCell>
                                <TableCell sx={{...tableHeadProps}}></TableCell>
                                <TableCell sx={{...tableHeadProps}}><u>DIAG</u></TableCell>
                                <TableCell sx={{...tableHeadProps}}><u>CHARG</u></TableCell>
                                <TableCell sx={{...tableHeadProps}}><u>UNIT</u></TableCell>
                                <TableCell sx={{...tableHeadProps}}><u>NPI</u></TableCell>
                                <TableCell sx={{...tableHeadProps}}></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody> 
                            {cptRows?.map((row, index) => {
                                const currentlyEditing = editIDx === index;
                                return (
                                <TableRow key={index} hover>
                                    
                                    <TableCell sx={{...tableBodyProps}} component="th" scope="row">{index+1}</TableCell>
                                    <TableCell sx={{...tableBodyProps}} >
                                        {currentlyEditing ? 
                                        <select
                                        name="dos"
                                        onChange={(event) => handleChangeInlineEdit(event, 'dos', index)}
                                        value={currentEditRow.dos} 
                                        >
                                            <option value="">Select</option>
                                            {filteredVisits?.map(v => {
                                                return (
                                                    <option key={v.billingId} value={v.dos}>{v.dos}</option>
                                                );
                                            })}
                                        </select>
                                        : 
                                        row.dos}
                                    </TableCell>
                                    <TableCell sx={{...tableBodyProps}} >
                                        {currentlyEditing ? 
                                        <select
                                        name="pos"
                                        onChange={(event) => handleChangeInlineEdit(event, 'pos', index)}
                                        value={currentEditRow.pos} 
                                        >
                                            <option value={11}>11</option>
                                            <option value={12}>12</option>
                                        </select>
                                        :
                                        row.pos}
                                    </TableCell>
                                    <TableCell sx={{...tableBodyProps}} >
                                        {currentlyEditing ? 
                                        <select
                                        name="cpt"
                                        onChange={(event) => handleChangeInlineEdit(event, 'cpt', index)}
                                        value={currentEditRow.cpt} 
                                        >
                                            <option value="">Select</option>
                                            {codes?.map(v => {
                                                return (
                                                    <option key={v.Code} value={v.Code}>{v.Code}</option>
                                                );
                                            })}
                                        </select>
                                        :
                                        row.cpt}
                                    </TableCell>
                                    <TableCell sx={{...tableBodyProps}} >
                                        {currentlyEditing ? 
                                        <input
                                        style={{width: '4ch'}}
                                        name='mod1'
                                        onChange={(event) => handleChangeInlineEdit(event, 'mod1', index)} 
                                        value={currentEditRow.mod1}
                                        />
                                        :
                                        row.mod1}
                                    </TableCell>
                                    <TableCell sx={{...tableBodyProps}} >
                                        {currentlyEditing ? 
                                        <input
                                        disabled={currentEditRow.mod1 ? false : true}
                                        style={{width: '4ch'}}
                                        name='mod2'
                                        onChange={(event) => handleChangeInlineEdit(event, 'mod2', index)} 
                                        value={currentEditRow.mod2}
                                        />
                                        :
                                        row.mod2}
                                    </TableCell>
                                    <TableCell sx={{...tableBodyProps}} >
                                        {currentlyEditing ? 
                                        <input
                                        disabled={currentEditRow.mod2 ? false : true}
                                        style={{width: '4ch'}}
                                        name='mod3'
                                        onChange={(event) => handleChangeInlineEdit(event, 'mod3', index)} 
                                        value={currentEditRow.mod3}
                                        />
                                        :
                                        row.mod3}
                                    </TableCell>
                                    <TableCell sx={{...tableBodyProps}} >
                                        {currentlyEditing ? 
                                        <input
                                        disabled={currentEditRow.mod3 ? false : true}
                                        style={{width: '4ch'}}
                                        name='mod4'
                                        onChange={(event) => handleChangeInlineEdit(event, 'mod4', index)} 
                                        value={currentEditRow.mod4}
                                        />
                                        :
                                        row.mod4}
                                    </TableCell>
                                    <TableCell sx={{...tableBodyProps}} >
                                        {currentlyEditing ? 
                                        <input
                                        style={{width: '6ch'}}
                                        name='diag'
                                        onChange={(event) => handleChangeInlineEdit(event, 'diag', index)} 
                                        value={currentEditRow.diag}
                                        />
                                        :
                                        row.diag}
                                    </TableCell>
                                    <TableCell sx={{...tableBodyProps}} >
                                        {currentlyEditing ? 
                                        <input
                                        style={{width: '7ch'}}
                                        name='charges'
                                        onChange={(event) => handleChangeInlineEdit(event, 'charges', index)} 
                                        value={currentEditRow.charges}
                                        />
                                        :
                                        row.charges}
                                    </TableCell>
                                    <TableCell sx={{...tableBodyProps}} >
                                        {currentlyEditing ? 
                                        <select
                                        name="units"
                                        onChange={(event) => handleChangeInlineEdit(event, 'units', index)}
                                        value={currentEditRow.units} 
                                        >
                                            {codes?.filter(c => c.Code === +currentEditRow.cpt)[0]?.MaxUnit === 1 &&
                                            <option value={1}>1</option>
                                            }
                                            {codes?.filter(c => c.Code === +currentEditRow.cpt)[0]?.MaxUnit > 1 &&
                                            <>
                                            <option value="">-</option>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            </>
                                            }
                                            {codes?.filter(c => c.Code === +currentEditRow.cpt)[0]?.MaxUnit > 2 &&
                                            <option value={3}>3</option>
                                            }
                                            {codes?.filter(c => c.Code === +currentEditRow.cpt)[0]?.MaxUnit > 3 &&
                                            <option value={4}>4</option>
                                            }
                                        </select>
                                        :
                                        row.units}
                                    </TableCell>
                                    <TableCell sx={{...tableBodyProps}} >
                                        {currentlyEditing ? 
                                        <input
                                        style={{width: '11ch'}}
                                        name='provider_npi'
                                        onChange={(event) => handleChangeInlineEdit(event, 'provider_npi', index)} 
                                        value={currentEditRow.provider_npi}
                                        />
                                        :
                                        row.provider_npi}
                                    </TableCell>
                                    <TableCell sx={{...tableBodyProps}} >
                                        <Grid container>
                                            {currentlyEditing ? 
                                            <>
                                            <Grid item xs={6}>
                                                <CheckIcon
                                                fontSize='small'
                                                onClick={() => stopEditing()}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <ClearIcon
                                                fontSize='small'
                                                onClick={() => cancelEdit(index, row)}
                                                />
                                            </Grid>
                                            </> : 
                                            <>
                                            <Grid item xs={cptRows.length > 1 ? 3 : 6}>
                                                <EditIcon
                                                fontSize='small'
                                                onClick={() => startEditing(index, row)}
                                                />
                                            </Grid>
                                            <Grid item xs={cptRows.length > 1 ? 3 : 6}>
                                                <DeleteIcon
                                                fontSize='small'
                                                onClick={() => handleRemove(index)}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                {index > 0 &&
                                                <KeyboardArrowUpIcon
                                                fontSize='small'
                                                onClick={() => handleSwap(index, 'up')}
                                                />
                                                }
                                            </Grid>
                                            <Grid item xs={3}>
                                                {index < (cptRows.length - 1) &&
                                                <KeyboardArrowDownIcon
                                                fontSize='small'
                                                onClick={() => handleSwap(index, 'down')}
                                                />
                                                }
                                            </Grid>
                                            </>}
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            )})}
                            {cptRows.length < 1 &&
                            <TableRow>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                            </TableRow>
                            }
                            {cptRows.length < 2 &&
                            <TableRow sx={{padding: 0.5}}>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                            </TableRow>
                            }
                            {cptRows.length < 3 &&
                            <TableRow sx={{padding: 0.5}}>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                            </TableRow>
                            }
                            {cptRows.length < 4 &&
                            <TableRow sx={{padding: 0.5}}>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                            </TableRow>
                            }
                            {cptRows.length < 5 &&
                            <TableRow sx={{padding: 0.5}}>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                            </TableRow>
                            }
                            {cptRows.length < 6 &&
                            <TableRow sx={{padding: 0.5}}>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                                <TableCell sx={{...dummyRowProps}}>x</TableCell>
                            </TableRow>
                            }
                            {/* totals row */}
                            {cptRows.length >= 0 &&
                            <>
                            <TableRow>
                                <TableCell />
                                <TableCell />
                                <TableCell />
                                <TableCell />
                                <TableCell />
                                <TableCell />
                                <TableCell />
                                <TableCell />
                                <TableCell />
                                <TableCell />
                                <TableCell />
                                <TableCell />
                                <TableCell />
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{background: '#E0E4E8'}} />
                                <TableCell sx={{background: '#E0E4E8'}}><u>Totals:</u></TableCell>
                                <TableCell sx={{background: '#E0E4E8'}} />
                                <TableCell sx={{background: '#E0E4E8'}} />
                                <TableCell sx={{background: '#E0E4E8'}} />
                                <TableCell sx={{background: '#E0E4E8'}} />
                                <TableCell sx={{background: '#E0E4E8'}} />
                                <TableCell sx={{background: '#E0E4E8'}} />
                                <TableCell sx={{background: '#E0E4E8'}} />
                                <TableCell sx={{padding: 0.5, borderRight: '1px solid', borderLeft: '1px solid'}}>{total_charges}</TableCell>
                                <TableCell sx={{padding: 0.5}}>{total_units}</TableCell>
                                <TableCell sx={{background: '#ABC3E3'}}>
                                    <div style={{padding: '1px'}}>
                                        <label htmlFor="d1500SendFormat">Format:</label>
                                        <select
                                        name="d1500SendFormat"
                                        onChange={(event) => handleUpdateD1500SendFormat(event)}
                                        value={d1500SendFormat} 
                                        >
                                            <option value=''>Select</option>
                                            <option value='Email'>Email</option>
                                            <option value='Fax'>Fax</option>
                                            <option value='Mail'>Mail</option>
                                        </select>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    
                                        {d1500SendFormat !== '' &&
                                        <PDFDownloadLink
                                        document={
                                            <HCFATemplate
                                            selectedClaim={selectedClaim}
                                            codeList={codeList}
                                            cptRows={cptRows}
                                            />
                                        }
                                        onClick={(e) => handleDownload(e)}
                                        fileName={`${selectedClaim.claimant} ADJ DOS ${uniqueDOSReorder[0]}${uniqueDOSReorder.length > 1 ? `, ${uniqueDOSReorder[1]}` : ''}${uniqueDOSReorder.length > 2 ? `, ${uniqueDOSReorder[2]}` : ''}${uniqueDOSReorder.length > 3 ? `, ${uniqueDOSReorder[3]}` : ''}${uniqueDOSReorder.length > 4 ? `, ${uniqueDOSReorder[4]}` : ''}${uniqueDOSReorder.length > 5 ? `, ${uniqueDOSReorder[5]}` : ''}.pdf`}
                                        >
                                        {({ blob, url, loading, error }) =>
                                            loading ? <HourglassTopIcon fontSize='small' /> : <SaveIcon fontSize='small' />
                                        }
                                        </PDFDownloadLink>
                                        }
                                    
                                </TableCell>
                            </TableRow>
                            </>
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
    );
}