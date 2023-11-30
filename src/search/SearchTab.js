import { useState, useContext } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';

import ReferralSearchAdvanced from './ReferralSearchAdvanced';
import ClaimantSearch from './ClaimantSearch';
import AdjusterSearch from './AdjusterSearch';
import CasemanagerSearch from './CasemanagerSearch';
import PhysicianSearch from './PhysicianSearch';
import TherapistSearch from './TherapistSearch';
import AttorneySearch from './AttorneySearch';
import ClientSearch from './ClientSearch';
import EmployerSearch from './EmployerSearch';

import ClaimantSearchBar from './ClaimantSearchBar';
import AdjusterSearchBar from './AdjusterSearchBar';
import CasemanagerSearchBar from './CasemanagerSearchBar';
import PhysicianSearchBar from './PhysicianSearchBar';
import TherapistSearchBar from './TherapistSearchBar';
import AttorneySearchBar from './AttorneySearchBar';
import ClientSearchBar from './ClientSearchBar';
import EmployerSearchBar from './EmployerSearchBar';

import SearchDetails from './SearchDetails';

import { SearchContext } from '../contexts/SearchContext';
import { DetailsContext } from '../contexts/DetailsContext';

import useGetReferralsSearchAll from '../hooks/useGetReferralsSearchAll';
import useGetAdjustersSearchAll from '../hooks/useGetAdjustersSearchAll';
import useGetAttorneysSearchAll from '../hooks/useGetAttorneysSearchAll';
import useGetCasemanagersSearchAll from '../hooks/useGetCasemanagersSearchAll';
import useGetClaimantsSearchAll from '../hooks/useGetClaimantsSearchAll';
import useGetClientsSearchAll from '../hooks/useGetClientsSearchAll';
import useGetEmployersSearchAll from '../hooks/useGetEmployersSearchAll';
import useGetPhysiciansSearchAll from '../hooks/useGetPhysiciansSearchAll';
import useGetTherapistsSearchAll from '../hooks/useGetTherapistsSearchAll';

import useGetClaimantsDropdown from '../hooks/useGetClaimantsDropdown';
import useGetTherapistsDropdown from '../hooks/useGetTherapistsDropdown';
import useGetAdjustersDropdown from '../hooks/useGetAdjustersDropdown';
import useGetClientsDropdown from '../hooks/useGetClientsDropdown';
import useGetEmployersDropdown from '../hooks/useGetEmployersDropdown';

import '../App.css';

export default function SearchTab() {

    const { status: statusReferrals, data: referrals, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferralsSearchAll();
    const { status: statusAdjusters, data: adjusters, error: errorAdjusters, isFetching: isFetchingAdjusters } = useGetAdjustersSearchAll();
    const { status: statusAttorneys, data: attorneys, error: errorAttorneys, isFetching: isFetchingAttorneys } = useGetAttorneysSearchAll();
    const { status: statusCasemanagers, data: casemanagers, error: errorCasemanagers, isFetching: isFetchingCasemanagers } = useGetCasemanagersSearchAll();
    const { status: statusClaimants, data: claimants, error: errorClaimants, isFetching: isFetchingClaimants } = useGetClaimantsSearchAll();
    const { status: statusClients, data: clients, error: errorClients, isFetching: isFetchingClients } = useGetClientsSearchAll();
    const { status: statusEmployers, data: employers, error: errorEmployers, isFetching: isFetchingEmployers } = useGetEmployersSearchAll();
    const { status: statusPhysicians, data: physicians, error: errorPhysicians, isFetching: isFetchingPhysicians } = useGetPhysiciansSearchAll();
    const { status: statusTherapists, data: therapists, error: errorTherapists, isFetching: isFetchingTherapists } = useGetTherapistsSearchAll();

    const { status: statusClaimantsDD, data: claimantsDD, error: errorClaimantsDD, isFetching: isFetchingClaimantsDD } = useGetClaimantsDropdown();
    const { status: statusAdjustersDD, data: adjustersDD, error: errorAdjustersDD, isFetching: isFetchingAdjustersDD } = useGetAdjustersDropdown();
    const { status: statusClientsDD, data: clientsDD, error: errorClientsDD, isFetching: isFetchingClientsDD } = useGetClientsDropdown();
    const { status: statusTherapistsDD, data: therapistsDD, error: errorTherapistsDD, isFetching: isFetchingTherapistsDD } = useGetTherapistsDropdown();
    const { status: statusEmployersDD, data: employersDD, error: errorEmployersDD, isFetching: isFetchingEmployersDD } = useGetEmployersDropdown();

    const { selectedParty, setSelectedParty } = useContext(SearchContext);
    const { currentlyEditingSearch: currentlyEditing, setCurrentlyEditingSearch: setCurrentlyEditing } = useContext(DetailsContext);

    const handleSelectedParty = (event, newParty) => {
        if (newParty !== null){
            setSelectedParty(newParty);
            setCurrentlyEditing(false);
        }
    };

    return (
        <>
        {(referrals && adjusters && attorneys && casemanagers && claimants && clients && employers && physicians && therapists && 
          adjustersDD && claimantsDD && clientsDD && employersDD && therapistsDD) ?
        <Box sx={{ width: '100%', height: 750 }}>
        <Grid container spacing={2}>
            <Grid item>
                {/* Something here */}
            </Grid>
            <Grid item>
                <ToggleButtonGroup
                exclusive
                size="small"
                // sx={{padding: 0}}
                value={selectedParty}
                onChange={handleSelectedParty}
                // onClick={(e) => e.target.value !== selectedParty && setSearchId(-1)}
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
            <Grid item>
                {selectedParty === 'claimant' &&
                <ClaimantSearchBar />
                }
                {selectedParty === 'adjuster' &&
                <AdjusterSearchBar />
                }
                {selectedParty === 'casemanager' &&
                <CasemanagerSearchBar />
                }
                {selectedParty === 'physician' &&
                <PhysicianSearchBar />
                }
                {selectedParty === 'therapist' &&
                <TherapistSearchBar />
                }
                {selectedParty === 'attorney' &&
                <AttorneySearchBar />
                }
                {selectedParty === 'client' &&
                <ClientSearchBar />
                }
                {selectedParty === 'employer' &&
                <EmployerSearchBar />
                }
            </Grid>
            <Box width="100%"/>
            <Grid item xs={selectedParty === 'referral' ? 12 : 8}>
                {selectedParty === 'referral' &&
                <ReferralSearchAdvanced />
                }
                {selectedParty === 'claimant' &&
                <ClaimantSearch />
                }
                {selectedParty === 'adjuster' &&
                <AdjusterSearch />
                }
                {selectedParty === 'casemanager' &&
                <CasemanagerSearch />
                }
                {selectedParty === 'physician' &&
                <PhysicianSearch />
                }
                {selectedParty === 'therapist' &&
                <TherapistSearch />
                }
                {selectedParty === 'attorney' &&
                <AttorneySearch />
                }
                {selectedParty === 'client' &&
                <ClientSearch />
                }
                {selectedParty === 'employer' &&
                <EmployerSearch />
                }
            </Grid>
            {selectedParty !== 'referral' &&
            <Grid item xs={4}>
                <SearchDetails selectedParty={selectedParty} />
            </Grid>
            }
        </Grid>
        </Box>
        :
        <Skeleton variant="rectangular" width='100%' height={475} />
        }
        </>
    );
}