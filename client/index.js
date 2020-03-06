
import './styles/_app.scss'

import React from "react";
import ReactDOM from "react-dom";

import store from "./store";

import { Provider } from "react-redux";
import Dashboard from "./pages/dashboard";

for (let report of testo.buildNumbers) {
	report.stop_timestamp = new Date(report.stop_timestamp);
}

for (let report of testo.reports) {
	let successfulTestsCount = 0;
	let failedTestsCount = 0;

	for (let test of report.tests) {
		if (test.status == 'success') {
			successfulTestsCount += 1;
		}
		if (test.status == 'fail') {
			failedTestsCount += 1;
		}
	}

	report.totalTestsCount = successfulTestsCount + failedTestsCount;
	report.successfulTestsCount = successfulTestsCount;
	report.failedTestsCount = failedTestsCount;

	report.start_timestamp = new Date(report.start_timestamp);
	report.stop_timestamp = new Date(report.stop_timestamp);
	report.duration = (report.stop_timestamp - report.start_timestamp) / 1000;
}

testo.lastReport = testo.reports[testo.reports.length - 1];

const App = () => (
	<Provider store={store}>
		<Dashboard/>
	</Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
