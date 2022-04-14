import { Backdrop, CircularProgress, Grid } from '@material-ui/core';

interface LoadingProps {
  loading: boolean;
}

export function Loading({ loading }: LoadingProps) {
  return (
    <Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
      <Grid item xs={12}>
        <Backdrop
          open={loading}
          style={{
            zIndex: 1,
            color: '#fff',
          }}
        >
          <CircularProgress size={100} />
          <img
            src='/static/images/mini.png'
            alt='Loading'
            style={{
              width: '50px',
              height: '50px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Backdrop>
      </Grid>
    </Grid>
  );
}
