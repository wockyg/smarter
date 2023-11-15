import React, { useContext } from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Container from '@mui/material/Container';

import useGetReferralsDropdownCalendar from '../hooks/useGetReferralsDropdownCalendar';

import { SearchContext } from '../contexts/SearchContext';
import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

import { useNavigate } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import useUpdateUserHistory from '../hooks/useUpdateUserHistory';
import useGetUser from '../hooks/useGetUser';

export default function ReferralQuickSearch(props) {

    const { user: userAuth0 } = useAuth0();

    const { email, nickname, updated_at } = userAuth0;

    const { status: statusUser, data: user, error: errorUser, isFetching: isFetchingUser } = useGetUser(email);
    
    const { status: statusRows, data: referralsDropdown, error: errorRows, isFetching: isFetchingRows } = useGetReferralsDropdownCalendar();

    const { quickSearchVal, setQuickSearchVal, quickSearchInputVal, setQuickSearchInputVal } = useContext(SearchContext);
    const { setPage: setNotesPage, setTab: setClaimTab, setBillMode, keepBillMode, setKeepBillMode, setCptRows } = useContext(SelectedClaimContext);

    const navigate = useNavigate();

    const userHistoryUpdate = useUpdateUserHistory();
    
    return (
        <>
        {referralsDropdown &&
        <Container sx={{padding: 1}}>
        <Autocomplete
        open={quickSearchInputVal.length > 0}
        value={quickSearchVal}
        onChange={(event, claim) => {
          claim && claim?.referralId !== null && navigate(`/${claim.referralId}`);
          claim && claim?.referralId !== null && userHistoryUpdate.mutate({initials: user?.initials, newId: claim.referralId});;
          setNotesPage(0);
          setClaimTab(0);
          setQuickSearchVal(null);
          setQuickSearchInputVal('');
          setCptRows([]);
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
        getOptionLabel={(option) => option.referralId ? `${option.referralId} (${option.service}) ${option.claimant} | ${option.claimNumber} | ${option.bodyPart} | ${option.ptStatus || option.referralStatus}` : ''}
        sx={{ width: 300, background: '#F8F9F9', padding: 0.4 }}
        renderInput={(params) => <TextField {...params} size="small" label="Quick Search" />}
        />
        </Container>
        }
        </>
    );
}