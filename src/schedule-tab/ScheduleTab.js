import { useState } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import ReferralsOpen from './ReferralsOpen';
import ReferralsHold from './ReferralsHold';
import ReferralsComplete from './ReferralsComplete';
import FcePpdTomorrow from './FcePpdTomorrow';
import ApptToday from './ApptToday';
import MissingReport from './MissingReport';
import ReportLimbo from './ReportLimbo';
import FollowupHold from './FollowupHold';

import useGetReferrals from '../hooks/useGetReferrals';

import '../App.css';

export default function ScheduleTab(props) {

    const { status: statusReferrals, data: rows, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferrals();

    const rowsOpen = rows?.filter((row) => {
                                return (
                                    row.referralStatus?.includes('Open') || 
                                    row.referralStatus?.includes('Reschedule')
                                );}).length;

    const rowsHold = rows?.filter((row) => {
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
        <ToggleButtonGroup
        size="small"
        value={selectedFilter}
        exclusive
        onChange={handleSelectedFilter}
        aria-label="text alignment"
        >
            <ToggleButton value="open" aria-label="open">
                Open ({rowsOpen})
            </ToggleButton>
            <ToggleButton value="hold" aria-label="hold">
                Hold ({rowsHold})
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