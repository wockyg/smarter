import useGetD1500NotApproved from '../hooks/useGetD1500NotApproved';
import useGetD1500RowsNotApproved from '../hooks/useGetD1500RowsNotApproved';
import useGetV1500RowsNotApproved from '../hooks/useGetV1500RowsNotApproved';
import useGetV1500NotApproved from '../hooks/useGetV1500NotApproved';
import ReferralTable from '../table-components/ReferralTable';

const headCells = [
  {
    id: 'v1500Id',
    numeric: false,
    disablePadding: false,
    label: 'ID',
  },
  // {
  //   id: 'service',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Service',
  // },
  {
    id: 'claimantUploadTable',
    numeric: false,
    disablePadding: false,
    label: 'Claimant',
  },
  // {
  //   id: 'original_dos',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'DOS',
  // },
  {
    id: 'v1500_filename_display',
    numeric: false,
    disablePadding: false,
    label: 'V1500 Filename',
  },
  {
    id: 'bodyPart',
    numeric: false,
    disablePadding: false,
    label: 'Body Part',
  },
  {
    id: 'claim_number',
    numeric: false,
    disablePadding: false,
    label: 'Claim #',
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
    id: 'dateAddedFormat',
    numeric: false,
    disablePadding: false,
    label: 'Uploaded',
  },  
//   {
//     id: 'therapistDisplayShort',
//     numeric: false,
//     disablePadding: false,
//     label: 'Therapist',
//   },
//   {
//     id: 'dos',
//     numeric: false,
//     disablePadding: false,
//     label: 'DOS',
//   },
//   {
//     id: 'v1500',
//     numeric: false,
//     disablePadding: false,
//     label: 'V1500',
//   },

];

export default function D1500NotApproved(props) {

    const initialSort = 'v1500Id';

    const { status: statusBills, data: bills, error: errorBills, isFetching: isFetchingBills } = useGetV1500NotApproved();
    const { status: statusCptRows, data: cptRows, error: errorCptRows, isFetching: isFetchingCptRows } = useGetV1500RowsNotApproved();

    // console.log(bills);

    const rowsSorted = bills?.sort((a, b) => -b[initialSort] > a[initialSort]);

    return (
        <>
        {bills && cptRows &&
        <ReferralTable
        headCells={headCells}
        rows={rowsSorted}
        cptRowsNotApproved={cptRows}
        type='hcfa'
        title='D1500 Not Approved'
        />
        }
        </>
    );
}