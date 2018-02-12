'use strict'

const TransactionProtocol = require('./transactionProtocol');
const PreparedTransaction = require('./preparedTransaction');
const AccessedSystemJSForSavingFunctionalArguments = require('./async/accessedSystemJSForSavingFunctionalArguments');

class Transaction extends TransactionProtocol {

  constructor (id, rollbackId, сollection, operations, callbacks) {
    super(id, rollbackId, сollection, operations, callbacks);
  }

  nextState() {
    return new PreparedTransaction(
      this.id, this.rollbackId,
      this.transactionCollection,
      this.transactionOperations,
      this.transactionCallbacks
    );
  }

  //API alias
  invoke() {this.prepare();}

  prepare () {
    new AccessedSystemJSForSavingFunctionalArguments({
      transaction: this
    }).call('systemJS');
  }

  fail(error) {
    // Main transaction
    if (this.rollbackId != null) {
      this.nonConsistentFail(
        new Error(
          `systemJS error is not accessable: ${error.message}`
        )
      );
    } else {
      // Rollback transcation
      this.consistentFail(
        new Error(
          `systemJS error is not accessable: ${error.message}`
        )
      );
    }
  }

  systemJS (onAccess) {
    this.transactionCollection.systemJS(onAccess);
  }

  saveFunctionalArgumentsIntoSystemJS (systemJSCollection, onSave) {
    this.transactionOperations.saveFunctionalArgumentsIntoSystemJS(
      systemJSCollection, this.id, this.rollbackId, onSave
    );
  }

}

module.exports = Transaction;
