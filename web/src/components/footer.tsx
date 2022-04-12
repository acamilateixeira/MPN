import { Box, Link, Typography } from '@material-ui/core';

export function Footer() {
  return (
    <Box
      pt={4}
      style={{
        justifyContent: 'center',
        position: 'relative',
        bottom: 0,
        top: 'auto',
      }}
    >
      <Typography variant='body2' color='textSecondary' align='center'>
        <img
          src='/static/images/mini.png'
          alt='logo'
          style={{
            width: '50px',
            height: '50px',
          }}
        />
      </Typography>

      <Typography variant='body2' color='textSecondary' align='center'>
        {'Copyright © '}

        <Link color='inherit' href='https://www.instagram.com/acamilateixeiraa'>
          ClubXTech - Desenvolvimento de Software
        </Link>

        {` ${new Date().getFullYear()}.`}
      </Typography>
    </Box>
  );
}
