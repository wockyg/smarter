import { useState } from 'react';
import useGetFacilityPastDue from '../hooks/useGetFacilityPastDue';
import useGetFceppdBillingAdjPastDue from '../hooks/useGetFceppdBillingAdjPastDue';
import useGetFceppdBillingFacilityPastDue from '../hooks/useGetFceppdBillingFacilityPastDue'
import ReferralTable from '../table-components/ReferralTable';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Skeleton from '@mui/material/Skeleton';
import { status } from '../lookup-tables/lookup_paymentStatus';

import { handleChangeSearch } from '../7-util/HelperFunctions';

const headCells = [
  {
    id: 'service',
    numeric: false,
    disablePadding: false,
    label: 'Service',
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
    id: 'bodyPart',
    numeric: false,
    disablePadding: false,
    label: 'BodyPart',
  },
  {
    id: 'therapistDisplayShort',
    numeric: false,
    disablePadding: false,
    label: 'Therapist',
  },
  {
    id: 'dos',
    numeric: false,
    disablePadding: false,
    label: 'DOS',
  },
  {
    id: 'v1500',
    numeric: false,
    disablePadding: false,
    label: 'V1500',
  },
  {
    id: 'facilityRate',
    numeric: false,
    disablePadding: false,
    label: 'PT.Rate',
  },
  {
    id: 'facilityDateDueFormula',
    numeric: false,
    disablePadding: false,
    label: 'PT.Due',
  },
  {
    id: 'facilityDatePaid',
    numeric: false,
    disablePadding: false,
    label: 'PT.Paid',
    enableEdit: true,
    inputType: 'date',
  },
  {
    id: 'facilityAmountPaid',
    numeric: false,
    disablePadding: false,
    label: 'Amt',
    enableEdit: true,
    inputType: 'text',
    inputWidth: '8ch'
  },
  {
    id: 'checkNumber',
    numeric: false,
    disablePadding: false,
    label: 'Check#',
    enableEdit: true,
    inputType: 'text',
    inputWidth: '8ch'
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
];

export default function AdjusterPastDue(props) {

    const initialSort = 'claimant';

    const [filter, setFilter] = useState({service: 'DPT'});

    const { status: statusRows, data: rowsDPT, error: errorRows, isFetching: isFetchingRows } = useGetFacilityPastDue();

    const { status: statusRowsFCE, data: rowsFCE, error: errorRowsFCE, isFetching: isFetchingRowsFCE } = useGetFceppdBillingFacilityPastDue();

    return (
        <>
        {rowsDPT && rowsFCE ?
        <Grid container spacing={1}>
          <Grid item>
            <ToggleButtonGroup
            size="small"
            value={filter.service || ''}
            exclusive
            onChange={(e) => handleChangeSearch(e, 'service', filter, setFilter)}
            aria-label="serviceToggle"
            >
              <ToggleButton value='DPT' aria-label="DPT">
                {'DPT'}
              </ToggleButton>
              <ToggleButton value='FCE' aria-label="FCE|PPD">
                {'FCE|PPD'}
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Box width="100%" />
          <Grid item>
            <ReferralTable
            headCells={headCells}
            rows={filter.service === "FCE" ? rowsFCE : rowsDPT}
            type={filter.service === "DPT" ? 'bil' : 'fce'}
            title='Adj Past Due'
            initialSort={initialSort}
            inlineEdit={true}
            bulkEdit={true}
            />
          </Grid>
        </Grid>
        
      :
      <Skeleton variant="rectangular" width='100%' height={475} />
      }
        </>
    );
}