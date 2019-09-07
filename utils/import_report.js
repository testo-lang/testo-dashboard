
const fs = require("fs");

if (process.argv.length != 5) {
	throw "Usage: node import_report.js path/to/report.json project_name branch_name";
}

const reportPath = process.argv[2];
const project_name = process.argv[3];
const branch_name = process.argv[4];

if (!fs.existsSync(reportPath)) {
	throw `File ${reportPath} does not exists`;
}

const data = fs.readFileSync(reportPath);
const report = JSON.parse(data);

report.start_timestamp = new Date(report.start_timestamp);
report.stop_timestamp = new Date(report.stop_timestamp);
report.project = project_name;
report.branch = branch_name;

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, async function(err, client) {
	assert.equal(null, err);

	const db = client.db('testo');
	const projects = db.collection('projects');
	let project = await projects.findOne({name: project_name});
	if (!project) {
		project = {name: project_name, branches: []};
	}
	let branch = project.branches.find(branch => branch.name == branch_name);
	if (!branch) {
		project.branches.push({name: branch_name});
	}
	await projects.replaceOne({name: project_name}, project, {upsert: true});

	const reports = db.collection('reports');
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

	client.close();
});
