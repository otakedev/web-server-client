import React from 'react';
import {
  Box,
  Typography,
  Tab,
  Tabs,
  AppBar,
  IconButton,
  Badge,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useGet } from 'restful-react';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { ChartIncidences } from './ChartIncidences';
import { TableIncidences } from './TableIncidences';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
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

  IconButton: {
    marginRight: '2rem',
  },

}));

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.defaultProps = {
  children: {},
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function App() {
  const { data: message } = useGet({ path: 'api/v0/incidences' });
  const { data: numbercaseconfirm } = useGet({ path: 'api/v0/case-confirm' });

  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="view tab">
          <Tab label="Table" {...a11yProps(0)} />
          <Tab label="Chart" {...a11yProps(1)} />
          <Tooltip title="Nombre de cas confirmé en France">
            <IconButton aria-label="icon button" color="inherit" className={classes.IconButton}>
              <Badge badgeContent={numbercaseconfirm} max={99999999} color="secondary">
                <LocalHospitalIcon />
              </Badge>
            </IconButton>
          </Tooltip>

        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {message ? <TableIncidences data={message} /> : null}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {message ? <ChartIncidences data={message} /> : null}
      </TabPanel>
    </div>
  );
}
