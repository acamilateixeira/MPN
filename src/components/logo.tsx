import { createStyles, makeStyles, Typography } from '@material-ui/core';

export function Logo() {
  const css = makeStyles(() =>
    createStyles({
      titulo: {
        WebkitTextFillColor: 'transparent',
        fontWeight: 800,
        background: '#4D77FF',
        WebkitBackgroundClip: 'text',
        fontSize: 30,
        padding: '0px 10px',
        margin: 0,
      },
    })
  )();

  return (
    <Typography className={css.titulo} variant='h5'>
      MPN - Meu Pequeno Negócio
    </Typography>
  );
}
