import { useState, useContext } from 'react';
import useGetReferralsSearchAll from '../hooks/useGetReferralsSearchAll';
import SearchTable from './SearchTable';
import ReferralSearchBar from './ReferralSearchBar';
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
  },
  {
    id: 'service',
    numeric: false,
    disablePadding: false,
    label: 'Service',
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
  },
  {
    id: 'claimNumber',
    numeric: false,
    disablePadding: false,
    label: 'Claim #',
  },
  {
    id: 'therapistBeaver',
    numeric: false,
    disablePadding: false,
    label: 'Therapist',
  },
  {
    id: 'adjuster',
    numeric: false,
    disablePadding: false,
    label: 'Adjuster',
  },
  {
    id: 'adjusterClient',
    numeric: false,
    disablePadding: false,
    label: 'Client',
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
  },
  {
    id: 'referralStatus',
    numeric: false,
    disablePadding: false,
    label: 'Ref Status',
  },
  {
    id: 'ptStatus',
    numeric: false,
    disablePadding: false,
    label: 'PT Status',
  },
  {
    id: 'billingStatus',
    numeric: false,
    disablePadding: false,
    label: 'Billing Status',
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

    const { setSearchId } = useContext(SearchContext);

    const handleChangeSearch = (e, field, inputType) => {

        if (e.target.value === '') {

          // remove field from object

          if (field === 'assign') {
            const {assign, ...rest} = searchValAdvanced;
            setSearchValAdvanced(rest);
          }
          if (field === 'service') {
            const {service, ...rest} = searchValAdvanced;
            setSearchValAdvanced(rest);
          }
          if (field === 'referralStatus') {
            const {referralStatus, ...rest} = searchValAdvanced;
            setSearchValAdvanced(rest);
          }
          if (field === 'ptStatus') {
            const {ptStatus, ...rest} = searchValAdvanced;
            setSearchValAdvanced(rest);
          }
          if (field === 'billingStatus') {
            const {billingStatus, ...rest} = searchValAdvanced;
            setSearchValAdvanced(rest);
          }
          if (field === 'claimNumber') {
            const {claimNumber, ...rest} = searchValAdvanced;
            setSearchValAdvanced(rest);
          }
          if (field === 'claimant') {
            const {claimant, ...rest} = searchValAdvanced;
            setSearchValAdvanced(rest);
          }
          if (field === 'employer') {
            const {employer, ...rest} = searchValAdvanced;
            setSearchValAdvanced(rest);
          }
          if (field === 'adjuster') {
            const {adjuster, ...rest} = searchValAdvanced;
            setSearchValAdvanced(rest);
          }
          if (field === 'client') {
            const {client, ...rest} = searchValAdvanced;
            setSearchValAdvanced(rest);
          }
          if (field === 'therapist') {
            const {therapist, ...rest} = searchValAdvanced;
            setSearchValAdvanced(rest);
          }

        }
        else {
          setSearchValAdvanced({...searchValAdvanced, [field]: e.target.value});
        }

        // if (inputType === 'select') {
        //   if (field === "claimant") {
        //     setSearchValAdvanced({...searchValAdvanced, [field]: `${value.lastName}, ${value.firstName}`});
        //   }
        //   if (field === "therapist") {
        //     setSearchValAdvanced({...searchValAdvanced, [field]: `${value.lastName}, ${value.firstName}`});
        //   }
        // }
        // else{
        //   setSearchValAdvanced({...searchValAdvanced, [field]: e.target.value});
        // }
        // console.log(searchValAdvanced);
        // if (e.target.value < 1) {
        //     setSearchId(-1);
        // }

        console.log(searchValAdvanced);
        console.log(Object.keys(searchValAdvanced).length);
    };

    const handleClearSearch = (v) => {
        console.log("cler search");
        setSearchValAdvanced({...searchValAdvanced, [v]: ''});
        // console.log(searchValAdvanced);
        // if (e.target.value < 1) {
        //     setSearchId(-1);
        // }
    };

    const handleClearEntireSearch = (v) => {
        console.log("cler search");
        setSearchValAdvanced({});
        // console.log(searchValAdvanced);
        // if (e.target.value < 1) {
        //     setSearchId(-1);
        // }
    };

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetReferralsSearchAll();

    const rowsFiltered = ((searchVal !== '') || Object.keys(searchValAdvanced).length > 0) && rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]))
                                                    .filter((row) => {
                                                        const claimantLastFirst = `${row.claimantLast}, ${row.claimantFirst}`;
                                                        const claimantFirstLast = `${row.claimantFirst} ${row.claimantLast}`;

                                                        if (Object.keys(searchValAdvanced).length > 0) {
                                                          return (
                                                            (row.assign?.toLowerCase().includes(searchValAdvanced.assign ? searchValAdvanced.assign?.toLowerCase() : '')) &&
                                                            (row.service?.toLowerCase().includes(searchValAdvanced.service ? searchValAdvanced.service?.toLowerCase() : '')) &&
                                                            (row.claimant?.toLowerCase().includes(searchValAdvanced.claimant ? searchValAdvanced.claimant?.toLowerCase() : '')) &&
                                                            (row.employer?.toLowerCase().includes(searchValAdvanced.employer ? searchValAdvanced.employer?.toLowerCase() : '')) &&
                                                            (row.claimNumber?.toLowerCase().includes(searchValAdvanced.claimNumber ? searchValAdvanced.claimNumber?.toLowerCase() : '')) &&
                                                            (row.adjusterBeaver?.toLowerCase().includes(searchValAdvanced.adjuster ? searchValAdvanced.adjuster?.toLowerCase() : '')) &&
                                                            (row.adjusterClient?.toLowerCase().includes(searchValAdvanced.client ? searchValAdvanced.client?.toLowerCase() : '')) &&
                                                            (row.referralStatus?.toLowerCase().includes(searchValAdvanced.referralStatus ? searchValAdvanced.referralStatus?.toLowerCase() : '')) &&
                                                            (row.ptStatus?.toLowerCase().includes(searchValAdvanced.ptStatus ? searchValAdvanced.ptStatus?.toLowerCase() : '')) &&
                                                            (row.billingStatus?.toLowerCase().includes(searchValAdvanced.billingStatus ? searchValAdvanced.billingStatus?.toLowerCase() : '')) &&
                                                            (row.therapistBeaver?.toLowerCase().includes(searchValAdvanced.therapist ? searchValAdvanced.therapist?.toLowerCase() : ''))
                                                          );
                                                        }
                                                        else {
                                                          return [];
                                                        }
                                                        // if (searchValAdvanced.claimant === '') {
                                                        //   return (
                                                        //     // row.assign === searchValAdvanced.assign ||
                                                        //     // row.service === searchValAdvanced.service ||
                                                        //     []
                                                            
                                                        //   );
                                                        // }
                                                        // else{
                                                        //   return row.claimant?.toLowerCase().includes(searchValAdvanced.claimant?.toLowerCase());
                                                        // }
                                                    });

    // console.log(rowsFiltered);

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
        />
        }
        </>
    );
}