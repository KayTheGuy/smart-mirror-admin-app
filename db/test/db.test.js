const assert = require("assert");
const db = require("../db.js");

db.readAll("db1", "col1")
.then( (data) => { assert.notEqual(data, undefined, "readAll failed for empty collection!") } )
.catch( (err) => { console.log(err); } );
db.readAll("db1", "col1")
.then( (data) => { assert.notDeepEqual(data, [1], "readAll failed for empty collection!") } )
.catch( (err) => { console.log(err); } );
db.readAll("db1", "col1")
.then( (data) => { assert.deepEqual(data, [], "readAll failed for empty collection!") } )
.catch( (err) => { console.log(err); } );
