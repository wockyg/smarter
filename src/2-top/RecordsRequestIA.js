
import Skeleton from '@mui/material/Skeleton';
import ReferralTable from '../table-components/ReferralTable';
import useGetReferralsRRIA from '../hooks/useGetReferralsRRIA';

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
    enableEdit: true,
    inputType: 'select',
    options: ['Yes', 'No']
  },
  {
    id: 'confirmedPayor',
    numeric: false,
    disablePadding: false,
    label: 'Confirmed Payor',
    enableEdit: true,
    inputType: 'checkbox',
  },
  {
    id: 'reportReceivedDate',
    numeric: false,
    disablePadding: false,
    label: 'Report',
    enableEdit: true,
    inputType: 'date',
  },
  {
    id: 'reportStatus',
    numeric: false,
    disablePadding: false,
    label: 'Status',
    enableEdit: true,
    inputType: 'textarea',
  },
];

export default function RecordsRequestIA(props) {

    const initialSort = 'apptDate';

    const { status: statusReferrals, data: rows, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferralsRRIA();

    return (
        <>
        {rows ?
        <ReferralTable
        headCells={headCells}
        rows={rows}
        initialSort={initialSort}
        inlineEdit={true}
        title='RR IA'
        type='ref'
        />
        :
        <Skeleton variant="rectangular" width='100%' height={475} />
        }
        </>
    );
}