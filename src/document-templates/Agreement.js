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
    paddingLeft: 20,
    paddingRight: 20,
  },
  sectionBreak: {
    margin: 5,
    paddingLeft: 20,
    paddingRight: 20,
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
  paragraphBoldUnderline: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.5,
    textDecoration: 'underline',
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
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
    // backgroundColor: "#BDC3C7",
    border: "1px solid black",
  },
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0,
    marginLeft: 30,
    marginRight: 30,
  }, 
  tableSignature: { 
    display: "table", 
    width: "auto", 
    // borderStyle: "solid", 
    // borderWidth: 1, 
    // borderRightWidth: 0, 
    // borderBottomWidth: 0,
    marginLeft: 30,
    marginRight: 30,
  }, 
  tableRow: { 
    // margin: "auto",
    flexDirection: "row" 
  },
  tableCol1: { 
    width: "100%", 
    borderStyle: "solid", 
    borderWidth: 1,
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCol: { 
    width: "50%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
  },
  tableColSignature: { 
    width: "25%", 
    borderStyle: "solid", 
    borderWidth: 1,
    borderLeftWidth: 0, 
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableCell: { 
    // margin: "auto", 
    marginTop: 1,
    marginLeft: 1,
    fontSize: 8,
    color: "black",
  },
  tableCellTitle: { 
    fontSize: 5,
    color: "black",
  }
});

