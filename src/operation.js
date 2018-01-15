
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

  saveRequestFunctionalArgsIntoSystemJS (systemJSCollection, transactionId, saveCallback) {

    this.rollbackRequest.saveFunctionalArgsIntoSystemJS (
      systemJSCollection, transactionId, saveCallback
    );

  }

  saveRollbackRequestFunctionalArgsIntoSystemJS (systemJSCollection, transactionId, saveCallback) {
    if (!this.rollbackRequest) {
      throw new Error('saveRollbackRequestFunctionalArgsIntoSystemJS is not supported for the current(rollback) transaction');
    }
    this.rollbackRequest.saveFunctionalArgsIntoSystemJS (
      systemJSCollection, transactionId, saveCallback
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
