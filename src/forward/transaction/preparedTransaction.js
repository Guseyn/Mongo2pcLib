
'use strict'

const InvokedTransaction = require('./invokedTransaction');

class PreparedTransaction {

	constructor(db, transactionDbState, transactionOperations, transactionCallbacks) {
		this.db = db;
		this.transactionDbState = transactionDbState;
		this.transactionOperations = transactionOperations;
		this.transactionCallbacks = transactionCallbacks;
	}

	invoke() {
		if (this.transactionOperations.isEmpty()) {
			this.transactionCallbacks.commit();
		} else {
			let initialTransactionLog = this.transactionOperations.initialTransactionLog();
			this.transactionDbState.init(initialTransactionLog, (error, result) => {
				if (error == null) {
					new InvokedTransaction(
						this.db,
						this.transactionDbState,
						this.transactionOperations,
						this.transactionCallbacks
					).start();
				} else {
					console.log('init error');
					console.log(error);
					// canceledTransaction
				}
			});
		}
	}

}


module.exports = PreparedTransaction;
