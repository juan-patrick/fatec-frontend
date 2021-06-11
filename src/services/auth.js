import api from './api';

export const TOKEN_KEY = '@fatec-Token';

export const USER = '@fatec-User';
export const PERMISSION = '@fatec-Perm';

export const isAuthenticated = (permission) => {
  console.log(permission);
  if (localStorage.getItem(TOKEN_KEY) !== null) {
    if (localStorage.getItem(PERMISSION) < permission) {
      return 'access';
    }
    return 'auth';
  }

  return false;
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUser = () => localStorage.getItem(USER);
export const getPerm = () => localStorage.getItem(PERMISSION);
export const setPerm = (perm) => localStorage.setItem(PERMISSION, perm);

export const login = (token, userEmail, perm) => {
  localStorage.setItem(USER, userEmail);
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(PERMISSION, perm);
};

export const logout = async () => {
  api
    .delete('/logout')
    .then((response) => {
      localStorage.clear();
    })
    .catch((error) => {
      localStorage.clear();
    });
};
