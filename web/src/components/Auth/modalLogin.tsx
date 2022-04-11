import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
  setTipoAcesso: (tipoAcesso: 'EMPRESA' | 'CLIENTE') => void;
}

export function ModalLogin({ isOpen, onClose, setTipoAcesso }: ModalLoginProps) {
  return (
    <>
      <Dialog maxWidth='sm' fullWidth open={isOpen} onClose={onClose}>
        <DialogTitle>Como deseja acessar?</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} direction='column'>
            <Grid item xl={12} lg={12} md={12} sm={12}>
              <Button
                fullWidth
                color='secondary'
                variant='contained'
                onClick={() => {
                  setTipoAcesso('EMPRESA');
                  onClose();
                }}
              >
                EMPRESA
              </Button>
            </Grid>

            <Grid item xl={12} lg={12} md={12} sm={12}>
              <Button
                fullWidth
                type='submit'
                color='primary'
                variant='contained'
                onClick={() => {
                  setTipoAcesso('CLIENTE');
                  onClose();
                }}
              >
                CLIENTE
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
