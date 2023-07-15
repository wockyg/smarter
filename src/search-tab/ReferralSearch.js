import useGetReferralsSearch from '../hooks/useGetReferralsSearch';
import SearchTable from './SearchTable';

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
    label: 'Assign',
  },
  {
    id: 'service',
    numeric: false,
    disablePadding: false,
    label: 'Service',
  },
  {
    id: 'approvedVisits',
    numeric: true,
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
    id: 'claimant',
    numeric: false,
    disablePadding: false,
    label: 'Claimant',
  },
  {
    id: 'claimNumber',
    numeric: false,
    disablePadding: false,
    label: 'Claim #',
  },
  {
    id: 'therapist',
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
    id: 'casemanager',
    numeric: false,
    disablePadding: false,
    label: 'Case Manager',
  },
  {
    id: 'employer',
    numeric: false,
    disablePadding: false,
    label: 'Employer',
  },
  {
    id: 'referralStatus',
    numeric: false,
    disablePadding: false,
    label: 'Ref Status',
  },
  {
    id: 'ptStatus',
    numeric: false,
    disablePadding: false,
    label: 'PT Status',
  },
  {
    id: 'billingStatus',
    numeric: false,
    disablePadding: false,
    label: 'Billing Status',
  },
  {
    id: 'bodyPart',
    numeric: false,
    disablePadding: false,
    label: 'BodyPart',
  },
];

export default function ReferralSearch(props) {

    const initialSort = 'referralDate';

    const {searchVal} = props;

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetReferralsSearch();

    const rowsFiltered = (searchVal !== '') && rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]))
                                                    .filter((row) => {
                                                        const claimantLastFirst = `${row.claimantLast}, ${row.claimantFirst}`;
                                                        const claimantFirstLast = `${row.claimantFirst} ${row.claimantLast}`;
                                                        return (
                                                            claimantLastFirst?.toLowerCase().includes(searchVal.toLowerCase()) ||
                                                            claimantFirstLast?.toLowerCase().includes(searchVal.toLowerCase()) ||
                                                            row.claimNumber?.toLowerCase().includes(searchVal.toLowerCase())
                                                        );
                                                    });

    return (
         <>
        {searchVal &&
        <SearchTable
        party='referral'
        searchVal={searchVal}
        rows={rowsFiltered}
        headCells={headCells}
        />
        }
        </>
    );
}