import { DataGrid } from '@material-ui/data-grid';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  table: {
    height: 500,
    width: '100%',
    padding: '1em',
  },
}));

const columns = [
  { field: 'reg', headerName: 'Région' },
  { field: 'jour', headerName: 'Date', width: 250 },
  { field: 'pop', headerName: 'Population', width: 150 },
  { field: 'pop_h', headerName: 'Population (Homme)', width: 200 },
  { field: 'pop_f', headerName: 'Population (Femme)', width: 200 },
  { field: 'P', headerName: 'Cas positif', width: 150 },
  { field: 'P_h', headerName: 'Cas positif (Homme)', width: 200 },
  { field: 'P_f', headerName: 'Cas positif (Femme)', width: 200 },
  { field: 'cl_age90', headerName: 'Classe d\'âge', width: 150 },
  { field: 'tx_std', headerName: 'Taux d\'incidence', width: 170 },
];

export const TableIncidences = ({ data }) => {
  const classes = useStyles();

  const rows = [];
  let counterId = 0;

  data.forEach((element) => {
    rows.push({ ...element, id: counterId, reg: element.reg || 'Toutes' });
    counterId += 1;
  });

  return (
    <div className={classes.table}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </div>
  );
};

TableIncidences.defaultProps = {
  data: [],
};

TableIncidences.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      reg: PropTypes.string,
      jour: PropTypes.string,
      P_f: PropTypes.number,
      P_h: PropTypes.number,
      P: PropTypes.number,
      pop_h: PropTypes.number,
      pop_f: PropTypes.number,
      pop: PropTypes.number,
      cl_age90: PropTypes.number,
      tx_std: PropTypes.number,
    }),
  ),
};
