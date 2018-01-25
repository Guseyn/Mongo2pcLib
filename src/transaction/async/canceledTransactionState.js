const AsyncObject = require('./../../../oop/asyncObject');

class CanceledTransactionState extends AsyncObject {

  constructor({pendingTransaction}) {
    super({pendingTransaction});
  }

  call(asyncCall) {
    super.call(asyncCall);
  }

  onResult(result) {
    // CanceledTransaction (only in the main Transaction)
    this.pendingTransaction.cancelState().rollback();
  }

  onError(error) {
    // Only in the main transaction
    this.pendingTransaction.consistentFail(
      new Error(this.errorMessage)
    );
  }

}

module.exports = CanceledTransactionState;
