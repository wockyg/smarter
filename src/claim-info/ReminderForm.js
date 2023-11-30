import useGetReferralNotes from '../hooks/useGetReferralNotes';
import useUpdateReferral from '../hooks/useUpdateReferral';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AddBoxIcon from '@mui/icons-material/AddBox';
import { useState } from 'react';

import { careCoordinators } from '../lookup-tables/lookup_careCoordinators';


export default function ReminderForm(props) {

    const { selectedClaim, page, setPage } = props;

    const [form, setForm] = useState({reminderDate: selectedClaim.reminderDate || null, reminderNote: selectedClaim.reminderNote || null});
    const [dialogOpen, setDialogOpen] = useState(false);

    const referralUpdate = useUpdateReferral();

    const { status: statusReferralNotes, data: referralNotes, error: errorReferralNotes, isFetching: isFetchingReferralNotes } = useGetReferralNotes(selectedClaim?.referralId);

    const handlSubmitForm = () => {
      console.log("Submit form...")
      const values = {referralId: selectedClaim.referralId, ...form};
      if (values.reminderDate && values.reminderDate !== '' && values.reminderNote && values.reminderNote !== '' && (values.reminderDate !== selectedClaim.reminderDate || values.reminderNote !== selectedClaim.reminderNote)) {
        referralUpdate.mutate(values);
        referralUpdate.isSuccess && handleOpenDialog();
      }
    };

    const handleUpdateForm = (e, key) => {
      setForm({...form, [key]: e.target.value});
    };

        const handleOpenDialog = (event) => {
        console.log("Open Dialog");
        setDialogOpen(true);
    };

    const handleCloseDialog = (event) => {
        console.log("Close Dialog");
        setDialogOpen(false);
    };

    return(
        selectedClaim?.referralId &&

        <TableContainer component={Paper}>
          Reminder
            <Table size="small" aria-label="add ReferralNote table">
            <TableBody>
                <TableRow>
                    <TableCell>
                      <TextField
                      type='date'
                      // fullWidth
                      margin="dense"
                      id="reminderDate"
                      name="reminderDate"
                      // label="Start Date"
                      value={form.reminderDate || ''}
                      onChange={(e) => handleUpdateForm(e, 'reminderDate')}
                      // variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                      fullWidth
                      multiline
                      rows={4}
                      margin="dense"
                      id="reminderNote"
                      name="reminderNote"
                      label="Note"
                      value={form.reminderNote || ''}
                      onChange={(e) => handleUpdateForm(e, 'reminderNote')}
                      // variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant='contained' onClick={() => handlSubmitForm()}>
                        {selectedClaim.reminderNote ? 'Update' : 'Add'}
                        {/* <AddBoxIcon sx={{cursor: "pointer"}} /> */}
                      </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
            </Table>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>
                  Reminder Successfully {selectedClaim.reminderDate ? 'Updated' : 'Added'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Ok</Button>
                </DialogActions>
            </Dialog>
        </TableContainer>

    );
}