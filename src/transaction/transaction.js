'use strict'

const PreparedTransaction = require('./preparedTransaction');

class Transaction {

	constructor(transactionEnvironment, transactionOperations, transactionCallbacks) {
		this.transactionEnvironment = transactionEnvironment;
		this.transactionOperations = transactionOperations;
		this.transactionCallbacks = transactionCallbacks;
	}

	//API alias
	invoke() {
		this.prepare();
	}

	prepare() {
		this.transactionEnvironment.systemJS((error, systemJSCollection, transactionId, rollbackTransactionId) => {
			
			if (error != null) {
				throw new Error(`cannot access system.js collection: ${error}`);
			}

			this.transactionOperations.saveFunctionalArgumentsIntoSystemJS(
				systemJSCollection,
				transactionId, rollbackTransactionId,
				() => {
					new PreparedTransaction(
						this.transactionEnvironment,
						this.transactionOperations,
						this.transactionCallbacks
					).invoke();
				}
			);
		});
	}

}


module.exports = Transaction;
