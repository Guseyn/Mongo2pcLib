const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const Transaction = require('./src/transaction');
const Operation = require('./src/operation');

const findOneAndUpdate = require('./src/request').findOneAndUpdate;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'dbApp';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const accountCollections = db.collection('accounts');
  accountCollections.insertMany([{name: 'Anna', balance: 1000}, {name: 'Rob', balance: 1000}], (err, result) => {
    assert.equal(null, err);
    let updateOperation1 = new Operation({
      request: findOneAndUpdate(accountCollections, {name: 'Anna'}, {$inc: {balance: -100}}, {returnOriginal: false}),
      rollbackRequest: findOneAndUpdate(accountCollections, {name: 'Anna'}, {$inc: {balance: 100}}, {returnOriginal: false})
    });
    let updateOperation2 = new Operation({
      request: findOneAndUpdate(accountCollections, {name: 'Rob'}, {$inc: {balance: 100}}, {returnOriginal: false}),
      rollbackRequest: findOneAndUpdate(accountCollections, {name: 'Rob'}, {$inc: {balance: -100}}, {returnOriginal: false})
    });
    let transaction = new Transaction(new ObjectID(), db, updateOperation1, updateOperation2);
    transaction.onCommit((results) => {
      console.log(results);
      client.close();
    });
    transaction.invoke();
  });
  
  
  //console.log(transaction);
});