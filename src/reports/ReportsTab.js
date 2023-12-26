import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material';

import QuarterlyReports from './QuarterlyReports';
import Analytics from './Analytics';
import ReferralsLastWeek from './ReferralsLastWeek';
import ReportsToAdjLastWeek from './ReportsToAdjLastWeek';
import BugReports from './BugReports';

import '../App.css';

export default function ReportsTab(props) {

    const [selectedFilter, setSelectedFilter] = useState("analytics");

    const handleSelectedFilter = (event, newFilter) => {
        if (newFilter !== null){
            setSelectedFilter(newFilter);
        }
    };

    return(
        <Box sx={{ width: '100%', height: 600 }}>

            <ToggleButtonGroup
            size="small"
            value={selectedFilter}
            exclusive
            onChange={handleSelectedFilter}
            aria-label="text alignment"
            >
                <ToggleButton value="analytics" aria-label="analytics">
                    Analytics
                </ToggleButton>
                <ToggleButton value="quarterly" aria-label="quarterly">
                    Quarterly Reports
                </ToggleButton>
                <ToggleButton value="fceLW" aria-label="fceLW">
                    FCE's to Adj LW
                </ToggleButton>
                <ToggleButton value="referralsLW" aria-label="referralsLW">
                    Referrals LW
                </ToggleButton>
                <ToggleButton value="bugReports" aria-label="bugReports">
                    Bug Reports
                </ToggleButton>
            </ToggleButtonGroup>

            <br /><br />

            {selectedFilter === 'analytics' &&
            <Analytics />
            }
            {selectedFilter === 'quarterly' &&
            <QuarterlyReports />
            }
            {selectedFilter === 'fceLW' &&
            <ReportsToAdjLastWeek />
            }
            {selectedFilter === 'referralsLW' &&
            <ReferralsLastWeek />
            }
            {selectedFilter === 'bugReports' &&
            <BugReports />
            }
        </Box>
    );
}