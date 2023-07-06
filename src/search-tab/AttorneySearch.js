import useGetAttorneys from '../hooks/useGetAttorneys';
import SearchTable from './SearchTable';

const headCells = [
  {
    id: 'lastFirst',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'firm',
    numeric: false,
    disablePadding: false,
    label: 'Firm',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Type',
  },
];

export default function AttorneySearch(props) {

    const initialSort = 'lastFirst';

    const {searchVal} = props;

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetAttorneys();

    const rowsFiltered = (searchVal !== '') && rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]))
                                                    .filter((row) => {
                                                        const firstLast = `${row.firstName} ${row.lastName}`;
                                                        return (
                                                            firstLast?.toLowerCase().includes(searchVal.toLowerCase()) ||
                                                            row.lastFirst?.toLowerCase().includes(searchVal.toLowerCase()) || 
                                                            row.firm?.toLowerCase().includes(searchVal.toLowerCase())
                                                        );
                                                    });

    return (
        <>
        {searchVal &&
        <SearchTable
        party='attorney'
        searchVal={searchVal}
        rows={rowsFiltered}
        headCells={headCells}
        />
        }
        </>
    );
}