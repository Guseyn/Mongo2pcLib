
'use strict'

const InvokedTransaction = require('./invokedTransaction');

class PreparedTransaction 

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

	invoke() 
		{
			if (this.transactionOperations.isEmpty()) {
				this.transactionCallbacks.commit();
			} else {
				let initialTransactionLog = this.transactionEnvironment
					.initialTransactionLog (
						this.transactionOperations
					);
					this.transactionEnvironment.init(
						initialTransactionLog,
							(error, result) => {
								if (error == null) {
									new InvokedTransaction(
										this.transactionEnvironment,
										this.transactionOperations,
										this.transactionCallbacks
									).start();
								} else {
									console.log('init error');
									console.log(error);
									// canceledTransaction
								}
					});
			}
		}

	}


module.exports = PreparedTransaction;
