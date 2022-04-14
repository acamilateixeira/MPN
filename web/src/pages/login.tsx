import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  createStyles,
  Divider,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { useFormik } from 'formik';
import { useState } from 'react';
import { MdAddBusiness } from 'react-icons/md';

import { ModalLogin } from '../components/Auth/modalLogin';
import { Footer } from '../components/footer';
import { PopUpAlert } from '../components/popUpAlert';
import { useAuth } from '../hooks/useAuth';

export function Entrar() {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'info' | 'error'>('success');

  const [tipoAuth, setTipoAuth] = useState<'EMPRESA' | 'CLIENTE'>('CLIENTE');

  const [modalLogin, setModalLogin] = useState(true);

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
        maxWidth: '500px',
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
          tipoAuth: tipoAuth,
        });

        setAlertType(success ? 'success' : 'error');
        setAlertMessage(message);
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
        <Card className={css.form}>
          {tipoAuth === 'CLIENTE' ? (
            <>
              <CardHeader
                title='Entrar como cliente'
                avatar={
                  <Person
                    style={{
                      fontSize: '2rem',
                      color: '#4caf50',
                    }}
                  />
                }
              />

              <CardContent>
                <Button
                  onClick={() => setTipoAuth('EMPRESA')}
                  fullWidth
                  color='secondary'
                  variant='contained'
                  startIcon={<MdAddBusiness />}
                >
                  TROCAR PARA EMPRESA
                </Button>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader
                title='Entrar como empresa'
                avatar={
                  <MdAddBusiness
                    style={{
                      fontSize: '2rem',
                      color: '#4caf50',
                    }}
                  />
                }
              />

              <CardContent>
                <Button
                  onClick={() => setTipoAuth('CLIENTE')}
                  fullWidth
                  color='secondary'
                  variant='contained'
                  startIcon={<Person />}
                >
                  TROCAR PARA CLIENTE
                </Button>
              </CardContent>
            </>
          )}

          <Divider />

          <CardContent>
            <form onSubmit={handleSubmit} noValidate>
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
          </CardContent>
        </Card>

        <Footer />
      </Container>

      <ModalLogin
        isOpen={modalLogin}
        setTipoAuth={setTipoAuth}
        onClose={() => setModalLogin(false)}
      />

      <Footer />
    </>
  );
}
