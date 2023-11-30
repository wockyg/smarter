import { useState, useContext } from 'react';
import useGetClientsSearchAll from '../hooks/useGetClientsSearchAll';
import SearchTable from './SearchTable';

import { SearchContext } from '../contexts/SearchContext';

const headCells = [
  {
    id: 'client',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'notes',
    numeric: false,
    disablePadding: false,
    label: 'Notes',
  },
  {
    id: 'billingProtocol',
    numeric: false,
    disablePadding: false,
    label: 'Protocol',
  },
  {
    id: 'discount',
    numeric: false,
    disablePadding: false,
    label: 'Notes',
  },
];

export default function ClientSearch(props) {

    const initialSort = 'client';

    const { searchVals } = useContext(SearchContext);

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetClientsSearchAll();

    const rowsFiltered = rows && (searchVals.client === '' && searchVals.clientBillingProtocol === '' && searchVals.clientDiscount === '')
                                  ?
                                  []
                                  :
                                  rows?.filter((row) => {
                                    const clientSpace = `${row.client}`;
                                    
                                    return (
                                        (clientSpace?.toLowerCase().includes(`${searchVals.client.toLowerCase()}`)) &&
                                        (searchVals.clientBillingProtocol !== '' ? (row.billingProtocol?.toLowerCase().startsWith(searchVals.clientBillingProtocol.toLowerCase())) : true)
                                    );
                                                      
    });

    return (
        <>
        {((searchVals.client.length > 0) || (searchVals.clientBillingProtocol.length > 0) || (searchVals.clientDiscount.length > 0)) &&
        <SearchTable
        party='client'
        rows={rowsFiltered}
        headCells={headCells}
        initialSort={initialSort}
        />
        }
        </>
    );
}