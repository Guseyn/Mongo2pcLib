'use strict'

const AsyncObject = require('./../../oop/asyncObject');

class SavedOperationRollbackRequestFunctionalArgumentsIntoSystemJS extends AsyncObject {

  constructor ({
    operation,
    systemJSCollection,
    transactionId,
    rollbackTransactionId,
    index,
    savedCount,
    operationsLength,
    onSave
  }) {
    super({
      operation,
      systemJSCollection,
      transactionId,
      rollbackTransactionId,
      index,
      savedCount,
      operationsLength,
      onSave
    });
  }

  call (asyncCall) {
    super.call(asyncCall, this.systemJSCollection, this.transactionId);
  }

  onResult (result) {
    this.savedCount.value += 1;
    if (this.savedCount.value === this.operationsLength - 1) {
      this.onSave (null);
    }
  }

  onError (error) {
  	this.onSave(
  		new Error(
  			`error while saving rollback request functional args of operation with number ${index}, error:${error.message}`
      )
    );
  }

}

module.exports = SavedOperationRollbackRequestFunctionalArgumentsIntoSystemJS;
