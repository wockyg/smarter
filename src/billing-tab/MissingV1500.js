import useGetMissingV1500 from '../hooks/useGetMisingV1500';
import MissingV1500Table from '../table-components/MissingV1500Table';

const headCells = [
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
    id: 'therapistDisplayShort',
    numeric: false,
    disablePadding: false,
    label: 'Therapist',
  },
  {
    id: 'dos',
    numeric: false,
    disablePadding: false,
    label: 'DOS',
  },
  {
    id: 'notesReceived',
    numeric: false,
    disablePadding: false,
    label: 'Notes',
  },
  {
    id: 'v1500',
    numeric: false,
    disablePadding: false,
    label: 'V1500',
  },
  {
    id: 'v1500LastRequested',
    numeric: false,
    disablePadding: false,
    label: 'V1500 Req',
  },
  {
    id: 'v1500Status',
    numeric: false,
    disablePadding: false,
    label: 'V1500 Status',
  },
];

export default function MissingV1500(props) {

    const initialSort = 'therapistDisplayShort';
    const secondSort = 'claimant';

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetMissingV1500();

    const rowsFiltered = rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]) || -b[secondSort]?.localeCompare(a[secondSort]));

    return (
        <>
        {rows &&
        <MissingV1500Table
        headCells={headCells}
        rows={rowsFiltered}
        title='Missing V1500'
        // initialSort='therapistDisplayShort'
        />
        }
        </>
    );
}