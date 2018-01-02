
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

	invoke() {
		let collection = collection();
		let info = info();
		
		this.currentOperationNum = 0;
		if (this.operations.length === 0) {
			throw new Error('transaction must contain at least one operation');
		}
		
		collection.insertOne(info, (err, result) => {
			if (error == null) {
				throw new Error('transaction can not be invoked');
			}
			console.log(result);
			this.invokeNextOperation();
		});

	}

	invokeNextOperation() {
		let currentOperation = currentOperation();
		let isOperationLast = this.currentOperationNum === this.operations.length - 1;
		if (currentOperation) {
			currentOperation.executeRequest((result, err) => {
				if (err != null) {
					this.onRallback(this.results);
				} else if (currentOperation.doRollback(result)) {
					//  start new transaction for rollback
				} else if (currentOperation.doNext(isOperationLast, result)) {
					this.currentOperationNum += 1;
					this.invokeNextOperation();
				} else {
					this.onCommit(this.results);
				}
			});
		}
	} 

	onRallback(callback) {
		this.onRallback = callback;
	}

	onCommit(callback) {
		this.onCommit = callback;
	}

}


module.exports = Transaction;
