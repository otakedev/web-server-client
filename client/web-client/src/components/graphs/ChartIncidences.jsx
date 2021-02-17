import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  chartContainer: {
    height: '40vh',
    width: '80vw',
    margin: 'auto',
  },
}));

export const ChartIncidences = ({ data }) => {
  const chartContainer = useRef(null);
  const [, setChartInstance] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    const newChartInstance = new Chartjs(chartContainer.current, {
      type: 'line',
      data: {
        labels: data.map((d) => d.jour),
        datasets: [
          {
            label: 'Incidences',

            data: data.map((d) => d.tx_std),
          },
        ],
      },
    });
    setChartInstance(newChartInstance);
  }, [chartContainer]);

  return (
    <div className={classes.chartContainer}>
      <canvas ref={chartContainer} />
    </div>
  );
};

ChartIncidences.defaultProps = {
  data: [],
};

ChartIncidences.propTypes = {
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