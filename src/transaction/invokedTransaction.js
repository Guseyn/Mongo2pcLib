
const PendingTransaction = require('./pendingTransaction');

class InvokedTransaction 

	{

		constructor (
			transactionEnvironment,
				transactionOperations,
					transactionCallbacks
		)
			{
				this.transactionEnvironment = transactionEnvironment;
				this.transactionOperations = transactionOperations;
				this.transactionCallbacks = transactionCallbacks;
			}

		start() 
			{
				this.transactionEnvironment.start(
					(error, result) => {
						if (error == null) {
							new PendingTransaction(
								this.transactionEnvironment,
								this.transactionOperations,
								this.transactionCallbacks
							).upgrade();
						} else {
							throw new Error(
								`error: failed on start transaction in the system: ${error}`
							);
						}
					}
				);
			}

	}

module.exports = InvokedTransaction;
