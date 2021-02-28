import React from 'react';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  IconButton, Menu, MenuItem,
} from '@material-ui/core';

export const SimpleMenu = ({ children }) => {
  const [anchorElement, setAnchorElement] = React.useState(null);

  const handleClick = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick} component="span" aria-controls="simple-menu" aria-haspopup="true">
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorElement={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleClose}
      >
        {children.map((item) => <MenuItem onClick={handleClose}>{item}</MenuItem>)}
      </Menu>
    </div>
  );
};

SimpleMenu.defaultProps = {
  children: [],
};

SimpleMenu.propTypes = {
  children: PropTypes.element,
};
