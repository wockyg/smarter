import Skeleton from '@mui/material/Skeleton';

import { Page, Text, View, Document, StyleSheet, PDFViewer, Image, PDFDownloadLink } from '@react-pdf/renderer';

import blank1500 from '../document-templates/blank1500.jpg';
import { da } from 'date-fns/locale';


export default function HCFATemplate(props) {

    const {selectedClaim, icd10CodeList, cptRows, selectedV1500: selectedV1500Array} = props;

    // console.log(props)

    const selectedV1500 = selectedV1500Array && selectedV1500Array.length > 0 ? selectedV1500Array[0] : null

    // const num_ic10codes = icd10CodeList?.length; // for manual mode

    // const { cptRows, setCptRows } = useContext(SelectedClaimContext);

    const numRows = cptRows?.length;

    const dob = selectedClaim && new Date( Date.parse(selectedClaim?.claimantBirthDate) );
    const doi1 = selectedClaim && new Date( Date.parse(selectedClaim?.claimantInjuryDate1) );

    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();

    
    const dos_months = cptRows?.map( (row) => {return row.dos.slice(5, 7)} );
    const dos_days = cptRows?.map( (row) => {return row.dos.slice(8, 10)} );
    const dos_years = cptRows?.map( (row) => {return row.dos.slice(2, 4)} );

    // console.log(dos_months);
    // console.log(dos_days);
    // console.log(dos_years);

    const dos_dollars = cptRows?.map( (row) => {return row?.charges.toString().substring(0, row?.charges.toString().indexOf('.'));} );
    const dos_cents = cptRows?.map( (row) => {return row?.charges.toString().substring(row?.charges.toString().indexOf('.')+1);} );

    let total_charges = 0.0;

    cptRows?.forEach((row) => {total_charges = total_charges + (+row.charges)})

    total_charges = (Math.round(total_charges * 100) / 100).toFixed(2);

    const digits = String(total_charges).substring(0, String(total_charges).indexOf('.')).length;

    // console.log(total_charges);

    return (
      <Document>
        <Page size='LETTER' style={{ position: 'relative' }}>
            <View style={{ display: 'flex', height: '100%', width:'100%', position: 'relative' }}>

                {/* ...VARIABLES... */}

                {/* Box 0 - CLIENT MAILING ADDRESS */}
                <Text style={{ position: 'absolute', top: 15, left: 380, fontSize: 10 }}>{selectedClaim?.adjusterClientMailingAddress}</Text>

                {/* Box 1a - INSURED'S I.D. NUMBER */}
                <Text style={{ position: 'absolute', top: 89, left: 380, fontSize: 12 }}>{selectedClaim?.claimNumber}</Text>

                {/* Box 2 - PATIENT'S NAME */}
                <Text style={{ position: 'absolute', top: 114, left: 20, fontSize: 12 }}>{selectedClaim?.claimant.toUpperCase()}</Text>

                {/* Box 3 - PATIENT'S BIRTH DATE / SEX */}
                <Text style={{ position: 'absolute', top: 115, left: 235, fontSize: 12 }}>{(dob?.getMonth()+1) < 10 ? `0${dob?.getMonth()+1}` : `${dob?.getMonth()+1}`}</Text>
                <Text style={{ position: 'absolute', top: 115, left: 260, fontSize: 12 }}>{(dob?.getDate()) < 10 ? `0${dob?.getDate()}` : `${dob?.getDate()}`}</Text>
                <Text style={{ position: 'absolute', top: 115, left: 280, fontSize: 12 }}>{dob?.getFullYear()}</Text>
                
                <Text style={{ position: 'absolute', top: 114, left: 356, fontSize: 10 }}>{selectedClaim?.claimantGender === 'Female' ? 'x' : null}</Text>
                <Text style={{ position: 'absolute', top: 114, left: 319, fontSize: 10 }}>{selectedClaim?.claimantGender === 'Male' ? 'x' : null}</Text>

                {/* Box 4 - INSURED'S NAME */}
                <Text style={{ position: 'absolute', top: 114, left: 380, fontSize: 12 }}>{selectedClaim?.claimant.toUpperCase()}</Text>
                {/* Box 5 - PATIENT'S ADDRESS */}
                <Text style={{ position: 'absolute', top: 139, left: 20, fontSize: 12 }}>{selectedClaim?.claimantAddress.toUpperCase()}</Text>
                <Text style={{ position: 'absolute', top: 162, left: 20, fontSize: 12 }}>{selectedClaim?.claimantCity.toUpperCase()}</Text>
                <Text style={{ position: 'absolute', top: 162, left: 200, fontSize: 12 }}>{selectedClaim?.claimantState}</Text>
                <Text style={{ position: 'absolute', top: 188, left: 20, fontSize: 12 }}>{selectedClaim?.claimantZip}</Text>
                <Text style={{ position: 'absolute', top: 188, left: 118, fontSize: 12 }}>
                    {selectedClaim?.claimantPhone.substring(1, selectedClaim?.claimantPhone.indexOf(')'))}  {selectedClaim?.claimantPhone.substring(selectedClaim?.claimantPhone.indexOf(')')+2)}
                </Text>
                {/* Box 7 - INSURED'S ADDRESS */}
                <Text style={{ position: 'absolute', top: 139, left: 380, fontSize: 12 }}>{selectedClaim?.claimantAddress.toUpperCase()}</Text>
                <Text style={{ position: 'absolute', top: 162, left: 380, fontSize: 12 }}>{selectedClaim?.claimantCity.toUpperCase()}</Text>
                <Text style={{ position: 'absolute', top: 162, left: 556, fontSize: 12 }}>{selectedClaim?.claimantState}</Text>
                <Text style={{ position: 'absolute', top: 188, left: 380, fontSize: 12 }}>{selectedClaim?.claimantZip}</Text>
                <Text style={{ position: 'absolute', top: 187, left: 493, fontSize: 12 }}>
                    {selectedClaim?.claimantPhone.substring(1, selectedClaim?.claimantPhone.indexOf(')'))}  {selectedClaim?.claimantPhone.substring(selectedClaim?.claimantPhone.indexOf(')')+2)}
                </Text>
                {/* Box 10 - IS PATIENT'S CONDITION RELATED TO */}
                <Text style={{ position: 'absolute', top: 261, left: 340, fontSize: 12 }}>{selectedClaim?.claimantState}</Text>
                {/* Box 11a - INSURED'S DATE OF BIRTH / SEX */}
                <Text style={{ position: 'absolute', top: 239, left: 401, fontSize: 12 }}>{(dob?.getMonth()+1) < 10 ? `0${dob?.getMonth()+1}` : `${dob?.getMonth()+1}`}</Text>
                <Text style={{ position: 'absolute', top: 239, left: 425, fontSize: 12 }}>{(dob?.getDate()) < 10 ? `0${dob?.getDate()}` : `${dob?.getDate()}`}</Text>
                <Text style={{ position: 'absolute', top: 239, left: 445, fontSize: 12 }}>{dob?.getFullYear()}</Text>
                <Text style={{ position: 'absolute', top: 237, left: 567, fontSize: 10 }}>{selectedClaim?.claimantGender === 'Female' ? 'x' : null}</Text>
                <Text style={{ position: 'absolute', top: 237, left: 514, fontSize: 10 }}>{selectedClaim?.claimantGender === 'Male' ? 'x' : null}</Text>
                {/* Box 11b - OTHER CLAIM ID */}
                <Text style={{ position: 'absolute', top: 261, left: 395, fontSize: 12 }}>{selectedClaim?.claimNumber}</Text>
                {/* Box 12 - PATIENT'S OR AUTHORIZED PERSON'S SIGNATURE */}
                <Text style={{ position: 'absolute', top: 357, left: 278, fontSize: 12 }}>{month < 10 ? `0${month}` : `${month}`} / {day < 10 ? `0${day}` : `${day}`} / {year}</Text>
                {/* Box 14 - DATE OF CURRENT ILLNESS, INJURY, OR PREGNANCY */}
                <Text style={{ position: 'absolute', top: 385, left: 18, fontSize: 12 }}>{(doi1?.getMonth()+1) < 10 ? `0${doi1?.getMonth()+1}` : `${doi1?.getMonth()+1}`}</Text>
                <Text style={{ position: 'absolute', top: 385, left: 41, fontSize: 12 }}>{(doi1?.getDate()) < 10 ? `0${doi1?.getDate()}` : `${doi1?.getDate()}`}</Text>
                <Text style={{ position: 'absolute', top: 385, left: 63, fontSize: 12 }}>{doi1?.getFullYear()}</Text>
                {/* Box 17 - NAME OF REFERRING PROVIDER / NPI */}
                {/* <Text style={{ position: 'absolute', top: 409, left: 33, fontSize: 12 }}>{selectedClaim?.physicianFirst.toUpperCase()} {selectedClaim?.physicianLast.toUpperCase()}, MD</Text> */}
                {/* <Text style={{ position: 'absolute', top: 409, left: 245, fontSize: 12 }}>{selectedClaim?.physicianNPI}</Text> */}
                <Text style={{ position: 'absolute', top: 409, left: 11, fontSize: 12 }}>DN</Text>
                <Text style={{ position: 'absolute', top: 409, left: 33, fontSize: 12 }}>{selectedV1500 ? selectedV1500.physician_name : (selectedClaim.physicianId ? `${selectedClaim?.physicianFirst.toUpperCase()} ${selectedClaim?.physicianLast.toUpperCase()}, MD` : '')}</Text>
                <Text style={{ position: 'absolute', top: 409, left: 245, fontSize: 12 }}>{selectedV1500 ? selectedV1500.physician_npi : (selectedClaim.physicianNPI ? `${selectedClaim?.physicianNPI}` : '')}</Text>
                {/* Box 21 - DIAGNOSIS OR NATURE OF ILLNESS OR INJURY */}
                {(selectedV1500?.diagnosis_a || (icd10CodeList && icd10CodeList.length > 0)) && <Text style={{ position: 'absolute', top: 460, left: 25, fontSize: 10 }}>{selectedV1500 ? selectedV1500.diagnosis_a : icd10CodeList[0].icd10 || ''}</Text>}
                {(selectedV1500?.diagnosis_b || (icd10CodeList && icd10CodeList.length > 1)) && <Text style={{ position: 'absolute', top: 460, left: 123, fontSize: 10 }}>{selectedV1500 ? selectedV1500.diagnosis_b : icd10CodeList[1].icd10 || ''}</Text>}
                {(selectedV1500?.diagnosis_c || (icd10CodeList && icd10CodeList.length > 2)) && <Text style={{ position: 'absolute', top: 460, left: 221, fontSize: 10 }}>{selectedV1500 ? selectedV1500.diagnosis_c : icd10CodeList[2].icd10 || ''}</Text>}
                {(selectedV1500?.diagnosis_d || (icd10CodeList && icd10CodeList.length > 3)) && <Text style={{ position: 'absolute', top: 461, left: 318, fontSize: 10 }}>{selectedV1500 ? selectedV1500.diagnosis_d : icd10CodeList[3].icd10 || ''}</Text>}
                {(selectedV1500?.diagnosis_e || (icd10CodeList && icd10CodeList.length > 4)) && <Text style={{ position: 'absolute', top: 472, left: 25, fontSize: 10 }}>{selectedV1500 ? selectedV1500.diagnosis_e : icd10CodeList[4].icd10 || ''}</Text>}
                {(selectedV1500?.diagnosis_f || (icd10CodeList && icd10CodeList.length > 5)) && <Text style={{ position: 'absolute', top: 472, left: 123, fontSize: 10 }}>{selectedV1500 ? selectedV1500.diagnosis_f : icd10CodeList[5].icd10 || ''}</Text>}
                {(selectedV1500?.diagnosis_g || (icd10CodeList && icd10CodeList.length > 6)) && <Text style={{ position: 'absolute', top: 472, left: 221, fontSize: 10 }}>{selectedV1500 ? selectedV1500.diagnosis_g : icd10CodeList[6].icd10 || ''}</Text>}
                {(selectedV1500?.diagnosis_h || (icd10CodeList && icd10CodeList.length > 7)) && <Text style={{ position: 'absolute', top: 473, left: 318, fontSize: 10 }}>{selectedV1500 ? selectedV1500.diagnosis_h : icd10CodeList[7].icd10 || ''}</Text>}
                {(selectedV1500?.diagnosis_i || (icd10CodeList && icd10CodeList.length > 8)) && <Text style={{ position: 'absolute', top: 484, left: 25, fontSize: 10 }}>{selectedV1500 ? selectedV1500.diagnosis_i : icd10CodeList[8].icd10 || ''}</Text>}
                {(selectedV1500?.diagnosis_j || (icd10CodeList && icd10CodeList.length > 9)) && <Text style={{ position: 'absolute', top: 484, left: 123, fontSize: 10 }}>{selectedV1500 ? selectedV1500.diagnosis_j : icd10CodeList[9].icd10 || ''}</Text>}
                {(selectedV1500?.diagnosis_k || (icd10CodeList && icd10CodeList.length > 10)) && <Text style={{ position: 'absolute', top: 484, left: 221, fontSize: 10 }}>{selectedV1500 ? selectedV1500.diagnosis_k : icd10CodeList[10].icd10 || ''}</Text>}
                {(selectedV1500?.diagnosis_l || (icd10CodeList && icd10CodeList.length > 11)) && <Text style={{ position: 'absolute', top: 484, left: 318, fontSize: 10 }}>{selectedV1500 ? selectedV1500.diagnosis_l : icd10CodeList[11].icd10 || ''}</Text>}

                {/* Box 24 - DOS/CPT ROWS */}

                {/* row 1 top: 532 */}

                {numRows > 0 && 
                    <>
                    <Text style={{ position: 'absolute', top: 532, left: 14, fontSize: 10 }}>{dos_months[0]}   {dos_days[0]}    {dos_years[0]}     {dos_months[0]}   {dos_days[0]}    {dos_years[0]}</Text> 
                    <Text style={{ position: 'absolute', top: 532, left: 146, fontSize: 10 }}>{cptRows[0].pos}</Text>
                    <Text style={{ position: 'absolute', top: 532, left: 195, fontSize: 10 }}>{cptRows[0].cpt}</Text>
                    <Text style={{ position: 'absolute', top: 532, left: 247, fontSize: 10 }}>{cptRows[0]?.mod1?.length > 0 ? cptRows[0].mod1 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 532, left: 273, fontSize: 10 }}>{cptRows[0]?.mod2?.length > 0 ? cptRows[0].mod2 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 532, left: 294, fontSize: 10 }}>{cptRows[0]?.mod3?.length > 0 ? cptRows[0].mod3 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 532, left: 317, fontSize: 10 }}>{cptRows[0]?.mod4?.length > 0 ? cptRows[0].mod4 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 532, left: 340, fontSize: 10 }}>{cptRows[0].diag}</Text>
                    <Text style={{ position: 'absolute', top: 532, left: dos_dollars[0].length < 3 ? 409 : 403, fontSize: 10 }}>{dos_dollars[0]}  {dos_cents[0]}</Text>
                    <Text style={{ position: 'absolute', top: 532, left: 453, fontSize: 10 }}>{cptRows[0].units}</Text>
                    <Text style={{ position: 'absolute', top: 533, left: 513, fontSize: 10 }}>{cptRows[0].provider_npi}</Text>
                    </>
                }

                {/* row 2 top: 553 */}

                {numRows > 1 && 
                    <>
                    <Text style={{ position: 'absolute', top: 557, left: 14, fontSize: 10 }}>{dos_months[1]}   {dos_days[1]}    {dos_years[1]}     {dos_months[1]}   {dos_days[1]}    {dos_years[1]}</Text>
                    <Text style={{ position: 'absolute', top: 557, left: 146, fontSize: 10 }}>{cptRows[1].pos}</Text>
                    <Text style={{ position: 'absolute', top: 557, left: 195, fontSize: 10 }}>{cptRows[1].cpt}</Text>
                    <Text style={{ position: 'absolute', top: 557, left: 247, fontSize: 10 }}>{cptRows[1].mod1?.length > 0 ? cptRows[1].mod1 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 557, left: 273, fontSize: 10 }}>{cptRows[1].mod2?.length > 0 ? cptRows[1].mod2 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 557, left: 294, fontSize: 10 }}>{cptRows[1].mod3?.length > 0 ? cptRows[1].mod3 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 557, left: 317, fontSize: 10 }}>{cptRows[1].mod4?.length > 0 ? cptRows[1].mod4 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 557, left: 340, fontSize: 10 }}>{cptRows[1].diag}</Text>
                    <Text style={{ position: 'absolute', top: 557, left: dos_dollars[1].length < 3 ? 409 : 403, fontSize: 10 }}>{dos_dollars[1]}  {dos_cents[1]}</Text>
                    <Text style={{ position: 'absolute', top: 557, left: 453, fontSize: 10 }}>{cptRows[1].units}</Text>
                    <Text style={{ position: 'absolute', top: 558, left: 513, fontSize: 10 }}>{cptRows[1].provider_npi}</Text>
                    </> 
                }

                {/* row 3 - top: 581 */}

                {numRows > 2 && 
                    <>
                    <Text style={{ position: 'absolute', top: 581, left: 14, fontSize: 10 }}>{dos_months[2]}   {dos_days[2]}    {dos_years[2]}     {dos_months[2]}   {dos_days[2]}    {dos_years[2]}</Text>
                    <Text style={{ position: 'absolute', top: 581, left: 146, fontSize: 10 }}>{cptRows[2].pos}</Text>
                    <Text style={{ position: 'absolute', top: 581, left: 195, fontSize: 10 }}>{cptRows[2].cpt}</Text>
                    <Text style={{ position: 'absolute', top: 581, left: 247, fontSize: 10 }}>{cptRows[2].mod1?.length > 0 ? cptRows[2].mod1 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 581, left: 273, fontSize: 10 }}>{cptRows[2].mod2?.length > 0 ? cptRows[2].mod2 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 581, left: 294, fontSize: 10 }}>{cptRows[2].mod3?.length > 0 ? cptRows[2].mod3 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 581, left: 317, fontSize: 10 }}>{cptRows[2].mod4?.length > 0 ? cptRows[2].mod4 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 581, left: 340, fontSize: 10 }}>{cptRows[2].diag}</Text>
                    <Text style={{ position: 'absolute', top: 581, left: dos_dollars[2].length < 3 ? 409 : 403, fontSize: 10 }}>{dos_dollars[2]}  {dos_cents[2]}</Text>
                    <Text style={{ position: 'absolute', top: 581, left: 453, fontSize: 10 }}>{cptRows[2].units}</Text>
                    <Text style={{ position: 'absolute', top: 582, left: 513, fontSize: 10 }}>{cptRows[2].provider_npi}</Text>
                    </>
                }

                {/* row 4 - top: 607 */}

                {numRows > 3 && 
                    <>
                    <Text style={{ position: 'absolute', top: 607, left: 14, fontSize: 10 }}>{dos_months[3]}   {dos_days[3]}    {dos_years[3]}     {dos_months[3]}   {dos_days[3]}    {dos_years[3]}</Text>
                    <Text style={{ position: 'absolute', top: 607, left: 146, fontSize: 10 }}>{cptRows[3].pos}</Text>
                    <Text style={{ position: 'absolute', top: 607, left: 195, fontSize: 10 }}>{cptRows[3].cpt}</Text>
                    <Text style={{ position: 'absolute', top: 607, left: 247, fontSize: 10 }}>{cptRows[3].mod1?.length > 0 ? cptRows[3].mod1 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 607, left: 273, fontSize: 10 }}>{cptRows[3].mod2?.length > 0 ? cptRows[3].mod2 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 607, left: 294, fontSize: 10 }}>{cptRows[3].mod3?.length > 0 ? cptRows[3].mod3 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 607, left: 317, fontSize: 10 }}>{cptRows[3].mod4?.length > 0 ? cptRows[3].mod4 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 607, left: 340, fontSize: 10 }}>{cptRows[3].diag}</Text>
                    <Text style={{ position: 'absolute', top: 607, left: dos_dollars[3].length < 3 ? 409 : 403, fontSize: 10 }}>{dos_dollars[3]}  {dos_cents[3]}</Text>
                    <Text style={{ position: 'absolute', top: 607, left: 453, fontSize: 10 }}>{cptRows[3].units}</Text>
                    <Text style={{ position: 'absolute', top: 607, left: 513, fontSize: 10 }}>{cptRows[3].provider_npi}</Text>
                    </>
                }

                {/* row 5 - top: 630 */}

                {numRows > 4 && 
                    <>
                    <Text style={{ position: 'absolute', top: 630, left: 14, fontSize: 10 }}>{dos_months[4]}   {dos_days[4]}    {dos_years[4]}     {dos_months[4]}   {dos_days[4]}    {dos_years[4]}</Text>
                    <Text style={{ position: 'absolute', top: 630, left: 146, fontSize: 10 }}>{cptRows[4].pos}</Text>
                    <Text style={{ position: 'absolute', top: 630, left: 195, fontSize: 10 }}>{cptRows[4].cpt}</Text>
                    <Text style={{ position: 'absolute', top: 630, left: 247, fontSize: 10 }}>{cptRows[4].mod1?.length > 0 ? cptRows[4].mod1 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 630, left: 273, fontSize: 10 }}>{cptRows[4].mod2?.length > 0 ? cptRows[4].mod2 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 630, left: 294, fontSize: 10 }}>{cptRows[4].mod3?.length > 0 ? cptRows[4].mod3 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 630, left: 317, fontSize: 10 }}>{cptRows[4].mod4?.length > 0 ? cptRows[4].mod4 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 630, left: 340, fontSize: 10 }}>{cptRows[4].diag}</Text>
                    <Text style={{ position: 'absolute', top: 630, left: dos_dollars[4].length < 3 ? 409 : 403, fontSize: 10 }}>{dos_dollars[4]}  {dos_cents[4]}</Text>
                    <Text style={{ position: 'absolute', top: 630, left: 453, fontSize: 10 }}>{cptRows[4].units}</Text>
                    <Text style={{ position: 'absolute', top: 631, left: 513, fontSize: 10 }}>{cptRows[4].provider_npi}</Text>
                    </>
                }

                {/* row 6 - top: 655 */}

                {numRows > 5 && 
                    <>
                    <Text style={{ position: 'absolute', top: 655, left: 14, fontSize: 10 }}>{dos_months[5]}   {dos_days[5]}    {dos_years[5]}     {dos_months[5]}   {dos_days[5]}    {dos_years[5]}</Text>
                    <Text style={{ position: 'absolute', top: 655, left: 146, fontSize: 10 }}>{cptRows[5].pos}</Text>
                    <Text style={{ position: 'absolute', top: 655, left: 195, fontSize: 10 }}>{cptRows[5].cpt}</Text>
                    <Text style={{ position: 'absolute', top: 655, left: 247, fontSize: 10 }}>{cptRows[5].mod1?.length > 0 ? cptRows[5].mod1 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 655, left: 273, fontSize: 10 }}>{cptRows[5].mod2?.length > 0 ? cptRows[5].mod2 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 655, left: 294, fontSize: 10 }}>{cptRows[5].mod3?.length > 0 ? cptRows[5].mod3 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 655, left: 317, fontSize: 10 }}>{cptRows[5].mod4?.length > 0 ? cptRows[5].mod4 : ' '}</Text>
                    <Text style={{ position: 'absolute', top: 655, left: 340, fontSize: 10 }}>{cptRows[5].diag}</Text>
                    <Text style={{ position: 'absolute', top: 655, left: dos_dollars[5].length < 3 ? 409 : 403, fontSize: 10 }}>{dos_dollars[5]}  {dos_cents[5]}</Text>
                    <Text style={{ position: 'absolute', top: 655, left: 453, fontSize: 10 }}>{cptRows[5].units}</Text>
                    <Text style={{ position: 'absolute', top: 656, left: 513, fontSize: 10 }}>{cptRows[5].provider_npi}</Text>
                    </>
                }

                {/* Box 26 - PATIENT"S ACCOUNT NO */}
                <Text style={{ position: 'absolute', top: 682, left: 175, fontSize: 8 }}>{selectedV1500 ? selectedV1500.patient_account_no : `${selectedClaim?.claimantId}-${selectedClaim?.therapistId}`}</Text>

                {/* Box 28 - TOTAL CHARGE */}

                <Text style={{ position: 'absolute', top: 680, left: digits < 3 ? (digits < 2 ? 431 : 425) : 420, fontSize: 10 }}>
                    {String(total_charges).substring(0, String(total_charges).indexOf('.'))}  {String(total_charges).substring(String(total_charges).indexOf('.')+1)}
                </Text>

                {/* Box 31 - SIGNATURE OF PHYSICIAN OR SUPPLIER */}
                <Text style={{ position: 'absolute', top: 736, left: 100, fontSize: 10 }}>{month < 10 ? `0${month}` : `${month}`} / {day < 10 ? `0${day}` : `${day}`} / {year}</Text>
                
                {/* Box 32 - SERVICE FACILITY LOCATION INFORMATION */}
                <Text style={{ position: 'absolute', top: 702, left: 175, fontSize: 7 }}>DEFINED PT/{selectedClaim?.therapist.toUpperCase().substring(0,30)}</Text>
                {/* <Text style={{ position: 'absolute', top: 712, left: 175, fontSize: 7 }}>{selectedClaim?.therapistAddress.toUpperCase()}</Text> */}
                {/* <Text style={{ position: 'absolute', top: 722, left: 175, fontSize: 7 }}>{selectedClaim?.therapistCity.toUpperCase()}, {selectedClaim?.therapistState.toUpperCase()} {selectedClaim?.therapistZip.toUpperCase()}</Text> */}
                <Text style={{ position: 'absolute', top: 712, left: 175, fontSize: 7 }}>2001 DUNCAN DR</Text>
                <Text style={{ position: 'absolute', top: 722, left: 175, fontSize: 7 }}>KENNESAW, GA 30144</Text>
                

                {/* ...CONSTANTS... */}

                {/* Box 1 */}
                <Text style={{ position: 'absolute', top: 88, left: 342, fontSize: 12 }}>x</Text>
                {/* Box 6 - PATIENT RELATIONSHIP TO INSURED */}
                <Text style={{ position: 'absolute', top: 138, left: 251, fontSize: 12 }}>x</Text>
                {/* Box 10 - IS PATIENT'S CONDITION RELATED TO */}
                <Text style={{ position: 'absolute', top: 236, left: 266, fontSize: 12 }}>x</Text>
                <Text style={{ position: 'absolute', top: 261, left: 311, fontSize: 12 }}>x</Text>
                <Text style={{ position: 'absolute', top: 284, left: 311, fontSize: 12 }}>x</Text>
                {/* Box 11d - IS THERE ANOTHER HEALTH BENEFIT PLAN */}
                <Text style={{ position: 'absolute', top: 310, left: 431, fontSize: 12 }}>x</Text>
                {/* Box 12 - PATIENT'S OR AUTHORIZED PERSON'S SIGNATURE */}
                {/* <Text style={{ position: 'absolute', top: 354, left: 78, fontSize: 12 }}>SOF</Text> */}
                {/* Box 13 - INSURED'S OR AUTHORIZED PERSON'S SIGNATURE */}
                <Text style={{ position: 'absolute', top: 357, left: 425, fontSize: 12 }}>SOF</Text>
                {/* Box 14 - QUAL */}
                <Text style={{ position: 'absolute', top: 384, left: 123, fontSize: 12 }}>431</Text>
                {/* Box 25 - FEDERAL TAX ID NUMBER */}
                <Text style={{ position: 'absolute', top: 680, left: 14, fontSize: 10 }}>822955078</Text>
                <Text style={{ position: 'absolute', top: 678, left: 132, fontSize: 10 }}>x</Text>
                {/* Box 27 - ACCEPT ASSIGNMENT */}
                <Text style={{ position: 'absolute', top: 678, left: 290, fontSize: 10 }}>x</Text>
                {/* Box 29 - AMOUNT PAID */}
                <Text style={{ position: 'absolute', top: 680, left: 505, fontSize: 10 }}>0  00</Text>
                {/* Box 31 - SIGNATURE OF PHYSICIAN OR SUPPLIER */}
                <Text style={{ position: 'absolute', top: 736, left: 11, fontSize: 10 }}>DEFINED PT</Text>
                {/* Box 32a - SERVICE FACILITY LOCATION INFORMATION */}
                <Text style={{ position: 'absolute', top: 741, left: 181, fontSize: 10 }}>1780060475</Text>
                {/* Box 33 - BILLING PROVIDER INFORMATION */}
                <Text style={{ position: 'absolute', top: 702, left: 377, fontSize: 7 }}>DEFINED PHYSICAL THERAPY</Text>
                <Text style={{ position: 'absolute', top: 712, left: 377, fontSize: 7 }}>PO BOX #2629</Text>
                <Text style={{ position: 'absolute', top: 722, left: 377, fontSize: 7 }}>KENNESAW, GA 30156</Text>
                <Text style={{ position: 'absolute', top: 741, left: 385, fontSize: 10 }}>1780060475</Text>
                <Text style={{ position: 'absolute', top: 693, left: 501, fontSize: 10 }}>800   605-6030</Text>

            
                <Image src={blank1500} style={{ position: 'absolute', zIndex: -1, top: 0, width: '100%' }} />
            </View>
        </Page>
    </Document>
    );
}