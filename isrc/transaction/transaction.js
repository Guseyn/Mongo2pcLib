'use strict'

const AccessedSystemJS = require('./../async/accessedSystemJS');
const SavedFunctionalArguments = require('./../async/savedFunctionalArguments');
const InitialTransactionState = require('./../async/initialTransactionState');
const StartedTransactionState = require('./../async/startedTransactionState');
const ExecutedOperation = require('./../async/executedOperation');

class Transaction {

  constructor (id, rollbackId, сollection, operations, callbacks) {
    let initialTransactionLog = сollection.initialTransactionLog(
      id, rollbackId, operations
    );
    let results = [];
    this.transactionFlow = new AccessedSystemJS(
      {id, rollbackId, сollection, callbacks},
      new SavedFunctionalArguments(
        {id, rollbackId, operations, callbacks},
        new InitialTransactionState(
          {id, rollbackId, сollection, callbacks, initialTransactionLog},
          new StartedTransactionState(
            {id, rollbackId, сollection, callbacks},
            new ExecutedOperation(
              {id, rollbackId, сollection, operations, callbacks, results},
              
            )
          )
        )
      )
    );
  }

  invoke() {
    this.transactionFlow.call();
  }

}

module.exports = Transaction;
