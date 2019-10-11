#!/usr/bin/env node

var argv = require('yargs')
	.option('report_path', {
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

let {report_path, project_name, branch_name, build_number} = argv;

const fs = require("fs");

if (!fs.existsSync(report_path)) {
	throw `File ${report_path} does not exists`;
}

const data = fs.readFileSync(report_path);
const report = JSON.parse(data);

report.start_timestamp = new Date(report.start_timestamp);
report.stop_timestamp = new Date(report.stop_timestamp);
report.project = project_name;
report.branch = branch_name;
report.build_number = build_number;

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

		if (await reports.findOne({build_number})) {
			throw `Report with build number ${build_number} already exists`;
		}

		await reports.replaceOne(
			{
				start_timestamp: report.start_timestamp,
				stop_timestamp: report.stop_timestamp,
				project: report.project,
				branch: report.branch,
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
