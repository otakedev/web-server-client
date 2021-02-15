import {
  Box,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useGet } from 'restful-react';
import { ChartIncidences } from './ChartIncidences';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },

  header: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },

  link: {
    color: '#61dafb',
  },

  lightBulb: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
  },

}));

export function App() {
  const { data: message } = useGet({ path: '/incidences' });

  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <Box my={4} className={classes.header}>
        {message ? <ChartIncidences data={message} /> : null}
      </Box>
    </Container>
  );
}
