const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

var readAll = function (dbName, collectionName) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
            const col = client.db(dbName).collection(collectionName);
            col.find({}).toArray(function(err, items) {
                if (err) {
                    console.log(`Failed to get items for db: ${dbName}, collection: ${collectionName}\n${err}`);
                    reject();
                } else {
                    client.close();
                    resolve(items);
                }
           });
        });
   });
};

module.exports = {
    readAll,
};
