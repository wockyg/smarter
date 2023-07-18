import useGetMissingV1500 from '../hooks/useGetMisingV1500';
import ReferralTable from '../table-components/ReferralTable';

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
    id: 'therapistDisplay',
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

    const initialSort = 'claimant';

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetMissingV1500();

    const rowsFiltered = rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]));

    return (
        <>
        {rows &&
        <ReferralTable
        headCells={headCells}
        rows={rowsFiltered}
        type='bil'
        title='Missing V1500'
        />
        }
        </>
    );
}