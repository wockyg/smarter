import useGetReferralsFollowUpHold from '../hooks/useGetReferralsFollowUpHold';
import ReferralTable from '../table-components/ReferralTable';
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

export default function FollowupHold(props) {

    const initialSort = 'claimant';

    const { status: statusReferrals, data: rows, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferralsFollowUpHold();

    // const rowsFiltered = rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]))
    //                           .filter((row) => {
    //                             return (
    //                                 row.ptStatus?.includes('Follow-Up') || 
    //                                 row.ptStatus?.includes('Hold')
    //                             );});

    return (
        <>
        {rows ?
        <ReferralTable
        headCells={headCells}
        rows={rows}
        title='FollowUpHold'
        />
        :
        <Skeleton variant="rectangular" width='100%' height={475} />
        }
        </>
    );
}