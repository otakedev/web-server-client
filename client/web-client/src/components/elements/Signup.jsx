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

export const Signup = ({ setIsConnected }) => {
  const classes = useStyles();

  const {
    register, handleSubmit, errors,
  } = useForm();
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorText, setErrorText] = useState('Une erreur est survenue lors de l\'inscription');

  const { mutate: postSignup } = useMutate({
    verb: 'POST',
    path: '/api/v0/auth/signup',
  });

  const history = useHistory();
  const buildRequestBody = (data) => {
    const body = {
      username: data.username,
      password: data.password,
    };
    postSignup(body).then((res) => {
      if (res.access_token) {
        localStorage.setItem('auth_token', res.access_token);
        setOpen(true);
        setIsConnected(true);
        setTimeout(() => {
          history.push('/');
        }, 1500);
      }
    }).catch((err) => {
      if (err.status === 400) {
        setErrorText(err.data.message);
      } else {
        setErrorText('Une erreur est survenue lors de l\'inscription');
      }
      setErrorOpen(true);
    });
  };

  return (
    <div>
      <h1>S&apos;inscrire</h1>
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
      <Alert open={open} setOpen={setOpen} text="Votre compte a été créé. Redirection ..." color="#2e7d32" />
      <Alert open={errorOpen} setOpen={setErrorOpen} text={errorText} color="#f55b5b" />
    </div>
  );
};

Signup.propTypes = {
  setIsConnected: PropTypes.func,
};

Signup.defaultProps = {
  setIsConnected: null,
};
