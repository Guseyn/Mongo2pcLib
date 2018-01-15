'use strict'

class FailedTransaction {

    constructor (id, rollbackId, collection, operations, callbacks) {
        this.id = id;
        this.rollbackId = rollbackId;
        this.transactionCollection = collection;
        this.transactionOperations = operations;
        this.transactionCallbacks = callbacks;
    }

    out() {
      this.transactionCallbacks.nonConsistentFail(
        new Error(
            `error: transaction failed, but consstency of the db is not broken`
        ), this.id
      );
    }

}

module.exports = FailedTransaction;
