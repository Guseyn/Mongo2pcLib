'use strict'

const AccessedSystemJS = require('./../async/accessedSystemJS');
const SavedFunctionalArguments = require('./../async/savedFunctionalArguments');
const InitialTransactionState = require('./../async/initialTransactionState');

class Transaction {

  constructor (id, rollbackId, сollection, operations, callbacks) {
    this.id = id;
    this.rollbackId = rollbackId;
    this.transactionCollection = сollection;
    this.transactionOperations = operations;
    this.transactionCallbacks = callbacks;
  }

  invoke() {
    if (this.transactionOperations.isEmpty()) {

      this.transactionCallbacks.commit();

    } else {

      let initialTransactionLog = this.transactionCollection.initialTransactionLog(
        this.id, this.rollbackId, this.transactionOperations
      );

      new AccessedSystemJS(
        {transaction: this},
        new SavedFunctionalArguments(
          {transaction: this}
        ), new InitialTransactionState(
          {transaction: this, initialTransactionLog: initialTransactionLog}
        )
      ).call();
    
    }
  }

  systemJS (onAccess) {
    this.transactionCollection.systemJS(onAccess);
  }

  accessSystemJSFail(error) {
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

  saveFunctionalArgumentsIntoSystemJS(systemJSCollection, onSave) {
    this.transactionOperations.saveFunctionalArgumentsIntoSystemJS(
      systemJSCollection, this.id, this.rollbackId, onSave
    );
  }

  saveFunctionalArgumentsFail(error) {
    // Main Transaction
    if (this.rollbackId != null) {
      this.transactionCallbacks.nonConsistentFail(
        new Error(
          `cannot save argFuncs: ${error.message}`
        ), this.id
      );
    } else {
      // Rollback transaction
      this.transactionCallbacks.consistentFail(
        new Error(
          `cannot save argFuncs: ${error.message}`
        ), this.id
      );
    }
  }

  init (initialTransactionLog, onInit) {
    this.transactionCollection.init(initialTransactionLog, onInit);
  }

  initFail(error) {
    // Main transaction
    if (this.rollbackId != null) {
      this.nonConsistentFail(
        new Error(
          `transaction init error: ${error.message}`
        )
      );
    } else {
      // Rollback transaction
      this.consistentFail(
        new Error(
          `transaction init error: ${error.message}`
        )
      );
    }
  }

}

module.exports = Transaction;
