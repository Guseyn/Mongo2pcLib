'use strict'

class TransactionCollection

  {

    constructor (collection)
      {
        this.collection = collection;
      }

    init (initialTransactionLog, initCallback)
      {
        this.collection.insertOne(initialTransactionLog, initCallback);
      }

    start (id, startCallback)
      {
        this.collection.findOneAndUpdate(
          {_id: id, state: 'initial'},
          {
            $set: {state: 'pending', operationNum: 0, results: []},
            $currentDate: {lastModified: true}
          },
          {returnOriginal: false},
          startCallback
        );
      }

    upgrade (id, result, operationNum, upgradeCallback)
      {
        this.collection.findOneAndUpdate(
          {_id: id, state: 'pending', operationNum: operationNum},
          {
            $inc: {operationNum: 1},
            $push: {results: result},
            $currentDate: {lastModified: true}
          }, 
          {returnOriginal: false},
          upgradeCallback
        );
      }

    apply (id, result, operationNum, appliedCallback) 
      {
        this.collection.findOneAndUpdate(
          {_id: id, state: 'pending', operationNum: operationNum},
          {
            $set: {state: 'applied'},
            $inc: {operationNum: 1},
            $currentDate: {lastModified: true}
          },
          {returnOriginal: false},
          appliedCallback
        );
      }

    cancel (id, operationNum, cancelCallback) 
      {
        this.collection.findOneAndUpdate(
          {_id: id, state: 'pending', operationNum: operationNum},
          {
            $set: {state: 'canceling'},
            $currentDate: {lastModified: true}
          },
          {returnOriginal: false},
          cancelCallback
        );
      }

    fail (id, failCallback)
      {
        this.collection.findOneAndUpdate(
          {_id: id, state: {$ne: 'pending'}},
          {
            $set: {state: 'failed'},
            $currentDate: {lastModified: true}
          },
          {returnOriginal: false},
          cancelCallback
        );
      }

    systemJS (onAccess)
      {
        this.collection.s.db.collection(
          'system.js', 
            onAccess
        );
      }

    initialTransactionLog (id, rollbackId, operations)
      {
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
