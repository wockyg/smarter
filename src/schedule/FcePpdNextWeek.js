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
    id: 'claimantPhone',
    numeric: false,
    disablePadding: false,
    label: 'ClaimantPhone',
  },
  {
    id: 'therapistDisplay',
    numeric: false,
    disablePadding: false,
    label: 'Therapist',
  },
  {
    id: 'claimantConfirmDayBefore',
    numeric: false,
    disablePadding: false,
    label: 'Claimant DB',
  },
  {
    id: 'ptConfirmDayBefore',
    numeric: false,
    disablePadding: false,
    label: 'PT DB',
  },
];

export default function FcePpdNextWeek(props) {

    const initialSort = 'apptDate';

    const {cc, ccRows} = props;

    

    return (
        <>
        {ccRows ?
        <ReferralTable
        headCells={headCells}
        rows={ccRows}
        initialSort={initialSort}
        initialSortOrder='asc'
        title='FCE PPD Next Week'
        cc={cc}
        />
        :
        <Skeleton variant="rectangular" width='100%' height={475} />
        }
        </>
    );
}