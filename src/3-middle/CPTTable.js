import React, { useContext, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { SelectedClaimContext } from '../contexts/SelectedClaimContext';
import { Tooltip } from '@mui/material';

import { useParams } from 'react-router-dom';

import useGetReferral from '../hooks/useGetReferral';
import useGetCptForState from '../hooks/useGetCptForState';

export default function CPTTable(props) {

    let { id: linkId } = useParams();

    const { status: statusReferrals, data: selectedClaim, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferral(+linkId);

    const { status: statusCpt, data: feeSchedule, error: errorCpt, isFetching: isFetchingCpt } = useGetCptForState(selectedClaim?.jurisdiction);

    const { cptRows, setCptRows } = useContext(SelectedClaimContext);

    const rowCodes =  cptRows?.map((row) => row.cpt);
    const rowUnits = cptRows?.map((row) => row.units);

    // console.log("rowCodes:", rowCodes);

    const jurisdiction = selectedClaim?.jurisdiction;

    return (
        <div>
        {selectedClaim && 
        
        <TableContainer component={Paper}>
            <Table aria-label="cpt table" size='small'>
                <TableHead>
            <TableRow>
                <TableCell sx={{ paddingLeft: 0.5 }}>{selectedClaim && selectedClaim.jurisdiction}</TableCell>
                <TableCell sx={{ paddingLeft: 0.5, paddingRight: 0 }}>x1</TableCell>
                <TableCell sx={{ paddingLeft: 0.5, paddingRight: 0 }}>x2</TableCell>
                <TableCell sx={{ paddingLeft: 0.5, paddingRight: 0 }}>x3</TableCell>
                <TableCell sx={{ paddingLeft: 0.5, paddingRight: 0 }}>x4</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {feeSchedule && feeSchedule.map((row) => {

                    let hasCode = false; 
                    let codeUnits = -1;

                    rowCodes?.forEach((code, index) => {
                        if (+code === row.Code) {
                            hasCode = true;
                            codeUnits = +rowUnits[index];
                        }
                    })

                    const twoUnits =  (Math.round((row[selectedClaim?.jurisdiction] * 2) * 100) / 100).toFixed(2);
                    const threeUnits =  (Math.round((row[selectedClaim?.jurisdiction] * 3) * 100) / 100).toFixed(2);
                    const fourUnits =  Math.round(((row[selectedClaim?.jurisdiction] * 4) * 100) / 100).toFixed(2);

                    const selectedCodeStyle = {
                        paddingLeft: 0.5,
                        fontSize: 'small',
                        border: '1px solid #D7DBDD',
                        backgroundColor: '#EAECEE'
                    }
                    const selectedRateStyle = {
                        paddingLeft: 0.5,
                        fontSize: 'small',
                        border: '1px solid #D7DBDD',
                        backgroundColor: '#D5F5E3'
                    }
                    const normalStyle = {
                        paddingLeft: 0.5,
                        fontSize: 'small',
                        border: '1px solid #D7DBDD',
                        backgroundColor: 'none'
                    }
            
                    return (
                        <TableRow
                            key={row.Code}
                        >
                            <TableCell align="left" sx={hasCode ? { ...selectedCodeStyle} : { ...normalStyle } }><u>{row?.Code}</u></TableCell>
                            <TableCell align="left" sx={codeUnits === 1 ? {...selectedRateStyle} : {...normalStyle}}>${row[jurisdiction]}</TableCell>
                            {(row.MaxUnit > 1) &&
                            <TableCell align="left" sx={codeUnits === 2 ? {...selectedRateStyle} : {...normalStyle}}>${twoUnits}</TableCell>
                            }
                            {(row.MaxUnit > 2) &&
                            <TableCell align="left" sx={codeUnits === 3 ? {...selectedRateStyle} : {...normalStyle}}>${threeUnits}</TableCell>
                            }
                            {(row.MaxUnit > 3) &&
                            <TableCell align="left" sx={codeUnits === 4 ? {...selectedRateStyle} : {...normalStyle}}>${fourUnits}</TableCell>
                            }
                            
                        </TableRow>
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        }
        </div>
    )
}