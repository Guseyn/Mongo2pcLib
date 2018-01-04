
'use strict'

const TransactionDbState = require('./../transactionDbState');
const TransactionOperations = require('./../transactionOperations');
const TransactionCallbacks = require('./../transactionCallbacks');

const InvokedTransaction = require('./invokedTransaction');

class Transaction {

	constructor(id, rollbackId, transactionsCollection, ...operations) {
		this.transactionDbState = new TransactionDbState(id, transactionsCollection);
		this.transactionOperations = new TransactionOperations(rollbackId, operations);
		this.transactionCallbacks = new TransactionCallbacks();
	}

	invoke() {
		if (this.transactionOperations.isEmpty()) {
			this.transactionCallbacks.commit();
		} else {
			let initialTransactionLog = this.initialTransactionLog();
			this.transactionDbState.init(initialTransactionLog, (error, result) => {
				if (error == null) {
					new InvokedTransaction(
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

	initialTransactionLog() {
		return {
			_id: this.id,
			state: 'initial',
			requestsLog: this.transactionOperations.log(),
			lastModified: new Date()
		}
	}

	onRollback(callback) {
		this.transactionCallbacks.onRollback(callback);
	}

	onCommit(callback) {
		this.transactionCallbacks.onCommit(callback);
	}

}


module.exports = Transaction;
