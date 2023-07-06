import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { AddFormContext } from '../contexts/AddFormContext';
import AddFormController from '../add-forms/AddFormController';
import Grid from '@mui/material/Grid';

const style = {
  position: 'absolute',
  // marginTop: '100px',
  // marginLeft: '400px',
  // marginRight: '400px',
  top: '2%',
  left: '20%',
  overflowY: 'scroll',
  // transform: 'translate(-20%, -20%)',
  width: 1100,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: 900,
};

export default function AddFormModal() {

  const { addModalOpen, setAddModalOpen, modalParty, setModalParty } = useContext(AddFormContext);

  const handleModalClose = (event, reason) => {
    if (reason !== 'backdropClick') {
        setAddModalOpen(false);
        setModalParty('');
    }};

  return (
    <div>
      <Modal
        disableEscapeKeyDown
        open={addModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-adjuster-add"
      >
      <>
        <Box sx={style}>
          <Grid container spacing={0.5}>
            <Grid item xs={11}>
             <h2>Add new {modalParty}</h2>
            </Grid>
            <Grid item xs={1}>
              <button onClick={handleModalClose}>x</button>
            </Grid>
          </Grid>
            <AddFormController />
        </Box>
      </>
      </Modal>
    </div>
  );
}