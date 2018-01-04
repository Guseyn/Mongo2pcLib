
'use strict'

const TransactionDbState = require('./../transactionDbState');
const TransactionOperations = require('./../transactionOperations');
const RollbackTransactionCallbacks = require('./../rollbackTransactionCallbacks');

const InvokedTransaction = require('./invokedTransaction');

class RollbackTransaction {

	constructor(rollbackId, transactionsCollection, operations) {
		this.transactionDbState = new TransactionDbState(rollbackId, transactionsCollection);
		this.transactionOperations = new TransactionOperations(operations);
		this.transactionCallbacks = new RollbackTransactionCallbacks();
	}

	invoke() {
		if (this.transactionOperations.isEmpty()) {
			this.transactionCallbacks.commit(null);
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
					this.transactionCallbacks.commit(error);
				}
			});
		}
	}

	initialTransactionLog() {
		return {
			_id: this.id,
			state: 'initial',
			isRollback: true,
			requestsLog: this.transactionOperations.log(),
			lastModified: new Date()
		}
	}

	onCommit(callback) {
		this.transactionCallbacks.onCommit(callback);
	}

}


module.exports = Transaction;
