import ReferralTable from '../table-components/ReferralTable';
import Skeleton from '@mui/material/Skeleton';
import useGetLastNote14Days from '../hooks/useGetLastNote14Days'


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
    id: 'lastNote',
    numeric: false,
    disablePadding: false,
    label: 'Last Note',
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

export default function LastNote14DaysTable(props) {

    const initialSort = 'lastNote';

    const {cc, ccRows} = props;

    // const rowsFiltered = ccRows?.filter((row) => (cc ? row.assign === 'SS' : true));

    // console.log(superLate);

    return (
        ccRows ?
        <ReferralTable
        headCells={cc ? headCellsCC : headCellsAdmin}
        rows={ccRows}
        initialSort={initialSort}
        initialSortOrder='desc'
        title='14 Days'
        cc={cc}
        />
        :
        <Skeleton variant="rectangular" width='100%' height={475} />
        
    );
}