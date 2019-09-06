import React from "react";
import { Line } from "react-chartjs-2";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import moment from "moment"

moment.locale('ru');

function totalTests(report) {
	return report.tests.reduce(function(n, test) {
		if (test.description != "") {
			return n + 1;
		}
		return n;
	}, 0)
}

function successfullTests(report) {
	return report.tests.reduce(function(n, test) {
		if (test.description != "") {
			if (test.status == "success") {
				return n + 1;
			}
		}
		return n;
	}, 0)
}

const LineChart = () => {
	const data = {
		labels: testo.reports.map(report => moment(report.date).format("D MMM")),
		datasets: [
			{
				label: "Всего тестов",
				fill: true,
				backgroundColor: "transparent",
				borderColor: "#47bac1",
				data: testo.reports.map(totalTests)
			},
			{
				label: "Успешных тестов",
				fill: true,
				backgroundColor: "transparent",
				borderColor: "#5fc27e",
				borderDash: [4, 4],
				data: testo.reports.map(successfullTests)
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

export default LineChart;
