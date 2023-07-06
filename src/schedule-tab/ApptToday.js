import useGetReferrals from '../hooks/useGetReferrals';
import ReferralTable from '../table-components/ReferralTable';

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
    label: 'Date',
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
    label: 'ClaimantPhone',
  },
  {
    id: 'therapistDisplay',
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

export default function ApptToday(props) {

    const initialSort = 'apptDate';

    const { status: statusReferrals, data: rows, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferrals();

    const rowsFiltered = rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]))
                              .filter((row) => {
                                const today = new Date();
                                const newApptDate = new Date(row.apptDate);
                                return (
                                    newApptDate?.getUTCDate() === today.getDate() &&
                                    newApptDate?.getMonth() === today.getMonth() &&
                                    newApptDate?.getFullYear() === today.getFullYear()
                                );});

    return (
        <>
        {rows &&
        <ReferralTable
        headCells={headCells}
        rows={rowsFiltered}
        />
        }
        </>
    );
}