import { useState, useContext } from 'react';
import useGetAttorneysSearchAll from '../hooks/useGetAttorneysSearchAll';
import SearchTable from './SearchTable';

import { SearchContext } from '../contexts/SearchContext';

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

    const { searchVals } = useContext(SearchContext);

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetAttorneysSearchAll();

    const rowsFiltered = rows && (searchVals.attorney === '' && searchVals.attorneyFirm === '' && searchVals.attorneyType === '')
                                  ?
                                  []
                                  :
                                  rows?.filter((row) => {
                                    const attorneyLastFirst = `${row.lastName}, ${row.firstName}`;
                                    const attorneyFirstLast = `${row.firstName} ${row.lastName}`;
                                    
                                    return (
                                        (attorneyLastFirst?.toLowerCase().includes(searchVals.attorney.toLowerCase()) ||
                                        attorneyFirstLast?.toLowerCase().includes(searchVals.attorney.toLowerCase())) &&
                                        (searchVals.attorneyType !== '' ? (row.type?.toLowerCase().includes(searchVals.attorneyType.toLowerCase())) : true)
                                    );
                                                      
    });

    return (
        <>
        {((searchVals.attorney.length > 0) || (searchVals.attorneyFirm.length > 0) || (searchVals.attorneyType.length > 0)) &&
        <SearchTable
        party='attorney'
        rows={rowsFiltered}
        headCells={headCells}
        initialSort={initialSort}
        />
        }
        </>
    );
}