'use strict'

class CanceledTransaction {

  constructor (id, rollbackId, collection, operations,callbacks) {
    this.id = id;
    this.rollbackId = rollbackId;
    this.transactionCollection = collection;
    this.transactionOperations = operations;
    this.transactionCallbacks = callbacks;
  }

  rollback() {

    new Transaction(
      this.id, this.rollbackId,
      this.transactionCollection,
      this.transactionOperations.rollbackAll(),
      this.transactionCallbacks
    ).invoke();

  }

}

module.exports = CanceledTransaction;
