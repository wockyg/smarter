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
    id: 'claimantConfirmDayBefore',
    numeric: false,
    disablePadding: false,
    label: 'Claimant DB',
  },
  {
    id: 'ptConfirmDayBefore',
    numeric: false,
    disablePadding: false,
    label: 'PT DB',
  },
];

export default function FcePpdTomorrow(props) {

    const initialSort = 'apptDate';

    const { status: statusReferrals, data: rows, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferrals();

    const rowsFiltered = rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]))
                              .filter((row) => {
                                const tomorrow = new Date();
                                const oneDay = tomorrow.getDate() + 1;
                                tomorrow.setDate(oneDay);
                                const newApptDate = new Date(row.apptDate);
                                return (
                                    !row.service?.includes('DPT') &&
                                    newApptDate?.getUTCDate() === tomorrow.getDate() &&
                                    newApptDate?.getMonth() === tomorrow.getMonth() &&
                                    newApptDate?.getFullYear() === tomorrow.getFullYear()
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