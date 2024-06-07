import { useState, useContext } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import useGetReferral from '../hooks/useGetReferral';
import useGetReferral_icd10 from "../hooks/useGetReferral_icd10";

import HCFATemplate from "./HCFATemplate";

import { useParams } from 'react-router-dom';

import { Page, Text, View, Document, StyleSheet, PDFViewer, Image, PDFDownloadLink } from '@react-pdf/renderer';

// import blank1500 from '../document-templates/blank1500.jpg';

// import Skeleton from '@mui/material/Skeleton';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "blue",
    color: "white",
    position: 'relative',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: 600,
    height: 774,
    backgroundColor: "blue",
  },
  text: {
    fontSize: 12,
  },
});

export default function HCFATemplateViewer() {

    let { id: linkId } = useParams();

    const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);
    const { status: statusReferral_icd10, data: codeList, error: errorReferral_icd10, isFetching: isFetchingReferral_icd10 } = useGetReferral_icd10(+linkId);

    // const { status: statusReferral_icd10, data: codeList, error: errorReferral_icd10, isFetching: isFetchingReferral_icd10 } = useGetReferral_icd10(+linkId);

    // const num_codes = codeList?.length;

    const { cptRows, setCptRows, selectedV1500 } = useContext(SelectedClaimContext);

    // const numRows = cptRows?.length;

    // const dob = selectedClaim && new Date( Date.parse(selectedClaim?.claimantBirthDate) );
    // const doi1 = selectedClaim && new Date( Date.parse(selectedClaim?.claimantInjuryDate1) );

    // const today = new Date();
    // const month = today.getMonth() + 1;
    // const day = today.getDate();
    // const year = today.getFullYear();

    // const dos_array = cptRows?.map( (row) => {return new Date(Date.parse(row.dos));} );
    // const dos_months = dos_array?.map( (row) => {return (row.getMonth()+1) < 10 ? `0${row.getMonth()+1}` : `${row.getMonth()+1}`} );
    // const dos_days = dos_array?.map( (row) => {return (row.getDate()+1) < 10 ? `0${row.getDate()+1}` : `${row.getDate()+1}`} );
    // const dos_years = dos_array?.map( (row) => {return String(row.getFullYear()).substring(2)} );

    console.log(selectedV1500);

    // const dos_dollars = cptRows?.map( (row) => {return row.charges.toString().substring(0, row.charges.toString().indexOf('.'));} );
    // const dos_cents = cptRows?.map( (row) => {return row.charges.toString().substring(row.charges.toString().indexOf('.')+1);} );

    // let total_charges = 0.0;

    // cptRows?.forEach((row) => {total_charges = total_charges + (+row.charges)})

    // total_charges = (Math.round(total_charges * 100) / 100).toFixed(2);

    // const digits = String(total_charges).substring(0, String(total_charges).indexOf('.')).length;

    // console.log(total_charges);

    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
            {/* PDF VIEWER COL */}
            <Grid item xs="auto">
                <Grid item>
                <PDFViewer style={styles.viewer} showToolbar={false}>
                    <HCFATemplate 
                    selectedClaim={selectedClaim} 
                    icd10CodeList={codeList}
                    cptRows={cptRows} 
                    selectedV1500={selectedV1500}
                    />
                </PDFViewer>
                </Grid>
            </Grid>
            </Grid>
        </Box>
        </div>
    );
}