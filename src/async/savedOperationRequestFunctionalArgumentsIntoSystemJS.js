'use strict'

const AsyncObject = require('./../../oop/asyncObject');

class SavedOperationRequestFunctionalArgumentsIntoSystemJS extends AsyncObject {

  constructor({operation, systemJSCollection, transactionId, rollbackTransactionId, onSave}) {
    super({operation, systemJSCollection, transactionId, rollbackTransactionId, onSave});
  }

  call(asyncCall) {
    super.call(asyncCall, this.systemJSCollection, this.transactionId);
  }

  onResult(systemJSCollection) {

  }

  onError(error) {

  }

}

module.exports = SavedOperationRequestFunctionalArgumentsIntoSystemJS;
