'use strict'

const TransactionDbState = require('./../../transactionDbState');
const TransactionOperations = require('./../../transactionOperations');
const TransactionCallbacks = require('./../transactionCallbacks');

const PreparedTransaction = require('./preparedTransaction');

class Transaction {

	constructor({transactionsCollection, id, rollbackId}, ...operations) {
		this.transactionDbState = new TransactionDbState(id, transactionsCollection);
		this.transactionOperations = new TransactionOperations({
			transactionId: id,
			rollbackTransactionId: rollbackId,
			operations: operations
		});
		this.transactionCallbacks = new TransactionCallbacks();
	}

	//API alias
	invoke() {
		this.prepare();
	}

	prepare() {
		this.transactionDbState.systemJS((error, systemJSCollection) => {
			
			if (error != null) {
				throw new Error(`cannot access system.js collection: ${error}`);
			}

			this.transactionOperations.saveFunctionalArgumentsIntoSystemJS(systemJSCollection, () => {
				new PreparedTransaction(
					this.transactionDbState,
					this.transactionOperations,
					this.transactionCallbacks
				).invoke();
			});

		});
	}

	onRollback(callback) {
		this.transactionCallbacks.onRollback(callback);
	}

	onCommit(callback) {
		this.transactionCallbacks.onCommit(callback);
	}

}


module.exports = Transaction;
