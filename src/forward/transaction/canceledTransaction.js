
class CancelledTransaction {

	constructor(db, transactionDbState, transactionOperations, transactionCallbacks) {
		this.db = db,
		this.transactionDbState = transactionDbState;
		this.transactionOperations = transactionOperations;
		this.transactionCallbacks = transactionCallbacks;
	}

	rollback() {
		
	}

}

module.exports = InvokedTransaction;
