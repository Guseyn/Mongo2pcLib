class TransactionCallbacks {

	constructor(onCommit, onRollback) {
		this.onCommit = onCommit;
		this.onRollback = onRollback;
	}

	commit(results) {
		this.onCommit.call(results || []);
	}

	rollback(error, results) {
		this.onRollback.call(error, results || []);
	}

}

module.exports = TransactionCallbacks;
