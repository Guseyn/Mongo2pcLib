'use strict'

const AccessedSystemJS = require('./async/accessedSystemJS');

class Transaction {

  constructor (id, rollbackId, сollection, operations, callbacks) {
    this.id = id;
    this.rollbackId = rollbackId;
    this.transactionCollection = сollection;
    this.transactionOperations = operations;
    this.transactionCallbacks = callbacks;
  }

  //API alias
  invoke() {this.prepare();}

  prepare () {

    new AccessedSystemJS(
      this.transactionCollection,
      {
        id: this.id, 
        rollbackId: this.rollbackId,
        transactionCollection: this.transactionCollection,
        transactionOperations: this.transactionOperations,
        transactionCallbacks: this.transactionCallbacks
      }
    ).call('systemJS');

  }

}

module.exports = Transaction;
