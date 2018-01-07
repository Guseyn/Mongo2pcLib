
const PendingTransaction = require('./pendingTransaction');

class InvokedTransaction {

	constructor(transactionEnvironment, transactionOperations, transactionCallbacks) {
		this.transactionEnvironment = transactionEnvironment;
		this.transactionOperations = transactionOperations;
		this.transactionCallbacks = transactionCallbacks;
	}

	start() {
		this.transactionEnvironment.start((error, result) => {
			if (error == null) {
				new PendingTransaction(
					this.transactionEnvironment,
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
