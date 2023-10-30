import { useState, useContext } from 'react';

import Skeleton from '@mui/material/Skeleton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import ReferralTable from '../table-components/ReferralTable';

import useGetReferralsComplete from '../hooks/useGetReferralsComplete';

import {careCoordinators} from '../lookup-tables/lookup_careCoordinators';

import { handleChangeSearch } from '../7-util/HelperFunctions';

const headCells = [
  {
    id: 'referralDate',
    numeric: false,
    disablePadding: false,
    label: 'Referred',
  },
  {
    id: 'scheduleDate',
    numeric: false,
    disablePadding: false,
    label: 'Scheduled',
  },
  {
    id: 'assign',
    numeric: false,
    disablePadding: false,
    label: 'CC',
  },
  {
    id: 'jurisdiction',
    numeric: false,
    disablePadding: false,
    label: 'Juris.',
  },
  {
    id: 'service',
    numeric: false,
    disablePadding: false,
    label: 'Service',
  },
  {
    id: 'bodyPart',
    numeric: false,
    disablePadding: false,
    label: 'BodyPart',
  },
  {
    id: 'apptDate',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'apptTime',
    numeric: false,
    disablePadding: false,
    label: 'Time',
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
    id: 'referralStatus',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

export default function ReferralsComplete(props) {

    const initialSort = 'scheduleDate';

    const [filter, setFilter] = useState({});

    const { status: statusReferrals, data: rows, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferralsComplete();

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
            value={filter.service || ''}
            exclusive
            onChange={(e) => handleChangeSearch(e, 'service', filter, setFilter)}
            aria-label="serviceToggle"
            >
              <ToggleButton value='' aria-label="All">
                {'All'}
              </ToggleButton>
              <ToggleButton value='DPT' aria-label="DPT">
                {'DPT'}
              </ToggleButton>
              <ToggleButton value='FCE' aria-label="FCE|PPD">
                {'FCE|PPD'}
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item>
            <label htmlFor="assign" style={{display: 'block'}}>Assign:</label>
            <select
            id='assign'
            onChange={(e) => handleChangeSearch(e, 'assign', filter, setFilter)}
            value={filter.assign || ''}
            >
              <option value="">
                {"--"}
              </option>
              {careCoordinators?.map((n) => (
                  <option key={n.Initials} value={n.Initials}>{n.Initials}</option>
              ))}
            </select>
          </Grid>
          <Box width="100%" />
          <Grid item>
            <ReferralTable
            headCells={headCells}
            rows={rowsFiltered}
            title='Complete'
            initialSort={initialSort}
            initialSortOrder='desc'
            />
          </Grid>
        </Grid>
        :
        <Skeleton variant="rectangular" width='100%' height={475} />
        }
        </>
    );
}