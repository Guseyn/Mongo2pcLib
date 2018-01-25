'use strict'

const AsyncObject = require('./../../../oop/asyncObject');

class FailedTransactionState extends AsyncObject {

  constructor({transaction}) {
    super({transaction});
  }

  call(asyncCall) {
    super.call(asyncCall, this.id);
  }

  onResult(result) {
    // FailedTransaction
    this.transaction.failState().out();
  }

  onError(error) {

    this.transaction.nonConsistentFail(
      new Error(
        `faled on changing state of the transaction to fail state with error: ${error.message}`
      )
    );

  }

}

module.exports = FailedTransactionState;
