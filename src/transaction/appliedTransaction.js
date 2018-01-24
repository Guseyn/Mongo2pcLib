'use strict'

const TransactionProtocol = require('./transactionProtocol');
const AccessedSystemJSForRemovingFunctionalArguments = require('./async/accessedSystemJSForRemovingFunctionalArguments');

class AppliedTransaction extends TransactionProtocol {

  constructor (id, rollbackId, collection, operations, callbacks) {
    super(id, rollbackId, collection, operations, callbacks);
  }

  finish (results) {
    new AccessedSystemJSForRemovingFunctionalArguments({
      appliedTransaction: this,
      results: results
    }).call('systemJS');
  }

  commit(results) {
    this.transactionCallbacks.commit(this.id, results);
  }

  systemJS(onAccess) {
    this.transactionCollection.systemJS(onAccess);
  }

  removeFunctionalArgumentsFromSystemJS(systemJSCollection, onRemove) {
    this.transactionOperations.removeFunctionalArgumentsFromSystemJS(
      systemJSCollection, this.id, this.rollbackId, onRemove
    );
  }

}

module.exports = AppliedTransaction;
