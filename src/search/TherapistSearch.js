import useGetTherapistsSearchAll from '../hooks/useGetTherapistsSearchAll';
import SearchTable from './SearchTable';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: false,
    label: 'Address',
  },
  {
    id: 'city',
    numeric: false,
    disablePadding: false,
    label: 'City',
  },
  {
    id: 'state',
    numeric: false,
    disablePadding: false,
    label: 'State',
  },
];

export default function TherapistSearch(props) {

    const initialSort = 'name';

    const {searchVal} = props;

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetTherapistsSearchAll();

    const rowsFiltered = (searchVal !== '') && rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]))
                                                    .filter((row) => {
                                                        return (
                                                            row.name?.toLowerCase().includes(searchVal.toLowerCase()) || 
                                                            row.address?.toLowerCase().includes(searchVal.toLowerCase())
                                                        );
                                                    });

    return (
        <>
        {searchVal &&
        <SearchTable
        party='therapist'
        searchVal={searchVal}
        rows={rowsFiltered}
        headCells={headCells}
        />
        }
        </>
    );
}