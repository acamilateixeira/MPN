import { Snackbar } from '@material-ui/core';
import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@material-ui/lab';

export interface PopUpAlertProps {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

function Alert(props: MuiAlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export function PopUpAlert({ isOpen, message, type, onClose }: PopUpAlertProps) {
  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
}
