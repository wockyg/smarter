import { useContext, useState, useEffect, Fragment } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

import useGetReferral from '../hooks/useGetReferral';
import useGetDOSDropdown from '../hooks/useGetDOSDropdown';
import useGetCptForState from '../hooks/useGetCptForState';
import useGetReferral_icd10 from '../hooks/useGetReferral_icd10';
import useAddD1500 from '../hooks/useAddD1500';
import useAddD1500Rows from '../hooks/useAddD1500Rows';
import useGetD1500NotApproved from '../hooks/useGetD1500NotApproved';
import useGetD1500ViewHcfa from '../hooks/useGetD1500RowsViewHcfa';

import { useParams } from 'react-router-dom';

import Skeleton from '@mui/material/Skeleton';

import { PDFDownloadLink } from '@react-pdf/renderer';

import HCFATemplate from './HCFATemplate';

import '../App.css';

export default function ViewBills() {

    let { id: linkId } = useParams();

    const { status: statusBills, data: bills, error: errorBills, isFetching: isFetchingBills } = useGetD1500NotApproved();

    // const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

    // console.log(bills);

    const hcfaId_array = bills?.map(row => row.hcfaId);
    const uniqueHcfaIds = Array.from(new Set(hcfaId_array));

    // console.log(uniqueHcfaIds);

    let realBills = [];

    uniqueHcfaIds.forEach((row) => {

        const temp = bills.filter(r => r.hcfaId === row).sort((a, b) => {
                                        if (a.dos === null){
                                            return 1;
                                        }
                                        if (b.dos === null){
                                            return -1;
                                        }
                                        if (a.dos === b.dos){
                                            return 0;
                                        }
                                        return a.dos < b.dos ? -1 : 1;
                                    });

        const dos_array = temp?.map(r => r.dos);
        const uniqueDOS = Array.from(new Set(dos_array));
        const uniqueDOSReorder = uniqueDOS.map(x => `${x.substring(5,7)}-${x.substring(8,10)}-${x.substring(0,4)}`);

        realBills.push(
            {
            hcfaId: row,
            rowData: temp,
            uniqueDOS: uniqueDOS,
            tableHeader: `${uniqueDOSReorder[0]}${uniqueDOSReorder.length > 1 ? `, ${uniqueDOSReorder[1]}` : ''}${uniqueDOSReorder.length > 2 ? `, ${uniqueDOSReorder[2]}` : ''}${uniqueDOSReorder.length > 3 ? `, ${uniqueDOSReorder[3]}` : ''}${uniqueDOSReorder.length > 4 ? `, ${uniqueDOSReorder[4]}` : ''}${uniqueDOSReorder.length > 5 ? `, ${uniqueDOSReorder[5]}` : ''}`,
            fileName: `${`Last, First`} ADJ DOS ${uniqueDOSReorder[0]}${uniqueDOSReorder.length > 1 ? `, ${uniqueDOSReorder[1]}` : ''}${uniqueDOSReorder.length > 2 ? `, ${uniqueDOSReorder[2]}` : ''}${uniqueDOSReorder.length > 3 ? `, ${uniqueDOSReorder[3]}` : ''}${uniqueDOSReorder.length > 4 ? `, ${uniqueDOSReorder[4]}` : ''}${uniqueDOSReorder.length > 5 ? `, ${uniqueDOSReorder[5]}` : ''}.pdf`,
            sendFormat: temp[0].sendFormat,
            dateAdded: temp[0].dateAdded
            }
        );

    })

    // console.log(realBills);


    const StyledTableCell = styled(TableCell)({
        padding: '0px 0px 0px 5px',
        // paddingLeft: 5,
        // paddingRight: 5,
        fontSize: 11,
    });

    return (
      <>
        <TableContainer
        component={Paper}
        sx={{ height: 350 }}
        >
            <Table stickyHeader size="small" aria-label="apptVerification table">
                <TableHead>
                    <TableRow>
                        {/* <TableCell padding="checkbox">
                            
                        </TableCell> */}
                        <TableCell sx={{ fontSize: 12 }}><u>DOS</u></TableCell>
                        <TableCell sx={{ fontSize: 12, padding: 0.5 }}><u>POS</u></TableCell>
                        <TableCell sx={{ fontSize: 12, padding: 0.5 }}><u>CPT</u></TableCell>
                        <TableCell sx={{ fontSize: 12, padding: 0.5 }}><u>MOD</u></TableCell>
                        <TableCell sx={{ fontSize: 12 }}></TableCell>
                        <TableCell sx={{ fontSize: 12 }}></TableCell>
                        <TableCell sx={{ fontSize: 12 }}></TableCell>
                        <TableCell sx={{ fontSize: 12, padding: 0.5 }}><u>DIAG</u></TableCell>
                        <TableCell sx={{ fontSize: 12, padding: 0.5 }}><u>CHARG</u></TableCell>
                        <TableCell sx={{ fontSize: 12, padding: 0.5 }}><u>UNIT</u></TableCell>
                        <TableCell sx={{ fontSize: 12, padding: 0.5 }}><u>NPI</u></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {realBills && realBills.map((row, j) => {

                                    // console.log(row.rowData);

                                    let total_charges = 0.0;

                                    let total_units = 0;

                                    row.rowData?.forEach((row) => {
                                        total_charges = total_charges + (+row.charges);
                                        total_units = total_units + (+row.units);
                                    })

                                    total_charges = (Math.round(total_charges * 100) / 100).toFixed(2);

                                    return (
                                        <Fragment key={j}>
                                        <TableRow
                                            // hover
                                            key={row.hcfaId}
                                            sx={{ backgroundColor: '#E0ACF5'}}
                                        >
                                            {/* <TableCell padding="checkbox">
                                                <Tooltip title="Expand" enterDelay={1000}>
                                                    <AddCircleOutlineIcon />
                                                </Tooltip>
                                            </TableCell> */}
                                            <StyledTableCell sx={{ fontSize: 13, maxWidth: 100, whiteSpace: 'nowrap' }}><u><strong>{row.tableHeader} ({row.sendFormat})</strong></u></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell sx={{textAlign: 'right', paddingRight: 0.5}}>
                                                <Tooltip title="Duplicate" enterDelay={500}>
                                                    <IconButton size='small' sx={{padding: 0.5}}>
                                                        <ContentCopyIcon fontSize='small' sx={{cursor: 'pointer'}} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Download" enterDelay={500}>
                                                    <IconButton size='small' sx={{padding: 0.5}}>
                                                        <PDFDownloadLink
                                                        document={
                                                            <HCFATemplate
                                                            selectedClaim={selectedClaim}
                                                            codeList={codeList}
                                                            cptRows={row.rowData}
                                                            />
                                                        }
                                                        // onClick={(e) => handleDownload(e)}
                                                        fileName={row.fileName}
                                                        >
                                                        {({ blob, url, loading, error }) =>
                                                            loading ? <HourglassTopIcon /> : <DownloadIcon fontSize='small' />
                                                        }
                                                        </PDFDownloadLink>
                                                    </IconButton>
                                                </Tooltip>
                                            </StyledTableCell>
                                        </TableRow>
                                        {row.rowData.map((row) => {
                                            
                                            return(
                                                <TableRow
                                                    hover
                                                    key={row.rowId}
                                                    // sx={{ backgroundColor: '#E0ACF5'}}
                                                >
                                                    {/* <StyledTableCell></StyledTableCell> */}
                                                    <StyledTableCell sx={{paddingLeft: 2}}>{row.dos}</StyledTableCell>  
                                                    <StyledTableCell>{row.pos}</StyledTableCell>  
                                                    <StyledTableCell>{row.cpt}</StyledTableCell>
                                                    <StyledTableCell>{row.mod1}</StyledTableCell>  
                                                    <StyledTableCell>{row.mod2}</StyledTableCell>  
                                                    <StyledTableCell>{row.mod3}</StyledTableCell>  
                                                    <StyledTableCell>{row.mod4}</StyledTableCell>
                                                    <StyledTableCell>{row.diag}</StyledTableCell>  
                                                    <StyledTableCell sx={{paddingLeft: row.charges < 100 ? 1.8 : 1}}>{row.charges}</StyledTableCell>  
                                                    <StyledTableCell>{row.units}</StyledTableCell>  
                                                    <StyledTableCell>{row.provider_npi}</StyledTableCell>  
                                                </TableRow>
                                            )
                                        })}
                                        <TableRow hover>
                                            <StyledTableCell sx={{paddingLeft: 2}}></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell>
                                                <u>
                                                <strong>
                                                    Totals:
                                                </strong>
                                                </u>
                                            </StyledTableCell>
                                            <StyledTableCell sx={{paddingLeft: total_charges < 100 ? 1.8 : 1}}>
                                                <strong>
                                                {total_charges}
                                                </strong>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <strong>
                                                {total_units}
                                                </strong>
                                            </StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                        </TableRow>
                                        </Fragment>
                                        
                                    )}
                    )}
                </TableBody>
            </Table>
        </TableContainer>
      </>
    );
}