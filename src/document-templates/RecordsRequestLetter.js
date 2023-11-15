import { Fragment } from 'react';
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
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 10
  },
  signature: {
    // margin: 10,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 10
  },
  topSection: {
    marginTop: 25,
    paddingLeft: 60,
    paddingRight: 60,
  },
  gray: {
    marginLeft: 80,
    marginRight: 80,
    padding: 10,
    // backgroundColor: "#BDC3C7",
  },
  text: {
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  item: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    paddingBottom: 5
  },
  appt: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    paddingBottom: 5,
    paddingLeft: 10
  },
  reason: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    paddingBottom: 5,
    paddingLeft: 15
  },
  claimInfo: {
    fontSize: 10,
    padding: 2,
    fontFamily: 'Helvetica',
  },
  gap: {
    fontSize: 7,
    fontFamily: 'Helvetica',
    color: "#FFFFFF",
  },
  payor: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    textAlign: 'center'
  },
  textHeader: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    padding: 2
  },
  textGray: {
    fontSize: 8,
    color: "#BDC3C7",
  },
  underline: {
    textDecoration: 'underline',
  },
  boldItalics: {
    fontSize: 10,
    fontFamily: 'Helvetica-BoldOblique',
  },
  boldUnderline: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    textDecoration: 'underline',
  },
  bold: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
  },
  boldItalicsUnderline: {
    fontSize: 10,
    fontFamily: 'Helvetica-BoldOblique',
    textDecoration: 'underline',
  },
  white: {
    fontSize: 8,
    color: "white",
  },
});

