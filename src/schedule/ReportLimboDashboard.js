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
    id: 'service',
    numeric: false,
    disablePadding: false,
    label: 'Service',
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
    id: 'reportReceivedDate',
    numeric: false,
    disablePadding: false,
    label: `Report Rec'd`,
  },
  {
    id: 'fceApproved',
    numeric: false,
    disablePadding: false,
    label: 'FCEApproved',
  },
  {
    id: 'adjusterDisplay',
    numeric: false,
    disablePadding: false,
    label: 'Adjuster',
  },
  {
    id: 'reportToAdjuster',
    numeric: false,
    disablePadding: false,
    label: 'ReportToAdj',
  },
  {
    id: 'reportToAdjusterFormat',
    numeric: false,
    disablePadding: false,
    label: 'ReportToAdjFormat',
  },
  {
    id: 'physicianDisplay',
    numeric: false,
    disablePadding: false,
    label: 'Physician',
  },
  {
    id: 'reportToPhysician',
    numeric: false,
    disablePadding: false,
    label: 'ReportToPhys',
  },
  {
    id: 'reportToPhysicianFormat',
    numeric: false,
    disablePadding: false,
    label: 'ReportToPhysFormat',
  },
];

export default function ReportLimboDashboard(props) {

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
        title='Report Limbo Dashboard'
        cc={cc}
        />
        :
        <Skeleton variant="rectangular" width='100%' height={475} />
        }
        </>
    );
}