const AsyncObject = require('./../../../oop/asyncObject');
const UpgradedTransactionState = require('./upgradedTransactionState');
const AppliedTransactionState = require('./appliedTransactionState');
const CanceledTransactionState = require('./canceledTransactionState');
const AppliedTransaction = require('./../appliedTransaction');
const CanceledTransaction = require('./../canceledTransaction');

class ExecutedOperation extends AsyncObject {

  constructor({pendingTransaction}) {
    super({pendingTransaction});
  }

  call(asyncCall) {
    super.call(asyncCall, this.results);
  }

  onResult(result) {

    this.results.push(result);

    if (this.transactionOperations.isLast()) {

      new AppliedTransactionState({
        pendingTransaction: this.pendingTransaction,
        results: this.results
      }).call('logAppliedState', result);

    } else {

      new UpgradedTransactionState({
        pendingTransaction: this.pendingTransaction,
        results: this.results
      }).call('logNextPendingState', result);

    }
        
  }

  onError(error) {
    new CanceledTransactionState({
      pendingTransaction: this.pendingTransaction,
      errorMessage: `cannot execute operation with number ${this.pendingTransaction.currentNum()}: ${error.mesasge}`
    }).call('logCancelState');
  }

}

module.exports = ExecutedOperation;
