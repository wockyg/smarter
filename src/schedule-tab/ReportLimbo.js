import useGetReferralsReportLimbo from '../hooks/useGetReferralsReportLimbo';
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

export default function ReportLimbo(props) {

    const initialSort = 'apptDate';

    const { status: statusReferrals, data: rows, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferralsReportLimbo();

    // const rowsFiltered = rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]))
    //                           .filter((row) => {
    //                             return (

    //                                 row.confirmAttend === 'Yes' &&
    //                                 row.reportReceivedDate !== null &&
    //                                 (row.reportToAdjuster === null ||
    //                                 row.reportToPhysician === null)
    //                             );});

    return (
        <>
        {rows &&
        <ReferralTable
        headCells={headCells}
        rows={rows}
        />
        }
        </>
    );
}