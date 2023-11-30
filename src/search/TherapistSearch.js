import { useState, useContext } from 'react';
import useGetTherapistsSearchAll from '../hooks/useGetTherapistsSearchAll';
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
  {
    id: 'dpt',
    numeric: false,
    disablePadding: false,
    label: 'DPT',
  },
  {
    id: 'DPT_OT',
    numeric: false,
    disablePadding: false,
    label: 'OT',
  },
  {
    id: 'fce',
    numeric: false,
    disablePadding: false,
    label: 'FCE',
  },
  {
    id: 'ppd',
    numeric: false,
    disablePadding: false,
    label: 'PPD',
  },
];

export default function TherapistSearch(props) {

    const initialSort = 'name';

    const { searchVals } = useContext(SearchContext);

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetTherapistsSearchAll();

    const rowsFiltered = rows && (searchVals.therapist === '' && searchVals.therapistState === '' && searchVals.therapistService === '')
                                  ?
                                  []
                                  :
                                  rows?.filter((row) => {
                                    // const therapistDisplay1 = `${row.name} ${row.address} ${row.city} ${row.state} ${row.zip}`;
                                    // const therapistDisplay2 = `${row.name} ${row.city} ${row.state} ${row.zip}`;
                                    // const therapistDisplay3 = `${row.name} ${row.state} ${row.zip}`;
                                    // const therapistDisplay4 = `${row.name} ${row.zip}`;

                                    const services = `${row.dpt ? row.dpt : ''} ${row.fce ? row.fce : ''} ${row.ppd ? row.ppd : ''} ${row.DPT_AN ? row.DPT_AN : ''} ${row.PPD_GL ? row.PPD_GL : ''} ${row.DPT_AQ ? row.DPT_AQ : ''} ${row.DPT_MT ? row.DPT_MT : ''} ${row.DPT_OT ? row.DPT_OT : ''} ${row.DPT_WH ? row.DPT_WH : ''} ${row.DPT_WC ? row.DPT_WC : ''} ${row.DPT_TH ? row.DPT_TH : ''} ${row.DPT_ST ? row.DPT_ST : ''} ${row.DPT_VT ? row.DPT_VT : ''} ${row.DPT_CHT ? row.DPT_CHT : ''}`;

                                    // console.log(services);

                                    
                                    return (
                                        (row.name?.toLowerCase().includes(searchVals.therapist.toLowerCase())) &&
                                        services?.toLowerCase().includes(searchVals.therapistService.toLowerCase()) &&
                                        row?.state?.toLowerCase().includes(searchVals.therapistState.toLowerCase())
                                    );
                                                      
    });                                                    

    return (
        <>
        {((searchVals.therapist.length > 0) || (searchVals.therapistState.length > 0) || (searchVals.therapistService.length > 0)) &&
        <SearchTable
        party='therapist'
        rows={rowsFiltered}
        headCells={headCells}
        initialSort={initialSort}
        />
        }
        </>
    );
}