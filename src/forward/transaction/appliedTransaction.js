class AppliedTransaction {

	constructor(db, transactionDbState, transactionOperations, transactionCallbacks) {
		this.db = db;
		this.transactionDbState = transactionDbState;
		this.transactionOperations = transactionOperations;
		this.transactionCallbacks = transactionCallbacks;
	}

	finish(results) {
		this.db.collection('system.js', (error, systemJSCollection) => {

			if (error != null) {
				throw new Error(`cannot access system.js collection: ${error}`);
			}

			this.transactionOperations.removeFunctionalArgsFromSystemJS(systemJSCollection, () => {
				this.transactionCallbacks.commit(results);
			})

		});
		
		
	}

}

module.exports = AppliedTransaction;
