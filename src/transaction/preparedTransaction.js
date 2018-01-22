
'use strict'

const TransactionProtocol = require('./transactionProtocol');
const InvokedTransaction = require('./invokedTransaction');
const InitialTransactionState = require('./async/initialTransactionState');

class PreparedTransaction extends TransactionProtocol {

  constructor (id, rollbackId, collection, operations, callbacks) {
    super(id, rollbackId, collection, operations, callbacks);
  }

  logState(initialTransactionLog, onInit) {
    this.transactionCollection.init(initialTransactionLog, onInit);
  }

  nextState() {
    return new InvokedTransaction(
      this.id, this.rollbackId,
      this.transactionCollection,
      this.transactionOperations,
      this.transactionCallbacks
    );
  }

  invoke() {

    if (this.transactionOperations.isEmpty()) {

      this.transactionCallbacks.commit();
      
    } else {

      let initialTransactionLog = this.transactionCollection.initialTransactionLog(
        this.id, this.rollbackId, this.transactionOperations
      );

      new InitialTransactionState(this, {}).call('logState', initialTransactionLog);
      
    }
  }
}


module.exports = PreparedTransaction;
