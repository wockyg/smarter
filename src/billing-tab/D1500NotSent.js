import useGetD1500NotSent from '../hooks/useGetD1500NotSent';
import ReferralTable from '../table-components/ReferralTable';

const headCells = [
  {
    id: 'assign',
    numeric: false,
    disablePadding: false,
    label: 'CC',
  },
  {
    id: 'service',
    numeric: false,
    disablePadding: false,
    label: 'Service',
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
    id: 'claimNumber',
    numeric: false,
    disablePadding: false,
    label: 'Claim #',
  },
  {
    id: 'claimant',
    numeric: false,
    disablePadding: false,
    label: 'Claimant',
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
    id: 'serviceType',
    numeric: false,
    disablePadding: false,
    label: 'Type',
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
    id: 'd1500Sent',
    numeric: false,
    disablePadding: false,
    label: 'D1500',
    enableEdit: true,
    inputType: 'date',
    // inputWidth: '10ch'
  },
  {
    id: 'adjusterRate',
    numeric: false,
    disablePadding: false,
    label: 'Adj.Rate',
    enableEdit: true,
    inputType: 'text',
    inputWidth: '8ch'
  },
];

export default function D1500NotSent(props) {

    const initialSort = 'claimant';

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetD1500NotSent();

    const rowsFiltered = rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]));

    return (
        <>
        {rows &&
        <ReferralTable
        headCells={headCells}
        rows={rowsFiltered}
        type='bil'
        title='D1500 Not Sent'
        inlineEdit={true}
        bulkEdit={true}
        />
        }
        </>
    );
}