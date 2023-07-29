import useGetReferralNotes from '../hooks/useGetReferralNotes';
import useAddReferralNote from '../hooks/useAddReferralNote';
import useDeleteReferralNote from '../hooks/useDeleteReferralNote';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import AddBoxIcon from '@mui/icons-material/AddBox';
import { useState } from 'react';

import { careCoordinators } from '../lookup-tables/lookup_careCoordinators';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function ReferralNotes(props) {

    const { selectedClaim, page, setPage } = props;

    const [newNote, setNewNote] = useState();
    
    const inits = careCoordinators.map((row) => row.Initials);
    inits.push('KS', 'SM');

    const mutationAdd = useAddReferralNote();
    const mutationDelete = useDeleteReferralNote();
    
    const { status: statusReferralNotes, data: referralNotes, error: errorReferralNotes, isFetching: isFetchingReferralNotes } = useGetReferralNotes(selectedClaim?.referralId);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleAddNote = () => {
      let note;
      if (newNote?.note && newNote.note.includes('*')) {
        note = {...newNote, flag: 'Important', referralId: selectedClaim.referralId};
      }
      else {
        note = {...newNote, referralId: selectedClaim.referralId};
      }
      if (note?.referralId && note?.note && note?.initials) {
        console.log(note);
        mutationAdd.mutate(note);
        setNewNote({});
      }
    };

    const handleChangeNote = (e, key) => {
      setNewNote({...newNote, [key]: e.target.value});
    };

    return(
        <>  
        {selectedClaim?.referralId &&
        <>
        <TableContainer component={Paper}>
            <Table size="small" aria-label="add ReferralNote table">
            <TableBody>
                <TableRow>
                    <TableCell />
                    <TableCell>
                      <select 
                      name="initials" 
                      value={newNote?.initials ? newNote.initials : ""} 
                      onChange={(event) => handleChangeNote(event, 'initials')}
                      >
                        <option value="">--</option>
                        {inits.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </TableCell>
                    <TableCell>
                      <textarea
                      name="note" 
                      value={newNote?.note ? newNote.note : ""} 
                      onChange={(event) => handleChangeNote(event, 'note')}
                      />
                    </TableCell>
                    <TableCell>
                      <AddBoxIcon sx={{cursor: "pointer"}} onClick={() => handleAddNote()} />
                    </TableCell>
                </TableRow>
            </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper} sx={{height: 350}}>
            <Table size="small" aria-label="referralNotes table">
              <TableBody>
                {referralNotes?.length > 0 && stableSort(referralNotes, getComparator('desc', 'timestamp')).map((row) => (
                <TableRow sx={{backgroundColor: row.flag === 'Important' && '#F5B7B1'}} key={row.noteId}>
                    <TableCell sx={{border: 1}} align="left">{row.timestampFormat}</TableCell>
                    <TableCell sx={{border: 1}} align="left">{row.initials}</TableCell>
                    <TableCell sx={{border: 1}} align="left">{row.note}</TableCell>
                    <TableCell align="left">
                    <button 
                    onClick={() => {
                        mutationDelete.mutate({ noteId: `${row.noteId}` });
                    }}
                    variant="outlined">x</button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        {/* {referralNotes?.length > 0 && 
        <TablePagination
        component="div"
        count={referralNotes?.length ? referralNotes?.length : 0}
        rowsPerPageOptions={[]}
        rowsPerPage={3}
        page={page}
        onPageChange={handleChangePage}
        />} */}
        </>
        }
        </>
    );
}