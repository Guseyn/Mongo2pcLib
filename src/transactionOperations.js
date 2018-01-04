class TransactionOperations {

	constructor(operations, rollbackId, operationNum) {
		this.operations = operations;
		this.rollbackId = rollbackId;
		this.currentOperationNum = operationNum || 0;
	}

	executeCurrent(executeCallback) {
		this.current().executeRequest(executeCallback);
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
		// TO DO: first
	}

	log() {
		return this.operations.map(operation => operation.requestLog());
	}

}

module.exports = TransactionOperations;
