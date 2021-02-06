import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';
import { makeStyles } from '@material-ui/core/styles';

// const chartConfig = {
//   type: 'bar',
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [
//       {
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   },
// };

const useStyles = makeStyles(() => ({

  chartContainer: {
    height: '40vh',
    width: '80vw',
  },

}));

// eslint-disable-next-line react/prop-types
export const ChartIncidences = ({ data }) => {
  const chartContainer = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [chartInstance, setChartInstance] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    const newChartInstance = new Chartjs(chartContainer.current, {
      type: 'line',
      data: {
        // eslint-disable-next-line react/prop-types
        labels: data.map((d) => d.jour),
        datasets: [{
          label: 'Incidences',
          // eslint-disable-next-line react/prop-types
          data: data.map((d) => d.tx_std),
        }],
      },
    });
    setChartInstance(newChartInstance);
  }, [chartContainer]);

  return (
    // eslint-disable-next-line react/style-prop-object
    <div className={classes.chartContainer}>
      <canvas ref={chartContainer} />
    </div>
  );
};
