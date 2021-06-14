import { useState, useEffect, useRef } from 'react';

import { Route, Redirect, useHistory } from 'react-router-dom';

import { Backdrop, CircularProgress } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { useSnackbar } from 'notistack';

import { setPerm } from '../../services/auth';

import api from '../../services/api';

import axios from 'axios';

const CancelToken = axios.CancelToken;

function PrivateRoute(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const { component: Component, permission, ...rest } = props;
  const cancelSource = useRef(null);

  const history = useHistory();
  useEffect(() => {
    cancelSource.current = CancelToken.source();

    api
      .get('/sessions/check', {
        cancelToken: cancelSource.current.token,
      })
      .then(({ data }) => {
        setPerm(data.perm);
        setIsAuthenticated(data.auth);
        setLoading(false);
        if (data.perm < permission) {
          enqueueSnackbar('Você não tem permissão para acessar essa página.', {
            variant: 'error',
          });
          history.push('/');
        }
      })
      .catch((err) => {
        enqueueSnackbar('Você não está autenticado, faça o login.', {
          variant: 'error',
        });
        history.push('/login');
      });
    return () => {
      cancelSource.current.cancel();
    };
  }, [enqueueSnackbar, history, permission]);

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? (
          <Component {...props} />
        ) : loading ? (
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    backgroundColor: theme.palette.primary.contrastText,
    zIndex: theme.zIndex.drawer + 1,
    color: '#000',
  },
}));

export default PrivateRoute;
