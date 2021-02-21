import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { XGrid, useApiRef } from '@material-ui/x-grid';

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

let rows = [];

let counterId = 0;

function createData(reg_, date, pop_, popMan, popWoman, posi, posiMan, posiWoman, classAge, rate) {
  rows.push({
    id: counterId,
    reg: reg_,
    jour: date,
    pop: pop_,
    pop_h: popMan,
    pop_f: popWoman,
    P: posi,
    P_h: posiMan,
    P_f: posiWoman,
    cl_age90: classAge,
    tx_std: rate,
  });
  counterId += 1;
}

export const TableIncidences = ({ data }) => {
  const apiRef = useApiRef();

  useEffect(() => {
    counterId = 0;
    rows = [];

    apiRef.current.setRows(rows);

    data.forEach((element) => {
      createData(
        element.reg,
        element.jour,
        element.pop,
        element.pop_h,
        element.pop_f,
        element.P,
        element.P_h,
        element.P_f,
        element.cl_age90,
        element.tx_std,
      );
    });

    apiRef.current.setRows(rows);
  }, [data, apiRef]);

  return (
    <div style={{ height: 840, width: '100%' }}>
      <XGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[10, 25, 50, 100]}
        apiRef={apiRef}
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
