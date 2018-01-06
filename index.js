const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const Transaction = require('./src/forward/transaction/transaction');
const Operation = require('./src/forward/operation');

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
  const accountCollections = db.collection('cache-accounts');
  const transactionsCollection = db.collection(`${dbName}-my-transactions`);

  /*accountCollections.insertMany([
    {name: 'Ross', balance: 1000},
    {name: 'Rachel', balance: 1000
  }], (err, result) => {
    assert.equal(null, err);*/

    let transferFromRoss = new Operation({
      request: findOneAndUpdate(
        accountCollections,
        {name: 'Ross'},
        {$inc: {balance: -100}},
        {returnOriginal: false}
      ),
      rollbackRequest: findOneAndUpdate(
        accountCollections,
        {name: 'Ross'},
        {$inc: {balance: 100}},
        {returnOriginal: false})
    });
    
    let transferToRachel = new Operation({
      request: findOneAndUpdate(
        accountCollections,
        {name: 'Rachel'},
        (results) => {
          return {$inc: {balance: 100}};
        },
        {returnOriginal: false}
      ),
      rollbackRequest: findOneAndUpdate(
        accountCollections, 
        {name: 'Rachel'}, 
        {$inc: {balance: -100}}, 
        {returnOriginal: false}
      )
    });

    let transactionId = new ObjectID();
    let rollbackTransactionId = new ObjectID();
    let transaction = new Transaction(
      db, transactionsCollection,
      transactionId, rollbackTransactionId,
      transferFromRoss, transferToRachel
    );
    
    transaction.onCommit((results) => {
      console.log(results);
      client.close();
    });
    transaction.onRollback((error, results) => {
      console.log(error);
      console.log(results);
      client.close();
    });

    transaction.invoke();

  //});
  
  
  //console.log(transaction);
});