import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';

import MissingV1500 from './MissingV1500';
import D1500NotSent from './D1500NotSent';
import AdjusterPastDue from './AdjusterPastDue';
import FacilityPastDue from './FacilityPastDue';

import '../App.css';

export default function BillingTab(props) {

    const [selectedFilter, setSelectedFilter] = useState("missingV1500");

    const handleSelectedFilter = (event, newFilter) => {
        if (newFilter !== null){
            setSelectedFilter(newFilter);
        }
    };

    return (
        <Box sx={{ width: '100%', height: 570 }}>
        <ToggleButtonGroup
        size="small"
        value={selectedFilter}
        exclusive
        onChange={handleSelectedFilter}
        aria-label="text alignment"
        >
            <ToggleButton value="missingV1500" aria-label="missingV1500">
                Missing V1500
            </ToggleButton>
            <ToggleButton value="d1500NotSent" aria-label="D1500NotSent">
                D1500 Not Sent
            </ToggleButton>
            <ToggleButton value="adjPastDue" aria-label="adjPastDue">
                Adj Past Due
            </ToggleButton>
            <ToggleButton value="ptPastDue" aria-label="ptPastDue">
                PT Past Due
            </ToggleButton>
        </ToggleButtonGroup>
        
        {selectedFilter === 'missingV1500' &&
        <MissingV1500 />
        }
        {selectedFilter === 'd1500NotSent' &&
        <D1500NotSent />
        }
        {selectedFilter === 'adjPastDue' &&
        <AdjusterPastDue />
        }
        {selectedFilter === 'ptPastDue' &&
        <FacilityPastDue />
        }
        </Box>
    );
}