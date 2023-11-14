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

export default function RecordsRequestLetter(props) {


    const { selectedClaim } = props;
  
    const today = new Date();
    const month = today.getMonth() + 1; 
    const day = today.getDate();
    const year = today.getFullYear();

    const serviceSpelledOut = services?.filter((s) => s.service === selectedClaim?.service)[0]?.serviceSpelledOut;

    const formatDate = (month < 10 ? `0${month}` : month) + '/' + (day < 10 ? `0${day}` : day) +  '/' + year;

    const header = 'Patient Records Request';

    const payor = '**DEFINED PHYSICAL THERAPY NETWORK IS THE PAYOR ON THIS FILE**'

    const patient = (selectedClaim?.claimantGender === "Male" ? 'Mr. ' : 'Ms. ') + selectedClaim?.claimantLast;

    const intro = `Defined Physical Therapy completed a ${serviceSpelledOut} on ${patient} at the request of ${selectedClaim?.adjusterClient}.`;

    return (
        
        <Document>
            <Page size='LETTER' style={styles.page}>
                <Image src={logo} style={{ position: 'absolute', zIndex: -1, top: 10, left: 455, width: 85 }} />
                
                <View style={styles.section}>
                    <Text style={styles.textHeader}>{header}</Text>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.text}>{`Date: ${formatDate}`}</Text>
                    <Text style={styles.text}>{'Defined PT Network'}</Text>
                    <Text style={styles.text}>{'PO Box 2628'}</Text>
                    <Text style={styles.text}>{'Kennesaw, GA 30156'}</Text>
                    <Text style={styles.text}>{'Fax: (800) 401-1289'}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>{payor}</Text>
                </View>

                <View style={styles.gray}>
                    <Text style={styles.text}>{`Patient Name: ${selectedClaim?.claimant}`}</Text>
                    <Text style={styles.text}>{`DOB: ${selectedClaim?.claimantBirthDate}`}</Text>
                    <Text style={styles.text}>{`CLM#: ${selectedClaim?.claimNumber}`}</Text>
                    <Text style={styles.text}>{`Body Parts(s): ${selectedClaim?.bodyPart}`}</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.text}>{'Needed Information:'}</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                </View>

                <View style={styles.section} />

                <View style={styles.section}>
                    <Text style={styles.textHeader}>{'Please fax the requested information to (800) 401-1289.'}</Text>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.text}>{'*Please provide this information as soon as possible, so we can update the adjusters and doctors in a timely manner.*'}</Text>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.text}>{'Thank you in advance,'}</Text>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.text}>{'Warren McClure, Care Coordinator'}</Text>
                    <Text style={styles.text}>{'Phone: (888) 888-8888'}</Text>
                    <Text style={styles.text}>{'email: wmcclure@definedpt.com'}</Text>
                </View>
                
            </Page>
        </Document>
    );
}