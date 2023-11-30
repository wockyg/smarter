import { useState, useContext } from 'react';
import useGetPhysiciansSearchAll from '../hooks/useGetPhysiciansSearchAll';
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
    id: 'facility',
    numeric: false,
    disablePadding: false,
    label: 'Facility'
  },
  {
    id: 'npi',
    numeric: false,
    disablePadding: false,
    label: 'NPI'
  },
];

export default function PhysicianSearch(props) {

    const initialSort = 'lastFirst';

    const { searchVals } = useContext(SearchContext);

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetPhysiciansSearchAll();

    const rowsFiltered = rows && (searchVals.physician === '' && searchVals.physicianFacility === '' && searchVals.physicianNPI === '')
                                  ?
                                  []
                                  :
                                  rows?.filter((row) => {
                                    const physicianLastFirst = `${row.lastName}, ${row.firstName}`;
                                    const physicianFirstLast = `${row.firstName} ${row.lastName}`;
                                    
                                    return (
                                        (physicianLastFirst?.toLowerCase().includes(searchVals.physician.toLowerCase()) ||
                                        physicianFirstLast?.toLowerCase().includes(searchVals.physician.toLowerCase())) &&
                                        row.facility?.toLowerCase().includes(searchVals.physicianFacility.toLowerCase()) &&
                                        (searchVals.physicianNPI.length > 0 ? row.npi?.toString().startsWith(searchVals.physicianNPI) : true)
                                    );
                                                      
    });

    return (
        <>
        {((searchVals.physician.length > 0) || (searchVals.physicianFacility.length > 0) || (searchVals.physicianNPI.length > 0)) &&
        <SearchTable
        party='physician'
        rows={rowsFiltered}
        headCells={headCells}
        initialSort={initialSort}
        />
        }
        </>
    );
}