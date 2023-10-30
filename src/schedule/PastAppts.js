import useGetReferralsPastAppts from '../hooks/useGetReferralsPastAppts'
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
    id: 'apptDate',
    numeric: false,
    disablePadding: false,
    label: 'DOS',
  },
  {
    id: 'apptTime',
    numeric: false,
    disablePadding: false,
    label: 'Time',
  },
  {
    id: 'service',
    numeric: false,
    disablePadding: false,
    label: 'Service',
  },
  {
    id: 'approvedVisits',
    numeric: false,
    disablePadding: false,
    label: 'Visits',
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
    id: 'claimantPhone',
    numeric: false,
    disablePadding: false,
    label: 'Claimant Phone',
  },
  {
    id: 'therapistDisplay2',
    numeric: false,
    disablePadding: false,
    label: 'Therapist',
  },
  {
    id: 'confirmAttend',
    numeric: false,
    disablePadding: false,
    label: 'Attend',
  },
  {
    id: 'reportReceivedDate',
    numeric: false,
    disablePadding: false,
    label: 'Report',
  },
];

export default function PastAppts(props) {

    const initialSort = 'apptDate';

    const { status: statusReferrals, data: rows, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferralsPastAppts();

    return (
        <>
        {rows ?
        <ReferralTable
        headCells={headCells}
        rows={rows}
        initialSort={initialSort}
        title='Past Appts'
        />
        :
        <Skeleton variant="rectangular" width='100%' height={475} />
        }
        </>
    );
}