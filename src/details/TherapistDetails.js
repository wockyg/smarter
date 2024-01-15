import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import EditToolbar from '../details/EditToolbar';
import EditToolbarSearchBox from '../details/EditToolbarSearchBox';

import EditableGridItem from '../form-components/EditableGridItem';
import FormInput from '../form-components/FormInput';

import useGetTherapist from '../hooks/useGetTherapist';
import useUpdateTherapist from '../hooks/useUpdateTherapist';

import PropTypes from 'prop-types';

import { reasons } from '../lookup-tables/lookup_doNotUseReasons';

function TabPanel(props) {
    
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`referrals-tabpanel-${index}`}
      aria-labelledby={`referrals-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `referrals-tab-${index}`,
    'aria-controls': `referrals-tabpanel-${index}`,
  };
}


export default function TherapistDetails(props) {

    const [tab, setTab] = useState(0);

    const {detailsId: selectedTherapistId, currentlyEditing, setCurrentlyEditing, searchBox} = props;

    const { status: statusTRP, data: selectedTherapist, error: errorTRP, isFetching: isFetchingTRP } = useGetTherapist(+selectedTherapistId);

    // const selectedTherapist = rows?.length > 0 && rows?.filter((row) => {return (row.therapistId === selectedTherapistId);})[0];

    const mutationUpdate = useUpdateTherapist();

    const handleChange = (event, newValue) => {
    setTab(newValue);
    };

    return (
    <>
    {selectedTherapist &&
    <>
    <Formik
    enableReinitialize
    initialValues={{
        name: selectedTherapist.name ? selectedTherapist.name : '',
        address: selectedTherapist.address ? selectedTherapist.address : '',
        suite: selectedTherapist.suite ? selectedTherapist.suite : '',
        city: selectedTherapist.city ? selectedTherapist.city : '',
        state: selectedTherapist.state ? selectedTherapist.state : '',
        zip: selectedTherapist.zip ? selectedTherapist.zip : '',
        phone: selectedTherapist.phone ? selectedTherapist.phone : '',
        phoneExt: selectedTherapist.phoneExt ? selectedTherapist.phoneExt : '',
        contact: selectedTherapist.contact ? selectedTherapist.contact : '',
        fax: selectedTherapist.fax ? selectedTherapist.fax : '',
        email: selectedTherapist.email ? selectedTherapist.email : '',
        notes: selectedTherapist.notes ? selectedTherapist.notes : '',
        ptProfile: selectedTherapist.ptProfile ? selectedTherapist.ptProfile : '',
        dailyRate: selectedTherapist.dailyRate ? selectedTherapist.dailyRate : '',
        evalRate: selectedTherapist.evalRate ? selectedTherapist.evalRate : '',
        combinedRate: selectedTherapist.combinedRate ? selectedTherapist.combinedRate : '',
        dptAgreement: selectedTherapist.dptAgreement ? selectedTherapist.dptAgreement : '',
        dptAgreementStatus: selectedTherapist.dptAgreementStatus ? selectedTherapist.dptAgreementStatus : '',
        dptAgreementTimestamp: selectedTherapist.dptAgreementTimestamp ? selectedTherapist.dptAgreementTimestamp : '',
        fceRate: selectedTherapist.fceRate ? selectedTherapist.fceRate : '',
        ppdRate: selectedTherapist.ppdRate ? selectedTherapist.ppdRate : '',
        fceAgreement: selectedTherapist.fceAgreement ? selectedTherapist.fceAgreement : '',
        fceAgreementStatus: selectedTherapist.fceAgreementStatus ? selectedTherapist.fceAgreementStatus : '',
        fceAgreementTimestamp: selectedTherapist.fceAgreementTimestamp ? selectedTherapist.fceAgreementTimestamp : '',
        wcwhFirst2Hrs: selectedTherapist.wcwhFirst2Hrs ? selectedTherapist.wcwhFirst2Hrs : '',
        wcwhAdditionalHour: selectedTherapist.wcwhAdditionalHour ? selectedTherapist.wcwhAdditionalHour : '',
        wcwhAgreement: selectedTherapist.wcwhAgreement ? selectedTherapist.wcwhAgreement : '',
        wcwhAgreementStatus: selectedTherapist.wcwhAgreementStatus ? selectedTherapist.wcwhAgreementStatus : '',
        wcwhAgreementTimestamp: selectedTherapist.wcwhAgreementTimestamp ? selectedTherapist.wcwhAgreementTimestamp : '',
        dpt: selectedTherapist.dpt ? [`${selectedTherapist.dpt}`] : [],
        DPT_OT: selectedTherapist.DPT_OT ? [`${selectedTherapist.DPT_OT}`] : [],
        DPT_AQ: selectedTherapist.DPT_AQ ? [`${selectedTherapist.DPT_AQ}`] : [],
        DPT_AN: selectedTherapist.DPT_AN ? [`${selectedTherapist.DPT_AN}`] : [],
        DPT_MT: selectedTherapist.DPT_MT ? [`${selectedTherapist.DPT_MT}`] : [],
        DPT_ST: selectedTherapist.DPT_ST ? [`${selectedTherapist.DPT_ST}`] : [],
        DPT_VT: selectedTherapist.DPT_VT ? [`${selectedTherapist.DPT_VT}`] : [],
        DPT_CHT: selectedTherapist.DPT_CHT ? [`${selectedTherapist.DPT_CHT}`] : [],
        DPT_TH: selectedTherapist.DPT_TH ? [`${selectedTherapist.DPT_TH}`] : [],
        fce: selectedTherapist.fce ? [`${selectedTherapist.fce}`] : [],
        ppd: selectedTherapist.ppd ? [`${selectedTherapist.ppd}`] : [],
        PPD_GL: selectedTherapist.PPD_GL ? [`${selectedTherapist.PPD_GL}`] : [],
        DPT_WC: selectedTherapist.DPT_WC ? [`${selectedTherapist.DPT_WC}`] : [],
        DPT_WH: selectedTherapist.DPT_WH ? [`${selectedTherapist.DPT_WH}`] : [],
        doNotUseDPT: selectedTherapist.doNotUseDPT ? [`${selectedTherapist.doNotUseDPT}`] : [],
        doNotUseFCE: selectedTherapist.doNotUseFCE ? [`${selectedTherapist.doNotUseFCE}`] : [],
        doNotUsePPD: selectedTherapist.doNotUsePPD ? [`${selectedTherapist.doNotUsePPD}`] : [],
        doNotUseDPTReason: selectedTherapist.doNotUseDPTReason ? selectedTherapist.doNotUseDPTReason : '',
    }}
    validationSchema={Yup.object({
        name: Yup.string(),
        address: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        zip: Yup.string(),
        phone: Yup.string(),
        phoneExt: Yup.string(),
        fax: Yup.string(),
        email: Yup.string(),
        notes: Yup.string(),
    })}
    onSubmit={(values, actions) => {

        const testVals = {
            ...values, 
            dpt: values.dpt.length > 0 ? values.dpt[0] : '',
            DPT_OT: values.DPT_OT.length > 0 ? values.DPT_OT[0] : '',
            DPT_AQ: values.DPT_AQ.length > 0 ? values.DPT_AQ[0] : '',
            DPT_AN: values.DPT_AN.length > 0 ? values.DPT_AN[0] : '',
            DPT_MT: values.DPT_MT.length > 0 ? values.DPT_MT[0] : '',
            DPT_ST: values.DPT_ST.length > 0 ? values.DPT_ST[0] : '',
            DPT_VT: values.DPT_VT.length > 0 ? values.DPT_VT[0] : '',
            DPT_CHT: values.DPT_CHT.length > 0 ? values.DPT_CHT[0] : '',
            DPT_TH: values.DPT_TH.length > 0 ? values.DPT_TH[0] : '',
            fce: values.fce.length > 0 ? values.fce[0] : '',
            ppd: values.ppd.length > 0 ? values.ppd[0] : '',
            PPD_GL: values.PPD_GL.length > 0 ? values.PPD_GL[0] : '',
            DPT_WC: values.DPT_WC.length > 0 ? values.DPT_WC[0] : '',
            DPT_WH: values.DPT_WH.length > 0 ? values.DPT_WH[0] : '',
            doNotUseDPT: values.doNotUseDPT.length > 0 ? values.doNotUseDPT[0] : '',
            doNotUseFCE: values.doNotUseFCE.length > 0 ? values.doNotUseFCE[0] : '',
            doNotUsePPD: values.doNotUsePPD.length > 0 ? values.doNotUsePPD[0] : '',
            // doNotUseDPTReason: values.doNotUseDPTReason > 0 ? values.doNotUseDPTReason : '',
        }
        
        const keys = Object.keys(testVals);

        const changedKeys = keys.filter(index => ((selectedTherapist[index] !== null && testVals[index] !== selectedTherapist[index]) ||
                                                  (selectedTherapist[index] === null && testVals[index] !== '')));
                                                  
        const changedValues = changedKeys.reduce((obj, key, index) => ({ ...obj, [key]: testVals[key] }), {});

        changedValues.therapistId = selectedTherapist.therapistId;

        if (changedKeys.length > 0) {
            if (changedValues.address || changedValues.city || changedValues.state || changedValues.zip) {
                changedValues.address = changedValues.address || selectedTherapist.address;
                changedValues.city = changedValues.city || selectedTherapist.city;
                changedValues.state = changedValues.address || selectedTherapist.state;
                changedValues.zip = changedValues.zip || selectedTherapist.zip;
            }
            console.log("updating therapist...");
            console.log(changedValues);
            mutationUpdate.mutate(changedValues);
        }
        else {
            console.log("Nothing to update...")
        }

        actions.setSubmitting(false);

        actions.resetForm();
    }}
    >
        {formikProps => (
    <Form>
        {searchBox ?
        <EditToolbarSearchBox
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        selectedTherapist={selectedTherapist}
        />
        :
        <EditToolbar
        selectedParty='therapist'
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        />
        }
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={handleChange} aria-label="referral tabs">
                <Tab label="Contact" {...a11yProps(0)} />
                <Tab label="Rates" {...a11yProps(1)} />
            </Tabs>
            </Box>
            
            <TabPanel value={tab} index={0}>
                <div style={{height: 340, overflow: 'scroll'}}>
                    <Grid container spacing={1.5}>
                        {/* <EditableGridItem
                        field='name'
                        label='Name'
                        type='text'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        width='20ch'
                        /> */}
                        {/* <Box width="100%"/> */}
                        <EditableGridItem
                        field='address'
                        label='Address'
                        type='text'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        selectedParty='therapist'
                        />
                        <EditableGridItem
                        field='suite'
                        label='Suite'
                        type='text'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        selectedParty='therapist'
                        width='4ch'
                        />
                        <EditableGridItem
                        field='city'
                        label='City'
                        type='text'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        selectedParty='therapist'
                        width='10ch'
                        />
                        <EditableGridItem
                        field='state'
                        label='State'
                        type='text'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        selectedParty='therapist'
                        width='3ch'
                        />
                        <EditableGridItem
                        field='zip'
                        label='Zip'
                        type='text'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        selectedParty='therapist'
                        width='6ch'
                        />
                        <Box width="100%"/>
                        <EditableGridItem
                        field='phone'
                        label='Phone'
                        type='phone'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        selectedParty='therapist'
                        />
                        <EditableGridItem
                        field='phoneExt'
                        label='Ext'
                        type='text'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        selectedParty='therapist'
                        width='4ch'
                        />
                        <EditableGridItem
                        field='contact'
                        label='Contact'
                        type='text'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        selectedParty='therapist'
                        />
                        
                        <Box width="100%"/>
                        <EditableGridItem
                        field='fax'
                        label='Fax'
                        type='phone'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        selectedParty='therapist'
                        />
                        <EditableGridItem
                        field='email'
                        label='Email'
                        type='text'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        selectedParty='therapist'
                        />
                        <Box width="100%"/>

                        {/* RR Preference radio buttons and text field go here */}

                        {/* <EditableGridItem
                        field='rrPreference'
                        label='RR Preference'
                        type='radio'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        selectedParty='therapist'
                        />
                        <Box width="100%"/> */}

                        <Box width="100%"/>
                        <EditableGridItem
                        field='billingPhone'
                        label='Billing Phone'
                        type='phone'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        selectedParty='therapist'
                        />
                        <EditableGridItem
                        field='billingPhoneExt'
                        label='Ext'
                        type='text'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        selectedParty='therapist'
                        width='4ch'
                        />
                        <EditableGridItem
                        field='billingContact'
                        label='Billing Contact'
                        type='text'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        selectedParty='therapist'
                        />
                        <Box width="100%"/>
                        <EditableGridItem
                        field='billingFax'
                        label='Billing Fax'
                        type='phone'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        selectedParty='therapist'
                        />
                        <EditableGridItem
                        field='billingEmail'
                        label='Billing Email'
                        type='text'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        selectedParty='therapist'
                        />
                        <Box width="100%"/>
                    </Grid>
                    <Grid container spacing={1.5}>
                        <EditableGridItem
                        field='notes'
                        label='Notes'
                        type='textarea'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        selectedParty='therapist'
                        />
                        {/* <Box width="100%"/> */}
                        <EditableGridItem
                        field='ptProfile'
                        label='PT Profile'
                        type='textarea'
                        formikProps={formikProps}
                        currentlyEditing={currentlyEditing}
                        selectedRow={selectedTherapist}
                        selectedParty='therapist'
                        />

                        <Box width="100%"/>
                        
                        {currentlyEditing === 'therapist' &&
                        <>
                        DDo Not Use:
                        <Box width="100%"/>
                        <Grid item>
                            <FormInput
                            id="doNotUseDPT"
                            label="DPT"
                            name="doNotUseDPT"
                            type="checkbox"
                            value="Do Not Use"
                            />
                        </Grid>

                        <Grid item>
                            <FormInput
                            id="doNotUseFCE"
                            label="FCE"
                            name="doNotUseFCE"
                            type="checkbox"
                            value="Do Not Use"
                            />
                        </Grid>

                        <Grid item>
                            <FormInput
                            id="doNotUsePPD"
                            label="PPD"
                            name="doNotUsePPD"
                            type="checkbox"
                            value="Do Not Use"
                            />
                        </Grid>

                        {(formikProps.values.doNotUseDPT.length > 0 || formikProps.values.doNotUseFCE.length > 0 || formikProps.values.doNotUsePPD.length > 0) &&
                        <Grid item>
                            <EditableGridItem
                            field='doNotUseDPTReason'
                            label='Reason'
                            type='select'
                            formikProps={formikProps}
                            options={reasons}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            selectedParty='therapist'
                            />
                        </Grid>
                        }
                        </>
                        }
                    </Grid>
                </div>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <div style={{ height: 350, overflow: 'scroll'}}>
                <Grid container spacing={1}>
                    <Grid item xs={6} sx={{border: 1}}>
                        <Grid container spacing={1}>
                            <Grid item>
                                {currentlyEditing ?
                                <FormInput
                                    id="dpt"
                                    label="DPT"
                                    name="dpt"
                                    type="checkbox"
                                    value="DPT"
                                /> 
                                :
                                <>
                                <label htmlFor='dpt' style={{display: 'block'}}><u>{`DPT`}</u></label>
                                {selectedTherapist.dpt &&
                                <CheckCircleOutlineIcon fontSize='small' color="success" />
                                }
                                </>
                                }
                            </Grid>

                            <Grid item>
                                {currentlyEditing ?
                                <FormInput
                                    id="DPT_OT"
                                    label="OT"
                                    name="DPT_OT"
                                    type="checkbox"
                                    value="DPT-OT"
                                /> 
                                :
                                <>
                                <label htmlFor='DPT_OT' style={{display: 'block'}}><u>{`OT`}</u></label>
                                {selectedTherapist.DPT_OT &&
                                <CheckCircleOutlineIcon fontSize='small' color="success" />
                                }
                                </>
                                }
                            </Grid>

                            <Grid item>
                                {currentlyEditing ?
                                <FormInput
                                    id="DPT_CHT"
                                    label="CHT"
                                    name="DPT_CHT"
                                    type="checkbox"
                                    value="DPT_CHT"
                                /> 
                                :
                                <>
                                <label htmlFor='DPT_CHT' style={{display: 'block'}}><u>{`CHT`}</u></label>
                                {selectedTherapist.DPT_CHT &&
                                <CheckCircleOutlineIcon fontSize='small' color="success" />
                                }
                                </>
                                }
                            </Grid>

                            <Grid item>
                                {currentlyEditing ?
                                <FormInput
                                    id="DPT_AQ"
                                    label="AQ"
                                    name="DPT_AQ"
                                    type="checkbox"
                                    value="DPT-AQ"
                                /> 
                                :
                                <>
                                <label htmlFor='DPT_AQ' style={{display: 'block'}}><u>{`AQ`}</u></label>
                                {selectedTherapist.DPT_AQ &&
                                <CheckCircleOutlineIcon fontSize='small' color="success" />
                                }
                                </>
                                }
                            </Grid>

                            <Grid item>
                                {currentlyEditing ?
                                <FormInput
                                    id="DPT_AN"
                                    label="AN"
                                    name="DPT_AN"
                                    type="checkbox"
                                    value="DPT-AN"
                                /> 
                                :
                                <>
                                <label htmlFor='DPT_AN' style={{display: 'block'}}><u>{`AN`}</u></label>
                                {selectedTherapist.DPT_AN &&
                                <CheckCircleOutlineIcon fontSize='small' color="success" />
                                }
                                </>
                                }
                            </Grid>

                            <Grid item>
                                {currentlyEditing ?
                                <FormInput
                                    id="DPT_MT"
                                    label="MT"
                                    name="DPT_MT"
                                    type="checkbox"
                                    value="DPT-MT"
                                /> 
                                :
                                <>
                                <label htmlFor='DPT_MT' style={{display: 'block'}}><u>{`MT`}</u></label>
                                {selectedTherapist.DPT_MT &&
                                <CheckCircleOutlineIcon fontSize='small' color="success" />
                                }
                                </>
                                }
                            </Grid>

                            <Grid item>
                                {currentlyEditing ?
                                <FormInput
                                    id="DPT_ST"
                                    label="ST"
                                    name="DPT_ST"
                                    type="checkbox"
                                    value="DPT-ST"
                                /> 
                                :
                                <>
                                <label htmlFor='DPT_ST' style={{display: 'block'}}><u>{`ST`}</u></label>
                                {selectedTherapist.DPT_ST &&
                                <CheckCircleOutlineIcon fontSize='small' color="success" />
                                }
                                </>
                                }
                            </Grid>

                            <Grid item>
                                {currentlyEditing ?
                                <FormInput
                                    id="DPT_VT"
                                    label="VT"
                                    name="DPT_VT"
                                    type="checkbox"
                                    value="DPT-VT"
                                /> 
                                :
                                <>
                                <label htmlFor='DPT_VT' style={{display: 'block'}}><u>{`VT`}</u></label>
                                {selectedTherapist.DPT_VT &&
                                <CheckCircleOutlineIcon fontSize='small' color="success" />
                                }
                                </>
                                }
                            </Grid>

                            <Grid item>
                                {currentlyEditing ?
                                <FormInput
                                    id="DPT_TH"
                                    label="TH"
                                    name="DPT_TH"
                                    type="checkbox"
                                    value="DPT-TH"
                                /> 
                                :
                                <>
                                <label htmlFor='DPT_TH' style={{display: 'block'}}><u>{`TH`}</u></label>
                                {selectedTherapist.DPT_TH &&
                                <CheckCircleOutlineIcon fontSize='small' color="success" />
                                }
                                </>
                                }
                            </Grid>

                            {/* <EditableGridItem
                            field='dpt'
                            label='DPT'
                            type='checkbox'
                            special='service'
                            value='DPT'
                            formikProps={formikProps}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            /> */}

                            {/* <EditableGridItem
                            field='dpt_ot'
                            label='OT'
                            type='checkbox'
                            special='service'
                            value='OT'
                            formikProps={formikProps}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            /> */}

                            {/* <EditableGridItem
                            field='dpt_aq'
                            label='AQ'
                            type='checkbox'
                            special='service'
                            value='AQ'
                            formikProps={formikProps}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            /> */}

                            {/* <EditableGridItem
                            field='dpt_an'
                            label='AN'
                            type='checkbox'
                            special='service'
                            value='AN'
                            formikProps={formikProps}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            /> */}
                            
                            {/* <EditableGridItem
                            field='dpt_mt'
                            label='MT'
                            type='checkbox'
                            special='service'
                            value='MT'
                            formikProps={formikProps}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            /> */}

                            {/* <EditableGridItem
                            field='dpt_st'
                            label='ST'
                            type='checkbox'
                            special='service'
                            value='ST'
                            formikProps={formikProps}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            /> */}

                            <Box width="100%"/>

                            <EditableGridItem
                            field='dailyRate'
                            label='Daily'
                            type='text'
                            special='rate'
                            formikProps={formikProps}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            selectedParty='therapist'
                            width='6ch'
                            />

                            <EditableGridItem
                            field='evalRate'
                            label='Eval'
                            type='text'
                            special='rate'
                            formikProps={formikProps}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            selectedParty='therapist'
                            width='6ch'
                            />

                            <EditableGridItem
                            field='combinedRate'
                            label='Combined'
                            type='text'
                            special='rate'
                            formikProps={formikProps}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            selectedParty='therapist'
                            width='6ch'
                            />

                            <Box width="100%"/>

                            <EditableGridItem
                            field='dptAgreement'
                            label='Agreement Type'
                            type='select'
                            formikProps={formikProps}
                            options={['Network', 'Single-Case', '']}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            selectedParty='therapist'
                            />

                            <EditableGridItem
                            field='dptAgreementStatus'
                            label='Status'
                            type='select'
                            formikProps={formikProps}
                            options={['Agreed', 'Prospect', 'Denied', '']}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            selectedParty='therapist'
                            />

                            {/* <Box width="100%"/> */}

                            <EditableGridItem
                            field='dptAgreementTimestamp'
                            label='Timestamp'
                            type='date'
                            formikProps={formikProps}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            selectedParty='therapist'
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{border: 1}}>
                        <Grid container spacing={1}>
                            <Grid item>
                                {currentlyEditing ?
                                <FormInput
                                    id="fce"
                                    label="FCE"
                                    name="fce"
                                    type="checkbox"
                                    value="FCE"
                                /> 
                                :
                                <>
                                <label htmlFor='fce' style={{display: 'block'}}><u>{`FCE`}</u></label>
                                {selectedTherapist.fce &&
                                <CheckCircleOutlineIcon fontSize='small' color="success" />
                                }
                                </>
                                }
                            </Grid>

                            <Grid item>
                                {currentlyEditing ?
                                <FormInput
                                    id="ppd"
                                    label="PPD"
                                    name="ppd"
                                    type="checkbox"
                                    value="PPD"
                                /> 
                                :
                                <>
                                <label htmlFor='ppd' style={{display: 'block'}}><u>{`PPD`}</u></label>
                                {selectedTherapist.ppd &&
                                <CheckCircleOutlineIcon fontSize='small' color="success" />
                                }
                                </>
                                }
                            </Grid>

                            <Grid item>
                                {currentlyEditing ?
                                <FormInput
                                    id="PPD_GL"
                                    label="GL"
                                    name="PPD_GL"
                                    type="checkbox"
                                    value="PPD_GL"
                                /> 
                                :
                                <>
                                <label htmlFor='PPD_GL' style={{display: 'block'}}><u>{`GL`}</u></label>
                                {selectedTherapist.PPD_GL &&
                                <CheckCircleOutlineIcon fontSize='small' color="success" />
                                }
                                </>
                                }
                            </Grid>
                            
                            <Box width="100%"/>

                            <EditableGridItem
                            field='fceRate'
                            label='FCE Rate'
                            type='text'
                            special='rate'
                            formikProps={formikProps}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            selectedParty='therapist'
                            width='6ch'
                            />

                            <EditableGridItem
                            field='ppdRate'
                            label='PPD Rate'
                            type='text'
                            special='rate'
                            formikProps={formikProps}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            selectedParty='therapist'
                            width='6ch'
                            />

                            <Box width="100%"/>

                            <EditableGridItem
                            field='fceAgreement'
                            label='Agreement Type'
                            type='select'
                            formikProps={formikProps}
                            options={['Network', 'Single-Case', '']}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            selectedParty='therapist'
                            />

                            <EditableGridItem
                            field='fceAgreementStatus'
                            label='Status'
                            type='select'
                            formikProps={formikProps}
                            options={['Agreed', 'Prospect', 'Denied', '']}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            selectedParty='therapist'
                            />

                            {/* <Box width="100%"/> */}

                            <EditableGridItem
                            field='fceAgreementTimestamp'
                            label='Timestamp'
                            type='date'
                            formikProps={formikProps}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            selectedParty='therapist'
                            />

                        </Grid>
                    </Grid>
                    <Box width="100%"/>
                    {/* <hr/> */}
                    <Grid item xs={6} sx={{border: 1}}>
                        <Grid container spacing={1}>

                            <Grid item>
                                {currentlyEditing ?
                                <FormInput
                                    id="DPT_WC"
                                    label="WC"
                                    name="DPT_WC"
                                    type="checkbox"
                                    value="DPT_WC"
                                /> 
                                :
                                <>
                                <label htmlFor='DPT_WC' style={{display: 'block'}}><u>{`WC`}</u></label>
                                {selectedTherapist.DPT_WC &&
                                <CheckCircleOutlineIcon fontSize='small' color="success" />
                                }
                                </>
                                }
                            </Grid>

                            <Grid item>
                                {currentlyEditing ?
                                <FormInput
                                    id="DPT_WH"
                                    label="WH"
                                    name="DPT_WH"
                                    type="checkbox"
                                    value="DPT_WH"
                                /> 
                                :
                                <>
                                <label htmlFor='DPT_WH' style={{display: 'block'}}><u>{`WH`}</u></label>
                                {selectedTherapist.DPT_WH &&
                                <CheckCircleOutlineIcon fontSize='small' color="success" />
                                }
                                </>
                                }
                            </Grid>

                            <Box width="100%"/>

                            <EditableGridItem
                            field='wcwhFirst2Hrs'
                            label='First 2 Hrs'
                            type='text'
                            special='rate'
                            formikProps={formikProps}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            selectedParty='therapist'
                            width='6ch'
                            />

                            <EditableGridItem
                            field='wcwhAdditionalHour'
                            label='Add. Hr'
                            type='text'
                            special='rate'
                            formikProps={formikProps}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            selectedParty='therapist'
                            width='6ch'
                            />

                            <Box width="100%"/>

                            <EditableGridItem
                            field='wcwhAgreement'
                            label='Agreement Type'
                            type='select'
                            formikProps={formikProps}
                            options={['Network', 'Single-Case', '']}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            selectedParty='therapist'
                            />

                            <EditableGridItem
                            field='wcwhAgreementStatus'
                            label='Status'
                            type='select'
                            formikProps={formikProps}
                            options={['Agreed', 'Prospect', 'Denied', '']}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            selectedParty='therapist'
                            />

                            {/* <Box width="100%"/> */}

                            <EditableGridItem
                            field='wcwhAgreementTimestamp'
                            label='Timestamp'
                            type='date'
                            formikProps={formikProps}
                            currentlyEditing={currentlyEditing}
                            selectedRow={selectedTherapist}
                            selectedParty='therapist'
                            />

                        </Grid>
                    </Grid>
                </Grid>
                </div>
            </TabPanel>
            
        </Box>
    </Form>
        )}
    </Formik>
    </>
    }
    </>);

}