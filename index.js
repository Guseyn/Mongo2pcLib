const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const Transaction = require('./src/transaction/transaction');
const Operation = require('./src/request/Operation');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'dbApp';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  let updateOperation = new Operation({
  	request: {update: 1},
  	rollbackRequest: {update: -1},
  });
  console.log(updateOperation);
  console.log(updateOperation.rollbackOperation());
  let transaction = new Transaction(new ObjectID(), db, updateOperation);
  //console.log(transaction);

  client.close();
});