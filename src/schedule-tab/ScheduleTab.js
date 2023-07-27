import { useState, useContext } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import ReferralsOpen from './ReferralsOpen';
import ReferralsHold from './ReferralsHold';
import ReferralsComplete from './ReferralsComplete';
import FcePpdTomorrow from './FcePpdTomorrow';
import ApptToday from './ApptToday';
import MissingReport from './MissingReport';
import ReportLimbo from './ReportLimbo';
import FollowupHold from './FollowupHold';

import useGetReferralsOpen from '../hooks/useGetReferralsOpen';
import useGetReferralsDropdown from '../hooks/useGetReferralsDropdown';

import { SearchContext } from '../contexts/SearchContext'

import { useNavigate } from "react-router-dom";

import '../App.css';

export default function ScheduleTab(props) {

    const { status: statusReferrals, data: referralsOpen, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferralsOpen();
    const { status: statusRows, data: referralsDropdown, error: errorRows, isFetching: isFetchingRows } = useGetReferralsDropdown();

    const { quickSearchVal, setQuickSearchVal, quickSearchInputVal, setQuickSearchInputVal } = useContext(SearchContext);

    const navigate = useNavigate();

    const rowsOpenCount = referralsOpen?.filter((row) => {
                                return (
                                    row.referralStatus?.includes('Open') || 
                                    row.referralStatus?.includes('Reschedule')
                                );}).length;

    const rowsHoldCount = referralsOpen?.filter((row) => {
                                return (
                                    row.referralStatus?.includes('Hold')
                                );}).length;

    const [selectedFilter, setSelectedFilter] = useState("open");

    const handleSelectedFilter = (event, newFilter) => {
        if (newFilter !== null){
            setSelectedFilter(newFilter);
        }
    };

    return (
        <>
        {referralsDropdown &&
        <Autocomplete
        value={quickSearchVal}
        onChange={(event, value) => {
          value && value?.referralId !== null && navigate(`/${value.referralId}`);
          setQuickSearchVal(null);
          setQuickSearchInputVal('');
        }}
        inputValue={quickSearchInputVal}
        onInputChange={(event, newInputValue) => {
          setQuickSearchInputVal(newInputValue);
        }}
        id="quickSearch-autocomplete"
        options={referralsDropdown?.sort((a, b) => -b.claimant.localeCompare(a.claimant))}
        getOptionLabel={(option) => option.referralId ? `${option.referralId} (${option.service}) ${option.claimant} | ${option.claimNumber} | ${option.bodyPart} | ${option.ptStatus}` : ''}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Quick Search" />}
        />
        }

        <ToggleButtonGroup
        size="small"
        value={selectedFilter}
        exclusive
        onChange={handleSelectedFilter}
        aria-label="text alignment"
        >
            <ToggleButton value="open" aria-label="open">
                Open ({rowsOpenCount})
            </ToggleButton>
            <ToggleButton value="hold" aria-label="hold">
                Hold ({rowsHoldCount})
            </ToggleButton>
            <ToggleButton value="complete" aria-label="complete">
                Complete
            </ToggleButton>
            <ToggleButton value="fceTomorrow" aria-label="fceTomorrow">
                FCE/PPD Tom.
            </ToggleButton>
            <ToggleButton value="apptToday" aria-label="apptToday">
                Today
            </ToggleButton>
            <ToggleButton value="missingReport" aria-label="missingReport">
                Missing Report
            </ToggleButton>
            <ToggleButton value="reportLimbo" aria-label="reportLimbo">
                Report Limbo
            </ToggleButton>
            <ToggleButton value="fuHold" aria-label="fuHold">
                FU/Hold
            </ToggleButton>
        </ToggleButtonGroup>

        {selectedFilter === 'open' &&
        <ReferralsOpen />
        }
        {selectedFilter === 'hold' &&
        <ReferralsHold />
        }
        {selectedFilter === 'complete' &&
        <ReferralsComplete />
        }
        {selectedFilter === 'fceTomorrow' &&
        <FcePpdTomorrow />
        }
        {selectedFilter === 'apptToday' &&
        <ApptToday />
        }
        {selectedFilter === 'missingReport' &&
        <MissingReport />
        }
        {selectedFilter === 'reportLimbo' &&
        <ReportLimbo />
        }
        {selectedFilter === 'fuHold' &&
        <FollowupHold />
        }
        </>
    );
}