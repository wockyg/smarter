import useGetReminders from '../hooks/useGetReminders';
import ReferralTable from '../table-components/ReferralTable';
import Skeleton from '@mui/material/Skeleton';

const headCellsCC = [
  {
    id: 'service',
    numeric: false,
    disablePadding: false,
    label: 'Service',
  },
  {
    id: 'bodyPart',
    numeric: false,
    disablePadding: false,
    label: 'BodyPart',
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
    id: 'reminderDate',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'reminderNote',
    numeric: false,
    disablePadding: false,
    label: 'Note',
  },
];

const headCellsAdmin = [
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
    id: 'bodyPart',
    numeric: false,
    disablePadding: false,
    label: 'BodyPart',
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
    id: 'reminderDate',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'reminderNote',
    numeric: false,
    disablePadding: false,
    label: 'Note',
  },
];

export default function RemindersTable(props) {

    const initialSort = 'reminderDate';

    const {cc, ccRows} = props;

    const rowsFiltered = ccRows?.filter((row) => (new Date (row.reminderDate) > new Date('2023-11-10')));

    return (
        <>
        {ccRows ?
        <ReferralTable
        headCells={cc ? headCellsCC : headCellsAdmin}
        rows={rowsFiltered}
        initialSort={initialSort}
        initialSortOrder='asc'
        title='Reminders'
        cc={cc}
        />
        :
        <Skeleton variant="rectangular" width='100%' height={475} />
        }
        </>
    );
}