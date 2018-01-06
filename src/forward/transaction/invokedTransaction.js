
const PendingTransaction = require('./pendingTransaction');

class InvokedTransaction {

	constructor(db, transactionDbState, transactionOperations, transactionCallbacks) {
		this.db = db,
		this.transactionDbState = transactionDbState;
		this.transactionOperations = transactionOperations;
		this.transactionCallbacks = transactionCallbacks;
	}

	start() {
		this.transactionDbState.start((error, result) => {
			if (error == null) {
				new PendingTransaction(
					this.db,
					this.transactionDbState,
					this.transactionOperations,
					this.transactionCallbacks
				).upgrade([]);
			} else {
				console.log('start error');
				console.log(error);
				// cancel transaction
			}
		});
	}

}

module.exports = InvokedTransaction;
