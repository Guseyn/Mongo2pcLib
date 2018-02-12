const AsyncObject = require('./../../ioop/asyncObject');

class SavedFunctionalArguments extends AsyncObject {

  constructor({id, rollbackId, operations, callbacks}, onSavedAsyncObject) {
    super({id, rollbackId, operations, callbacks}, onSavedAsyncObject);
  }

  call(systemJSCollection) {
    super.call(this.operations,'saveFunctionalArgumentsIntoSystemJS', systemJSCollection, this.id, this.rollbackId);
  }

  onFail(error) {
    // Main Transaction
    if (this.rollbackId != null) {
      this.callbacks.nonConsistentFail(
        new Error(
          `cannot save argFuncs: ${error.message}`
        ), this.id
      );
    } else {
      // Rollback transaction
      this.callbacks.consistentFail(
        new Error(
          `cannot save argFuncs: ${error.message}`
        ), this.id
      );
    }
  }

}

module.exports = SavedFunctionalArguments;
