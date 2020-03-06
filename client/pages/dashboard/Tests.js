import React from "react";

import {
	Badge,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	UncontrolledDropdown,
} from "reactstrap";

import { MinusCircle, PlusCircle } from "react-feather";

import BootstrapTable from "react-bootstrap-table-next";

import { MoreHorizontal } from "react-feather";
import { StringifyDuration } from "../../utils";

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

const tableColumns = [
	{
		dataField: "name",
		text: "Название",
		sort: true
	},
	{
		dataField: "description",
		text: "Описание",
		sort: true
	},
	{
		dataField: "duration",
		text: "Время прогона",
		sort: true,
		formatter: function(_, test) {
			let duration = StringifyDuration(test.duration);
			if (test.is_cached == true) {
				duration += ' (кэширован)';
			}
			return duration;
		},
		style: {
			minWidth: '170px'
		}
	},
	{
		dataField: "status",
		text: "Статус",
		sort: true,
		formatter: function(cell, test) {
			return <Badge color={status_to_class(test.status)}>{status_to_text(test.status)}</Badge>;
		}
	}
];

const Tests = () => {
	const tableData = testo.lastReport.tests;
	const expandRow = {
		renderer: test => {
			if (test.logs) {
				if (test.screenshot) {
					var img = <div className="mb-1"><img src={"data:image/png;base64," + test.screenshot}></img></div>
				}
				return (
					<div>
						<pre className="mb-2">{test.logs}</pre>
						{img}
					</div>
				);
			} else {
				return (
					<div>Логи отсутствуют</div>
				)
			}
		},
		showExpandColumn: true,
		expandHeaderColumnRenderer: ({ isAnyExpands }) =>
			isAnyExpands ? (
				<MinusCircle width={16} height={16} />
			) : (
				<PlusCircle width={16} height={16} />
			),
		expandColumnRenderer: ({ expanded }) =>
			expanded ? (
				<MinusCircle width={16} height={16} />
			) : (
				<PlusCircle width={16} height={16} />
			)
	};
	return (
		<Card className="flex-fill w-100">
			<CardHeader>
				<CardTitle tag="h5" className="mb-0">
					Список тестов для этой сборки
				</CardTitle>
			</CardHeader>
			<CardBody>
				<BootstrapTable
					bootstrap4
					bordered={false}
					keyField="name"
					data={tableData}
					columns={tableColumns}
					expandRow={expandRow}
				></BootstrapTable>
			</CardBody>
		</Card>
	);
};

export default Tests;
