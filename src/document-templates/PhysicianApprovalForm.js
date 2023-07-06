import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

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
  gray: {
    marginLeft: 80,
    marginRight: 80,
    padding: 10,
    backgroundColor: "#BDC3C7",
  },
  text: {
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  textHeader: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
  },
  textGray: {
    fontSize: 8,
    color: "#BDC3C7",
  },
  textWhite: {
    fontSize: 4,
    color: "white",
  },
});

export default function PhysicianApprovalForm(props) {


    const { selectedClaim } = props;
  
    const today = new Date();
    const month = today.getMonth() + 1; 
    const day = today.getDate();
    const year = today.getFullYear();

    const serviceSpelledOut = services?.filter((s) => s.service === selectedClaim?.service)[0]?.serviceSpelledOut;

    const formatDate = (month < 10 ? `0${month}` : month) + '/' + (day < 10 ? `0${day}` : day) +  '/' + year;

    const header = 'Physician Approval Form';

    const salutation = `Dear Dr. ${selectedClaim.physicianLast},`;

    const patient = (selectedClaim?.claimantGender === "Male" ? 'Mr. ' : 'Ms. ') + selectedClaim?.claimantLast;

    const intro = `Defined Physical Therapy completed a ${serviceSpelledOut} on ${patient} at the request of ${selectedClaim?.adjusterClient}.`;

    const agree = `I have read the report and AGREE it represents ${patient}'s level of ${serviceSpelledOut}.`;

    const disagree = `I have read the report, but DO NOT AGREE it represents ${patient}'s level of ${serviceSpelledOut}.`;

    const signatureTitle = `Dr. ${selectedClaim.physicianFirst} ${selectedClaim.physicianLast}`;

    const comments = 'Comments:';

    return (
        
        <Document>
            <Page size='LETTER' style={styles.page}>
                <Image src={logo} style={{ position: 'absolute', zIndex: -1, top: 10, left: 455, width: 85 }} />
                <View style={styles.section}>
                    <Text style={styles.textWhite}>Dummy</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.textWhite}>Dummy</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.textWhite}>Dummy</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.textHeader}>{header}</Text>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.text}>{`Date: ${formatDate}`}</Text>
                    <Text style={styles.text}>{`Patient Name: ${selectedClaim.claimantLast}, ${selectedClaim.claimantFirst}`}</Text>
                    <Text style={styles.text}>{`${selectedClaim.bodyPart}`}</Text>
                    <Text style={styles.text}>{`Date of ${selectedClaim.service}: ${selectedClaim.apptDateFormat}`}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>{salutation}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>{intro}</Text>
                </View>
                
                <View style={styles.gray}>
                    <Text style={styles.text}>{agree}</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.text}>{`${signatureTitle}           Doctor Signature: _______________________ Date: _______________`}</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.text}>{comments}</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                </View>

                <View style={styles.section} />

                <View style={styles.gray}>
                    <Text style={styles.text}>{disagree}</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.text}>{`${signatureTitle}           Doctor Signature: _______________________ Date: _______________`}</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.text}>{comments}</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                </View>
            </Page>
        </Document>
    );
}