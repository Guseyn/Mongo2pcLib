
'use strict'

class Operation {

  constructor (request, rollbackRequest) {
    this.request = request;
    this.rollbackRequest = rollbackRequest;
  }

  rollbackOperation() {
    return new Operation(this.rollbackRequest);
  }

  executeRequest (results, requestCallback) {
    this.request.execute(results, requestCallback);
  }

  saveRequestFunctionalArgumentsIntoSystemJS (systemJSCollection, transactionId, onSave) {

    this.request.saveFunctionalArgumentsIntoSystemJS (
      systemJSCollection, transactionId, onSave
    );

  }

  saveRollbackRequestFunctionalArgumentsIntoSystemJS (systemJSCollection, transactionId, onSave) {
    if (!this.rollbackRequest) {
      throw new Error('saveRollbackRequestFunctionalArgumentsIntoSystemJS is not supported for the current(rollback) transaction');
    }
    this.rollbackRequest.saveFunctionalArgumentsIntoSystemJS (
      systemJSCollection, transactionId, onSave
    );
  }

  requestLog() {
    return this.request.log();
  }

  rollbackRequestLog() {
    if (!this.rollbackRequest) {
      throw new Error('rollbackRequestLog is not supported for the current(rollback) transaction');
    }
    return this.rollbackRequest.log();
  }

}

module.exports = Operation;
