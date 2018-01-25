const AsyncObject = require('./../../../oop/asyncObject');
const InvokedTransaction = require('./../invokedTransaction');

class InitialTransactionState extends AsyncObject {

  constructor({preparedTransaction}) {
    super({preparedTransaction});
  }

  call(asyncCall, initialTransactionLog) {
    super.call(asyncCall, initialTransactionLog);
  }

  onResult(result) {
    // InvokedTransaction
    this.preparedTransaction.nextState().start();
  }

  onError(error) {
    this.preparedTransaction.fail(error);
  }

}

module.exports = InitialTransactionState;
