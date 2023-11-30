import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import EditToolbar from '../details/EditToolbar';
import EditToolbarSearchBox from '../details/EditToolbarSearchBox';

import EditableGridItem from '../form-components/EditableGridItem';

import useGetClaimant from '../hooks/useGetClaimant';
import useGetEmployersDropdown from '../hooks/useGetEmployersDropdown';
import useUpdateClaimant from '../hooks/useUpdateClaimant';


export default function ClaimantDetails(props) {

    const {detailsId: selectedClaimantId, currentlyEditing, setCurrentlyEditing, searchBox} = props;

    const { status: statusCMT, data: selectedClaimant, error: errorCMT, isFetching: isFetchingCMT } = useGetClaimant(+selectedClaimantId);

    const { status: statusEmployers, data: employers, error: errorEmployers, isFetching: isFetchingEmployers } = useGetEmployersDropdown();

    const mutationUpdate = useUpdateClaimant();

    return (
    <>
    {selectedClaimant &&
    <>
    <Formik
    enableReinitialize
    initialValues={{
        firstName: selectedClaimant.firstName ? selectedClaimant.firstName : '',
        lastName: selectedClaimant.lastName ? selectedClaimant.lastName : '',
        employerId: selectedClaimant.employerId ? selectedClaimant.employerId : '',
        gender: selectedClaimant.gender ? selectedClaimant.gender : '',
        injuryDate1: selectedClaimant.injuryDate1 ? selectedClaimant.injuryDate1 : '',
        injuryDate2: selectedClaimant.injuryDate2 ? selectedClaimant.injuryDate2 : '',
        birthDate: selectedClaimant.birthDate ? selectedClaimant.birthDate : '',
        address: selectedClaimant.address ? selectedClaimant.address : '',
        city: selectedClaimant.city ? selectedClaimant.city : '',
        state: selectedClaimant.state ? selectedClaimant.state : '',
        zip: selectedClaimant.zip ? selectedClaimant.zip : '',
        phone: selectedClaimant.phone ? selectedClaimant.phone : '',
        alternatePhone: selectedClaimant.alternatePhone ? selectedClaimant.alternatePhone : '',
        email: selectedClaimant.email ? selectedClaimant.email : '',
        email2: selectedClaimant.email2 ? selectedClaimant.email2 : '',
        notes: selectedClaimant.notes ? selectedClaimant.notes : '',
    }}
    validationSchema={Yup.object({
        firstName: Yup.string(),
        lastName: Yup.string(),
        employerId: Yup.number(),
        gender: Yup.string(),
        injuryDate1: Yup.date(),
        injuryDate2: Yup.date(),
        birthDate: Yup.string(),
        address: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        zip: Yup.string(),
        phone: Yup.string(),
        alternatePhone: Yup.string(),
        email: Yup.string(),
        email2: Yup.string(),
        notes: Yup.string(),
    })}
    onSubmit={(values, actions) => {

        console.log("updating claimant...", values);
        
        const keys = Object.keys(values);

        const changedKeys = keys.filter(index => ((selectedClaimant[index] !== null && values[index] !== selectedClaimant[index]) ||
                                                  (selectedClaimant[index] === null && values[index] !== '')));
                                                  
        const changedValues = changedKeys.reduce((obj, key, index) => ({ ...obj, [key]: values[key] }), {});

        changedValues.claimantId = selectedClaimant.claimantId;

        if (changedValues.injuryDate1 === '') {
            changedValues.injuryDate1 = null;
        }
        if (changedValues.injuryDate2 === '') {
            changedValues.injuryDate2 = null;
        }

        console.log(changedValues);

        mutationUpdate.mutate(changedValues);

        actions.setSubmitting(false);
    }}
    >
        {formikProps => (
    <Form>
        {searchBox ?
        <EditToolbarSearchBox
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        />
        :
        <EditToolbar
        selectedParty='claimant'
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        />
        }

        <Grid container spacing={0.5}>
            <Grid item xs={6}>
                <Grid container spacing={0.5}>
                    <EditableGridItem
                    field='firstName'
                    label='First Name'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClaimant}
                    selectedParty='claimant'
                    width='20ch'
                    />
                    <EditableGridItem
                    field='lastName'
                    label='Last Name'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClaimant}
                    selectedParty='claimant'
                    width='20ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='employerId'
                    label='Employer'
                    type='select'
                    formikProps={formikProps}
                    options={employers}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClaimant}
                    selectedParty='claimant'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='address'
                    label='Address'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClaimant}
                    selectedParty='claimant'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='city'
                    label='City'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClaimant}
                    selectedParty='claimant'
                    width='10ch'
                    />
                    <EditableGridItem
                    field='state'
                    label='State'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClaimant}
                    selectedParty='claimant'
                    width='3ch'
                    />
                    <EditableGridItem
                    field='zip'
                    label='Zip'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClaimant}
                    selectedParty='claimant'
                    width='6ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='phone'
                    label='Phone'
                    type='phone'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClaimant}
                    selectedParty='claimant'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='alternatePhone'
                    label='Alt. Phone'
                    type='phone'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClaimant}
                    selectedParty='claimant'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='email'
                    label='Email'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClaimant}
                    selectedParty='claimant'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='email2'
                    label='Email2'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClaimant}
                    selectedParty='claimant'
                    />
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={0.5}>
                    <EditableGridItem
                    field='gender'
                    label='Gender'
                    type='select'
                    options={['Female', 'Male', '']}
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClaimant}
                    selectedParty='claimant'
                    width='2ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='birthDate'
                    label='DOB'
                    type='date'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClaimant}
                    selectedParty='claimant'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='injuryDate1'
                    label='DOI'
                    type='date'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClaimant}
                    selectedParty='claimant'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='notes'
                    label='Notes'
                    type='textarea'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClaimant}
                    selectedParty='claimant'
                    />
                </Grid>
            </Grid>
        </Grid>
    </Form>
        )}
    </Formik>
    </>
    }
    </>);

}