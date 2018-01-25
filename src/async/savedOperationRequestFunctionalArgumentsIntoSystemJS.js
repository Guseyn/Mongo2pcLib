'use strict'

const AsyncObject = require('./../../oop/asyncObject');
const SavedOperationRollbackRequestFunctionalArgumentsIntoSystemJS = require('./savedOperationRollbackRequestFunctionalArgumentsIntoSystemJS');

class SavedOperationRequestFunctionalArgumentsIntoSystemJS extends AsyncObject {

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
    super ({
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
  	if (this.rollbackTransactionId != null) {

  		new SavedOperationRollbackRequestFunctionalArgumentsIntoSystemJS({
  			operation: this.operation,
  			systemJSCollection: this.systemJSCollection,
        transactionId: this.rollbackTransactionId,
        rollbackTransactionId: null,
        index: this.index,
        savedCount: this.savedCount,
        operationsLength: this.operationsLength,
        onSave: this.onSave
    	}).call('saveRollbackRequestFunctionalArgumentsIntoSystemJS');

    } else {
    	this.savedCount.value += 1;
    	if (this.savedCount.value === this.operationsLength - 1) {
    		this.onSave(null);
    	}
    }
  }

  onError (error) {
  	this.onSave(
  		new Error(
  			`error while saving request functional args of operation with number ${index}, error:${error.message}`
      )
    );
  }

}

module.exports = SavedOperationRequestFunctionalArgumentsIntoSystemJS;
