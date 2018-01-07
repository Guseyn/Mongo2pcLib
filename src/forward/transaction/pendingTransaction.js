
const AppliedTransaction = require('./appliedTransaction');

class PendingTransaction {

	constructor(transactionDbState, transactionOperations, transactionCallbacks) {
		this.transactionDbState = transactionDbState;
		this.transactionOperations = transactionOperations;
		this.transactionCallbacks = transactionCallbacks;
	}

	upgrade(results) {
		this.transactionOperations.executeCurrent(results, (error, result) => {

			if (error == null) {

				results.push(result);
				if (this.transactionOperations.isLast()) {

					this.transactionDbState.apply(result, this.transactionOperations.currentNum(), (error, result) => {
						if (error == null) {
							new AppliedTransaction(
								this.transactionDbState,
								this.transactionOperations.next(),
								this.transactionCallbacks
							).finish(results);
						} else {
							console.log('apply pending transactionDbState error');
							console.log(error);
							// cancel transaction
						}
					});

				} else {

					this.transactionDbState.upgrade(result, this.transactionOperations.currentNum(), (error, result) => {
						if (error == null) {
							new PendingTransaction(
								this.transactionDbState,
								this.transactionOperations.next(),
								this.transactionCallbacks
							).upgrade(results);
						} else {
							console.log('upgrade pending transactionDbState error');
							console.log(error);
							// cancel transaction
						}
					});

				}
			} else {
				console.log('upgrade pending transaction error');
				console.log(error);
				// cancel transaction
			}
		});
	}

}

module.exports = PendingTransaction;
