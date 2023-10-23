import { useState } from 'react';
import useGetClaimantsSearchAll from '../hooks/useGetClaimantsSearchAll';
import SearchTable from './SearchTable';
import ClaimantSearchBar from './ClaimantSearchBar';

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

    const [filter, setFilter] = useState({});

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetClaimantsSearchAll();

    // rows && console.log(rows);

    const rowsFiltered = rows && Object.keys(filter).length === 0
    ?
    []
    :
    rows?.filter((row) => {

      const keys = Object.keys(filter);

      const matches = keys.filter(k => row[k]?.toLowerCase().includes(filter[k].toLowerCase()))

      return matches.length > 0 && matches.length === keys.length;
                                                      
    });

    const rowsSmart = (searchVal !== '') && rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]))
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
        <ClaimantSearchBar
         searchVal={filter}
         setSearchVal={setFilter}
        />
        {(searchVal || (Object.keys(filter).length > 0)) &&
        <SearchTable
        party='claimant'
        searchVal={searchVal}
        rows={rowsFiltered}
        // rowsSmart={rowsSmart}
        headCells={headCells}
        initialSort={initialSort}
        />
        }
        </>
    );
}