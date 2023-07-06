import useGetClaimants from '../hooks/useGetClaimants';
import SearchTable from './SearchTable';

const headCells = [
  {
    id: 'lastFirst',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'birthDate',
    numeric: false,
    disablePadding: false,
    label: 'DOB',
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: false,
    label: 'Address',
  },
  {
    id: 'employer',
    numeric: false,
    disablePadding: false,
    label: 'Employer',
  },
];

export default function ClaimantSearch(props) {

    const initialSort = 'lastName';

    const {searchVal} = props;

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetClaimants();

    const rowsFiltered = (searchVal !== '') && rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]))
                                                    .filter((row) => {
                                                        const claimantLastFirst = `${row.lastName}, ${row.firstName}`;
                                                        const claimantFirstLast = `${row.firstName} ${row.lastName}`;
                                                        return (
                                                            claimantLastFirst?.toLowerCase().includes(searchVal.toLowerCase()) || 
                                                            claimantFirstLast?.toLowerCase().includes(searchVal.toLowerCase())
                                                        );
                                                    });

    return (
        <>
        {searchVal &&
        <SearchTable
        party='claimant'
        searchVal={searchVal}
        rows={rowsFiltered}
        headCells={headCells}
        initialSort={initialSort}
        />
        }
        </>
    );
}