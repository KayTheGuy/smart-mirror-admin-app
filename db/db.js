const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

function readAll(dbName, collectionName, callback) {
    MongoClient.connect(url, function(err, client) {
        const col = client.db(dbName).collection(collectionName);
        col.find({}).toArray(function(err, items) {
            if (err) {
                console.log(`Failed to get items for db: ${dbName}, collection: ${collectionName}\n${err}`);
            }
            callback(items);
            client.close();
       });
   });
};