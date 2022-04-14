import '@fontsource/alata';

import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core';

export function Logo() {
  const css = makeStyles(() =>
    createStyles({
      titulo: {
        WebkitTextFillColor: 'transparent',
        fontWeight: 800,
        background: '#233DFF',
        WebkitBackgroundClip: 'text',
        fontSize: 30,
        padding: '0px 10px',
        margin: 0,
        fontFamily: 'Alata',
      },
    })
  )();

  return (
    <>
      <Grid container alignItems='center' justifyContent='center'>
        <Grid
          item
          xs={5}
          style={{
            textAlign: 'right',
          }}
        >
          <img
            src='/static/images/x.png'
            alt='logo'
            style={{
              width: '50px',
              height: '50px',
            }}
          />
        </Grid>

        <Grid
          item
          xs={7}
          style={{
            textAlign: 'left',
          }}
        >
          <Typography className={css.titulo} variant='h5'>
            Calendar
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
