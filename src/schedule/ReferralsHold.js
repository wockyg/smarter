import useGetReferralsOpen from '../hooks/useGetReferralsOpen';
import ReferralTable from '../table-components/ReferralTable';
import Skeleton from '@mui/material/Skeleton';

const headCells = [
  {
    id: 'referralDate',
    numeric: false,
    disablePadding: false,
    label: 'Referred',
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
    id: 'approvedVisits',
    numeric: false,
    disablePadding: false,
    label: 'Visits',
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

export default function ReferralsHold(props) {

    const initialSort = 'referralDate';

    const { status: statusReferrals, data: rows, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferralsOpen();

    const rowsFiltered = rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]))
                              .filter((row) => {
                                return (
                                    row.referralStatus.includes('Hold')
                                );});

    return (
        <>
        {rows ?
        <ReferralTable
        headCells={headCells}
        rows={rowsFiltered}
        removable={true}
        title='Hold'
        />
        :
        <Skeleton variant="rectangular" width='100%' height={475} />
        }
        </>
    );
}