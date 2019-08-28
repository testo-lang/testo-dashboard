import React from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";

import { Badge, Card, CardBody, CardHeader, CardTitle } from "reactstrap";

const LineChart = ({ theme }) => {
  const data = {
    labels: [
      "15 Авг",
      "16 Авг",
      "17 Авг",
      "18 Авг",
      "19 Авг",
      "20 Авг",
      "21 Авг",
      "22 Авг",
      "23 Авг",
      "24 Авг",
      "25 Авг",
      "26 Авг"
    ],
    datasets: [
      {
        label: "Sales ($)",
        fill: true,
        backgroundColor: "transparent",
        borderColor: theme.primary,
        data: [
          18,
          18,
          19,
          19,
          19,
          22,
          26,
          26,
          26,
          28,
          29,
          29
        ]
      },
      {
        label: "Orders",
        fill: true,
        backgroundColor: "transparent",
        borderColor: theme.tertiary,
        borderDash: [4, 4],
        data: [
          8,
          12,
          18,
          19,
          19,
          19,
          21,
          22,
          25,
          23,
          25,
          26
        ]
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      intersect: false
    },
    hover: {
      intersect: true
    },
    plugins: {
      filler: {
        propagate: false
      }
    },
    scales: {
      xAxes: [
        {
          reverse: true,
          gridLines: {
            color: "rgba(0,0,0,0.05)"
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            stepSize: 500
          },
          display: true,
          borderDash: [5, 5],
          gridLines: {
            color: "rgba(0,0,0,0)",
            fontColor: "#fff"
          }
        }
      ]
    }
  };

  return (
    <Card className="flex-fill w-100">
      <CardHeader>
        <CardTitle tag="h5" className="mb-0">
          Запуски тестов за последнее время
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart chart-lg">
          <Line data={data} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};

export default connect(store => ({
  theme: store.theme.currentTheme
}))(LineChart);
