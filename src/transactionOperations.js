'use strict'

const SavedOperationRequestFunctionalArgumentsIntoSystem = require('./async/savedOperationRequestFunctionalArgumentsIntoSystemJS');

class TransactionOperations {

  constructor (...operations) {
    this.operations = operations;
    this.currentOperationNum = 0;
  }

  executeCurrent (results, onExecute) {
    this.current().executeRequest(
      results, onExecute
    );
  }

  next (num) {
    this.currentOperationNum += num || 1;
    return this;
  }

  isLast() {
    return this.currentOperationNum === this.operations.length - 1;
  }

  isEmpty() {
    return this.operations.length === 0;
  }

  current() {
    return this.operations[this.currentNum()];
  }

  currentNum() {
    return this.currentOperationNum;
  }

  sliceByCurrentNum() {
    return this.operations.slice(0, this.currentNum());
  }

  rollbackAll() {
    return new TransactionOperations(this.sliceByCurrentNum().map(operation => operation.rollbackOperation()));
  }

  saveFunctionalArgumentsIntoSystemJS (systemJSCollection, transactionId, rollbackTransactionId, onSave) {

    let savedCount = {value: 0};
    let operationsLength = this.operations.length;

    this.operations.forEach(
      (operation, index) => {

        (function(operation, index) {

          new SavedOperationRequestFunctionalArgumentsIntoSystem({
            operation,
            systemJSCollection, 
            transactionId,
            rollbackTransactionId, 
            index,
            savedCount,
            operationsLength,
            onSave
          }).call('saveRequestFunctionalArgumentsIntoSystemJS');
      
        })(operation, index);
      
      });
    
  }

  removeFunctionalArgumentsFromSystemJS (systemJSCollection, transactionId, rollbackTransactionId, onRemove) {

    systemJSCollection.deleteMany({
      transactionId: {
        $in:[transactionId].concat(
          rollbackTransactionId != null 
          ? [rollbackTransactionId] 
          : []
        )
      }
    }, onRemove);

  }

  requestLog() {
    return this.operations.map(operation => operation.requestLog());
  }

  rollbackRequestLog() {
    return this.operations.map(operation => operation.rollbackRequestLog());
  }

}

module.exports = TransactionOperations;
