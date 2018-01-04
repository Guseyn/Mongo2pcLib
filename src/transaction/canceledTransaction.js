


class CancelledTransaction {

	constructor(transactionDbState, transactionOperations, transactionCallbacks) {
		this.transactionDbState = transactionDbState;
		this.transactionOperations = transactionOperations;
		this.transactionCallbacks = transactionCallbacks;
	}

	rollback() {
		
	}

}

module.exports = InvokedTransaction;
