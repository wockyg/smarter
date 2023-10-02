import React, { useContext } from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Container from '@mui/material/Container';

import useGetReferralsDropdownCalendar from '../hooks/useGetReferralsDropdownCalendar';

import { SearchContext } from '../contexts/SearchContext';
import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

import { useNavigate } from "react-router-dom";

export default function ReferralQuickSearch(props) {
    
    const { status: statusRows, data: referralsDropdown, error: errorRows, isFetching: isFetchingRows } = useGetReferralsDropdownCalendar();

    const { quickSearchVal, setQuickSearchVal, quickSearchInputVal, setQuickSearchInputVal } = useContext(SearchContext);
    const { setPage: setNotesPage, setTab: setClaimTab, setBillMode, keepBillMode, setKeepBillMode } = useContext(SelectedClaimContext);

    const navigate = useNavigate();
    
    return (
        <>
        {referralsDropdown &&
        <Container sx={{padding: 1}}>
        <Autocomplete
        open={quickSearchInputVal.length > 0}
        value={quickSearchVal}
        onChange={(event, claim) => {
          claim && claim?.referralId !== null && navigate(`/${claim.referralId}`);
          setNotesPage(0);
          setClaimTab(0);
          setQuickSearchVal(null);
          setQuickSearchInputVal('');
          if (claim.billingStatus === null || !keepBillMode) {
            setBillMode(false);
            setKeepBillMode(false);
          }
        }}
        inputValue={quickSearchInputVal}
        onInputChange={(event, newInputValue) => {
          setQuickSearchInputVal(newInputValue);
        }}
        id="quickSearch-autocomplete"
        options={referralsDropdown?.sort((a, b) => -b.claimant.localeCompare(a.claimant))}
        getOptionLabel={(option) => option.referralId ? `${option.referralId} (${option.service}) ${option.claimant} | ${option.claimNumber} | ${option.bodyPart} | ${option.ptStatus}` : ''}
        sx={{ width: 300, background: '#F8F9F9', padding: 0.4 }}
        renderInput={(params) => <TextField {...params} size="small" label="Quick Search" />}
        />
        </Container>
        }
        </>
    );
}