import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function SnackBarComp(props) {
  return (
    <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
    <Alert
      onClose={props.handleClose}
      severity={props.severity}
      variant="filled"
      sx={{ width: '100%' }}
    >
      {props.message}
    </Alert>
  </Snackbar>
  )
}

export default SnackBarComp