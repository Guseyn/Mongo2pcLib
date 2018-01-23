'use strict'

const TransactionProtocol = require('./transactionProtocol');
const Transaction = require('./transaction');

class CanceledTransaction extends TransactionProtocol {

  constructor (id, rollbackId, collection, operations,callbacks) {
    super(id, rollbackId, collection, operations,callbacks);
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
