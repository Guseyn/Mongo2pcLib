class AppliedTransaction {

	constructor(transactionDbState, transactionOperations, transactionCallbacks) {
		this.transactionDbState = transactionDbState;
		this.transactionOperations = transactionOperations;
		this.transactionCallbacks = transactionCallbacks;
	}

	finish(results) {
		this.transactionDbState.systemJS((error, systemJSCollection) => {

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
