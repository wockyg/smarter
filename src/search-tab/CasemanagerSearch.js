import useGetCasemanagersSearchAll from '../hooks/useGetCasemanagersSearchAll';
import SearchTable from './SearchTable';

const headCells = [
  {
    id: 'lastName',
    numeric: false,
    disablePadding: false,
    label: 'Last Name'
  },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'First Name'
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

export default function CasemanagerSearch(props) {

    const initialSort = 'lastFirst';

    const {searchVal} = props;

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetCasemanagersSearchAll();

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
        party='casemanager'
        searchVal={searchVal}
        rows={rowsFiltered}
        headCells={headCells}
        />
        }
        </>
    );
}