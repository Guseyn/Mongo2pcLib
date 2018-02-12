'use strict'

class TransactionCollection {

  constructor (collection) {
    this.collection = collection;
  }

  init (initialTransactionLog, onInit) {
    this.collection.insertOne(initialTransactionLog, onInit);
  }

  start (id, onStart) {
    this.collection.findOneAndUpdate(
      {_id: id, state: 'initial'},
      {
        $set: {state: 'pending', operationNum: 0, results: []},
        $currentDate: {lastModified: true}
      },
      {returnOriginal: false},
      onStart
    );
  }

  upgrade (id, result, operationNum, onUpgrade) {
    this.collection.findOneAndUpdate(
      {_id: id, state: 'pending', operationNum: operationNum},
      {
        $inc: {operationNum: 1},
        $push: {results: result},
        $currentDate: {lastModified: true}
      }, 
      {returnOriginal: false},
      onUpgrade
    );
  }

  apply (id, result, operationNum, onApplied) {
    this.collection.findOneAndUpdate(
      {_id: id, state: 'pending', operationNum: operationNum},
      {
        $set: {state: 'applied'},
        $inc: {operationNum: 1},
        $push: {results: result},
        $currentDate: {lastModified: true}
      },
      {returnOriginal: false},
      onApplied
    );
  }

  cancel (id, operationNum, onCancel) {
    this.collection.findOneAndUpdate(
      {_id: id, state: 'pending', operationNum: operationNum},
      {
        $set: {state: 'canceling'},
        $currentDate: {lastModified: true}
      },
      {returnOriginal: false},
      onCancel
    );
  }

  fail (id, onFail) {
    this.collection.findOneAndUpdate(
      {_id: id, state: {$ne: 'pending'}},
      {
        $set: {state: 'failed'},
        $currentDate: {lastModified: true}
      },
      {returnOriginal: false},
      onFail
    );
  }

  systemJS (onAccess) {
    this.collection.s.db.collection(
      'system.js', onAccess
    );
  }

  initialTransactionLog (id, rollbackId, operations) {
    return {
      _id: id,
      rollbackId: rollbackId || null,
      state: 'initial',
      requestsLog: operations.requestLog(),
      rollbackRequestsLog: operations.rollbackRequestLog(),
      lastModified: new Date()
    }
  }

}

module.exports = TransactionCollection;
