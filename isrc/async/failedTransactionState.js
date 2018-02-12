const AsyncObject = require('./../../ioop/asyncObject');

// Use only for non-consistent failures
class FailedTransactionState extends AsyncObject {

  constructor({id, сollection, callbacks}) {
    super({id, сollection, callbacks});
  }

  call() {
    this.callbacks.nonConsistentFail(
      new Error(
        `error: transaction failed, but consistency of the db is not broken`
      ), this.id
    );
  }

  onFail(error) {
    this.callbacks.nonConsistentFail(
      new Error(
        `faled on changing state of the transaction to fail state with error: ${error.message}`
      ), this.id
    );
  }

}

module.exports = FailedTransactionState;
