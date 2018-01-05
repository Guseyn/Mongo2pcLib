'use strict'

class TransactionOperations {

	constructor({
		transactionId,
		rollbackTransactionId,
		operations,
		operationNum
	}) {
		this.transactionId = transactionId;
		this.rollbackTransactionId = rollbackTransactionId;
		this.operations = operations;
		this.currentOperationNum = operationNum || 0;
	}

	executeCurrent(results, executeCallback) {
		this.current().executeRequest(results, executeCallback);
	}

	inc() {
		this.currentOperationNum += 1;
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

	rollbackTransactionOprations() {
		if (this.rollbackTransactionId) {
			return new TransactionOperations(sliceByCurrentNum().map(operation => operation.rollbackOperation()));
		} else {
			throw new Error('can not be applied to a transaction without a provided rollbackTransactionId');
		}
	}

	initialTransactionLog() {
		return {
			_id: this.transactionId,
			rollbackId: this.rollbackTransactionId,
			state: 'initial',
			requestsLog: this.operations.map(operation => operation.requestLog()),
			rollbackRequestsLog: this.operations.map(operation => operation.rollbackRequestLog()),
			lastModified: new Date()
		}
	}


}

module.exports = TransactionOperations;
