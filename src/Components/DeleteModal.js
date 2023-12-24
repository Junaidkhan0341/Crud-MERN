import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReactComponent as DeleteIcon } from '../Assets/delete.svg';

const DeleteModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center', position: 'relative', padding: '60px 0 0 0' }}>
        <IconButton
          style={{ position: 'absolute', top: '7px', right: '10px' }}
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <IconButton color="secondary" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: '20px 20px' }}>
        <DialogContentText id="alert-dialog-description" sx={{ textAlign: 'center', width: '360px', padding: '10px' }}>
          <h4 style={{ fontFamily: 'Lato-SemiBold', fontSize: '20px', margin: '5px' }}>
            Are you sure?
          </h4>
          <span style={{ fontFamily: 'Lato-Regular', fontSize: '17px' }}>
            Do you really want to delete this customer? This process cannot be undone.
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <Button
          onClick={onClose}
          color="primary"
          sx={{
            width: '150px',
            backgroundColor: '#A5A5AF',
            color: 'white',
            padding: '10px',
            borderRadius: '10px',
            '&:hover': { backgroundColor: '#A5A5AF' },
            '&:focus': { backgroundColor: '#A5A5AF' },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="secondary"
          autoFocus
          sx={{
            width: '150px',
            backgroundColor: '#D80000',
            color: 'white',
            padding: '10px',
            borderRadius: '10px',
            '&:hover': { backgroundColor: '#D80000' },
            '&:focus': { backgroundColor: '#D80000' },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
