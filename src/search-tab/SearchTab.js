import { useState, useContext } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import ReferralSearch from './ReferralSearch';
import ClaimantSearch from './ClaimantSearch';
import AdjusterSearch from './AdjusterSearch';
import CasemanagerSearch from './CasemanagerSearch';
import PhysicianSearch from './PhysicianSearch';
import TherapistSearch from './TherapistSearch';
import AttorneySearch from './AttorneySearch';
import ClientSearch from './ClientSearch';
import EmployerSearch from './EmployerSearch';

import SearchDetails from './SearchDetails';

import { SearchContext } from '../contexts/SearchContext'

import '../App.css';

export default function SearchTab() {

    const { setSearchId } = useContext(SearchContext);

    const [selectedParty, setSelectedParty] = useState("referral");
    const [searchVal, setSearchVal] = useState('');

    const handleSelectedParty = (event, newParty) => {
        if (newParty !== null){
            setSelectedParty(newParty);
            setSearchVal('');
        }
    };

    const handleChangeSearch = (e) => {
        setSearchVal(e.target.value);
        if (e.target.value < 1) {
            setSearchId(-1);
        }
    }

    const handleClearSearch = () => {
        setSearchVal('');
        setSearchId(-1);
    }

    return (
        <>
        <Grid container spacing={2}>
            <Grid item>
                <TextField 
                type='text' 
                style={{marginRight: 10, padding: 5}}
                onChange={(e) => handleChangeSearch(e)}
                value={searchVal}
                placeholder={`Search ${selectedParty}s`}
                InputProps={{
                    endAdornment: (
                    <IconButton 
                    onClick={handleClearSearch} 
                    sx={{visibility: searchVal !== '' ? 'visible' : 'hidden'}}
                    >
                        <HighlightOffIcon />
                    </IconButton>
                    )
                }}
                />
            </Grid>
            <Grid item>
                <ToggleButtonGroup
                size="small"
                // sx={{padding: 0}}
                value={selectedParty}
                exclusive
                onChange={handleSelectedParty}
                onClick={(e) => e.target.value !== selectedParty && setSearchId(-1)}
                aria-label="text alignment"
                >
                    <ToggleButton value="referral" aria-label="referral">
                        Referral
                    </ToggleButton>
                    <ToggleButton value="claimant" aria-label="claimant">
                        Claimant
                    </ToggleButton>
                    <ToggleButton value="adjuster" aria-label="adjuster">
                        Adjuster
                    </ToggleButton>
                    <ToggleButton value="casemanager" aria-label="casemanager">
                        Case Manager
                    </ToggleButton>
                    <ToggleButton value="physician" aria-label="physician">
                        Physician
                    </ToggleButton>
                    <ToggleButton value="therapist" aria-label="therapist">
                        Therapist
                    </ToggleButton>
                    <ToggleButton value="attorney" aria-label="attorney">
                        Attorney
                    </ToggleButton>
                    <ToggleButton value="client" aria-label="client">
                        Client
                    </ToggleButton>
                    <ToggleButton value="employer" aria-label="employer">
                        Employer
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Box width="100%"/>
            <Grid item xs={selectedParty === 'referral' ? 12 : 8}>
                {selectedParty === 'referral' &&
                <ReferralSearch searchVal={searchVal} />
                }
                {selectedParty === 'claimant' &&
                <ClaimantSearch searchVal={searchVal} />
                }
                {selectedParty === 'adjuster' &&
                <AdjusterSearch searchVal={searchVal} />
                }
                {selectedParty === 'casemanager' &&
                <CasemanagerSearch searchVal={searchVal} />
                }
                {selectedParty === 'physician' &&
                <PhysicianSearch searchVal={searchVal} />
                }
                {selectedParty === 'therapist' &&
                <TherapistSearch searchVal={searchVal} />
                }
                {selectedParty === 'attorney' &&
                <AttorneySearch searchVal={searchVal} />
                }
                {selectedParty === 'client' &&
                <ClientSearch searchVal={searchVal} />
                }
                {selectedParty === 'employer' &&
                <EmployerSearch searchVal={searchVal} />
                }
            </Grid>
            {selectedParty !== 'referral' &&
            <Grid item xs={4}>
                <SearchDetails selectedParty={selectedParty} />
            </Grid>
            }
        </Grid>
        </>
    );
}