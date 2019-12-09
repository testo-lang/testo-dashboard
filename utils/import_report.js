#!/usr/bin/env node

var argv = require('yargs')
	.option('report_folder', {
		demandOption: true,
		type: 'string'
	})
	.option('project_name', {
		demandOption: true,
		type: 'string'
	})
	.option('branch_name', {
		demandOption: true,
		type: 'string'
	})
	.option('build_number', {
		demandOption: true,
		type: 'number'
	})
  .help()
  .argv;

let {report_folder, project_name, branch_name, build_number} = argv;

const fs = require("fs");

if (!fs.existsSync(report_folder)) {
	throw `${report_folder} does not exists`;
}

const stats = fs.statSync(report_folder);
if (!stats.isDirectory()) {
	throw `${report_folder} is not a directory`;
}

const path = require("path");

const report_path = path.join(report_folder, "report.json");

if (!fs.existsSync(report_path)) {
	throw `Directory ${report_folder} does not contain report.json file`;
}

const data = fs.readFileSync(report_path);
const report = JSON.parse(data);

report.start_timestamp = new Date(report.start_timestamp);
report.stop_timestamp = new Date(report.stop_timestamp);
report.project = project_name;
report.branch = branch_name;
report.build_number = build_number;

for (let test of report.tests) {
	const logs_path = path.join(report_folder, test.name);
	if (fs.existsSync(logs_path)) {
		test.logs = fs.readFileSync(logs_path, 'utf-8');
	}
	const screenshot_path = path.join(report_folder, test.name + '_wait_failed.png');
	if (fs.existsSync(screenshot_path)) {
		test.screenshot = fs.readFileSync(screenshot_path);
	}
}

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, async function(err, client) {
	assert.equal(null, err);

	try {
		const db = client.db('testo');
		const projects = db.collection('projects');
		let project = await projects.findOne({name: project_name});
		if (!project) {
			project = {name: project_name, branches: []};
		}
		const branch = project.branches.find(branch => branch.name == branch_name);
		if (!branch) {
			project.branches.push({name: branch_name});
		}
		await projects.replaceOne({name: project_name}, project, {upsert: true});

		const reports = db.collection('reports');

		await reports.replaceOne(
			{
				project: report.project,
				branch: report.branch,
				build_number: report.build_number
			},
			report,
			{upsert: true}
		);

		console.log("OK");
	} catch (e) {
		console.log(e);
	}

	client.close();
});
