import React from "react";
import { Pie } from "react-chartjs-2";

import {
	CardBody,
	Card,
	CardHeader,
	CardTitle,
	Table,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

const PieChart = () => {

	const {totalTestsCount, successfulTestsCount, failedTestsCount} = testo.lastReport;

	const data = {
		labels: ["Успешных тестов", "Проваленных тестов"],
		datasets: [
			{
				data: [successfulTestsCount, failedTestsCount],
				backgroundColor: [
					"#5fc27e",
					"#f44455",
				]
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
				<CardTitle tag="h5" className="mb-0">
					Результат тестирования этой сборки
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
									<FontAwesomeIcon icon={faSquare} className="text-success" />{" "}
									Успешные тесты
								</td>
								<td className="text-right">{successfulTestsCount}</td>
								<td className="text-right">{Math.floor((successfulTestsCount / totalTestsCount) * 100)}%</td>
							</tr>
							<tr>
								<td>
									<FontAwesomeIcon icon={faSquare} className="text-danger" />{" "}
									Проваленные тесты
								</td>
								<td className="text-right">{failedTestsCount}</td>
								<td className="text-right">{Math.floor((failedTestsCount / totalTestsCount) * 100)}%</td>
							</tr>
						</tbody>
					</Table>
				</div>
			</CardBody>
		</Card>
	);
};

export default PieChart;
