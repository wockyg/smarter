import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormInput from '../form-components/FormInput';
import FormInputPhone from '../form-components/FormInputPhone';
import FormSelectState from '../form-components/FormSelectState';
import FormSelectAgreementType from '../form-components/FormSelectAgreementType';
import FormSelectAgreementStatus from '../form-components/FormSelectAgreementStatus';
import FormTextarea from '../form-components/FormTextarea';
import * as Yup from 'yup';
import { AddFormContext } from '../contexts/AddFormContext';
import '../forms.css'
import useAddTherapist from '../hooks/useAddTherapist';
import {states} from '../lookup-tables/lookup_UsState'

export default function TherapistAddForm() {

    const mutationAdd = useAddTherapist();

    const { setAddModalOpen, setModalParty } = useContext(AddFormContext);

    return (
        <div>
            <Formik
            initialValues={{
                name: '',
                address: '',
                suite: '',
                bldg: '',
                unit: '',
                floor: '',
                city: '',
                state: '',
                zip: '',
                bulkBillingId: '',
                phone: '',
                phoneExt: '',
                fax: '',
                contact: '',
                contact2: '',
                email: '',
                email2: '',
                spanish: [],
                fceTier: '',
                fceAgreement: '',
                fceAgreementStatus: '',
                fceAgreementTimestamp: '',
                fce: [],
                fceRate: '',
                ppd: [],
                ppdRate: '',
                dptAgreement: '',
                dptAgreementStatus: '',
                dptAgreementTimestamp: '',
                dpt: [],
                dailyRate: '',
                evalRate: '',
                combinedRate: '',
                wcwhFirst2Hrs: '',
                wcwhAdditionalHour: '',
                wcwhAgreement: '',
                wcwhAgreementStatus: '',
                wcwhAgreementTimestamp: '',
                billingContact: '',
                billingPhone: '',
                billingPhoneExt: '',
                billingFax: '',
                billingEmail: '',
                billingContact2: '',
                billingPhone2: '',
                billingPhone2Ext: '',
                billingFax2: '',
                billingEmail2: '',
                billsMonthly: [],
                billingProfile: '',
                dpt_an: [],
                ppd_gl: [],
                dpt_aq: [],
                dpt_mt: [],
                dpt_ot: [],
                dpt_wh: [],
                dpt_wc: [],
                dpt_th: [],
                dateAdded: '',
                doNotUse: [],
                doNotUseReason: '',
                notes: '',
                ptProfile: '',
            }}
            validationSchema={Yup.object({
                name: Yup.string().required('Req'),
                address: Yup.string().required('Req'),
                suite: Yup.string(),
                bldg: Yup.string(),
                unit: Yup.string(),
                floor: Yup.string(),
                city: Yup.string().required('Req'),
                state: Yup.string().required('Req'),
                zip: Yup.string().required('Req'),
                bulkBillingId: Yup.number(),
                phone: Yup.string().required('Req'),
                phoneExt: Yup.string(),
                fax: Yup.string(),
                contact: Yup.string(),
                contact2: Yup.string(),
                email: Yup.string(),
                email2: Yup.string(),
                spanish: Yup.array(),
                fceTier: Yup.string(),
                fceAgreement: Yup.string(),
                fceAgreementStatus: Yup.string(),
                fceAgreementTimestamp: Yup.string(),
                fce: Yup.array(),
                fceRate: Yup.number(),
                ppd: Yup.array(),
                ppdRate: Yup.number(),
                dptAgreement: Yup.string(),
                dptAgreementStatus: Yup.string(),
                dptAgreementTimestamp: Yup.string(),
                dpt: Yup.array(),
                dailyRate: Yup.number(),
                evalRate: Yup.number(),
                combinedRate: Yup.number(),                
                wcwhFirst2Hrs: Yup.number(),
                wcwhAdditionalHour: Yup.number(),
                wcwhAgreement: Yup.string(),
                wcwhAgreementStatus: Yup.string(),
                wcwhAgreementTimestamp: Yup.string(),
                billingContact: Yup.string(),
                billingPhone: Yup.string(),
                billingPhoneExt: Yup.string(),
                billingFax: Yup.string(),
                billingEmail: Yup.string(),
                billingContact2: Yup.string(),
                billingPhone2: Yup.string(),
                billingPhone2Ext: Yup.string(),
                billingFax2: Yup.string(),
                billingEmail2: Yup.string(),
                billsMonthly: Yup.array(),
                billingProfile: Yup.string(),
                dpt_an: Yup.array(),
                ppd_gl: Yup.array(),
                dpt_aq: Yup.array(),
                dpt_mt: Yup.array(),
                dpt_ot: Yup.array(),
                dpt_wh: Yup.array(),
                dpt_wc: Yup.array(),
                dpt_th: Yup.array(),                
                doNotUse: Yup.array(),
                doNotUseReason: Yup.string(),
                notes: Yup.string(),
                ptProfile: Yup.string(),
            })}
            onSubmit={(values, actions) => {
                mutationAdd.mutate(values);
                console.log("adding therapist...");
                // console.log(values);
                // alert(JSON.stringify(values, null, 2));
                // actions.resetForm();
                actions.setSubmitting(false);
                // setAddModalOpen(false);
                // setModalParty('');
            }}
            >
            {({ values }) => (
                <>
                {mutationAdd.isIdle &&
                    <Form>
                        {/* NAME/ADDRESS */}
                        <Grid container spacing={0.5}>
                            <Grid item>
                                <FormInput
                                    id="name"
                                    label="Name*:"
                                    name="name"
                                    type="text"
                                    className="therapistName"
                                />
                            </Grid>
                            <Box width="100%"/>
                            <Grid item>
                                <FormInput
                                    id="address"
                                    label="Address*:"
                                    name="address"
                                    type="text"
                                />
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="suite"
                                    label="Suite:"
                                    name="suite"
                                    type="text"
                                />
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="city"
                                    label="City*:"
                                    name="city"
                                    type="text"
                                />
                            </Grid>
                            <Grid item>
                                <FormSelectState
                                    id="state"
                                    label="State*:"
                                    name="state"
                                    type="text"
                                    states={states}
                                />
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="zip"
                                    label="Zip*:"
                                    name="zip"
                                    type="text"
                                />
                            </Grid>
                            <Box width="100%"/>
                            <Grid item xs={12}><hr /></Grid>
                        </Grid>
                        {/* CONTACT */}
                        <Grid container spacing={0.5}>
                            <Grid item xs={5}>
                                <Grid container spacing={0.5}>
                                    <Grid item>
                                        <FormInputPhone
                                            id="phone"
                                            label="Phone*:"
                                            name="phone"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormInput
                                            id="phoneExt"
                                            label="Ext.:"
                                            name="phoneExt"
                                            type="text"
                                            className="phoneExt"
                                        />
                                    </Grid>
                                    <Box width="100%"/>
                                    <Grid item>
                                        <FormInputPhone
                                            id="fax"
                                            label="Fax:"
                                            name="fax"
                                            type="text"
                                        />
                                    </Grid>
                                    <Box width="100%"/>
                                    <Grid item>
                                        <FormInput
                                            id="email"
                                            label="Email:"
                                            name="email"
                                            type="text"
                                            className="email"
                                        />
                                    </Grid>
                                    <Box width="100%"/>
                                    <Grid item>
                                        <FormInput
                                            id="contact"
                                            label="Contact:"
                                            name="contact"
                                            type="text"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={5}>
                                <Grid container spacing={0.5}>
                                    <Grid item>
                                        <FormInputPhone
                                            id="billingPhone"
                                            label="Billing Phone:"
                                            name="billingPhone"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormInput
                                            id="billingPhoneExt"
                                            label="Ext.:"
                                            name="billingPhoneExt"
                                            type="text"
                                            className="phoneExt"
                                        />
                                    </Grid>
                                    <Box width="100%"/>
                                    <Grid item>
                                        <FormInputPhone
                                            id="billingFax"
                                            label="Billing Fax:"
                                            name="billingFax"
                                            type="text"
                                        />
                                    </Grid>
                                    <Box width="100%"/>
                                    <Grid item>
                                        <FormInput
                                            id="billingEmail"
                                            label="Billing Email:"
                                            name="billingEmail"
                                            type="text"
                                            className="email"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormInput
                                            id="billingContact"
                                            label="Billing Contact:"
                                            name="billingContact"
                                            type="text"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Box width="100%"/>
                            <Grid item xs={12}><hr /></Grid>
                        </Grid>
                        {/* NOTES/RATES */}
                        <Grid container spacing={0.5}>
                            <Grid item xs={3.6}>
                                <Grid container spacing={0.5}>
                                    <Grid item xs="auto">
                                        <FormTextarea
                                            id="notes"
                                            label="Notes:"
                                            name="notes"
                                            type="text"
                                            rows="4"
                                            cols="30"
                                        />
                                    </Grid>
                                    <Box width="100%"/>
                                    <Grid item xs="auto">
                                        <FormTextarea
                                            id="ptProfile"
                                            label="PT Profile:"
                                            name="ptProfile"
                                            type="text"
                                            rows="4"
                                            cols="30"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* PT Rates */}
                            <Grid item xs={2.8}>
                                <Grid container spacing={0.5}>
                                    <Grid item>
                                    <FormInput
                                        id="dpt"
                                        label="DPT:"
                                        name="dpt"
                                        type="checkbox"
                                        value="DPT"
                                    /> 
                                    </Grid>
                                {values.dpt.length !== 0 &&
                                    <>
                                        <Grid item>
                                            <FormInput
                                                id="dpt_ot"
                                                label="OT:"
                                                name="dpt_ot"
                                                type="checkbox"
                                                value="DPT_OT"
                                            /> 
                                        </Grid>
                                        <Grid item>
                                            <FormInput
                                                id="dpt_aq"
                                                label="Aquatic:"
                                                name="dpt_aq"
                                                type="checkbox"
                                                value="DPT_AQ"
                                            /> 
                                        </Grid>
                                        <Grid item>
                                            <FormInput
                                                id="dpt_an"
                                                label="Anodyne:"
                                                name="dpt_an"
                                                type="checkbox"
                                                value="DPT_AN"
                                            /> 
                                        </Grid>
                                        <Grid item>
                                            <FormInput
                                                id="dpt_mt"
                                                label="Massage:"
                                                name="dpt_mt"
                                                type="checkbox"
                                                value="DPT_MT"
                                            /> 
                                        </Grid>
                                        <Box width="100%"/>
                                        <Grid item>
                                            <FormInput
                                                id="dailyRate"
                                                label="Daily:"
                                                name="dailyRate"
                                                type="text"
                                                className="rateInput"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <FormInput
                                                id="evalRate"
                                                label="IA:"
                                                name="evalRate"
                                                type="text"
                                                className="rateInput"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <FormInput
                                                id="combinedRate"
                                                label="Combined:"
                                                name="combinedRate"
                                                type="text"
                                                className="rateInput"
                                            />
                                        </Grid>
                                        <Box width="100%"/>
                                        <Grid item>
                                            <FormSelectAgreementType
                                                id="dptAgreement"
                                                label="Agreement Type:"
                                                name="dptAgreement"
                                                type="text"
                                            />
                                        </Grid>
                                        {values.dptAgreement.length !== 0 &&
                                            <>
                                            <Grid item>
                                                <FormSelectAgreementStatus
                                                    id="dptAgreementStatus"
                                                    label="Status:"
                                                    name="dptAgreementStatus"
                                                    type="text"
                                                />
                                            </Grid>
                                            <Box width="100%"/>
                                            {(values.dptAgreementStatus === "Agreed" || values.dptAgreementStatus === "Denied") &&
                                            <Grid item>
                                                <FormInput
                                                    id="dptAgreementTimestamp"
                                                    label="Timestamp:"
                                                    name="dptAgreementTimestamp"
                                                    type="date"
                                                />
                                            </Grid>
                                            }
                                            
                                            </>
                                        }
                                        <Box width="100%"/>
                                    </>
                                }
                                </Grid>
                            </Grid>
                            {/* FCE/PPD Rates */}
                            <Grid item xs={2.8}>
                                <Grid container spacing={0.5}>
                                    <Grid item>
                                        <FormInput
                                            id="fce"
                                            label="FCE:"
                                            name="fce"
                                            type="checkbox"
                                            value="FCE"
                                        /> 
                                    </Grid>
                                    <Grid item>
                                        <FormInput
                                            id="ppd"
                                            label="PPD:"
                                            name="ppd"
                                            type="checkbox"
                                            value="PPD"
                                        /> 
                                    </Grid>
                                    <Box width="100%"/>
                                    {(values.fce.length !== 0 || values.ppd.length !== 0) &&
                                        <>
                                            <Grid item>
                                                <FormInput
                                                    id="fceRate"
                                                    label="FCE rate:"
                                                    name="fceRate"
                                                    type="text"
                                                    className="rateInput"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <FormInput
                                                    id="ppdRate"
                                                    label="PPD rate:"
                                                    name="ppdRate"
                                                    type="text"
                                                    className="rateInput"
                                                />
                                            </Grid>
                                            <Box width="100%"/>
                                            <Grid item>
                                                <FormSelectAgreementType
                                                    id="fceAgreement"
                                                    label="Agreement Type:"
                                                    name="fceAgreement"
                                                    type="text"
                                                />
                                            </Grid>
                                            {values.fceAgreement.length !== 0 &&
                                                <>
                                                <Grid item>
                                                    <FormSelectAgreementStatus
                                                        id="fceAgreementStatus"
                                                        label="Status:"
                                                        name="fceAgreementStatus"
                                                        type="text"
                                                    />
                                                </Grid>
                                                {(values.fceAgreementStatus === "Agreed" || values.fceAgreementStatus === "Denied") &&
                                                <Grid item>
                                                    <FormInput
                                                        id="fceAgreementTimestamp"
                                                        label="Timestamp:"
                                                        name="fceAgreementTimestamp"
                                                        type="date"
                                                    />
                                                </Grid>
                                                }
                                                
                                                </>
                                            }
                                            <Box width="100%"/>
                                        </>
                                    }
                                </Grid>
                            </Grid>
                            {/* WC/WH Rates */}
                            <Grid item xs={2.8}>
                                <Grid container spacing={0.5}>
                                    <Grid item>
                                        <FormInput
                                            id="dpt_wc"
                                            label="WC:"
                                            name="dpt_wc"
                                            type="checkbox"
                                            value="DPT_WC"
                                        /> 
                                    </Grid>
                                    <Grid item>
                                        <FormInput
                                            id="dpt_wh"
                                            label="WH:"
                                            name="dpt_wh"
                                            type="checkbox"
                                            value="DPT_WH"
                                        /> 
                                    </Grid>
                                    <Box width="100%"/>
                                    {(values.dpt_wc.length !== 0 || values.dpt_wh.length !== 0) &&
                                        <>
                                            <Grid item>
                                                <FormInput
                                                    id="wcwhFirst2Hrs"
                                                    label="First 2 Hrs:"
                                                    name="wcwhFirst2Hrs"
                                                    type="text"
                                                    className="rateInput"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <FormInput
                                                    id="wcwhAdditionalHour"
                                                    label="Add. Hr:"
                                                    name="wcwhAdditionalHour"
                                                    type="text"
                                                    className="rateInput"
                                                />
                                            </Grid>
                                            <Box width="100%"/>
                                            <Grid item>
                                                <FormSelectAgreementType
                                                    id="wcwhAgreement"
                                                    label="Agreement Type:"
                                                    name="wcwhAgreement"
                                                    type="text"
                                                />
                                            </Grid>
                                            {values.wcwhAgreement.length !== 0 &&
                                                <>
                                                <Grid item>
                                                    <FormSelectAgreementStatus
                                                        id="wcwhAgreementStatus"
                                                        label="Status:"
                                                        name="wcwhAgreementStatus"
                                                        type="text"
                                                    />
                                                </Grid>
                                                {(values.wcwhAgreementStatus === "Agreed" || values.wcwhAgreementStatus === "Denied") &&
                                                <Grid item>
                                                    <FormInput
                                                        id="wcwhAgreementTimestamp"
                                                        label="Timestamp:"
                                                        name="wcwhAgreementTimestamp"
                                                        type="date"
                                                    />
                                                </Grid>
                                                }
                                                
                                                </>
                                            }
                                            <Box width="100%"/>
                                        </>
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={12}><hr /></Grid>
                        </Grid>
                        {/* SUBMIT BUTTON */}
                        <Grid container spacing={0.5}>
                            <Grid item xs={12}>
                                <button type="submit" onClick={() => console.log(values)}>Add</button>
                            </Grid>
                        </Grid>
                    </Form>
                }
                {mutationAdd.isSuccess &&
                    <>
                    {Object.entries(values).map((row) => <div key={row}>{`${row[0]}: ${row[1]}`}</div>)}
                    <div><button onClick={() => {setAddModalOpen(false); setModalParty('')}}>ok</button></div>
                    </>
                }
                </>
            )}
            
            </Formik>
        </div>
    )};