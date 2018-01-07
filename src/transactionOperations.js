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

	next() {
		return new TransactionOperations({
			transactionId: this.transactionId,
			rollbackTransactionId: this.rollbackTransactionId,
			operations: this.operations,
			operationNum: this.currentOperationNum + 1
		});
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
			return new TransactionOperations({
				transactionId: this.rollbackTransactionId,
				operations: sliceByCurrentNum().map(operation => operation.rollbackOperation())
			});
		} else {
			throw new Error('can not be applied to a transaction without a provided rollbackTransactionId');
		}
	}

	saveFunctionalArgumentsIntoSystemJS(systemJSCollection, saveCallback) {
		
		let savedOperationsCount = 0;
		
		this.operations.forEach((operation, index) => {

			operation.saveRequestFunctionalArgsIntoSystemJS(systemJSCollection, this.transactionId, (error) => {

				if (error != null) {
					throw new Error(`error while saving request functional args of operation with number ${index}, error:${error}`);
				}

				if (this.rollbackTransactionId) {
					
					operation.saveRollbackRequestFunctionalArgsIntoSystemJS(systemJSCollection, this.rollbackTransactionId, (error) => {
						
						if (error != null) {
							throw new Error(`error while saving rollback request functional args of operation with number ${index}, error:${error}`);
						}

						savedOperationsCount += 1;
						if (savedOperationsCount === this.operations.length - 1) {
							saveCallback();
						}

					});

				} else {
					
					savedOperationsCount += 1;
					if (savedOperationsCount === this.operations.length - 1) {
						saveCallback();
					}

				}
			});

		});
		
	}

	removeFunctionalArgsFromSystemJS(systemJSCollection, removeCallback) {
		systemJSCollection.deleteMany({_id: this.transactionId}, removeCallback);
	}

	initialTransactionLog() {
		return {
			_id: this.transactionId,
			rollbackId: this.rollbackTransactionId || null,
			state: 'initial',
			requestsLog: this.operations.map(operation => operation.requestLog()),
			rollbackRequestsLog: this.operations.map(operation => operation.rollbackRequestLog()),
			lastModified: new Date()
		}
	}


}

module.exports = TransactionOperations;
