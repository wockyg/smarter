import { useContext } from 'react';
import useGetReferralsSearchAll from '../hooks/useGetReferralsSearchAll';
import SearchTable from '../search/SearchTable';
import ReferralTable from '../table-components/ReferralTable';

const headCells = [
  {
    id: 'reportToAdjuster',
    numeric: false,
    disablePadding: false,
    label: 'reportToAdj',
  },
  {
    id: 'assign',
    numeric: false,
    disablePadding: false,
    label: 'Assign',
    enableSearch: true,
    rank: 0
  },
  {
    id: 'service',
    numeric: false,
    disablePadding: false,
    label: 'Service',
    enableSearch: true,
    rank: 1
  },
  {
    id: 'claimant',
    numeric: false,
    disablePadding: false,
    label: 'Claimant',
    enableSearch: true,
    rank: 2
  },
  {
    id: 'claimNumber',
    numeric: false,
    disablePadding: false,
    label: 'Claim #',
    enableSearch: true,
    rank: 4
  },
  {
    id: 'adjuster',
    numeric: false,
    disablePadding: false,
    label: 'Adjuster',
    enableSearch: true
  },
  {
    id: 'adjusterClient',
    numeric: false,
    disablePadding: false,
    label: 'Client',
    enableSearch: true
  },
  {
    id: 'casemanager',
    numeric: false,
    disablePadding: false,
    label: 'Case Manager',
  },
  {
    id: 'employer',
    numeric: false,
    disablePadding: false,
    label: 'Employer',
    enableSearch: true,
    rank: 3
  },
];

const currentDate = new Date();
const year = currentDate.getFullYear();
const startDate = new Date(year, 0, 1);
const days = Math.floor(((currentDate - startDate) /
    (24 * 60 * 60 * 1000)) + 1);
 
const weekNumber = Math.ceil(days / 7);

export default function ReportsToAdjLastWeek(props) {

    const initialSort = 'reportToAdjuster';

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetReferralsSearchAll();

    const rowsFiltered = rows && rows?.filter((row) => {
                                                      const refDate = new Date(row?.reportToAdjuster);
                                                      const yearRef = refDate.getFullYear();
                                                      const startDate1 = new Date(refDate.getFullYear(), 0, 1);
                                                      const days1 = Math.floor(((refDate - startDate1) /
                                                          (24 * 60 * 60 * 1000)) + 1);
                                                      
                                                      const weekNumberRef = Math.ceil(days1 / 7);

                                                      return ((row.service.includes('FCE') || row.service.includes('PPD')) && weekNumberRef === (weekNumber - 1) && yearRef === year)
    });

    return (
      rows &&
        <ReferralTable
        // party='referral'
        rows={rowsFiltered}
        headCells={headCells}
        initialSort={initialSort}
        title="FCE to ADJ Last Week"
        />
    );
}