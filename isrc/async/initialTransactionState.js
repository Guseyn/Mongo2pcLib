const AsyncObject = require('./../../ioop/asyncObject');

class InitialTransactionState extends AsyncObject {

  constructor({id, rollbackId, сollection, callbacks, initialTransactionLog}, onInitAsyncObject) {
    super({id, rollbackId, сollection, callbacks, initialTransactionLog}, onInitAsyncObject);
  }

  call() {
    super.call(this.сollection, 'init', this.initialTransactionLog);
  }

  onFail(error) {
  	// Main transaction
    if (this.rollbackId != null) {
      this.callbacks.nonConsistentFail(
        new Error(
          `transaction init error: ${error.message}`
        ), this.id
      );
    } else {
      // Rollback transaction
      this.callbacks.consistentFail(
        new Error(
          `transaction init error: ${error.message}`
        ), this.id
      );
    }
  }

}

module.exports = InitialTransactionState;
