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

var writeObject = function (dbName, collectionName, data) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
            const col = client.db(dbName).collection(collectionName);
            col.insert(data, (err, doc) => {
                if (err) {
                    console.log(`Failed to insert items for db: ${dbName}, collection: ${collectionName}\n${err}`);
                    reject();
                }
                else {
                    client.close();
                    resolve(200);
                }
            });
        });
    });
};

var updateObjectKey = function (dbName, collectionName, id, key, value) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
            const col = client.db(dbName).collection(collectionName);
            const myquery = { _id: id };

            let tempObj = {};
            tempObj[key] = value;

            let newvalues = { $set: tempObj };

            col.updateOne(myquery, newvalues, (err, doc) => {
                if (err) {
                    console.log(`Failed to insert items for db: ${dbName}, collection: ${collectionName}, id: ${id}\n${err}`);
                    reject();
                }
                else {
                    client.close();
                    resolve(200);
                }
            });
        });
    });
};

var deleteObject = function (dbName, collectionName, id) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
            const col = client.db(dbName).collection(collectionName);

            let myquery = { _id: id };

            col.deleteOne(myquery, (err, doc) => {
                if (err) {
                    console.log(`Failed to delete items for db: ${dbName}, collection: ${collectionName}, id: ${id}\n${err}`);
                    reject();
                }
                else {
                    client.close();
                    resolve(200);
                }
            });
        });
    });
};

deleteObject("db1", "col1", "5b6356c25dc3170474db25ff");

module.exports = {
    readAll,
    writeObject,
    updateObjectKey,
    deleteObject
};
