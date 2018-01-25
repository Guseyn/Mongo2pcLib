'use strict'

const AsyncObject = require('./../../../oop/asyncObject');
const CanceledTransactionState = require('./canceledTransactionState');

class AppliedTransactionState extends AsyncObject {

  constructor({pendingTransaction, results}) {
    super({pendingTransaction, results});
  }

  call(asyncCall, initialTransactionLog) {
    super.call(asyncCall, initialTransactionLog);
  }

  onResult(result) {
    // AppliedTransaction
    this.pendingTransaction.applyState().finish(this.results)
  }

  onError(error) {
    new CanceledTransactionState({
      pendingTransaction: this.pendingTransaction,
      errorMessage: `cannot applied transaction: ${error.mesasge}`
    }).call('logCancelState');
  }

}

module.exports = AppliedTransactionState;
