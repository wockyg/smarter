import { useState } from 'react';
import useGetAdjusterPastDue from '../hooks/useGetAdjusterPastDue';
import useGetFceppdBillingAdjPastDue from '../hooks/useGetFceppdBillingAdjPastDue';
import ReferralTable from '../table-components/ReferralTable';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Skeleton from '@mui/material/Skeleton';
import { status } from '../lookup-tables/lookup_paymentStatus';

import { handleChangeSearch } from '../7-util/HelperFunctions';

const headCellsDPT = [
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
    id: 'dos',
    numeric: false,
    disablePadding: false,
    label: 'DOS',
  },
  {
    id: 'd1500Sent',
    numeric: false,
    disablePadding: false,
    label: 'D1500',
  },
  {
    id: 'd1500SendFormat',
    numeric: false,
    disablePadding: false,
    label: 'Format',
  },
  {
    id: 'adjusterDateDueFormula',
    numeric: false,
    disablePadding: false,
    label: 'Adj.Due',
  },
  {
    id: 'paymentStatus',
    numeric: false,
    disablePadding: false,
    label: 'Pmt.Status',
    enableEdit: true,
    inputType: 'select',
    options: status
  },
  {
    id: 'paymentStatusDate',
    numeric: false,
    disablePadding: false,
    label: 'Pmt.StatusDate',
    enableEdit: true,
    inputType: 'date',
  },
  {
    id: 'dateRebilled',
    numeric: false,
    disablePadding: false,
    label: 'Rebill Date',
    enableEdit: true,
    inputType: 'date',
  },
  {
    id: 'rebillFormat',
    numeric: false,
    disablePadding: false,
    label: 'Format',
    enableEdit: true,
    inputType: 'select',
    options: ['Email', 'Fax', 'Mail']
  },
  {
    id: 'adjusterRate',
    numeric: false,
    disablePadding: false,
    label: 'Adj.Rate',
  },
  {
    id: 'adjusterDatePaid',
    numeric: false,
    disablePadding: false,
    label: 'Adj.Paid',
    enableEdit: true,
    inputType: 'date',
  },
  {
    id: 'adjusterAmountPaid',
    numeric: false,
    disablePadding: false,
    label: 'Amt',
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

const headCellsFCE = [
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
    id: 'dos',
    numeric: false,
    disablePadding: false,
    label: 'DOS',
  },
  {
    id: 'd1500Sent',
    numeric: false,
    disablePadding: false,
    label: 'D1500',
  },
  {
    id: 'd1500SendFormat',
    numeric: false,
    disablePadding: false,
    label: 'Format',
  },
  {
    id: 'adjusterDateDueFormula',
    numeric: false,
    disablePadding: false,
    label: 'Adj.Due',
  },
  {
    id: 'paymentStatus',
    numeric: false,
    disablePadding: false,
    label: 'Pmt.Status',
    enableEdit: true,
    inputType: 'select',
    options: status
  },
  {
    id: 'paymentStatusDate',
    numeric: false,
    disablePadding: false,
    label: 'Pmt.StatusDate',
    enableEdit: true,
    inputType: 'date',
  },
  {
    id: 'dateRebilled',
    numeric: false,
    disablePadding: false,
    label: 'Rebill Date',
    enableEdit: true,
    inputType: 'date',
  },
  {
    id: 'rebillFormat',
    numeric: false,
    disablePadding: false,
    label: 'Format',
    enableEdit: true,
    inputType: 'select',
    options: ['Email', 'Fax', 'Mail']
  },
  {
    id: 'adjusterRateAdjusted',
    numeric: false,
    disablePadding: false,
    label: 'Adj.Rate',
  },
  {
    id: 'adjusterDatePaid',
    numeric: false,
    disablePadding: false,
    label: 'Adj.Paid',
    enableEdit: true,
    inputType: 'date',
  },
  {
    id: 'adjusterAmountPaid',
    numeric: false,
    disablePadding: false,
    label: 'Amt',
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

    const { status: statusRowsDPT, data: rowsDPT, error: errorRowsDPT, isFetching: isFetchingRowsDPT } = useGetAdjusterPastDue();

    const { status: statusRowsFCE, data: rowsFCE, error: errorRowsFCE, isFetching: isFetchingRowsFCE } = useGetFceppdBillingAdjPastDue();

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
            headCells={filter.service === "FCE" ? headCellsFCE : headCellsDPT}
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