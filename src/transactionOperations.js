class TransactionOperations {

	constructor(rollbackId, operations) {
		this.rollbackId = rollbackId;
		this.operations = operations;
		this.currentOperationNum = 0;
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

	log() {
		return this.operations.map(operation => operation.requestLog());
	}

}

module.exports = TransactionOperations;
