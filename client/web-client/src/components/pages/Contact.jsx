import {
  Button,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  contact_root: {
    margin: 'auto',
    width: '30%',
    textAlign: 'center',
    minWidth: '20em',
  },
  contact_form: {
    display: 'flex',
    flexDirection: 'column',
  },
  contact_input: {
    marginBottom: theme.spacing(2),
  },
}));

export function ContactForm() {
  const classes = useStyles();

  const {
    register, handleSubmit, errors,
  } = useForm();

  const onSubmit = (data) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        message: data.message,
      }),
    };

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v0/contact`, requestOptions).then(() => {});
  };

  return (
    <div className={classes.contact_root}>
      <h1>Contact</h1>
      <form className={classes.contact_form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          inputRef={register({
            required: {
              value: true,
              message: 'Ce champ est requis.',
            },
          })}
          name="firstname"
          variant="outlined"
          label="Prénom"
          error={!!errors.firstname}
          helperText={errors.firstname?.message}
          className={classes.contact_input}
        />
        <TextField
          inputRef={register({
            required: {
              value: true,
              message: 'Ce champ est requis.',
            },
          })}
          name="lastname"
          variant="outlined"
          label="Nom"
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
          className={classes.contact_input}
        />
        <TextField
          inputRef={register({
            required: {
              value: true,
              message: 'Ce champ est requis.',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Adresse e-mail invalide.',
            },
          })}
          name="email"
          variant="outlined"
          label="E-mail"
          error={!!errors.email}
          helperText={errors.email?.message}
          className={classes.contact_input}
        />
        <TextField
          inputRef={register({
            required: {
              value: true,
              message: 'Ce champ est requis.',
            },
          })}
          name="message"
          label="Message"
          error={!!errors.message}
          helperText={errors.message ? 'Ce champ est requis.' : ''}
          className={classes.contact_input}
          variant="filled"
          multiline
        />
        <Button type="submit" variant="contained" color="secondary">Envoyer</Button>
      </form>
    </div>
  );
}