export default function Agreement(props) {

    const { values } = props;

    const docListDPT = (values.serviceTypes[0] || values.serviceTypes[1]) ? "Daily, Initial Evaluations Etc." : "";
    const doclistFCE = (values.serviceTypes[2] || values.serviceTypes[3]) ? "FCE's, Impairment Ratings" : "";
    const doclistComma = ((values.serviceTypes[0] || values.serviceTypes[1]) && (values.serviceTypes[2] || values.serviceTypes[3])) ? ", " : "";
    const docList = doclistFCE + doclistComma + docListDPT;
    const daily4Units = values?.serviceTypes[0] === true ? 'Daily rate represents an expectation of 4 units per visit.' : '';
    // const daily4Units = "TEST";

    // console.log(values);
  
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    const todayFormat = (month < 10 ? `0${month}` : `${month}`) + '/' + (day < 10 ? `0${day}` : `${day}`) + '/' + year;

  
    const dos_array = props?.rows?.map( (row) => {return new Date(Date.parse(row.dos));} );
    const dos_months = dos_array?.map( (row) => {return (row.getMonth()+1) < 10 ? `0${row.getMonth()+1}` : `${row.getMonth()+1}`} );
    const dos_days = dos_array?.map( (row) => {return (row.getDate()+1) < 10 ? `0${row.getDate()+1}` : `${row.getDate()+1}`} );
    const dos_years = dos_array?.map( (row) => {return String(row.getFullYear()).substring(2)} );

    const serviceSpelledOut = services?.filter((s) => s.service === values?.service)[0]?.serviceSpelledOut;

    const serviceSpelledOutFinal = `${serviceSpelledOut} ${values?.service !== 'PPD' && !values?.service !== 'PPD-GL' && 'Evaluation'}`



    return ( 
        <Document>
            <Page size='LETTER' style={styles.page}>
                <Image src={logo} style={{ position: 'absolute', zIndex: -1, top: 30, left: 455, width: 80 }} />
                <View style={styles.section}>
                    <Text style={styles.textWhite}>SPACER</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.textWhite}>SPACER</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.textWhite}>SPACER</Text>
                    <Text style={styles.paragraphBold}>{`Defined Physical Therapy, Inc.`}</Text>
                    <Text style={styles.paragraphBoldUnderline}>
                      {values.agreementType === 'Single-Case' && `${values?.claimant.lastFirst} - `}{`${values.agreementType} Agreement - Workers Compensation`}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.disclaimer}>{`Scope & Payment for Services Rendered`}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.paragraph}>
                        {`The undersigned Physical Therapist/Company does hereby agree to `}
                        {values.agreementType === 'Single-Case' && `provide physical therapy services on a limited assignment basis for the above patient. `}
                        {values.agreementType === 'Network' && `become a member of the Defined Physical Therapy, Inc. Physical Medicine Network. `}
                        {`Defined Physical Therapy, Inc. agrees to pay the provider for services rendered, according to the Rate Schedule outlined in this contract, within 45 calendar days of the date of any invoice presented for payment. `}
                        {`Defined Physical Therapy, Inc. will maintain ownership of all completed reports (${docList}) and will be responsible for all distribution to applicable parties. ${daily4Units}`}
                    </Text>
                    <Text style={styles.textWhite}>SPACER</Text>
                    <Text style={styles.textWhite}>SPACER</Text>
                    <Text style={styles.paragraphBoldUnderline}>{`Reimbursement schedule:`}</Text>
                    <Text style={styles.textWhite}>SPACER</Text>
                    {values.serviceTypes[0] && values.therapist.dailyRate && <Text style={styles.paragraphBold}>{`$${values.therapist.dailyRate} daily maximum for CPT Codes 97004 to 97755 (Excluding Initial Evaluation [97161,97162,97163,97165,97166,97167]) (4 units).`}</Text>}
                    {values.serviceTypes[0] && values.therapist.evalRate && <Text style={styles.paragraphBold}>{`$${values.therapist.evalRate} maximum for Initial Evaluation (CPT Codes 97161,97162,97163,97165,97166,9716.`}</Text>}
                    {values.serviceTypes[0] && values.therapist.combinedRate && <Text style={styles.paragraphBold}>{`$${values.therapist.combinedRate} maximum for Initial Evaluation (CPT Codes 97161,97162,97163,97165,97166,97167) and Treatment on same date of service.`}</Text>}
                    {values.serviceTypes[1] && values.therapist.wcwhFirst2Hrs && <Text style={styles.paragraphBold}>{`$${values.therapist.wcwhFirst2Hrs} maximum for CPT Code 97545 (first 2 hours).`}</Text>}
                    {values.serviceTypes[1] && values.therapist.wcwhAdditionalHour && <Text style={styles.paragraphBold}>{`$${values.therapist.wcwhAdditionalHour} maximum for CPT Code 97546 (each additional hour).`}</Text>}
                    {values.serviceTypes[2] && values.therapist.fceRate && <Text style={styles.paragraphBold}>{`$${values.therapist.fceRate} per NIOSH compliant Functional Capacity Evaluation final report submitted.`}</Text>}
                    {values.serviceTypes[3] && values.therapist.ppdRate && <Text style={styles.paragraphBold}>{`$${values.therapist.ppdRate} per Impairment Rating submitted.`}</Text>}
                </View>

                <View style={styles.section}>
                    <Text style={styles.textBoldItalic}>{`PLEASE PRINT CLEARLY:`}</Text>
                </View>
                
                <View style={styles.table}> 
                    <View style={styles.tableRow}> 
                        <View style={styles.tableCol}> 
                            <Text style={{...styles.tableCell, color: "white"}}><Text style={styles.tableCellTitle}>{`Therapist Name:\n\n`}</Text>SPACER</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={{...styles.tableCell, color: "white"}}><Text style={styles.tableCellTitle}>{`License # | State:\n\n`}</Text>SPACER</Text>
                        </View> 
                    </View>
                    <View style={styles.tableRow}> 
                        <View style={styles.tableCol}> 
                            <Text style={{...styles.tableCell, color: "black"}}><Text style={styles.tableCellTitle}>{`Facility Name:\n\n`}</Text>{values.therapist.name}</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={{...styles.tableCell, color: "black"}}><Text style={styles.tableCellTitle}>{`Phone:\n\n`}</Text>{values.therapist.phone}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}> 
                        <View style={styles.tableCol}> 
                            <Text style={{...styles.tableCell, color: "black"}}><Text style={styles.tableCellTitle}>{`Clinic Location Address:\n\n`}</Text>{values.therapist.address}</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={{...styles.tableCell, color: "black"}}><Text style={styles.tableCellTitle}>{`Fax:\n\n`}</Text>{values.therapist.fax}</Text>
                        </View>                      
                    </View> 
                    <View style={styles.tableRow}> 
                        <View style={styles.tableCol}> 
                            <Text style={{...styles.tableCell, color: "black"}}><Text style={styles.tableCellTitle}>{`City, State Zip:\n\n`}</Text>{values.therapist.city}, {values.therapist.state} {values.therapist.zip}</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={{...styles.tableCell, color: "white"}}><Text style={styles.tableCellTitle}>{`Email:\n\n`}</Text>{values.therapist.email}</Text>
                        </View> 
                    </View> 
                </View>

                 <View style={styles.section}>
                    <Text style={styles.textBoldItalic}>{`BILLING CONTACT INFO:`}</Text>
                </View>
                
                <View style={styles.table}> 
                    <View style={styles.tableRow}> 
                        <View style={styles.tableCol}> 
                            <Text style={{...styles.tableCell, color: "black"}}><Text style={styles.tableCellTitle}>{`Billing Contact Name:\n\n`}</Text>{values.therapist.billingContact}</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={{...styles.tableCell, color: "white"}}><Text style={styles.tableCellTitle}>{`TIN/EIN:\n\n`}</Text>SPACER</Text>
                        </View> 
                    </View>
                    <View style={styles.tableRow}> 
                        <View style={styles.tableCol}> 
                            <Text style={{...styles.tableCell, color: "black"}}><Text style={styles.tableCellTitle}>{`Phone:\n\n`}</Text>{values.therapist.billingPhone}</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={{...styles.tableCell, color: `${values.therapist.billingEmail ? 'black' : 'white'}`}}><Text style={styles.tableCellTitle}>{`Email:\n\n`}</Text>{values.therapist.billingEmail ? values.therapist.billingEmail : 'SPACER'}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}> 
                        <View style={styles.tableCol}> 
                            <Text style={{...styles.tableCell, color: "black"}}><Text style={styles.tableCellTitle}>{`Fax:\n\n`}</Text>{values.therapist.billingFax}</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={{...styles.tableCell, color: "white"}}><Text style={styles.tableCellTitle}>{`\n\n`}</Text>SPACER</Text>
                        </View>                      
                    </View> 
                </View>

                 <View style={styles.section}>
                    <Text style={styles.textBoldItalic}>{`PAYMENT REMITTANCE ADDRESS (IF DIFFERENT THAN LOCATION ADDRESS):`}</Text>
                </View>
                
                <View style={styles.table}> 
                    <View style={styles.tableRow}> 
                        <View style={styles.tableCol}> 
                            <Text style={{...styles.tableCell, color: "white"}}><Text style={styles.tableCellTitle}>{`Facility Name:\n\n`}</Text>SPACER</Text>
                        </View>
                        <View style={styles.tableCol}> 
                            <Text style={{...styles.tableCell, color: "white"}}><Text style={styles.tableCellTitle}>{`Payment Remittance Address:\n\n`}</Text>SPACER</Text>
                        </View>
                    </View>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.textBoldItalic}>{`READ AND AGREED:`}</Text>
                </View>

                <View style={styles.sectionBreak}>
                    
                </View>

                <View style={styles.tableSignature}> 
                    <View style={styles.tableRow}> 
                        <View style={styles.tableColSignature}> 
                            <Text style={{...styles.tableCell}}><Text style={styles.tableCellTitle}>{`Authorized Representative\n\n\n`}</Text>Jessica Tehas</Text>
                        </View> 
                        <View style={styles.tableColSignature}> 
                            <Text style={{...styles.tableCell}}><Text style={styles.tableCellTitle}>{`Date\n\n\n`}</Text>{todayFormat}</Text>
                        </View> 
                    </View>
                    <View style={styles.tableRow}> 
                        <View style={styles.tableColSignature}> 
                            <Text style={{...styles.tableCell, color: "white"}}><Text style={styles.tableCellTitle}>{`Jessica Tehas, Defined Physical Therapy, Inc.\n\n`}</Text>SPACER</Text>
                        </View> 
                        <View style={styles.tableColSignature}> 
                            <Text style={{...styles.tableCell, color: "white"}}><Text style={styles.tableCellTitle}>{`Date\n\n`}</Text>SPACER</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section} />
                {/* <View style={styles.section} />
                <View style={styles.section} />
                <View style={styles.section} /> */}

                <View style={styles.section}>
                    <Text style={{...styles.text, margin: 'auto'}}>www.definedpt.com | P.O. Box 2629, Kennesaw, GA 30156 | MAIN (800) 605-6030 | FAX (800) 401-1289</Text>
                </View>
            </Page>
        </Document>
    );
}