import { useEffect, useRef } from 'react';
import Chart from 'chart.js'

export default function Graph({ data, labels, deathCase, recoveryCase }) {
  const graphRef = useRef(null);

  useEffect(() => {
    if (graphRef.current) {
      const ctx = graphRef.current.getContext("2d")

      var blueGrd = ctx.createLinearGradient(0, 500, 0, 0);
      blueGrd.addColorStop(0, "#0000FFAA");
      blueGrd.addColorStop(1, "#3842D8AA");

      var yellowGrd = ctx.createLinearGradient(0, 500, 0, 0);
      yellowGrd.addColorStop(0, "#FFFF0066");
      yellowGrd.addColorStop(1, "#E0E06266");

      var redGrd = ctx.createLinearGradient(0, 500, 0, 0);
      redGrd.addColorStop(0, "#FF0000AA");
      redGrd.addColorStop(1, "#FF3D3DAA");

      new Chart(ctx, {
        type: 'line',
        data: {
    labels: labels, // array
    datasets: [
      {
        label: "Daily Cases",
        data: data, // array
        backgroundColor: yellowGrd,
        borderColor: '#00000077',
        borderWidth: 2,
        hoverBorderColor: 'white',
        hoverBackgroundColor: '#AE70E7',
        pointBackgroundColor: '#FFFFFF',
        pointBorderWidth: 0,
        pointRadius: 0.1,
        pointHoverRadius: 0.2,
        pointHoverBorderWidth: 0,
        showLines: true,
        lineTension: 0
      },
      {
        label: "Recovery Cases",
        data: recoveryCase, // array
        backgroundColor: blueGrd,
        borderColor: '#00000077',
        borderWidth: 2,
        hoverBorderColor: 'white',
        hoverBackgroundColor: '#AE70E7',
        pointBackgroundColor: '#FFFFFF',
        pointBorderWidth: 0,
        pointRadius: 0.1,
        pointHoverRadius: 0.2,
        pointHoverBorderWidth: 0,
        showLines: true,
        lineTension: 0
      },
      {
        label: "Death Cases",
        data: deathCase, // array
        backgroundColor: redGrd,
        borderColor: '#00000077',
        borderWidth: 2,
        hoverBorderColor: 'white',
        hoverBackgroundColor: '#AE70E7',
        pointBackgroundColor: '#FFFFFF',
        pointBorderWidth: 0,
        pointRadius: 0.1,
        pointHoverRadius: 0.2,
        pointHoverBorderWidth: 0,
        showLines: true,
        lineTension: 0
      },
    ],
  },
  options: {
    animation: {
      duration: 2000,
      easing: "easeInOutQuint",
    },
    title: {
      display: true,
      text: "Covid Tracker",
    },
  },
      });
    }
  }, [graphRef.current, data, labels]);

  return (
      <canvas ref={graphRef} width="400" height="400" />
  );
}