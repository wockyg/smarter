import { useState } from 'react';
import useGetReferralsSearchAll from '../hooks/useGetReferralsSearchAll';
import SearchTable from './SearchTable';
import ReferralSearchBar from './ReferralSearchBar';

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
    id: 'approvedVisits',
    numeric: true,
    disablePadding: false,
    label: 'Visits',
  },
  {
    id: 'apptDate',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'apptTime',
    numeric: false,
    disablePadding: false,
    label: 'Time',
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

export default function ReferralSearchAdvanced(props) {

    const initialSort = 'referralDate';

    const {searchVal} = props;

    const [searchValAdvanced, setSearchValAdvanced] = useState({});

    const handleChangeSearch = (e, field, inputType) => {

      if (e.target.value === '') {
        // remove field from object
        const {[field]: remove, ...rest} = searchValAdvanced;
        setSearchValAdvanced(rest);
      }
      else {
        setSearchValAdvanced({...searchValAdvanced, [field]: e.target.value});
      } 

    };

    const handleClearSearch = (v) => {
        setSearchValAdvanced({...searchValAdvanced, [v]: ''});
    };

    const handleClearEntireSearch = (v) => {
        setSearchValAdvanced({});
    };

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetReferralsSearchAll();


    const rowsFiltered = rows && (Object.keys(searchValAdvanced).length === 0) 
    ?
    []
    :
    rows?.filter((row) => {

      const keys = Object.keys(searchValAdvanced);

      const matches = keys.filter(k => row[k]?.toLowerCase().includes(searchValAdvanced[k].toLowerCase()))

      return matches.length > 0 && matches.length === keys.length;
                                                      
    });

    return (
         <>
         {/* {JSON.stringify(searchValAdvanced)} */}
         <ReferralSearchBar
         searchVal={searchVal}
         searchValAdvanced={searchValAdvanced}
         handleChangeSearch={handleChangeSearch}
         handleClearSearch={handleClearSearch}
         handleClearEntireSearch={handleClearEntireSearch}
        />
        {(searchVal || Object.keys(searchValAdvanced).length > 0) &&
        <SearchTable
        party='referral'
        searchVal={searchVal}
        searchValAdvanced={searchValAdvanced}
        rows={rowsFiltered}
        headCells={headCells}
        initialSort={initialSort}
        />
        }
        </>
    );
}