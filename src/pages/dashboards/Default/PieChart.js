import React from "react";
import { Pie } from "react-chartjs-2";
import { connect } from "react-redux";

import {
  CardBody,
  Card,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  UncontrolledDropdown
} from "reactstrap";

import { MoreHorizontal } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

const PieChart = ({ theme }) => {
  const data = {
    labels: ["Успешные тесты", "Проваленные тесты"],
    datasets: [
      {
        data: [24, 5],
        backgroundColor: [
          theme.tertiary,
          theme.danger,
        ],
        borderColor: "transparent"
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
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
          Последний запуск тестов
        </CardTitle>
      </CardHeader>
      <CardBody className="d-flex">
        <div className="align-self-center w-100">
          <div className="py-3">
            <div className="chart chart-xs">
              <Pie data={data} options={options} />
            </div>
          </div>

          <Table className="mb-0">
            <thead>
              <tr>
                <th>Категория</th>
                <th className="text-right">Количество</th>
                <th className="text-right">Процент</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <FontAwesomeIcon icon={faSquare} className="text-primary" />{" "}
                  Всего тестов
                </td>
                <td className="text-right">29</td>
                <td className="text-right">100%</td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon icon={faSquare} className="text-success" />{" "}
                  Успешные тесты
                </td>
                <td className="text-right">24</td>
                <td className="text-right">82%</td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon icon={faSquare} className="text-danger" />{" "}
                  Проваленные тесты
                </td>
                <td className="text-right">5</td>
                <td className="text-right">18%</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default connect(store => ({
  theme: store.theme.currentTheme
}))(PieChart);
