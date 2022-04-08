import { Button, Container, createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import { useFormik } from 'formik';
import { useState } from 'react';

import { PopUpAlert } from '../components/popUpAlert';
import { useAuth } from '../hooks/useAuth';

export function Entrar() {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'info' | 'error'>('success');

  const css = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      },
      form: {
        width: '100%',
        maxWidth: '300px',
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    })
  )();

  const { signIn } = useAuth();

  const { getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async values => {
      if (values.username === '') {
        setAlertMessage('Informe seu nome de usuário');
        setAlertType('error');
        setAlertIsOpen(true);
      } else if (values.password === '') {
        setAlertMessage('Informe sua senha');
        setAlertType('error');
        setAlertIsOpen(true);
      } else {
        const { success, message } = await signIn({
          password: values.password,
          username: values.username,
          codEmpresa: 1,
        });

        setAlertMessage(message);
        setAlertType(success ? 'success' : 'error');
        setAlertIsOpen(true);
      }
    },
  });

  return (
    <>
      <PopUpAlert
        message={alertMessage}
        isOpen={alertIsOpen}
        type={alertType}
        onClose={() => setAlertIsOpen(false)}
      />

      <Container component='main' maxWidth='xs' className={css.root}>
        <div className={css.form}>
          <form itemID='signInForm' noValidate onSubmit={handleSubmit}>
            <TextField
              size='small'
              variant='outlined'
              margin='normal'
              fullWidth
              label='Usuário'
              {...getFieldProps('username')}
            />
            <TextField
              size='small'
              variant='outlined'
              margin='normal'
              fullWidth
              label='Senha'
              type='password'
              {...getFieldProps('password')}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={css.submit}
            >
              Entrar
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}
