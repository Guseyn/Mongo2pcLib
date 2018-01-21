
'use strict'

const InitialTransactionState = require('./async/initialTransactionState');

class PreparedTransaction {

  constructor (id, rollbackId, collection, operations, callbacks) {
    this.id = id;
    this.rollbackId = rollbackId;
    this.transactionCollection = collection;
    this.transactionOperations = operations;
    this.transactionCallbacks = callbacks;
  }

  invoke() {

    if (this.transactionOperations.isEmpty()) {

      this.transactionCallbacks.commit();
      
    } else {

      let initialTransactionLog = this.transactionCollection.initialTransactionLog(
        this.id, this.rollbackId, this.transactionOperations
      );

      new InitialTransactionState(
        this.transactionCollection,
        {
          id: this.id, 
          rollbackId: this.rollbackId,
          transactionCollection: this.transactionCollection,
          transactionOperations: this.transactionOperations,
          transactionCallbacks: this.transactionCallbacks
        }
      ).call('init', initialTransactionLog);
      
    }
  }
}


module.exports = PreparedTransaction;
