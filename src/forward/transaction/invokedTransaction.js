
const PendingTransaction = require('./pendingTransaction');

class InvokedTransaction {

	constructor(transactionDbState, transactionOperations, transactionCallbacks) {
		this.transactionDbState = transactionDbState;
		this.transactionOperations = transactionOperations;
		this.transactionCallbacks = transactionCallbacks;
	}

	start() {
		this.transactionDbState.start((error, result) => {
			if (error == null) {
				new PendingTransaction(
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
