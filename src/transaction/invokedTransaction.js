'use strict'

const TransactionProtocol = require('./transactionProtocol');
const PendingTransaction = require('./pendingTransaction');
const FailedTransaction = require('./failedTransaction');
const StartedTransactionState = require('./async/startedTransactionState');

class InvokedTransaction extends TransactionProtocol {

  constructor (id, rollbackId, collection, operations, callbacks) {
    super(id, rollbackId, collection, operations, callbacks);
  }

  logState(onStart) {
    this.transactionCollection.start(this.id, onStart);
  }

  nextState() {
    return new PendingTransaction(
      this.id, this.rollbackId,
      this.transactionCollection,
      this.transactionOperations,
      this.transactionCallbacks
    );
  }

  failState() {
    return new FailedTransaction(
      this.id, this.rollbackId,
      this.transactionCollection,
      this.transactionOperations,
      this.transactionCallbacks
    );
  }

  start() {
    new StartedTransactionState({
      invokedTransaction: this
    }).call('logState');
  }

  fail(error) {

    if (this.rollbackId != null) {

      new FailedTransactionState({
        pendingTransaction: this
      }).call('fail', this.id);
      
    } else {

      this.сonsistentFail(
        new Error(
          `faled on changing state of the transaction to fail state with error: ${error.message}`
        )
      );

    }

  }

}

module.exports = InvokedTransaction;
