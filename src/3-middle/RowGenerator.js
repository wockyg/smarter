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

import useAddD1500 from '../hooks/useAddD1500';
import useAddD1500Rows from '../hooks/useAddD1500Rows';
import useAddD1500Merge from '../hooks/useAddD1500Merge';

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

const getUniqueDOSString = (rows)  => {

    const temp = rows.sort((a, b) => {
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

    const dos_array = temp?.map(r => `${(new Date(r.dos).getMonth() + 1) < 10 ? `0${new Date(r.dos).getMonth() + 1}` : `${new Date(r.dos).getMonth() + 1}`}-${(new Date(r.dos).getDate()) < 10 ? `0${new Date(r.dos).getDate()}` : `${new Date(r.dos).getDate()}`}-${new Date(r.dos).getFullYear()}`);
    const uniqueDOS = Array.from(new Set(dos_array));
    
    const dos_array2 = temp?.map(r => r.dos);
    const uniqueDOS2 = Array.from(new Set(dos_array2));
    
    const uniqueDOSString = `${uniqueDOS[0]}${uniqueDOS.length > 1 ? `, ${uniqueDOS[1]}` : ''}${uniqueDOS.length > 2 ? `, ${uniqueDOS[2]}` : ''}${uniqueDOS.length > 3 ? `, ${uniqueDOS[3]}` : ''}${uniqueDOS.length > 4 ? `, ${uniqueDOS[4]}` : ''}${uniqueDOS.length > 5 ? `, ${uniqueDOS[5]}` : ''}` 
    
    return uniqueDOSString
  
}

export default function RowGenerator(props) {

    let { id: linkId } = useParams();

    const {codeList} = props

    const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);
    const { status: statusVisits, data: visits, error: errorVisits, isFetching: isFetchingVisits } = useGetDOSDropdown(linkId);
    const { status: statusCpt, data: codes, error: errorCpt, isFetching: isFetchingCpt } = useGetCptForState(selectedClaim?.jurisdiction);
    
    const hcfaAdd = useAddD1500();
    const hcfaAddMerge = useAddD1500Merge();

    const filteredVisits = visits?.filter(v => v?.attend === "Yes" && v.v1500?.length > 0).sort((a, b) => {
                                        if (a.dos === null){
                                            return 1;
                                        }
                                        if (b.dos === null){
                                            return -1;
                                        }
                                        if (a.dos === b.dos){
                                            return 0;
                                        }
                                        return a.dos > b.dos ? -1 : 1;
                                    });

    const [editIDx, setEditIDx] = useState(-1);
    const [currentEditRow, setCurrentEditRow] = useState({});
    const [revertData, setRevertData] = useState({});

    const { cptRows, setCptRows, selectedV1500: selectedV1500Array, setSelectedV1500, d1500SendFormat, setD1500SendFormat, pendingD1500Id } = useContext(SelectedClaimContext);

    // console.log(selectedV1500Array)

    // const selectedV1500 = selectedV1500Array[0]
    const selectedV1500 = selectedV1500Array && selectedV1500Array.length > 0 ? selectedV1500Array[0] : null
    
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

    total_charges = ((total_charges * 100) / 100).toFixed(2);

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
        const row = cptRows[i]
        const newRows = cptRows?.filter((x, j) => j !== i);
        setCptRows(newRows);
        if (selectedClaim.clientMerge && !newRows.map(r => r.v1500Id).includes(row.v1500Id)) {
            console.log("Last row...")
            const removeV1500 = selectedV1500Array.filter(s => s.v1500Id !== row.v1500Id)
            setSelectedV1500(removeV1500)
        }
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

    const stopEditing = (index) => {
        console.log("done editing");
        // console.log("Current row:", currentEditRow);
        const filteredRows = cptRows.filter(r => r.rowId !== currentEditRow.rowId);
        // console.log("All other rows:", filteredRows);
        const newRows = [...filteredRows.slice(0, index), currentEditRow, ...filteredRows.slice(index)]
        console.log("newRows:", newRows);
        setCptRows(newRows);
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
            const rateTotal = (rateBase * +newUnits * ((100 - (+selectedClaim?.clientDiscount || 0)) / 100)).toFixed(2);

            const newRow = {...currentEditRow, [key]: event.target.value === '' ? null : event.target.value, charges: rateTotal, units: newUnits};
            
            setCurrentEditRow(newRow);
        }
        else if (key === 'units') {

            const rateBase = codes?.filter(c => c?.Code === +currentEditRow.cpt)[0][selectedClaim?.jurisdiction];
            const rateTotal = (rateBase * +event.target.value * ((100 - (+selectedClaim?.clientDiscount || 0)) / 100)).toFixed(2);

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

    const handleSubmitD1500 = (event) => {
        if (cptRows.length > 0) {
            const MyDoc = (
            <HCFATemplate
            selectedClaim={selectedClaim}
            icd10CodeList={codeList}
            cptRows={cptRows}
            />
            );
            pdf(MyDoc).toBlob()
                      .then(blob => {

                        // console.log(selectedV1500)

                        const merge = selectedClaim.clientMerge && selectedV1500Array.length > 1

                        // const v1500_filename= `${selectedClaim.claimant} DOS ${uniqueDOSReorder[0]}${uniqueDOSReorder.length > 1 ? `, ${uniqueDOSReorder[1]}` : ''}${uniqueDOSReorder.length > 2 ? `, ${uniqueDOSReorder[2]}` : ''}${uniqueDOSReorder.length > 3 ? `, ${uniqueDOSReorder[3]}` : ''}${uniqueDOSReorder.length > 4 ? `, ${uniqueDOSReorder[4]}` : ''}${uniqueDOSReorder.length > 5 ? `, ${uniqueDOSReorder[5]}` : ''}.pdf`
                        const d1500_filename= `${selectedClaim.claimant} ADJ DOS ${uniqueDOSReorder[0]}${uniqueDOSReorder.length > 1 ? `, ${uniqueDOSReorder[1]}` : ''}${uniqueDOSReorder.length > 2 ? `, ${uniqueDOSReorder[2]}` : ''}${uniqueDOSReorder.length > 3 ? `, ${uniqueDOSReorder[3]}` : ''}${uniqueDOSReorder.length > 4 ? `, ${uniqueDOSReorder[4]}` : ''}${uniqueDOSReorder.length > 5 ? `, ${uniqueDOSReorder[5]}` : ''}.pdf`

                        const formData = new FormData();
                        formData.append("dateApproved", new Date().toISOString());
                        formData.append("referralId", +selectedClaim.referralId);
                        formData.append("sendFormat", d1500SendFormat);
                        formData.append("d1500Blob", blob);
                        // formData.append("v1500_filename", v1500_filename);
                        formData.append("d1500_filename", d1500_filename);
                        formData.append("total_charges", total_charges);
                        cptRows.length > 0 && formData.append("cptRowsRaw", JSON.stringify(cptRows));
                        
                        if (selectedV1500) {
                            selectedV1500?.physician_name && formData.append("physician_name", selectedV1500?.physician_name);
                            selectedV1500?.physician_npi && formData.append("physician_npi", selectedV1500?.physician_npi);
                            selectedV1500?.patient_account_no && formData.append("patient_account_no", selectedV1500?.patient_account_no);
                            selectedV1500?.diagnosis_a && formData.append("diagnosis_a", selectedV1500?.diagnosis_a);
                            selectedV1500?.diagnosis_b && formData.append("diagnosis_b", selectedV1500?.diagnosis_b);
                            selectedV1500?.diagnosis_c && formData.append("diagnosis_c", selectedV1500?.diagnosis_c);
                            selectedV1500?.diagnosis_d && formData.append("diagnosis_d", selectedV1500?.diagnosis_d);
                            selectedV1500?.diagnosis_e && formData.append("diagnosis_e", selectedV1500?.diagnosis_e);
                            selectedV1500?.diagnosis_f && formData.append("diagnosis_f", selectedV1500?.diagnosis_f);
                            selectedV1500?.diagnosis_g && formData.append("diagnosis_g", selectedV1500?.diagnosis_g);
                            selectedV1500?.diagnosis_h && formData.append("diagnosis_h", selectedV1500?.diagnosis_h);
                            selectedV1500?.diagnosis_i && formData.append("diagnosis_i", selectedV1500?.diagnosis_i);
                            selectedV1500?.diagnosis_j && formData.append("diagnosis_j", selectedV1500?.diagnosis_j);
                            selectedV1500?.diagnosis_k && formData.append("diagnosis_k", selectedV1500?.diagnosis_k);
                            selectedV1500?.diagnosis_l && formData.append("diagnosis_l", selectedV1500?.diagnosis_l);
                            selectedV1500?.v1500Id && formData.append("v1500Id", selectedV1500?.v1500Id);
                            if (merge) {
                                formData.append("v1500IdsRaw", JSON.stringify(selectedV1500Array.map(s => s.v1500Id)));
                                // append totalCharges array
                            }
                        }
                        else {
                            // maunal mode only
                            selectedClaim?.physicianId && formData.append("physician_name", `${selectedClaim?.physicianFirst.toUpperCase()} ${selectedClaim?.physicianLast.toUpperCase()}, MD`);
                            selectedClaim?.physicianNPI && formData.append("physician_npi", selectedClaim?.physicianNPI);
                            selectedV1500?.therapistId && formData.append("patient_account_no", `${selectedClaim.claimantId}-${selectedClaim.therapistId}`);
                            codeList[0] && formData.append("diagnosis_a", codeList[0]?.icd10);
                            codeList[1] && formData.append("diagnosis_b", codeList[1]?.icd10);
                            codeList[2] && formData.append("diagnosis_c", codeList[2]?.icd10);
                            codeList[3] && formData.append("diagnosis_d", codeList[3]?.icd10);
                            codeList[4] && formData.append("diagnosis_e", codeList[4]?.icd10);
                            codeList[5] && formData.append("diagnosis_f", codeList[5]?.icd10);
                            codeList[6] && formData.append("diagnosis_g", codeList[6]?.icd10);
                            codeList[7] && formData.append("diagnosis_h", codeList[7]?.icd10);
                            codeList[8] && formData.append("diagnosis_i", codeList[8]?.icd10);
                            codeList[9] && formData.append("diagnosis_j", codeList[9]?.icd10);
                            codeList[10] && formData.append("diagnosis_k", codeList[10]?.icd10);
                            codeList[11] && formData.append("diagnosis_l", codeList[11]?.icd10);
                            if (merge) {
                                const uniqueDOSStrings = selectedV1500Array.map(s => s.original_dos)
                                formData.append("original_dos_arrayRaw", uniqueDOSStrings);
                            }
                            else {
                                const uniqueDOSString = getUniqueDOSString(cptRows)
                                formData.append("original_dos", uniqueDOSString);
                            }

                            
                        }
                        if (merge) {
                            const dos_array = cptRows?.map(r => r.dos);
                            const uniqueDOS = Array.from(new Set(dos_array));
                            formData.append("unique_dos_arrayRaw", JSON.stringify(uniqueDOS));
                            // TODO separate out total charges by dos
                            const adjusterRates = uniqueDOS.map(u => cptRows.filter(r => r.dos === u.dos).map(x => x.charges)).map(a => a.reduce((partialSum, a) => partialSum + a, 0))
                            console.log("adjusterRates:", adjusterRates)
                            formData.append("adjuster_rates_arrayRaw", JSON.stringify(adjusterRates));
                            // send to new merge endpoint
                            hcfaAddMerge.mutate(formData);
                        }
                        else {
                            hcfaAdd.mutate(formData);
                        }
                        
                      });
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
                const rateTotal = (rateBase * +values.units * ((100 - (+selectedClaim?.clientDiscount || 0)) / 100)).toFixed(2);
                // console.log(rateTotal);
                if (values.units) {
                    setFieldValue('charges', rateTotal);
                }
                else {
                    setFieldValue('charges', '');
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

    const DiagInput = ({ label, ...props }) => {

        const { setFieldValue } = useFormikContext();

        const [field, meta] = useField(props);

        useEffect(() => {

            if (codeList.length > 0) {
                setFieldValue('diag', 'ABCD'.split(0, codeList.length));
            }

        }, [setFieldValue]);

        return (
            <>
                <label htmlFor={props.name} style={{display: 'block'}}>{label}</label>
                {meta.touched && meta.error ? (
                <input className="redBorder" {...field} {...props} />
            ) : <input {...field} {...props} />}
            </>
        );
    };

    return ( codeList &&
        <div>
            {/* <button onClick={() => {console.log(formRef?.current?.values.cpt)}}>check</button> */}

            {/* ADD ROW FORM */}
            <Formik
            // innerRef={formRef}
            initialValues={{
            // rank: `${numRows+1}`,
            dos: cptRows?.length > 0 ? cptRows[cptRows?.length - 1].dos : '',
            pos: '11',
            cpt: '',
            mod1: '',
            mod2: '',
            mod3: '',
            mod4: '',
            diag: codeList?.length > 0 ? 'ABCD'.slice(0, codeList?.length) : '',
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
                            {/* <DiagInput
                                id="diag"
                            label="D.P.:"
                            name="diag"
                            type="text"
                            /> */}
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
                                        onClick={() => stopEditing(index)}
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
                        <TableCell sx={{background: '#E0E4E8'}}>
                            {selectedClaim.clientDiscount ? `(${selectedClaim.clientDiscount}%)` : ''}
                        </TableCell>
                        <TableCell sx={{padding: 0.5, borderRight: '1px solid', borderLeft: '1px solid'}}>{total_charges}</TableCell>
                        <TableCell sx={{padding: 0.5, background: total_units === 4 ? '#5DE576' : '#ED534A'}}>{total_units}</TableCell>
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
                                    <option value='Electronic'>Electronic</option>
                                </select>
                            </div>
                        </TableCell>
                        <TableCell>
                            
                                {d1500SendFormat !== '' && cptRows.length > 0 &&
                                <IconButton
                                onClick={handleSubmitD1500}
                                >
                                    <SaveIcon />
                                </IconButton>
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