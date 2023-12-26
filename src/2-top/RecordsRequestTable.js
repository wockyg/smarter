import useGetRecordsRequest from '../hooks/useGetRecordsRequest';
import ReferralTable from '../table-components/ReferralTable';
import Skeleton from '@mui/material/Skeleton';

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
        return (row.rrFaxPreference !== null) || (row.rrFaxPreference === null && row.rrEmailPreference === null && row.rrPhonePreference === null);
      }
      if (preference === 'phone') {
        return row.rrPhonePreference !== null;
      }
      if (preference === 'email') {
        return row.rrEmailPreference !== null;
      }
      else {
        return row;
      }
    });

    // console.log(rowsFiltered2);

    return (
        <>
        {ascending}
        {rows ?
        <ReferralTable
        headCells={headCells}
        rows={rowsFiltered2}
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