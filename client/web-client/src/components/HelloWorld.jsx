import { Typography } from '@material-ui/core';
import { useGet } from 'restful-react';

export const HelloWorld = () => {
  const { data: message } = useGet({ path: '/' });
  return (
    <Typography variant="h2" component="h1">
      {message}
    </Typography>
  );
};
