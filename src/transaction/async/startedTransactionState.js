const AsyncObject = require('./../../../oop/asyncObject');
const PendingTransaction = require('./../pendingTransaction');
const FailedTransactionState = require('./failedTransactionState');

class StartedTransactionState extends AsyncObject {

  constructor(asyncFunc, args) {
    super(asyncFunc, args);
  }

  call(asyncCall) {
    super.call(asyncCall, this.id);
  }

  onResult(result) {
    new PendingTransaction(
      this.id,
      this.rollbackId,
      this.transactionCollection,
      this.transactionOperations,
      this.transactionCallbacks
    ).upgrade();
  }

  onError(error) {

    if (this.rollbackId != null) {

      new FailedTransactionState(
        this.transactionCollection,
        {
          id: this.id, 
          rollbackId: this.rollbackId,
          transactionCollection: this.transactionCollection,
          transactionOperations: this.transactionOperations,
          transactionCallbacks: this.transactionCallbacks
        }
      ).call('fail', this.id);
      
    } else {

      this.transactionCallbacks.сonsistentFail(
        new Error(
          `faled on changing state of the transaction to fail state with error: ${error.message}`
        ), this.id
      );

    }
  }

}

module.exports = StartedTransactionState;
