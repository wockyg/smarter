import { useContext } from 'react';

import Box from '@mui/material/Box';

import AdjusterDetails from '../details/AdjusterDetails';
import CasemanagerDetails from '../details/CasemanagerDetails';
import ClaimantDetails from '../details/ClaimantDetails';
import PhysicianDetails from '../details/PhysicianDetails'
import AttorneyDetails from '../details/AttorneyDetails';
import ClientDetails from '../details/ClientDetails';
import EmployerDetails from '../details/EmployerDetails';
import TherapistDetails from '../details/TherapistDetails';

import { SearchContext } from '../contexts/SearchContext';
import { DetailsContext } from '../contexts/DetailsContext';

// import useGetAdjusters from '../hooks/useGetAdjusters';
// import useGetCasemanagers from '../hooks/useGetCasemanagers';
// import useGetAttorneys from '../hooks/useGetAttorneys';
// import useGetClients from '../hooks/useGetClients';
// import useGetEmployers from '../hooks/useGetEmployers';
// import useGetPhysicians from '../hooks/useGetPhysicians';
// import useGetTherapists from '../hooks/useGetTherapists';
// import useGetClaimants from '../hooks/useGetClaimants';

export default function SearchDetails(props) {

    const { selectedParty } = props;

    // const controller1 = {};

    // controller1.adjuster = useGetAdjusters;
    // controller1.casemanager = useGetCasemanagers;
    // controller1.attorney = useGetAttorneys;
    // controller1.client = useGetClients;
    // controller1.employer = useGetEmployers;
    // controller1.physician = useGetPhysicians;
    // controller1.therapist = useGetTherapists;
    // controller1.claimant = useGetClaimants;

    const { searchId } = useContext(SearchContext);

    const { currentlyEditingSearch: currentlyEditing, setCurrentlyEditingSearch: setCurrentlyEditing } = useContext(DetailsContext);

    // const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = controller1[selectedParty]();

    // const selectedRow = rows?.length > 0 && rows?.filter((row) => {return (row[`${selectedParty}Id`] === searchId);})[0];

    // COME BACK TO THIS //
    // const ReusableDetailsModule = `${selectedParty}Details`;
    // // // // // // //

    // console.log(selectedRow);

    return (
    <>
    {searchId !== -1 &&
    <Box
      sx={{
        width: '100%',
        height: 480,
        backgroundColor: '#E6E6E6',
        padding: 2,
        overflow: 'scroll'
      }}
    >
        
        {selectedParty === 'adjuster' &&
        <AdjusterDetails 
        detailsId={searchId}
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        searchBox={true}
        />
        }
        {selectedParty === 'casemanager' &&
        <CasemanagerDetails 
        detailsId={searchId}
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        searchBox={true}
        />
        }
        {selectedParty === 'claimant' &&
        <ClaimantDetails
        detailsId={searchId}
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        searchBox={true}
        />
        }
        {selectedParty === 'physician' &&
        <PhysicianDetails
        detailsId={searchId}
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        searchBox={true}
        />
        }
        {selectedParty === 'attorney' &&
        <AttorneyDetails
        detailsId={searchId}
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        searchBox={true}
        />
        }
        {selectedParty === 'client' &&
        <ClientDetails
        detailsId={searchId}
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        searchBox={true}
        />
        }
        {selectedParty === 'employer' &&
        <EmployerDetails
        detailsId={searchId}
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        searchBox={true}
        />
        }
        {selectedParty === 'therapist' &&
        <TherapistDetails
        detailsId={searchId}
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        searchBox={true}
        />
        }

    </Box>
    }
    </>);
}