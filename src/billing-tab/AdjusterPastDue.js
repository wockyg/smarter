import useGetAdjusterPastDue from '../hooks/useGetAdjusterPastDue';
import ReferralTable from '../table-components/ReferralTable';

const headCells = [
  {
    id: 'service',
    numeric: false,
    disablePadding: false,
    label: 'Service',
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
    id: 'bodyPart',
    numeric: false,
    disablePadding: false,
    label: 'BodyPart',
  },
  {
    id: 'dos',
    numeric: false,
    disablePadding: false,
    label: 'DOS',
  },
  {
    id: 'd1500Sent',
    numeric: false,
    disablePadding: false,
    label: 'D1500',
  },
  {
    id: 'd1500SendFormat',
    numeric: false,
    disablePadding: false,
    label: 'Format',
  },
  {
    id: 'adjusterDateDueFormula',
    numeric: false,
    disablePadding: false,
    label: 'Adj.Due',
  },
  {
    id: 'paymentStatus',
    numeric: false,
    disablePadding: false,
    label: 'Pmt.Status',
  },
  {
    id: 'paymentStatusDate',
    numeric: false,
    disablePadding: false,
    label: 'Pmt.StatusDate',
  },
  {
    id: 'dateRebilled',
    numeric: false,
    disablePadding: false,
    label: 'Rebill Date',
  },
  {
    id: 'rebillFormat',
    numeric: false,
    disablePadding: false,
    label: 'Format',
  },
  {
    id: 'adjusterRate',
    numeric: false,
    disablePadding: false,
    label: 'Adj.Rate',
  },
  {
    id: 'adjusterDatePaid',
    numeric: false,
    disablePadding: false,
    label: 'Adj.Paid',
  },
  {
    id: 'adjusterAmountPaid',
    numeric: false,
    disablePadding: false,
    label: 'Amt',
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
];

export default function AdjusterPastDue(props) {

    const initialSort = 'claimant';

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetAdjusterPastDue();

    const rowsFiltered = rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]));

    return (
        <>
        {rows &&
        <ReferralTable
        headCells={headCells}
        rows={rowsFiltered}
        type='bil'
        />
        }
        </>
    );
}