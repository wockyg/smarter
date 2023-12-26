import { useState, useContext } from 'react';
import useGetEmployersSearchAll from '../hooks/useGetEmployersSearchAll';
import SearchTable from './SearchTable';

import { SearchContext } from '../contexts/SearchContext';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'state',
    numeric: false,
    disablePadding: false,
    label: 'State',
  },
  {
    id: 'phone',
    numeric: false,
    disablePadding: false,
    label: 'Phone',
  },
];

export default function EmployerSearch(props) {

    const initialSort = 'name';

    const { searchVals } = useContext(SearchContext);

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetEmployersSearchAll();

    const rowsFiltered = rows && (searchVals.employer === '' && searchVals.employerState === '')
                                  ?
                                  []
                                  :
                                  rows?.filter((row) => {
                                    const nameSpace = ` ${row.name}`;
                                    const state = `${row.state || ''}`;
                                    
                                    return (
                                        (nameSpace?.toLowerCase().includes(`${searchVals.employer.toLowerCase()}`)) &&
                                        state?.toLowerCase().includes(searchVals.employerState.toLowerCase())
                                    );
                                                      
    });

    return (
        <>
        {((searchVals.employer.length > 0) || (searchVals.employerState.length > 0)) &&
        <SearchTable
        party='employer'
        rows={rowsFiltered}
        headCells={headCells}
        initialSort={initialSort}
        />
        }
        </>
    );
}