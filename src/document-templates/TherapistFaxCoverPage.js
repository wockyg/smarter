import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

import { careCoordinators } from '../lookup-tables/lookup_careCoordinators';

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
    paddingLeft: 30,
    paddingRight: 30,
  },
  text: {
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  textBold: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
  },
  textUnderline: {
    fontSize: 11,
    textDecoration: 'underline',
  },
  textItalics: {
    fontSize: 11,
    fontFamily: 'Helvetica-Oblique',
  },
  textBoldUnderlineItalics: {
    fontSize: 11,
    fontFamily: 'Helvetica-BoldOblique',
    textDecoration: 'underline',
  },
  textWhite: {
    fontSize: 4,
    color: "white",
  },
  table: { 
    display: "table", 
    width: "auto", 
    // borderStyle: "solid", 
    // borderWidth: 1, 
    // borderRightWidth: 0, 
    // borderLeftWidth: 0,
    // borderTopWidth: 0,
    marginLeft: 40,
    marginRight: 40,
  }, 
  tableRow: { 
    // margin: "auto",
    flexDirection: "row" 
  },
  tableCol: { 
    width: "50%", 
    marginLeft: 30,
    marginRight: 30,
  },
  tableColHeader: { 
    width: "50%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderLeftWidth: 0,
    borderTopWidth: 0,
    marginLeft: 30,
    marginRight: 30,
  },
    tableCell: { 
    // margin: "auto", 
    marginTop: 1,
    marginLeft: 1,
    fontSize: 11,
    color: "black",
  },
  tableCellHeader: { 
    // margin: "auto", 
    marginTop: 1,
    marginLeft: 1,
    fontSize: 13,
    color: "black",
    fontFamily: 'Helvetica-Bold',
  },
});

export default function TherapistFaxCoverPage(props) {


    const { selectedClaim } = props;

    const assign = careCoordinators?.filter((row) => row.Initials === selectedClaim?.assign)[0];
  
    const today = new Date();
    const month = today.getMonth() + 1; 
    const day = today.getDate();
    const year = today.getFullYear();

    const formatDate = (month < 10 ? `0${month}` : month) + '/' + (day < 10 ? `0${day}` : day) +  '/' + year;

    const header = `ATTENTION: ${selectedClaim.therapist}`;

    const benchmark = '**Upon completion of the report, please email it directly to the care coordinator at the email address listed below.\nFaxed reports will not be accepted.**';

    return (
        
        <Document>
            <Page size='LETTER' style={styles.page}>

                <Image src={logo} style={{ position: 'absolute', zIndex: -1, top: 10, left: 455, width: 85 }} />

                <View style={styles.section}>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.textWhite}>Dummy</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.textHeader}>{header}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={{...styles.text, backgroundColor: 'yellow'}}>{selectedClaim?.therapist?.includes("Benchmark") && benchmark}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}><Text style={styles.textBold}>Date:</Text> {formatDate}</Text>
                    <Text style={styles.text}><Text style={styles.textBold}>Claimant's Name:</Text> {selectedClaim.claimantLast}, {selectedClaim.claimantFirst}</Text>
                    <Text style={styles.text}><Text style={styles.textBold}>DOB:</Text> {selectedClaim.claimantBirthDateFormat}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>
                      Included in Fax (<Text style={styles.textItalics}>if impairment is needed everything from the FCE section will be included</Text>):
                    </Text>
                </View>

                <View style={styles.table}> 
                    <View style={styles.tableRow}> 
                        {selectedClaim.service.includes('FCE') &&
                        <View style={styles.tableColHeader}> 
                            <Text style={{...styles.tableCellHeader}}>FCE</Text>
                        </View>
                        }
                        {selectedClaim.service.includes('PPD') &&
                        <View style={styles.tableColHeader}> 
                            <Text style={{...styles.tableCellHeader}}>PPD</Text>
                        </View>
                        }
                    </View>
                    <View style={styles.tableRow}>
                        {selectedClaim.service.includes('FCE') &&
                        <View style={styles.tableCol}> 
                            <Text style={{...styles.tableCell}}>
                              {selectedClaim.rxFromAdjuster ? <Text style={styles.textUnderline}> X </Text> : '__'} FCE Script
                            </Text>
                            <Text style={{...styles.tableCell}}>
                              {selectedClaim.ptNotesFromAdjuster ? <Text style={styles.textUnderline}> X </Text> : '__'} PT Notes
                            </Text>
                            <Text style={{...styles.tableCell}}>
                              {selectedClaim.ovnFromAdjuster ? <Text style={styles.textUnderline}> X </Text> : '__'} Medical Office Visit Notes
                            </Text>
                            <Text style={{...styles.tableCell}}>
                              {selectedClaim.mriFromAdjuster ? <Text style={styles.textUnderline}> X </Text> : '__'} MRI Report
                            </Text>
                            <Text style={{...styles.tableCell}}>
                              {selectedClaim.jdFromAdjuster ? <Text style={styles.textUnderline}> X </Text> : '__'} Job Description
                            </Text>
                            <Text style={{...styles.tableCell}}>
                              <Text style={styles.textUnderline}> X </Text> Authorization
                            </Text>
                          </View>
                        }
                        {selectedClaim.service.includes('PPD') &&
                        <View style={styles.tableCol}> 
                            <Text style={{...styles.tableCell}}>
                              {selectedClaim.postOpAdjuster ? <Text style={styles.textUnderline}> X </Text> : '__'} Post-op Notes
                            </Text>
                            <Text style={{...styles.tableCell}}>
                              <Text style={styles.textUnderline}> X </Text> Authorization
                            </Text>
                        </View> 
                        }
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.textItalics}>If any documents are missing, please note that they will be sent as soon as received.</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.textBoldUnderlineItalics}>CARE COORDINATOR ASSIGNED TO THIS FILE:</Text>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.text}>{`${assign?.TeamMember} - direct phone #: ${assign?.phone} | Email: ${assign?.email}`}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>Thank you,</Text>
                    <Text style={styles.text}>Defined Physical Therapy</Text>
                    <Text style={styles.text}>P: 800-605-6030</Text>
                    <Text style={styles.text}>F: 800-401-1289</Text>
                </View>

            </Page>
        </Document>
    );
}