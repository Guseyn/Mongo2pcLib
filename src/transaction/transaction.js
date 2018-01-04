
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
		if (this.operations.length === 0) {
			this.transactionCallbacks.commit();
		} else {
			let initialTransactionLog = this.initialTransactionLog();
			this.transactionDbState.init(initialTransactionLog, (error, result) => {
				if (error == null) {
					new InvokedTransaction(
						this.transactionDbState,
						this.transactionOperations,
						this.transactionCallbackSystem
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
		this.state = 'initial';
		this.lastModified = new Date();
		return {
			_id: this.id,
			state: this.state,
			requestsLog: this.operations.map(operation => operation.requestLog()),
			lastModified: this.lastModified,
			operationNum: 0
		}
	}

	onRollback(callback) {
		this.transactionCallbacks.rollbackCallback(callback);
	}

	onCommit(callback) {
		this.transactionCallbacks.commitCallback(callback);
	}

}


module.exports = Transaction;
