import { useContext } from 'react';
import useGetReferralsSearchAll from '../hooks/useGetReferralsSearchAll';
import SearchTable from '../search/SearchTable';

import { SearchContext } from '../contexts/SearchContext';

const headCells = [
  {
    id: 'referralDate',
    numeric: false,
    disablePadding: false,
    label: 'Referred',
  },
  {
    id: 'assign',
    numeric: false,
    disablePadding: false,
    label: 'Assign',
    enableSearch: true,
    rank: 0
  },
  {
    id: 'service',
    numeric: false,
    disablePadding: false,
    label: 'Service',
    enableSearch: true,
    rank: 1
  },
  {
    id: 'claimant',
    numeric: false,
    disablePadding: false,
    label: 'Claimant',
    enableSearch: true,
    rank: 2
  },
  {
    id: 'claimNumber',
    numeric: false,
    disablePadding: false,
    label: 'Claim #',
    enableSearch: true,
    rank: 4
  },
  {
    id: 'therapistBeaver',
    numeric: false,
    disablePadding: false,
    label: 'Therapist',
    enableSearch: true
  },
  {
    id: 'adjuster',
    numeric: false,
    disablePadding: false,
    label: 'Adjuster',
    enableSearch: true
  },
  {
    id: 'adjusterClient',
    numeric: false,
    disablePadding: false,
    label: 'Client',
    enableSearch: true
  },
  {
    id: 'casemanager',
    numeric: false,
    disablePadding: false,
    label: 'Case Manager',
  },
  {
    id: 'employer',
    numeric: false,
    disablePadding: false,
    label: 'Employer',
    enableSearch: true,
    rank: 3
  },
  {
    id: 'referralStatus',
    numeric: false,
    disablePadding: false,
    label: 'Ref Status',
    enableSearch: true
  },
  {
    id: 'ptStatus',
    numeric: false,
    disablePadding: false,
    label: 'PT Status',
    enableSearch: true
  },
  {
    id: 'billingStatus',
    numeric: false,
    disablePadding: false,
    label: 'Billing Status',
    enableSearch: true
  },
  {
    id: 'bodyPart',
    numeric: false,
    disablePadding: false,
    label: 'BodyPart',
  },
];

export default function QuarterlyReportsTable(props) {

    const initialSort = 'referralDate';

    const { quarterlyReportsVals } = useContext(SearchContext);

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetReferralsSearchAll();

    const rowsFiltered = rows && (!quarterlyReportsVals.employer && !quarterlyReportsVals.client && quarterlyReportsVals.year === '' && quarterlyReportsVals.quarter === '')
                                  ?
                                  []
                                  :
                                  rows?.filter((row) => {

                                    const tempDate = new Date(row.referralDate);
                                    const month = tempDate.getMonth();
                                    const quarter = month < 3 ? 'Q1' : (month < 6 ? 'Q2' : (month < 9 ? 'Q3' : 'Q4'))
                                    const year = tempDate.getFullYear();

                                    // console.log(row.adjusterClientId);
                                    

                                    return (
                                      (year === +quarterlyReportsVals.year) &&
                                      (quarter === quarterlyReportsVals.quarter) &&
                                      ((quarterlyReportsVals.employer !== null) ? (row.claimantEmployerId === quarterlyReportsVals.employer.employerId) : true) &&
                                      ((quarterlyReportsVals.client !== null) ? (row.adjusterClientId === quarterlyReportsVals.client.clientId) : true)
                                    )
                                                      
    });

    return (

         quarterlyReportsVals.year.length > 0 && quarterlyReportsVals.quarter.length > 0 && // (quarterlyReportsVals.client || quarterlyReportsVals.employer) &&
        
        <SearchTable
        party='referral'
        rows={rowsFiltered}
        headCells={headCells}
        initialSort={initialSort}
        />
    );
}