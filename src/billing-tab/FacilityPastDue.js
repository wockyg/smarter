import useGetFacilityPastDue from '../hooks/useGetFacilityPastDue';
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
    id: 'v1500',
    numeric: false,
    disablePadding: false,
    label: 'V1500',
  },
  {
    id: 'facilityRate',
    numeric: false,
    disablePadding: false,
    label: 'PT.Rate',
  },
  {
    id: 'facilityDateDueFormula',
    numeric: false,
    disablePadding: false,
    label: 'PT.Due',
  },
  {
    id: 'facilityDatePaid',
    numeric: false,
    disablePadding: false,
    label: 'PT.Paid',
  },
  {
    id: 'facilityAmountPaid',
    numeric: false,
    disablePadding: false,
    label: 'Amt',
  },
  {
    id: 'checkNumber',
    numeric: false,
    disablePadding: false,
    label: 'Check#',
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

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetFacilityPastDue();

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