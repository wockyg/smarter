import { useContext } from 'react';
import useGetRecordsRequest from '../hooks/useGetRecordsRequest';
import ReferralTable from '../table-components/ReferralTable';
import Skeleton from '@mui/material/Skeleton';
import { RecordsRequestContext } from '../contexts/RecordsRequestContext';

const headCells = [
  {
    id: 'assign',
    numeric: false,
    disablePadding: false,
    label: 'CC',
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
    id: 'bodyPart',
    numeric: false,
    disablePadding: false,
    label: 'BodyPart',
  },
  {
    id: 'therapistBeaver',
    numeric: false,
    disablePadding: false,
    label: 'Therapist',
  },
  {
    id: 'therapistPhone',
    numeric: false,
    disablePadding: false,
    label: 'Phone',
  },
  {
    id: 'therapistFax',
    numeric: false,
    disablePadding: false,
    label: 'Fax',
  },
  {
    id: 'numMissingAttendance',
    numeric: false,
    disablePadding: false,
    label: 'ATT',
  },
  {
    id: 'needUca',
    numeric: false,
    disablePadding: false,
    label: 'UCA',
  },
  {
    id: 'needPn',
    numeric: false,
    disablePadding: false,
    label: 'PN',
  },
  {
    id: 'needDc',
    numeric: false,
    disablePadding: false,
    label: 'DC',
  },
  {
    id: 'eoa',
    numeric: false,
    disablePadding: false,
    label: 'EOA',
  },
  {
    id: 'worked',
    numeric: false,
    disablePadding: false,
    label: 'Worked',
  },
  {
    id: 'workedPrev',
    numeric: false,
    disablePadding: false,
    label: 'Last Letter',
  },
];

export default function RecordsRequestTable(props) {

    const initialSort = 'therapistBeaver';
    const secondSort = 'claimant';

    const {filter, handleFilter, preference, handlePreference, ascending} = props;

    const { therapistSearchVal } = useContext(RecordsRequestContext);

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetRecordsRequest();

    const rowsSorted = rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]) || -b[secondSort]?.localeCompare(a[secondSort]));

    const rowsFiltered = rowsSorted?.filter(row => {
      if (filter === 'tbw') {
        return row.worked === null;
      }
      if (filter === 'worked') {
        return row.worked !== null && row.worked !== 'FU/H' && row.worked !== "Caught Up";
      }
      if (filter === 'fuh') {
        return row.worked === 'FU/H';
      }
      if (filter === 'cu') {
        return row.worked === "Caught Up";
      }
      else {
        return row;
      }
    });

    const rowsFiltered2 = rowsFiltered?.filter(row => {
      
      if (preference === 'fax') {
        return (row.rrPreference === 'Fax' || row.rrPreference === null);
      }
      if (preference === 'phone') {
        return row.rrPreference === 'Phone';
      }
      if (preference === 'email') {
        return row.rrPreference === 'Email';
      }
      else {
        return row;
      }
    });

    const rowsFiltered3 = rowsFiltered2?.filter(row => {
      
      if (therapistSearchVal !== '') {
        return (row.therapistBeaver.toLowerCase().includes(therapistSearchVal.toLowerCase()));
      }
      else {
        return row;
      }
    });

    // console.log(rows);
    // console.log(rowsSorted);
    // console.log(rowsFiltered);
    // console.log(rowsFiltered2);

    return (
        <>
        {ascending}
        {rows ?
        <ReferralTable
        headCells={headCells}
        rows={rowsFiltered3}
        initialSort={initialSort}
        initialSortOrder={ascending ? 'asc' : 'desc'}
        title='RecordsRequest'
        bulkEdit={true}
        type='rr'
        preference={preference}
        handlePreference={handlePreference}
        filter={filter}
        handleFilter={handleFilter}
        />
        :
        <Skeleton variant="rectangular" width='100%' height={475} />
        }
        </>
    );
}