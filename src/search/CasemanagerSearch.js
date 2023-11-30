import { useState, useContext } from 'react';
import useGetCasemanagersSearchAll from '../hooks/useGetCasemanagersSearchAll';
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

export default function CasemanagerSearch(props) {

    const initialSort = 'lastFirst';

    const { searchVals } = useContext(SearchContext);

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetCasemanagersSearchAll();

    const rowsFiltered = rows && (!searchVals.casemanagerClient && searchVals.casemanager === '' && searchVals.casemanagerStatus === '')
                                  ?
                                  []
                                  :
                                  rows?.filter((row) => {
                                    const casemanagerLastFirst = `${row.lastName}, ${row.firstName}`;
                                    const casemanagerFirstLast = `${row.firstName} ${row.lastName}`;

                                    return (
                                      (casemanagerLastFirst?.toLowerCase().includes(searchVals.casemanager.toLowerCase()) || 
                                      casemanagerFirstLast?.toLowerCase().includes(searchVals.casemanager.toLowerCase())) &&
                                      (searchVals.casemanagerClient ? (row.clientId === searchVals.casemanagerClient?.clientId) : true) &&
                                      ((searchVals.casemanagerStatus !== 'all' && searchVals.casemanagerStatus !== '') ? (row.status === searchVals.casemanagerStatus) : true)
                                    )
                                                      
    });

    return (
        <>
        {(searchVals.casemanagerClient || (searchVals.casemanager.length > 0) || (searchVals.casemanagerStatus.length > 0)) &&
        <SearchTable
        party='casemanager'
        rows={rowsFiltered}
        headCells={headCells}
        initialSort={initialSort}
        />
        }
        </>
    );
}