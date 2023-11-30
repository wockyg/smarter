import { useState, useContext } from 'react';
import useGetAdjustersSearchAll from '../hooks/useGetAdjustersSearchAll';
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

    const { searchVals } = useContext(SearchContext);

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetAdjustersSearchAll();

    const rowsFiltered = rows && (!searchVals.adjusterClient && searchVals.adjuster === '' && searchVals.adjusterStatus === '')
                                  ?
                                  []
                                  :
                                  rows?.filter((row) => {
                                    const adjusterLastFirst = `${row.lastName}, ${row.firstName}`;
                                    const adjusterFirstLast = `${row.firstName} ${row.lastName}`;

                                    return (
                                      (adjusterLastFirst?.toLowerCase().includes(searchVals.adjuster.toLowerCase()) || 
                                      adjusterFirstLast?.toLowerCase().includes(searchVals.adjuster.toLowerCase())) &&
                                      (searchVals.adjusterClient ? (row.clientId === searchVals.adjusterClient?.clientId) : true) &&
                                      ((searchVals.adjusterStatus !== 'all' && searchVals.adjusterStatus !== '') ? (row.status === searchVals.adjusterStatus) : true)
                                    )
                                                      
    });

    return (
        <>
        {(searchVals.adjusterClient || (searchVals.adjuster.length > 0) || (searchVals.adjusterStatus.length > 0)) &&
        <SearchTable
        party='adjuster'
        rows={rowsFiltered}
        headCells={headCells}
        initialSort={initialSort}
        />
        }
        </>
    );
}