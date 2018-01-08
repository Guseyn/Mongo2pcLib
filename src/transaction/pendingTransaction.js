
const AppliedTransaction = require('./appliedTransaction');

class PendingTransaction 

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

		upgrade (results)
			{
				this.transactionOperations.executeCurrent(
					results || [],
						(error, result) => {

							if (error == null) {

								results.push(result);
								if (this.transactionOperations.isLast()) {

									this.transactionEnvironment.apply(
										result,
											this.transactionOperations.currentNum(),
												(error, result) => {
													if (error == null) {
														new AppliedTransaction(
															this.transactionEnvironment,
															this.transactionOperations.next(),
															this.transactionCallbacks
														).finish(results);
													} else {
														console.log('apply pending transactionEnvironment error');
														console.log(error);
														// cancel transaction
													}
												}
									);

								} else {

									this.transactionEnvironment.upgrade(
										result,
											this.transactionOperations.currentNum(),
												(error, result) => {
													if (error == null) {
														new PendingTransaction(
															this.transactionEnvironment,
															this.transactionOperations.next(),
															this.transactionCallbacks
														).upgrade(results);
													} else {
														console.log('upgrade pending transactionEnvironment error');
														console.log(error);
														// cancel transaction
													}
												}
									);

								}
							} else {
								console.log('upgrade pending transaction error');
								console.log(error);
								// cancel transaction
							}
						});
			}

		cancel() 
			{
				
			}

	}

module.exports = PendingTransaction;
