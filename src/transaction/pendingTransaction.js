
const ExecutedOperation = require('./async/executedOperation');

class PendingTransaction {

  constructor (id, rollbackId, collection, operations, callbacks) {
    this.id = id;
    this.rollbackId = rollbackId;
    this.transactionCollection = collection;
    this.transactionOperations = operations;
    this.transactionCallbacks = callbacks;
  }

  upgrade (results) {

    results = results || [];

    new ExecutedOperation(
      this.transactionOperations,
      {
        pendingTransaction: this,
        id: this.id, 
        rollbackId: this.rollbackId,
        transactionCollection: this.transactionCollection,
        transactionOperations: this.transactionOperations,
        transactionCallbacks: this.transactionCallbacks,
        results: results
      }
    ).call('executeCurrent');

  }

  next() {
    return new PendingTransaction(
      this.id,
      this.rollbackId,
      this.transactionCollection,
      this.transactionOperations.next(),
      this.transactionCallbacks
    );
  }


}

module.exports = PendingTransaction;