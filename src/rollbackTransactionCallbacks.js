class RollbackTransactionCallbacks {

	constructor() {
		this.commitCallback = (error, results) => {};
	}

	onCommit(callback) {
		this.commitCallback = callback;
	}

	commit(error, results) {
		this.commitCallback(results || []);
	}


}

module.exports = RollbackTransactionCallbacks;
