class TransactionCallbacks {

	constructor() {
		this.rollbackCallback = (error, results) => {};
		this.commitCallback = (results) => {};
	}

	onRollback(callback) {
		this.rollbackCallback = callback;
	}

	onCommit(callback) {
		this.commitCallback = callback;
	}

	rollback(error, results) {
		this.rollbackCallback(error, results || []);
	}

	commit(results) {
		this.commitCallback(results || []);
	}


}

module.exports = TransactionCallbacks;
