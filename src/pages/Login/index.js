import React, { useState, useEffect } from 'react';

import {
  Container,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Typography,
  CircularProgress,
  Backdrop,
} from '@material-ui/core';

import { login } from '../../services/auth';

import { LockOutlined } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

import api from '../../services/api';

import validate from 'validate.js';

import { useSnackbar } from 'notistack';

export default function Login(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { history } = props;

  const [loading, setLoading] = useState(false);

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  useEffect(() => {
    const errors = validate(formState.values, validator);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const classes = useStyles();

  document.title = 'Login | FATEC Ferraz System';

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    await api
      .post('/login/signIn', {
        emailUsuario: formState.values.username,
        senhaUsuario: formState.values.password,
      })
      .then(({ data }) => {
        login(data.updatedToken, data.nome, data.permissao);
        history.push('/');
      })
      .catch(({ response }) => {
        setLoading(false);
        enqueueSnackbar(
          response.data.error || 'Erro ao conectar com a aplicação.',
          { variant: 'error' }
        );
      });
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          FATEC Ferraz System
        </Typography>
        <Typography component="h5" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuário"
            name="username"
            autoFocus
            value={formState.values.username || ''}
            onChange={handleChange}
            autoComplete="username"
            error={hasError('username')}
            helperText={
              hasError('username') ? formState.errors.username[0] : null
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            value={formState.values.password || ''}
            onChange={handleChange}
            autoComplete="current-password"
            error={hasError('password')}
            helperText={
              hasError('password') ? formState.errors.password[0] : null
            }
          />
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            disabled={!formState.isValid}
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </Paper>

      <Backdrop open={loading} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    padding: theme.spacing(3),
    flexDirection: 'column',
    alignItems: 'center',
    width: '400px',
    backgroundColor: theme.palette.background.default,
  },
  main: {
    minWidth: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validator = {
  username: {
    presence: {
      allowEmpty: false,
      message: '^O usuário é necessário para fazer login.',
    },
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: '^A senha é necessária para fazer login.',
    },
    length: {
      maximum: 128,
    },
  },
};
