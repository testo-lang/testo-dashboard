import React from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";

import { MoreHorizontal } from "react-feather";

const BarChart = () => {
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
        label: "Last year",
        backgroundColor: "#47bac1",
        borderColor: "#47bac1",
        hoverBackgroundColor: "#47bac1",
        hoverBorderColor: "#47bac1",
        data: [15, 18, 18, 18, 22, 23, 22, 25, 25, 25, 30, 30]
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false
          },
          stacked: false,
          ticks: {
            stepSize: 20
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 0.75,
          categoryPercentage: 0.5,
          stacked: false,
          gridLines: {
            color: "transparent"
          }
        }
      ]
    }
  };

  return (
    <Card className="flex-fill w-100">
      <CardHeader>
        <div className="card-actions float-right">
          <UncontrolledDropdown>
            <DropdownToggle tag="a">
              <MoreHorizontal />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <CardTitle tag="h5" className="mb-0">
          Время прогона всех тестов
        </CardTitle>
      </CardHeader>
      <CardBody className="d-flex">
        <div className="align-self-center w-100">
          <div className="chart chart-lg">
            <Bar data={data} options={options} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default BarChart;
