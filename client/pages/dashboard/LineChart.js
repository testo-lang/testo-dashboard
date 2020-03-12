import React from "react";
import { Line } from "react-chartjs-2";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { StringifyTimestamp } from "../../utils";

const LineChart = () => {
	let suggestedMin = 100500
	let suggestedMax = 0
	for (let report of testo.reports) {
		if (suggestedMax < report.totalTestsCount) {
			suggestedMax = report.totalTestsCount
		}
		if (suggestedMin > report.successfulTestsCount) {
			suggestedMin = report.successfulTestsCount
		}
	}
	suggestedMin -= 10
	suggestedMax += 10
	const data = {
		labels: testo.reports.map(report => [StringifyTimestamp(report.stop_timestamp), ` сборка ${report.build_number}`]),
		datasets: [
			{
				label: "Всего тестов",
				fill: true,
				backgroundColor: "transparent",
				borderColor: "#47bac1",
				borderDash: [8, 4],
				data: testo.reports.map(report => report.totalTestsCount)
			},
			{
				label: "Успешных тестов",
				fill: true,
				backgroundColor: "transparent",
				borderColor: "#5fc27e",
				data: testo.reports.map(report => report.successfulTestsCount)
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
				}
			],
			yAxes: [
				{
					ticks: {
						suggestedMin,
						suggestedMax,
						stepSize: 10
					},
				}
			]
		}
	};

	return (
		<Card className="flex-fill w-100">
			<CardHeader>
				<CardTitle tag="h5" className="mb-0">
					Результаты тестирования предыдущих сборок
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

export default LineChart;
