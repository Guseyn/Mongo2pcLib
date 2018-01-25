const AsyncObject = require('./../../../oop/asyncObject');
const FailedTransactionState = require('./failedTransactionState');

class StartedTransactionState extends AsyncObject {

  constructor({invokedTransaction}) {
    super({invokedTransaction});
  }

  call(asyncCall) {
    super.call(asyncCall);
  }

  onResult(result) {
    // PendingTransaction
    this.invokedTransaction.nextState().upgrade();
  }

  onError(error) {
    this.invokedTransaction.fail(error);
  }

}

module.exports = StartedTransactionState;
