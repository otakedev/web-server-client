import React, { useState, useEffect } from 'react';
import { SimpleMenu } from './SimpleMenu';

const displayMobile = (children) => (
  <SimpleMenu>{children}</SimpleMenu>
);

const displayDesktop = (children) => children;

export const ResponsiveToolbarItem = ({ children }) => {
  const [state, setState] = useState({
    mobileView: false,
  });
  const { mobileView } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());
  }, []);

  return mobileView ? displayMobile(children) : displayDesktop(children);
};
