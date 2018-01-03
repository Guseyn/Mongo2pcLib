
'use strict'

class Transaction {

	constructor(id, db, ...operations) {
		this.id = id;
		this.db = db;
		this.operations = operations;
		this.results = [];
		this.onRallbackCallback = (results) => {};
		this.onCommitCallback = (results) => {};
	}

	invoke() {
		this.currentOperationNum = 0;
		if (this.operations.length === 0) {
			throw new Error('transaction must contain at least one operation');
		}

		let transactionsCollection = this.retrieveCollection();
		let initialTransactionLog = this.initialTransactionLog();

		//init transaction
		transactionsCollection.insertOne(initialTransactionLog, (error, result) => {
			if (error != null) {
				console.log('init error');
				console.log(error);
				// stop transaction
			} else {
				this.start();
			}
		});
	}

	start() {
		let transactionsCollection = this.retrieveCollection();
		let transactionId = this.id;
		// start transaction
		transactionsCollection.findOneAndUpdate(
			{
				_id: transactionId,
				state: 'initial'
			},
			{
				$set: {
					state: 'pending',
					operationNum: 0
				},
				$currentDate: {
					lastModified: true
				}
			}, (error, result) => {
				if (error != null) {
					console.log('start error');
					console.log(error);
					// stop transaction
				} else {
					this.invokeNextOperation();
				}
			}
		);
	}

	invokeNextOperation() {
		let currentOperation = this.currentOperation();
		let isOperationLast = this.currentOperationNum === this.operations.length - 1;
		let transactionId = this.id;
		if (currentOperation) {
			currentOperation.executeRequest((error, result) => {
				if (error != null) {
					console.log('next error 1');
					console.log(error);
					//  start new transaction for rollback and stop the current one
				} else if (currentOperation.doRollback(result)) {
					console.log('next error 2');
					console.log(error);
					//  start new transaction for rollback and stop the current one
				} else if (currentOperation.doNext(isOperationLast, result)) {
					this.results.push(result);
					this.upgrade();
				} else {
					this.results.push(result);
					this.apply();
				}
			});
		}
	}

	fail() {

	}

	upgrade() {
		let transactionsCollection = this.retrieveCollection();
		let transactionId = this.id;
		let currentOperationNum = this.currentOperationNum;
		//upgrade transaction
		transactionsCollection.findOneAndUpdate(
			{
				_id: transactionId,
				state: 'pending',
				operationNum: currentOperationNum
			},
			{
				$inc: {
					operationNum: 1
				},
				$currentDate: {
					lastModified: true
				}
			}, (error, result) => {
				if (error != null) {
					console.log('upgrade error');
					console.log(error);
					//  start new transaction for rollback and stop the current one
				} else {
					this.currentOperationNum += 1;
					this.invokeNextOperation();
				}
			}
		);
	}

	apply() {
		let transactionsCollection = this.retrieveCollection();
		let transactionId = this.id;
		let currentOperationNum = this.currentOperationNum;
		//upgrade transaction
		transactionsCollection.findOneAndUpdate(
			{
				_id: transactionId,
				state: 'pending',
				operationNum: currentOperationNum
			},
			{
				$set: {
					state: 'applied'
				},
				$inc: {
					operationNum: 1
				},
				$currentDate: {
					lastModified: true
				}
			}, (error, result) => {
				if (error != null) {
					console.log('apply error');
					console.log(error);
					//  start new transaction for rollback and stop the current one
				} else {
					this.onCommitCallback(this.results);
				}
			}
		);
	}

	recover(operationNum) {

	}

	rollback() {

	}

	retrieveCollection() {
		if (!this.collection) {
			this.collection = this.db.collection(`${this.db.databaseName}-m2pc-transactions`);
		}
		return this.collection;
	}

	initialTransactionLog() {
		this.state = 'initial';
		this.lastModified = new Date();
		return {
			_id: this.id,
			state: this.state,
			requestsLog: this.operations.map(operation => operation.requestLog()),
			lastModified: this.lastModified
		}
	}

	currentOperation() {
		return this.operations[this.currentOperationNum];
	}

	onRollback(callback) {
		this.onRallbackCallback = callback;
	}

	onCommit(callback) {
		this.onCommitCallback = callback;
	}

}


module.exports = Transaction;
