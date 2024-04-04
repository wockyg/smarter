import useGetV1500Uploads from '../hooks/useGetV1500Uploads';
import useGetV1500RowsNotApproved from '../hooks/useGetV1500RowsNotApproved';
import useGetV1500NotApproved from '../hooks/useGetV1500NotApproved';
import ReferralTable from '../table-components/ReferralTable';
import V1500UploadsTable from '../claim-info/V1500UploadsTable';

const headCells = [
  {
    id: 'v1500Id',
    numeric: false,
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'original_filename',
    numeric: false,
    disablePadding: false,
    label: 'Filename',
  },
  {
    id: 'dateAdded',
    numeric: false,
    disablePadding: false,
    label: 'Uploaded',
  },  
  {
    id: 'uploadNanonetsStatus',
    numeric: false,
    disablePadding: false,
    label: 'NN-U',
  },  
  {
    id: 'extractionStatus',
    numeric: false,
    disablePadding: false,
    label: 'NN-E',
  }, 
  {
    id: 'uploadSmarterStatus',
    numeric: false,
    disablePadding: false,
    label: 'SM-U',
  },  
  {
    id: 'fileMoveStatus',
    numeric: false,
    disablePadding: false,
    label: 'GD-U',
  },  

];

export default function V1500Uploads(props) {

    const initialSort = 'dateAdded';

    const { status: statusUploads, data: uploads, error: errorUploads, isFetching: isFetchingUploads } = useGetV1500Uploads();

    // console.log(uploads);

    const rowsSorted = uploads?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]));

    return (
        <>
        {uploads &&
        <V1500UploadsTable
        headCells={headCells}
        rows={rowsSorted}
        // type='uploads'
        // title='V1500 Uploads'
        />
        }
        </>
    );
}