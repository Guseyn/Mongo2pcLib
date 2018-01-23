'use strict'

class TransactionProtocol {

	constructor(id, rollbackId, сollection, operations, callbacks) {
		this.id = id;
    this.rollbackId = rollbackId;
    this.transactionCollection = сollection;
    this.transactionOperations = operations;
    this.transactionCallbacks = callbacks;
	}

	consistentFail(error) {
		this.transactionCallbacks.consistentFail(error, this.id);
	}

	nonConsistentFail(error) {
		this.transactionCallbacks.nonConsistentFail(error, this.id);
	}

	logState() {
		
	}

	nextState() {
		return {};
	}

	failState() {
		return {};
	}

}

module.exports = TransactionProtocol;
