const assert = require("assert");
const db = require("../db.js");
const formType = require('../../model/form-type').forms;
const dbName = require('../../model/form-type').dbName;

function writeTest() {
	db.writeObject(dbName, formType.EVENTS, {"_id":"5b6356c25dc3170474db25fd","db_test":1})
	.then( (data) => {
	assert.equal(data, 200, "writeObject failed for one object");
	db.writeObject(dbName, formType.EVENTS, [{"_id":"5b6356c25dc3170474db25fe","db_test":2}, {"_id":"5b6356c25dc3170474db25ff","db_test":3}])
		.then( (data) => { assert.equal(data, 200, "writeObject failed for multiple objects ")})
		.catch( (err) => { console.log(err) } );
	})
	.catch(  (err) => { console.log(err) } );
}

function readTest() {
	db.readAll(dbName, formType.EVENTS)
		.then( (data) => { assert.notEqual(data, undefined, "readAll failed for empty collection!") } )
		.catch( (err) => { console.log(err); } );
	db.readAll(dbName, formType.EVENTS)
		.then( (data) => { assert.notDeepEqual(data, [1], "readAll failed for empty collection!") } )
		.catch( (err) => { console.log(err); } );
	db.readAll(dbName, formType.EVENTS)
		.then( (data) => {
			assert.deepEqual(data, [
					{"_id":"5b6356c25dc3170474db25fd","db_test":1},
					{"_id":"5b6356c25dc3170474db25fe","db_test":2},
					{"_id":"5b6356c25dc3170474db25ff","db_test":3}
				],
				"readAll failed"
			)}
		).catch( (err) => { console.log(err); } );
}

function updateTest() {
	db.updateObjectKey(dbName, formType.EVENTS, "5b6356c25dc3170474db25fd", "db_test", 1000)
	.then( (data) => {
		assert.equal(data, 200, "updateObjectKey failed");
		db.updateObjectKey(dbName, formType.EVENTS, "5b6356c25dc3170474db25fd", "db_test", 1)
		.then( (data) => { assert.equal(data, 200, "updateObjectKey failed")})
		.catch( (err) => { console.log(err); } );
	})
	.catch( (err) => { console.log(err); } );
}

function deleteTest() {
	db.deleteObject(dbName, formType.EVENTS, "5b6356c25dc3170474db25fd")
	.then( (data) => {assert.equal(data, 200, "deleteTest failed");})
	.catch( (err) => { console.log(err); } );
}

setTimeout(() => writeTest(), 0);
setTimeout(() => readTest(), 2000);
setTimeout(() => updateTest(), 4000);
setTimeout(() => readTest(), 6000);
setTimeout(() => deleteTest(), 8000);
