import { useState } from 'react';
import useGetReferralsFollowUpHold from '../hooks/useGetReferralsFollowUpHold';
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
    id: 'fuHoldNotes',
    numeric: false,
    disablePadding: false,
    label: 'FU/H Notes',
  },
  {
    id: 'fuHoldTimestamp',
    numeric: false,
    disablePadding: false,
    label: 'Timestamp',
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

export default function FollowupHold(props) {

    const initialSort = 'claimant';

    const [filter, setFilter] = useState({});

    const { status: statusReferrals, data: rows, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferralsFollowUpHold();

    const rowsFiltered = rows && Object.keys(filter).length === 0
    ?
    rows
    :
    rows?.filter((row) => {

      const keys = Object.keys(filter);

      const matches = keys.filter(k => row[k]?.toLowerCase().includes(filter[k].toLowerCase()))

      return matches.length > 0 && matches.length === keys.length;
                                                      
    });

    return (
        <>
        {rowsFiltered ?
        <Grid container spacing={1}>
          <Grid item>
            <ToggleButtonGroup
            size="small"
            value={filter.ptStatus || ''}
            exclusive
            onChange={(e) => handleChangeSearch(e, 'ptStatus', filter, setFilter)}
            aria-label="ptStatusToggle"
            >
              <ToggleButton value='' aria-label="All">
                {'All'}
              </ToggleButton>
              <ToggleButton value='Follow-Up' aria-label="Follow-Up">
                {'Follow-Up'}
              </ToggleButton>
              <ToggleButton value='Hold' aria-label="Hold">
                {'Hold'}
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item>
            <InputSelect
            searchVal={filter}
            setSearchVal={setFilter}
            field="assign"
            label="Assign:"
            options={careCoordinators.map(c => c.Initials)}
            />
          </Grid>
          <Grid item>
            <InputSelect
            searchVal={filter}
            setSearchVal={setFilter}
            field="fuHoldNotes"
            label="Reason:"
            options={reasons}
            />
          </Grid>
          <Box width="100%" />
          <Grid item>
            <ReferralTable
            headCells={headCells}
            rows={rowsFiltered}
            title='FollowUpHold'
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