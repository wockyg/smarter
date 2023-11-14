import { React, useContext } from "react";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { Page, Text, View, Document, StyleSheet, PDFViewer, Image, PDFDownloadLink } from '@react-pdf/renderer';

import { useParams } from 'react-router-dom';

import useGetReferral from '../hooks/useGetReferral';

import ConfirmationLetter from './ConfirmationLetter';
import AuthorizationLetter from './AuthorizationLetter';
import Agreement from './Agreement';
import PhysicianApprovalForm from "./PhysicianApprovalForm";
import TherapistFaxCoverPage from "./TherapistFaxCoverPage";
import RecordsRequestLetter from "./RecordsRequestLetter";

import logo from '../img/logo.png';

// Create styles
const styles = StyleSheet.create({
  page: {
    // backgroundColor: "blue",
    color: "black",
    position: 'relative',
  },
  section: {
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  viewer: {
    width: 650,
    height: 840,
    backgroundColor: "blue",
  },
  text: {
    fontSize: 10,
  },
  gray: {
    marginLeft: 40,
    marginRight: 40,
    padding: 10,
    backgroundColor: "gray",
  },
});

export default function DocumentTester(props) {

    let { id: linkId } = useParams();

    const { status: statusReferrals, data: selectedClaim, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferral(+linkId);

    const MyDoc = () => (
        <Document>
            <Page size='LETTER' style={styles.page}>
                <View style={styles.section}>
                    <Image src={logo} style={{ width: 100 }} />
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>Confirmation Letter</Text>

                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>{selectedClaim && `${selectedClaim.claimantFirst} ${selectedClaim.claimantLast}`}</Text>
                    <Text style={styles.text}>{selectedClaim && `${selectedClaim.claimantAddress}`}</Text>
                    <Text style={styles.text}>{selectedClaim && `${selectedClaim.claimantCity}, ${selectedClaim.claimantState} ${selectedClaim.claimantZip}`}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>RE: </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>Mr. Doe,</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>
                        We are working in conjunction with your insurance company and your physician 
                        to coordinate the Physical Therapy Evaluation that has been ordered for you.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>Appointment Information Below:</Text>
                </View>

                <View style={styles.gray}>
                    <Text style={styles.text}>DATE:</Text>
                    <Text style={styles.text}>TIME:</Text>
                    <Text style={styles.text}>LOCATION:</Text>
                    <Text style={styles.text}>CONTACT:</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>
                        Please dress comfortably (sweatpants and sneakers preferably) and allow approximately 1-2 hrs for the appointment.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>
                        If you have any questions or concerns about the clinical aspects of the testing, you may reach the physical therapy office 
                        staff directly at 888-999-1234. If you have any questions or concerns regarding scheduling, please reach out to your assigned 
                        care coordinator, Warren McClure, at 770-853-6079.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>Sincerely,</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>Warren McClure</Text>
                    <Text style={styles.text}>Direct phone#: 770-853-6079</Text>
                    <Text style={styles.text}>Email: wmcclure@definedpt.com</Text>
                    <Text style={styles.text}>Defined Physical Therapy</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>CC Adjuster: Stephens, Allison</Text>
                    <Text style={styles.text}>CC Case Manager: </Text>
                    <Text style={styles.text}>CC Attorney: </Text>
                </View>
            </Page>
        </Document>
        );


    return ( 
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                {/* PDF VIEWER COL */}
                <Grid item xs="auto">
                    <Grid item>
                        {selectedClaim?.referralId &&
                        <PDFViewer style={styles.viewer} showToolbar={true}>
                            {/* <ConfirmationLetter selectedClaim={selectedClaim} /> */}
                            {/* <AuthorizationLetter selectedClaim={selectedClaim} /> */}
                            {/* <Agreement values={{...selectedClaim, agreementType: 'Single-Case', serviceType: 'DPT'}} /> */}
                            {/* <PhysicianApprovalForm selectedClaim={selectedClaim} /> */}
                            {/* <TherapistFaxCoverPage selectedClaim={selectedClaim} /> */}
                            <RecordsRequestLetter selectedClaim={selectedClaim} />
                        </PDFViewer>
                        }
                    </Grid>
                </Grid>
                </Grid>
            </Box>
        </div>
    );
}