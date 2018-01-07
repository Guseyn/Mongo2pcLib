'use strict'

class TransactionEnvironment {

	constructor(collection, transactionId, rollbackTansactionId) {
		this.collection = collection;
		this.transactionId = transactionId;
		this.rollbackTansactionId = rollbackTansactionId;
	}

	init(initialTransactionLog, initCallback) {
		this.collection.insertOne(initialTransactionLog, initCallback);
	}

	start(startCallback) {
		this.collection.findOneAndUpdate(
			{_id: this.transactionId, state: 'initial'},
			{
				$set: {state: 'pending', operationNum: 0, results: []},
				$currentDate: {lastModified: true}
			},
			{returnOriginal: false},
			startCallback
		);
	}

	upgrade(result, operationNum, upgradeCallback) {
		this.collection.findOneAndUpdate(
			{_id: this.transactionId, state: 'pending', operationNum: operationNum},
			{
				$inc: {operationNum: 1},
				$push: {results: result},
				$currentDate: {lastModified: true}
			}, 
			{returnOriginal: false},
			upgradeCallback
		);
	}

	apply(result, operationNum, appliedCallback) {
		this.collection.findOneAndUpdate(
			{_id: this.transactionId, state: 'pending', operationNum: operationNum},
			{
				$set: {state: 'applied'},
				$inc: {operationNum: 1},
				$currentDate: {lastModified: true}
			},
			{returnOriginal: false},
			appliedCallback
		);
	}

	cancel(operationNum, cancelCallback) {
		this.collection.findOneAndUpdate(
			{_id: this.transactionId, state: 'pending', operationNum: operationNum},
			{
				$set: {state: 'canceling'},
				$currentDate: {lastModified: true}
			},
			{returnOriginal: false},
			cancelCallback
		);
	}

	systemJS(onAccess) {
		this.collection.s.db.collection('system.js', (error, collection) => {
			onAccess(error, collection, this.transactionId, this.rollbackTansactionId);
		});
	}

	initialTransactionLog(operations) {
		return {
			_id: this.transactionId,
			rollbackId: this.rollbackTransactionId || null,
			state: 'initial',
			requestsLog: operations.requestLog(),
			rollbackRequestsLog: operations.rollbackRequestLog(),
			lastModified: new Date()
		}
	}


}

module.exports = TransactionEnvironment;
