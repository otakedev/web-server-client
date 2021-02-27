import {
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import PropTypes from 'prop-types';

export const Alert = ({
  open, setOpen, text, color,
}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <SnackbarContent
        style={{ backgroundColor: color }}
        message={<span id="client-snackbar">{text}</span>}
      />
    </Snackbar>
  );
};

Alert.defaultProps = {
  text: 'This is a message!',
  color: 'grey',
  open: false,
  setOpen: () => {},
};

Alert.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