export default function RecordsRequestLetter(props) {


    const { selectedClaim } = props;

    const assign = careCoordinators?.filter((row) => row.Initials === selectedClaim?.assign)[0];

    const { missingAttendance, numMissingAttendance, eoa, needDc, needPn, needUca, lastDOS } = selectedClaim;

    // const numMissingAttendance = 1;
    // const missingAttendance = 
    //   [
    //       {
    //           "dos": "2023-11-09",
    //           "dosTime": null
    //       },
    //       {
    //           "dos": "2023-11-11",
    //           "dosTime": "1:30PM"
    //       }
    //   ];
    // const eoa = true;
    // const needDc = false;
    // const needPn = false;
    // const needUca = true;
    // const worked = '2013-11-08';
    // const lastDOS = '2013-11-08';
  
    const today = new Date();
    const month = today.getMonth() + 1; 
    const day = today.getDate();
    const year = today.getFullYear();

    let x = 1;

    // const serviceSpelledOut = services?.filter((s) => s.service === selectedClaim?.service)[0]?.serviceSpelledOut;

    const formatDate = (month < 10 ? `0${month}` : month) + '/' + (day < 10 ? `0${day}` : day) +  '/' + year;

    const payor = '**DEFINED PHYSICAL THERAPY NETWORK IS THE PAYOR ON THIS FILE**'

    return (
      <Document>
          <Page size='LETTER' style={styles.page}>
              <Image src={logo} style={{ position: 'absolute', zIndex: -1, top: 25, left: 455, width: 85 }} />
              
              <View style={styles.topSection}>
                  <Text style={styles.textHeader}>{`Date: ${formatDate}`}</Text>
                  <Text style={styles.textHeader}>{'Defined PT Network'}</Text>
                  <Text style={styles.textHeader}>{'PO Box 2628'}</Text>
                  <Text style={styles.textHeader}>{'Kennesaw, GA 30156'}</Text>
                  <Text style={styles.textHeader}>{'Fax: (800) 401-1289'}</Text>
              </View>

              <View style={styles.payor}>
                <Text style={styles.white}>Dummy</Text>
                  <Text style={styles.white}>Dummy</Text>
                  <Text style={styles.boldItalics}>{payor}</Text>
              </View>

              <View style={styles.section}>
                  <Text style={styles.claimInfo}><Text style={styles.underline}>{`PATIENT'S NAME:`}</Text><Text style={styles.gap}>_______</Text>{`${selectedClaim?.claimant}`}</Text>
                  <Text style={styles.claimInfo}><Text style={styles.underline}>{`DOB:`}</Text><Text style={styles.gap}>_____________________</Text>{`${selectedClaim?.claimantBirthDate}`}</Text>
                  <Text style={styles.claimInfo}><Text style={styles.underline}>{`CLM#:`}</Text><Text style={styles.gap}>____________________</Text>{`${selectedClaim?.claimNumber}`}</Text>
                  <Text style={styles.claimInfo}><Text style={styles.underline}>{`BODY PART(S):`}</Text><Text style={styles.gap}>_________</Text>{`${selectedClaim?.bodyPart}`}</Text>
                  <Text style={styles.white}>Dummy</Text>
                  <Text style={styles.white}>Dummy</Text>
                  <Text style={styles.boldItalicsUnderline}>{'NEEDED INFORMATION:'}</Text>
                  {/* <Text style={styles.white}>Dummy</Text> */}
                  <Text style={styles.white}>Dummy</Text>
                  {(needDc || needPn || eoa) &&
                  <Text style={styles.item}>
                    {`${x++}.`}
                    {needDc && 'Therapy Discharge Note'}
                    {needPn && 'Therapy Progress Note'}
                    {eoa && 'Therapy Progress Note or Discharge Note'}
                  </Text>
                  }

                  {numMissingAttendance > 0 &&
                  <>
                  <Text style={styles.item}>
                    {`${x++}. Attendance verification for the following appointment(s):`}
                  </Text>
                    {missingAttendance.map((appt, i) => {
                      return (
                        <Fragment key={i}>
                        <Text style={styles.appt}>
                          {`-${appt.dos}${appt.dosTime ? ` @ ${appt.dosTime}` : ''} ____ (Please provide the therapy note for this date of service.)`}
                        </Text>
                        <Text style={styles.reason}>
                          {`-If not attended, please advise why ______________________\n`}
                        </Text>
                        </Fragment>
                      )
                    })}
                  </>
                  }

                  {needUca &&
                  <>
                  <Text style={styles.item}>
                    {`${x++}. Any attended and/or scheduled appointments since ${lastDOS}:`}
                  </Text>
                  <Text style={styles.appt}>
                    {"Date: ________________  Time: ____________"}
                  </Text>
                  <Text style={styles.appt}>
                    {"Date: ________________  Time: ____________"}
                  </Text>
                  <Text style={styles.appt}>
                    {"Date: ________________  Time: ____________"}
                  </Text>
                  <Text style={styles.appt}>
                    {"Date: ________________  Time: ____________"}
                  </Text>
                  <Text style={styles.appt}>
                    {"Date: ________________  Time: ____________"}
                  </Text>
                  <Text style={styles.appt}>
                    {"If no upcoming appts scheduled, please advise why:______________________________________"}
                  </Text>
                  </>
                  }

                  <Text style={styles.white}>Dummy</Text>
                  <Text style={styles.white}>Dummy</Text>
                  <Text style={styles.bold}>{'Please fax the requested information to (800) 401-1289.'}</Text>
                  <Text style={styles.white}>Dummy</Text>
                  <Text style={styles.white}>Dummy</Text>
                  <Text style={styles.boldUnderline}>{'*Please provide this information as soon as possible, so we can update the adjusters and doctors in a timely manner.*'}</Text>
                                    
              </View>

              <View style={styles.signature}>

                  <Text style={styles.textHeader}>{'Thank you in advance,'}</Text>
                  <Text style={styles.white}>Dummy</Text>
                  <Text style={styles.textHeader}>{`${assign.TeamMember}, Care Coordinator`}</Text>
                  <Text style={styles.textHeader}>{`Phone: ${assign.phone}`}</Text>
                  <Text style={styles.textHeader}>{`Email: ${assign.email}`}</Text>
              </View>
              
          </Page>
      </Document>
    );
}