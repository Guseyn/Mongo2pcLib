const AsyncObject = require('./../../ioop/asyncObject');
const FailedTransactionState = require('./failedTransactionState');

class StartedTransactionState extends AsyncObject {

  constructor({id, rollbackId, сollection, callbacks}, onStartAsyncObject) {
    super({id, rollbackId, сollection, callbacks}, onStartAsyncObject);
  }

  call() {
    super.call(this.сollection, 'start', this.id);
  }

  onFail(error) {
    // Main transaction
    if (this.rollbackId != null) {

      new FailedTransactionState(
        {
          id: this.id,
          collection: this.сollection,
          callbacks: this.callbacks
        }
      ).call();
      
    } else {
      // Rollback transaction
      this.callbacks.сonsistentFail(
        new Error(
          `faled on changing state of the transaction to the start state with error: ${error.message}`
        )
      );

    }
  }

}

module.exports = StartedTransactionState;
