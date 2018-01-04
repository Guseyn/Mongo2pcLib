class TransactionOperations {

	constructor(rollbackId, ...operations) {
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
		this.currentOperationNum === this.operations.length - 1;
	}

	current() {
		return this.operations[this.currentNum()];
	}

	currentNum() {
		return this.currentOperationNum;
	}

}

module.exports = TransactionOperations;
