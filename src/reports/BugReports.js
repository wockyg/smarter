import ReferralTable from '../table-components/ReferralTable';

import useGetBugReportsUnfixed from '../hooks/useGetBugReportsUnfixed'

const headCells = [
  {
    id: 'dateAdded',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Title',
    enableSearch: true,
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
    enableSearch: true,
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

export default function BugReports(props) {

    const initialSort = 'dateAdded';

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetBugReportsUnfixed();

    return (
      rows &&
        <ReferralTable
        rows={rows}
        headCells={headCells}
        initialSort={initialSort}
        title="Bug Reports"
        />
    );
}