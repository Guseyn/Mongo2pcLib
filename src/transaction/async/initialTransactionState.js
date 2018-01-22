const AsyncObject = require('./../../../oop/asyncObject');
const InvokedTransaction = require('./../invokedTransaction');

class InitialTransactionState extends AsyncObject {

  constructor(obj, args) {
    super(obj, args);
  }

  call(asyncCall, initialTransactionLog) {
    super.call(asyncCall, initialTransactionLog);
  }

  onResult(result) {
    this.obj.nextState().start();
  }

  onError(error) {
    // Main transaction
    if (rollbackId != null) {
      this.obj.nonConsistentFail(
        new Error(
          `transaction init error: ${error.message}`
        )
      );
    } else {
      // Rollback transaction
      this.obj.consistentFail(
        new Error(
          `transaction init error: ${error.message}`
        )
      );
    }
  }

}

module.exports = InitialTransactionState;
