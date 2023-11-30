import { useState } from 'react';
import ReferralTable from '../table-components/ReferralTable';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

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

export default function FollowupHoldDashboard(props) {

    const initialSort = 'claimant';

    const {cc, ccRows, filter} = props;

    // const rowsFiltered = ccRows?.filter((row) => (cc ? row.assign === 'SS' : true));

    const rowsFilteredReason = 
          filter === 'needInfo'
          ? 
          ccRows.filter(r => r.fuHoldNotes === 'Pending signed PN' || 
                                   r.fuHoldNotes === 'Pending PN' || 
                                   r.fuHoldNotes === 'Need Upcoming appts' || 
                                   r.fuHoldNotes === 'Need DC note' || 
                                   r.fuHoldNotes === 'Awaiting auth')
          :
          (filter === 'pendingResponse'
          ?
          ccRows.filter(r => r.fuHoldNotes === 'Lvm for MD' || r.fuHoldNotes === 'Pending Adj Response')
          :
          (filter === 'surgery'
          ?
          ccRows.filter(r => r.fuHoldNotes === 'Surgery' || r.fuHoldNotes === 'MRI' || r.fuHoldNotes === 'Pending MD appt')
          :
          (filter === 'other'
          ?
          ccRows.filter(r => r.fuHoldNotes === 'Other' || r.fuHoldNotes === 'COVID' || r.fuHoldNotes === 'Non-compliant')
          :
          ccRows
          )
          )
           )

    return (
        ccRows ?
        <ReferralTable
        headCells={headCells}
        rows={rowsFilteredReason}
        title='FollowUpHold'
        initialSort={initialSort}
        initialSortOrder='asc'
        cc={cc}

        />
        :
        <Skeleton variant="rectangular" width='100%' height={475} />
    );
}