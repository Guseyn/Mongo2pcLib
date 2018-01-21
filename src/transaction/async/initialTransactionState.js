const AsyncObject = require('./../../../oop/asyncObject');
const InvokedTransaction = require('./../invokedTransaction');

class InitialTransactionState extends AsyncObject {

  constructor(asyncFunc, args) {
    super(asyncFunc, args);
  }

  call(asyncCall, initialTransactionLog) {
    super.call(asyncCall, initialTransactionLog);
  }

  onResult(result) {
    new InvokedTransaction(
      this.id,
      this.rollbackId,
      this.transactionCollection,
      this.transactionOperations,
      this.transactionCallbacks
    ).start();
  }

  onError(error) {
    // Main transaction
    if (rollbackId != null) {
      this.transactionCallbacks.nonConsistentFail(
        new Error(
          `transaction init error: ${error.message}`
        ), this.id
      );
    } else {
      // Rollback transaction
      this.transactionCallbacks.consistentFail(
        new Error(
          `transaction init error: ${error.message}`
        ), this.id
      );
    }
  }

}

module.exports = InitialTransactionState;
