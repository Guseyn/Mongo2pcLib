class AppliedTransaction {

	constructor(transactionDbState, transactionOperations, transactionCallbacks) {
		this.transactionDbState = transactionDbState;
		this.transactionOperations = transactionOperations;
		this.transactionCallbacks = transactionCallbacks;
	}

	finish(results) {
		this.transactionCallbacks.commit(results);
	}

}

module.exports = AppliedTransaction;