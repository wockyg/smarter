import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


import V1500Uploads from './V1500Uploads';
import D1500NotApproved from './D1500NotApproved';

import '../App.css';

export default function BillMachineTop(props) {

    const [selectedFilter, setSelectedFilter] = useState("missingV1500");

    const handleSelectedFilter = (event, newFilter) => {
        if (newFilter !== null){
            setSelectedFilter(newFilter);
        }
    };

    return (
        <Box sx={{ width: '100%', height: 570 }}>
            <D1500NotApproved />
        </Box>
    );
}