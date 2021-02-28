import { Button, TextField, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutate } from 'restful-react';
import PropTypes from 'prop-types';
import { Alert } from './Alert';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));

export const Connect = ({ setIsConnected }) => {
  const classes = useStyles();
  const {
    register, handleSubmit, errors,
  } = useForm();

  const [open, setOpen] = useState(false);
  const [wrongCredentialsOpen, setWrongCredentialsOpen] = useState(false);

  const { mutate: postLogin } = useMutate({
    verb: 'POST',
    path: '/api/v0/auth/login',
  });

  const history = useHistory();
  const buildRequestBody = (data) => {
    const body = {
      username: data.username,
      password: data.password,
    };
    postLogin(body).then((res) => {
      if (res.access_token) {
        localStorage.setItem('auth_token', res.access_token);
        setOpen(true);
        setIsConnected(true);
        setTimeout(() => {
          history.push('/');
        }, 1500);
      }
    }).catch(() => {
      setWrongCredentialsOpen(true);
    });
  };

  return (
    <div>
      <h1>Se connecter</h1>
      <form
        className={classes.form}
        onSubmit={handleSubmit(buildRequestBody)}
      >
        <TextField
          inputRef={register({
            required: {
              value: true,
              message: 'Ce champ est requis.',
            },
          })}
          name="username"
          variant="outlined"
          label="Nom d'utilisateur"
          error={!!errors.username}
          helperText={errors.username?.message}
          className={classes.input}
        />
        <TextField
          inputRef={register({
            required: {
              value: true,
              message: 'Ce champ est requis.',
            },
          })}
          name="password"
          type="password"
          variant="outlined"
          label="Mot de passe"
          error={!!errors.password}
          helperText={errors.password?.message}
          className={classes.input}
        />
        <Button type="submit" variant="contained" color="secondary">OK</Button>
      </form>
      <Alert open={open} setOpen={setOpen} text="Connecté avec succès. Redirection ..." color="#2e7d32" />
      <Alert open={wrongCredentialsOpen} setOpen={setWrongCredentialsOpen} text="Nom d'utilisateur ou mot de passe incorrect" color="#f55b5b" />
    </div>
  );
};

Connect.propTypes = {
  setIsConnected: PropTypes.func,
};

Connect.defaultProps = {
  setIsConnected: null,
};
