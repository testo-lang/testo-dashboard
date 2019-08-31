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

function status_to_text(status) {
	switch (status) {
		case "fail":
			return "Ошибка";
		case "success":
			return "Успех";
		default:
			return "???";
	}
}

function status_to_class(status) {
	switch (status) {
		case "fail":
			return "danger";
		case "success":
			return "success";
		default:
			return "";
	}
}

const Tests = () => (
	<Card className="flex-fill w-100">
		<CardHeader>
			<CardTitle tag="h5" className="mb-0">
				Список тестов из последнего запуска
			</CardTitle>
		</CardHeader>
		<Table striped className="my-0">
			<thead>
				<tr>
					<th>Название</th>
					<th className="d-none d-md-table-cell">Описание</th>
					<th className="d-none d-xl-table-cell">Время прогона</th>
					<th>Статус</th>
				</tr>
			</thead>
			<tbody>
				{
					testo.lastReport.tests.map((test) => {
						if (test.description === '') {
							return null;
						}
						const hours = Math.floor(test.duration / 3600);
						const minutes = Math.floor((test.duration % 3600) / 60);
						const seconds = (test.duration % 3600) % 60;
						let duration = '';
						if (hours > 0) {
							duration += `${hours} час `;
						}
						if ((hours > 0) || (minutes > 0)) {
							duration += `${minutes} мин `;
						}
						if (hours == 0) {
							duration += `${seconds} сек`;
						}
						return (
							<tr key={test.name}>
								<td>{test.name}</td>
								<td className="d-none d-md-table-cell">{test.description}</td>
								<td className="d-none d-xl-table-cell">{duration}</td>
								<td>
									<Badge color={status_to_class(test.status)}>{status_to_text(test.status)}</Badge>
								</td>
							</tr>
						);
					})
				}
			</tbody>
		</Table>
	</Card>
);

export default Tests;
