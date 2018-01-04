class TransactionDbState {

	constructor(id, collection) {
		this.id = id;
		this.collection = collection;
	}

	init(initialTransactionLog, initCallback) {
		this.collection.insertOne(initialTransactionLog, initCallback);
	}

	start(startCallback) {
		this.collection.findOneAndUpdate(
			{_id: this.id, state: 'initial'},
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
			{_id: this.id, state: 'pending', operationNum: operationNum},
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
			{_id: this.id, state: 'pending', operationNum: operationNum},
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
			{_id: this.id, state: 'pending', operationNum: operationNum},
			{
				$set: {state: 'canceling'},
				$currentDate: {lastModified: true}
			},
			{returnOriginal: false},
			cancelCallback
		);
	}

}

module.exports = TransactionDbState;
