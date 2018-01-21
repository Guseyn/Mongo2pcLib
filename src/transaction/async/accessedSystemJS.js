const AsyncObject = require('./../../../oop/asyncObject');
const SavedFunctionalArgumentsIntoSystemJS = require('./savedFunctionalArgumentsIntoSystemJS');

class AccessedSystemJS extends AsyncObject {

  constructor(asyncFunc, args) {
    super(asyncFunc, args);
  }

  call(asyncCall) {
    super.call(asyncCall);
  }

  onResult(systemJSCollection) {
    new SavedFunctionalArgumentsIntoSystemJS(
      this.transactionOperations,
      {
        id: this.id,
        rollbackId: this.rollbackId,
        transactionCollection: this.transactionCollection,
        transactionOperations: this.transactionOperations,
        transactionCallbacks: this.transactionCallbacks
      }
    ).call('saveFunctionalArgumentsIntoSystemJS', systemJSCollection);
  }

  onError(error) {
    // Main transaction
    if (this.rollbackId != null) {
      this.transactionCallbacks.nonConsistentFail(
        new Error(
          `systemJS error is not accessable: ${error.message}`
        ), this.id
      );
    } else {

      // Rollback transcation
      this.transactionCallbacks.consistentFail(
        new Error(
          `systemJS error is not accessable: ${error.message}`
        ), this.id
      );

    }
  }

}

module.exports = AccessedSystemJS;
