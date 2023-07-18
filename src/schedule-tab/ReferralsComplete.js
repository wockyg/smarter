import useGetReferralsComplete from '../hooks/useGetReferralsComplete';
import ReferralTable from '../table-components/ReferralTable';

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

    const initialSort = 'referralDate';

    const { status: statusReferrals, data: rows, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferralsComplete();

    return (
        <>
        {rows &&
        <ReferralTable
        headCells={headCells}
        rows={rows}
        title='Complete'
        />
        }
        </>
    );
}