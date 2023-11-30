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

export default function SearchDetails(props) {

    const { selectedParty } = props;

    const { detailsId } = useContext(SearchContext);

    const { currentlyEditingSearch: currentlyEditing, setCurrentlyEditingSearch: setCurrentlyEditing } = useContext(DetailsContext);

    return (
    <>
    {(Object.keys(detailsId).length > 0) && detailsId[selectedParty] > 0 &&
    <Box
      sx={{
        width: '100%',
        height: 480,
        backgroundColor: '#E6E6E6',
        // paddingTop: 2,
        // paddingRight: 2,
        // overflow: 'scroll'
      }}
    >

        {selectedParty === 'adjuster' &&
        <AdjusterDetails 
        detailsId={detailsId?.adjuster}
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        searchBox={true}
        />
        }
        {selectedParty === 'casemanager' &&
        <CasemanagerDetails 
        detailsId={detailsId?.casemanager}
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        searchBox={true}
        />
        }
        {selectedParty === 'claimant' &&
        <ClaimantDetails
        detailsId={detailsId?.claimant}
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        searchBox={true}
        />
        }
        {selectedParty === 'physician' &&
        <PhysicianDetails
        detailsId={detailsId?.physician}
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        searchBox={true}
        />
        }
        {selectedParty === 'attorney' &&
        <AttorneyDetails
        detailsId={detailsId?.attorney}
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        searchBox={true}
        />
        }
        {selectedParty === 'client' &&
        <ClientDetails
        detailsId={detailsId?.client}
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        searchBox={true}
        />
        }
        {selectedParty === 'employer' &&
        <EmployerDetails
        detailsId={detailsId?.employer}
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        searchBox={true}
        />
        }
        {selectedParty === 'therapist' &&
        <TherapistDetails
        detailsId={detailsId?.therapist}
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        searchBox={true}
        />
        }

    </Box>
    }
    </>);
}