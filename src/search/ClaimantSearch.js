import { useState, useContext } from 'react';
import useGetClaimantsSearchAll from '../hooks/useGetClaimantsSearchAll';
import SearchTable from './SearchTable';
import ClaimantSearchBar from './ClaimantSearchBar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

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

    const { searchVals } = useContext(SearchContext);

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetClaimantsSearchAll();

    // rows && console.log(rows);

    const rowsFiltered = rows && (!searchVals.claimantEmployer && searchVals.claimant === '')
                                  ?
                                  []
                                  :
                                  rows?.filter((row) => {
                                    const claimantLastFirst = `${row.lastName}, ${row.firstName}`;
                                    const claimantFirstLast = `${row.firstName} ${row.lastName}`;

                                    return (
                                      (claimantLastFirst?.toLowerCase().includes(searchVals.claimant.toLowerCase()) || 
                                      claimantFirstLast?.toLowerCase().includes(searchVals.claimant.toLowerCase())) &&
                                      (searchVals.claimantEmployer ? (row.employerId === searchVals.claimantEmployer?.employerId) : true)
                                    )
                                                      
    });

    return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {(searchVals.claimantEmployer || (searchVals.claimant.length > 0)) &&
            <SearchTable
            party='claimant'
            rows={rowsFiltered}
            headCells={headCells}
            initialSort={initialSort}
            />
            }
          </Grid>
        
        </Grid>
    );
}