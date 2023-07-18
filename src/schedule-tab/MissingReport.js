import useGetReferralsMissingReport from '../hooks/useGetReferralsMissingReport';
import ReferralTable from '../table-components/ReferralTable';

const headCells = [
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
    id: 'apptDate',
    numeric: false,
    disablePadding: false,
    label: 'DOS',
  },
  {
    id: 'therapistDisplay2',
    numeric: false,
    disablePadding: false,
    label: 'Therapist',
  },
  {
    id: 'reportReceivedDate',
    numeric: false,
    disablePadding: false,
    label: 'Report',
  },
  {
    id: 'reportStatus',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

export default function ApptToday(props) {

    const initialSort = 'apptDate';

    const { status: statusReferrals, data: rows, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferralsMissingReport();

    // const rowsFiltered = rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]))
    //                           .filter((row) => {
    //                             return (
    //                                 row.confirmAttend === 'Yes' &&
    //                                 row.reportReceivedDate === null
    //                             );});

    return (
        <>
        {rows &&
        <ReferralTable
        headCells={headCells}
        rows={rows}
        title='Missing Report'
        />
        }
        </>
    );
}