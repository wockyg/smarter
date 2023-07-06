import useGetAdjusters from '../hooks/useGetAdjusters';
import SearchTable from './SearchTable';

const headCells = [
  {
    id: 'lastFirst',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'client',
    numeric: false,
    disablePadding: false,
    label: 'Client',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

export default function AdjusterSearch(props) {

    const initialSort = 'lastFirst';

    const {searchVal} = props;

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetAdjusters();

    const rowsFiltered = (searchVal !== '') && rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]))
                                                    .filter((row) => {
                                                        const firstLast = `${row.firstName} ${row.lastName}`;
                                                        return (
                                                            firstLast?.toLowerCase().includes(searchVal.toLowerCase()) ||
                                                            row.lastFirst?.toLowerCase().includes(searchVal.toLowerCase()) || 
                                                            row.client?.toLowerCase().includes(searchVal.toLowerCase())
                                                        );
                                                    });

    return (
        <>
        {searchVal &&
        <SearchTable
        party='adjuster'
        searchVal={searchVal}
        rows={rowsFiltered}
        headCells={headCells}
        />
        }
        </>
    );
}