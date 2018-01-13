const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const Transaction = require('./src/transaction/transaction');
const TransactionCollection = require('./src/transactionCollection');
const TransactionOperations = require('./src/transactionOperations');
const TransactionCallbacks = require('./src/transactionCallbacks');
const OnCommit = require('./src/onCommit');
const OnRollback = require('./src/onRollback');
const OnFail = require('./src/onFail');
const Operation = require('./src/operation');
const Request = require('./src/request');

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

    let transferFromRoss = new Operation(
      new Request('findOneAndUpdate', accountCollections,
        {name: 'Ross'},
        {$inc: {balance: -100}},
        {returnOriginal: false}
      ),
      new Request('findOneAndUpdate', accountCollections,
        {name: 'Ross'},
        {$inc: {balance: 100}},
        {returnOriginal: false}
      )
    );
    
    let transferToRachel = new Operation(
      new Request('findOneAndUpdate', accountCollections,
        {name: 'Rachel'},
        (results) => {
          return {$inc: {balance: 100}}
        },
        {returnOriginal: false}
      ),
      new Request('findOneAndUpdate', accountCollections,
        {name: 'Rachel'},
        (results) => {
          return {$inc: {balance: -100}}
        },
        {returnOriginal: false}
      )
    );

    let transactionId = new ObjectID();
    let rollbackTransactionId = new ObjectID();

    new Transaction(
      transactionId,
      rollbackTransactionId,
      new TransactionCollection(
        transactionsCollection
      ),
      new TransactionOperations(
        transferFromRoss, transferToRachel
      ),
      new TransactionCallbacks(
        new OnCommit((results) => {
          console.log(results);
          client.close();
        }),
        new OnRollback((error, results) => {
          console.log(error);
          console.log(results);
          client.close();
        }),
        new OnFail((error, transactionId) => {
          console.log([error, transactionId]);
          client.close();
        }) 
      ) 
    ).invoke();

  //});
  
  
  //console.log(transaction);
});