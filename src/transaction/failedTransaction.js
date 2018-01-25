'use strict'

const TransactionProtocol = require('./transactionProtocol');

class FailedTransaction extends TransactionProtocol {

    constructor (id, rollbackId, collection, operations, callbacks) {
      super(id, rollbackId, collection, operations, callbacks);
    }

    out() {
      super.nonConsistentFail(
        new Error(
          `error: transaction failed, but consistency of the db is not broken`
        )
      );
    }

}

module.exports = FailedTransaction;
