const AsyncObject = require('./../../../oop/asyncObject');
const FailedTransaction = require('./../failedTransaction');

class FailedTransactionState extends AsyncObject {

  constructor(asyncFunc, args) {
    super(asyncFunc, args);
  }

  call(asyncCall) {
    super.call(asyncCall, this.id);
  }

  onResult(result) {
    new FailedTransaction(
      this.id,
      this.rollbackId,
      this.transactionCollection,
      this.transactionOperations,
      this.transactionCallbacks
    ).out();
  }

  onError(error) {

    this.transactionCallbacks.nonConsistentFail(
      new Error(
        `faled on changing state of the transaction to fail state with error: ${error.message}`
      ), this.id
    );

  }

}

module.exports = FailedTransactionState;
