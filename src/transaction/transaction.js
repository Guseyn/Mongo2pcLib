'use strict'

const TransactionProtocol = require('./transactionProtocol');
const PreparedTransaction = require('./preparedTransaction');
const AccessedSystemJS = require('./async/accessedSystemJS');

class Transaction extends TransactionProtocol {

  constructor (id, rollbackId, сollection, operations, callbacks) {
    super(id, rollbackId, сollection, operations, callbacks);
  }

  consistentFail(error) {
    super.consistentFail(error);
  }

  nonConsistentFail(error) {
    super.nonConsistentFail(error);
  }

  logState() {
    
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
    new AccessedSystemJS(this, {}).call('systemJS');
  }
  
  systemJS(onAccess) {
    this.transactionCollection.systemJS(onAccess);
  }

  saveFunctionalArgumentsIntoSystemJS(systemJSCollection, onSave) {
    this.transactionOperations.saveFunctionalArgumentsIntoSystemJS(
      systemJSCollection, this.id, this.rollbackId, onSave
    );
  }

}

module.exports = Transaction;
