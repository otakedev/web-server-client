import React, { useContext, useEffect, useRef } from 'react';
import Chartjs from 'chart.js';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  chartContainer: {
    position: 'relative',
    maxWidth: '80em',
    margin: 'auto',
  },
}));

let newChartInstance = null;

export const ChartIncidences = ({ data }) => {
  const theme = useTheme();
  const chartContainer = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    newChartInstance?.destroy();

    newChartInstance = new Chartjs(chartContainer.current, {
      options: {
        responsive: true,
        legend: {
          labels: {
            fontColor: theme.palette.secondary.main,
            fontSize: 18,
          },
        },
        scales: {
          yAxes: [{
            stacked: true,
          }],
          xAxes: [{
            stacked: true,
          }],
        },
      },
      type: 'line',
      data: {
        labels: data.map((d) => new Date(d.jour).toLocaleDateString('fr-FR')),
        datasets: [
          {
            borderColor: theme.palette.secondary.main,
            backgroundColor: theme.palette.secondary.transparent,
            pointBackgroundColor: theme.palette.primary.main,
            pointBorderColor: theme.palette.primary.main,
            pointHoverBackgroundColor: theme.palette.primary.main,
            pointHoverBorderColor: theme.palette.primary.main,
            label: 'Incidences',
            data: data.map((d) => d.tx_std),
          },
        ],
      },
    });
  });

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
