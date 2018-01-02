
'use strict'

class Transaction {

	constructor(id, db, ...operations) {
		this.id = id;
		this.db = db;
		this.operations = operations;
		this.state = 'initial';
		this.lastModified = new Date();
		this.results = [];
		this.onRallback = (results) => {};
		this.onCommit = (results) => {};
	}

	invoke() {
		this.currentOperationNum = 0;
		if (this.operations.length === 0) {
			throw new Error('transaction must contain at least one operation');
		}

		let transactionsCollection = collection();
		let info = info();

		transactionsCollection.insertOne(info, (err, result) => {
			if (error == null) {
				throw new Error('transaction can not be invoked');
			}
			this.start();
		});
	}

	start() {
		let transactionsCollection = this.collection;
		transactionsCollection.findOneAndUpdate(
			{
				_id: this.id,
				 state: 'initial'
			},
			{
				$set: {
					state: 'pending'
				},
				$currentDate: {
					lastModified: true
				}
			}, (error, result) => {
				if (error == null) {
					throw new Error('transaction failed on start');
				}
				this.invokeNextOperation();
			}
		);
	}

	recover(operationNum) {

	}

	invokeNextOperation() {
		let currentOperation = currentOperation();
		let isOperationLast = this.currentOperationNum === this.operations.length - 1;
		let transactionId = this.id;
		if (currentOperation) {
			currentOperation.executeRequest(transactionId, (result, err) => {
				if (err != null) {
					this.onRollback(this.results);
				} else if (currentOperation.doRollback(result)) {
					//  start new transaction for rollback
				} else if (currentOperation.doNext(isOperationLast, result)) {
					this.currentOperationNum += 1;
					this.results.push(result);
					this.invokeNextOperation();
				} else {
					this.onCommit(this.results);
				}
			});
		}
	}

	collection() {
		if (!this.collection) {
			this.collection = this.db.collection(`${db.databaseName}-transactions`);
		}
		return this.collection;
	}

	info() {
		return {
			_id: this.id,
			state: this.state,
			lastModified: this.lastModified
		}
	}

	currentOperation() {
		return this.operations[this.currentOperationNum];
	}

	onRollback(callback) {
		this.onRallback = callback;
	}

	onCommit(callback) {
		this.onCommit = callback;
	}

}


module.exports = Transaction;
