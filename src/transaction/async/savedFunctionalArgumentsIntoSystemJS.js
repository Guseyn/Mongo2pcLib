const AsyncObject = require('./../../../oop/asyncObject');
const PreparedTransaction = require('./../preparedTransaction');

class SavedFunctionalArgumentsIntoSystemJS extends AsyncObject {

  constructor(asyncFunc, args) {
    super(asyncFunc, args);
  }

  call(asyncCall, systemJSCollection) {
    super.call(asyncCall, systemJSCollection, this.id, this.rollbackId);
  }

  onResult(result) {
    new PreparedTransaction(
      this.id, this.rollbackId,
      this.transactionCollection,
      this.transactionOperations,
      this.transactionCallbacks
    ).invoke();
  }

  onError(error) {
    this.transactionCallbacks.nonConsistentFail(error, this.id);
  }

}

module.exports = SavedFunctionalArgumentsIntoSystemJS;
