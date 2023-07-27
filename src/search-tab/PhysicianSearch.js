import useGetPhysiciansSearchAll from '../hooks/useGetPhysiciansSearchAll';
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
    id: 'facility',
    numeric: false,
    disablePadding: false,
    label: 'Facility'
  },
];

export default function PhysicianSearch(props) {

    const initialSort = 'lastFirst';

    const {searchVal} = props;

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetPhysiciansSearchAll();

    const rowsFiltered = (searchVal !== '') && rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]))
                                                    .filter((row) => {
                                                        const firstLast = `${row.firstName} ${row.lastName}`;
                                                        return (
                                                            firstLast?.toLowerCase().includes(searchVal.toLowerCase()) ||
                                                            row.lastFirst?.toLowerCase().includes(searchVal.toLowerCase()) ||
                                                            row.facility?.toLowerCase().includes(searchVal.toLowerCase())
                                                        );
                                                    });

    return (
        <>
        {searchVal &&
        <SearchTable
        party='physician'
        searchVal={searchVal}
        rows={rowsFiltered}
        headCells={headCells}
        />
        }
        </>
    );
}