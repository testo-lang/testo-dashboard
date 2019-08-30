import React from "react";

import {
  Badge,
  Card,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Table
} from "reactstrap";

import { MoreHorizontal } from "react-feather";

const Projects = () => (
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
        Список тестов
      </CardTitle>
    </CardHeader>
    <Table striped className="my-0">
      <thead>
        <tr>
          <th>Имя</th>
          <th className="d-none d-md-table-cell">Описание</th>
          <th className="d-none d-xl-table-cell">Время прогона</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>cas1_install_rpm</td>
          <td className="d-none d-md-table-cell">JinnServer должен корректно устанавливаться из rpm пакетов на узел CAS1</td>
          <td className="d-none d-xl-table-cell">1 минута</td>
          <td>
            <Badge color="success">Успешно</Badge>
          </td>
        </tr>
        <tr>
          <td>cas2_remove_rmp</td>
          <td className="d-none d-md-table-cell">JinnServer должен корректно удалятся из системы с помощью стандартных инструментов ОС CentOS.
            При этом в системе не должно оставаться лишних файлов.</td>
          <td className="d-none d-xl-table-cell">36 секунд</td>
          <td>
            <Badge color="danger">Ошибка</Badge>
          </td>
        </tr>
        <tr>
          <td>cas1_install_previous_release</td>
          <td className="d-none d-md-table-cell">JinnServer должен корректно обновлятся с предыдущей релизной версии</td>
          <td className="d-none d-xl-table-cell">2 минуты 18 секунд</td>
          <td>
            <Badge color="success">Успешно</Badge>
          </td>
        </tr>
      </tbody>
    </Table>
  </Card>
);

export default Projects;
