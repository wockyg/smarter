import { useState } from 'react';

import ReferralTable from '../table-components/ReferralTable';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Skeleton from '@mui/material/Skeleton';
import InputSelect from '../form-components-searchBar/InputSelect';
import {careCoordinators} from '../lookup-tables/lookup_careCoordinators';
import { reasons } from '../lookup-tables/lookup_fuHoldReasons';
import { handleChangeSearch } from '../7-util/HelperFunctions';

import useGetReferralsActive from '../hooks/useGetReferralsActive';

const headCells = [
  {
    id: 'assign',
    numeric: false,
    disablePadding: false,
    label: 'CC',
  },
  {
    id: 'bodyPart',
    numeric: false,
    disablePadding: false,
    label: 'BodyPart',
  },
  {
    id: 'claimNumber',
    numeric: false,
    disablePadding: false,
    label: 'Claim #',
  },
  {
    id: 'claimant',
    numeric: false,
    disablePadding: false,
    label: 'Claimant',
  },
  {
    id: 'therapistDisplay',
    numeric: false,
    disablePadding: false,
    label: 'Therapist',
  },
  {
    id: 'adjuster',
    numeric: false,
    disablePadding: false,
    label: 'Adjuster',
  },
  {
    id: 'adjusterClient',
    numeric: false,
    disablePadding: false,
    label: 'Client',
  },
  {
    id: 'dmLastWorked',
    numeric: false,
    disablePadding: false,
    label: 'RRLastWorked',
  },
  {
    id: 'ptStatus',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

export default function Active(props) {

    const initialSort = 'claimant';

    const [assign, setAssign] = useState('');

    const { status: statusReferrals, data: rows, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferralsActive();

    const rowsFiltered = rows && assign === ''
    ?
    rows
    :
    rows?.filter((row) => row.assign === assign);

    const handleAssign = (event) => {
      setAssign(event.target.value);
    };

    return (
        <>
        {rowsFiltered ?
        <Grid container spacing={1}>
          <Grid item>
            <label htmlFor="assign" style={{display: 'block'}}>Assign:</label>
            <select 
            name="assign" 
            value={assign} 
            onChange={handleAssign}
            >
              <option value="">--</option>
              {careCoordinators.map((o) => <option key={o.Initials} value={o.Initials}>{o.Initials}</option>)}
            </select>
          </Grid>
          <Box width="100%" />
          <Grid item>
            <ReferralTable
            headCells={headCells}
            rows={rowsFiltered}
            title='Active'
            initialSort={initialSort}
            />
          </Grid>
        </Grid>
        :
        <Skeleton variant="rectangular" width='100%' height={475} />
        }
        </>
    );
}