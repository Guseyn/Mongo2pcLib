
const StartedTransactionState = require('./async/startedTransactionState');

class InvokedTransaction {

  constructor (id, rollbackId, collection, operations, callbacks) {
    this.id = id;
    this.rollbackId = rollbackId;
    this.transactionCollection = collection;
    this.transactionOperations = operations;
    this.transactionCallbacks = callbacks;
  }

  start() {

    new StartedTransactionState(
      this.transactionCollection,
      {
        id: this.id, 
        rollbackId: this.rollbackId,
        transactionCollection: this.transactionCollection,
        transactionOperations: this.transactionOperations,
        transactionCallbacks: this.transactionCallbacks
      }
    ).call('start');
    
  }

}

module.exports = InvokedTransaction;
