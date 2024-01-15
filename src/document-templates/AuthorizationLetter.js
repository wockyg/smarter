import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

import { careCoordinators } from '../lookup-tables/lookup_careCoordinators';
import { services } from '../lookup-tables/lookup_service';

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
    paddingLeft: 60,
    paddingRight: 60,
  },
  text: {
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  textBold: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
  textBoldUnderline: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textDecoration: 'underline',
  },
  disclaimer: {
    fontSize: 8,
    fontFamily: 'Helvetica-BoldOblique',
    textAlign: 'center',
    // fontWeight: 'bold',
    // lineHeight: '150%',
  },
  paragraph: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  paragraphBold: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.5,
  },
  textBoldItalic: {
    fontSize: 8,
    fontFamily: 'Helvetica-BoldOblique',
    lineHeight: 1.5,
  },
  list: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
    marginLeft: 80,
    marginRight: 80,
  },
  textGray: {
    fontSize: 8,
    color: "#BDC3C7",
  },
  textWhite: {
    fontSize: 4,
    color: "white",
    lineHeight: 1.5,
  },
  gray: {
    marginLeft: 80,
    marginRight: 80,
    padding: 10,
    backgroundColor: "#BDC3C7",
  },
});

export default function AuthorizationLetter(props) {


    const { selectedClaim } = props;

    const assign = careCoordinators?.filter((row) => row.Initials === selectedClaim?.assign)[0];
  
    const today = new Date();
    const month = today.getMonth() + 1; 
    const day = today.getDate();
    const year = today.getFullYear();

    const serviceSpelledOut = services?.filter((s) => s.service === selectedClaim?.service)[0]?.serviceSpelledOut;

    const serviceSpelledOutFinal = `${serviceSpelledOut} ${selectedClaim?.service !== 'PPD' && !selectedClaim?.service !== 'PPD-GL' && 'Evaluation'}`



    return ( 
        <Document>
            <Page size='LETTER' style={styles.page}>
                <Image src={logo} style={{ position: 'absolute', zIndex: -1, top: 30, left: 455, width: 80 }} />
                <View style={styles.section}>
                    <Text style={styles.textWhite}>Dummy</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>{month < 10 ? `0${month}` : `${month}`}/{day < 10 ? `0${day}` : `${day}`}/{year}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.disclaimer}>NOTE: DEFINED PHYSICAL THERAPY IS THE PAYOR ON THIS FILE</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.textBoldUnderline}>Send bills to:</Text>
                    <Text style={styles.textBold}>PO Box 2629</Text>
                    <Text style={styles.textBold}>Kennesaw, GA 30156</Text>
                    <Text style={styles.textBold}>Fax: (800) 401-1289</Text>
                    <Text style={styles.textBold}>Email: patient.records@definedpt.com</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.textBoldUnderline}>{selectedClaim && serviceSpelledOutFinal} Authorization</Text>
                </View>
                
                <View style={styles.gray}>
                    <Text style={styles.text}>PATIENT:</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.text}>DEMOS:</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.text}>DATE OF SERVICE:</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.text}>DIAGNOSIS:</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.text}>AUTH. VISITS:</Text>

                    <Text style={{ position: 'absolute', top: 10, left: 100, fontSize: 8, fontFamily: 'Helvetica' }}>{`${selectedClaim?.claimantLast}, ${selectedClaim?.claimantFirst}`}</Text>
                    <Text style={{ position: 'absolute', top: 28, left: 100, fontSize: 8, fontFamily: 'Helvetica' }}>
                        {`DOB: ${selectedClaim?.claimantBirthDateFormat || '--'} | DOI: ${selectedClaim?.claimantInjuryDate1Format || '--'} | CLM#: ${selectedClaim?.claimNumber || '--'}`}
                    </Text>
                    <Text style={{ position: 'absolute', top: 45, left: 100, fontSize: 8, fontFamily: 'Helvetica' }}>
                        {`${selectedClaim?.apptDateFormat} at ${selectedClaim?.apptTime}`}
                    </Text>
                    <Text style={{ position: 'absolute', top: 63, left: 100, fontSize: 8, fontFamily: 'Helvetica' }}>
                        {selectedClaim?.bodyPart}
                    </Text>
                    <Text style={{ position: 'absolute', top: 80, left: 100, fontSize: 8, fontFamily: 'Helvetica' }}>
                        {selectedClaim?.approvedVisits}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.paragraph}>
                        Dear Provider,
                    </Text>
                    <Text style={styles.paragraph}>
                        {`Thanks in advance for your quality care! Attached, please find important information to facilitate coordination of ${serviceSpelledOutFinal} services for the above referenced patient.`}
                    </Text>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.textBoldItalic}>
                        {`If you allow us the privilege of serving, we promise to do our best!`}
                    </Text>
                    <Text style={styles.paragraph}>
                        {`In support of Workers' Compensation claim management, our standard network support includes:`}
                    </Text>
                </View>
                <View style={styles.list}>
                    <Text style={styles.paragraph}>
                        {'\u2022 Handling 100% of the communication and billing.'}
                    </Text>
                    <Text style={styles.paragraph}>
                        {'\u2022 We follow-up with the patient 24 hours prior to the appointment to confirm his/her attendance.'}
                    </Text>
                    <Text style={styles.paragraph}>
                        {'\u2022 Prompt authorization of treatment plan(s).'}
                    </Text>
                    <Text style={styles.paragraph}>
                        {'\u2022 Please fax the Initial Assessment, Progress Note, and Discharge Note to (800) 401-1289.'}
                    </Text>
                    <Text style={styles.paragraph}>
                        {'\u2022 Our team will handle timely distribution of notes to ALL parties.'}
                    </Text>
                    <Text style={{ position: 'absolute', top: 48, left: 230, fontSize: 8, fontFamily: 'Helvetica-Bold' }}>
                        {'**DO NOT FAX NOTES TO DOCTOR**'}
                    </Text>
                    <Text style={styles.paragraph}>
                        {'\u2022 Reliable payment for services rendered.'}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.paragraph}>
                        {`Please DO NOT CONTACT the adjuster or nurse case manager directly with questions about this referral.`}
                    </Text>
                    <Text style={styles.paragraphBold}>
                        {`Instead, please direct any questions and concerns to the patient's care coordinator, ${assign.TeamMember}, at ${assign.phone}.`}
                    </Text>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.paragraph}>Thank you,</Text>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.paragraph}>{assign?.TeamMember}</Text>
                    <Text style={styles.paragraph}>Direct phone#: {assign?.phone}</Text>
                    <Text style={styles.paragraph}>Email: {assign?.email}</Text>
                    <Text style={styles.paragraph}>Defined Physical Therapy</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.disclaimer}>NOTE: DEFINED PHYSICAL THERAPY IS THE PAYOR ON THIS FILE</Text>
                </View>

            </Page>
        </Document>
    );
}