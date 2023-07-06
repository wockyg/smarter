import useGetClients from '../hooks/useGetClients';
import SearchTable from './SearchTable';

const headCells = [
  {
    id: 'client',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'notes',
    numeric: false,
    disablePadding: false,
    label: 'Notes',
  },
];

export default function AttorneySearch(props) {

    const initialSort = 'client';

    const {searchVal} = props;

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetClients();

    const rowsFiltered = (searchVal !== '') && rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]))
                                                    .filter((row) => {
                                                        return (
                                                            row.client?.toLowerCase().includes(searchVal.toLowerCase())
                                                        );
                                                    });

    return (
        <>
        {searchVal &&
        <SearchTable
        party='client'
        searchVal={searchVal}
        rows={rowsFiltered}
        headCells={headCells}
        />
        }
        </>
    );
}