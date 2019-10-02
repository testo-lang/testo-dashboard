
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, async function(err, client) {
	assert.equal(null, err);

	try {
		const db = client.db('testo');

		let projects = await db.collection('projects').find().toArray();
		for (let project of projects) {
			for (let branch of project.branches) {
				const reports = await db.collection('reports')
					.find({project: project.name, branch: branch.name})
					.sort({start_timestamp: 1})
					.toArray();
				for (let report of reports) {
					if ('build_number' in report) {
						throw `Reports in the branch "${branch.name}" of the project "${project.name}" already have build numbers!`;
					}
				}
				for (let i = 0; i < reports.length; i++) {
					let report = reports[i];
					report.build_number = i;
					await db.collection('reports').replaceOne({_id: report._id}, report);
				}
			}
		}

		console.log("OK");
	} catch (e) {
		console.log(e);
	}

	client.close();
});
