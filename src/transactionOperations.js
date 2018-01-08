'use strict'

class TransactionOperations 
	
	{

		constructor (...operations) 
			{
				this.operations = operations;
				this.currentOperationNum = 0;
			}

		executeCurrent (results, executeCallback) 
			{
				this.current().executeRequest(
					results, executeCallback
				);
			}

		next (num) 
			{
				this.currentOperationNum += num || 1;
				return this;
			}

		isLast() 
			{
				return this.currentOperationNum === this.operations.length - 1;
			}

		isEmpty()
			{
				return this.operations.length === 0;
			}

		current()
			{
				return this.operations[this.currentNum()];
			}

		currentNum()
			{
				return this.currentOperationNum;
			}

		sliceByCurrentNum()
			{
				return this.operations.slice(0, this.currentNum());
			}

		rollbackTransactionOprations() 
			{
				 //TODO: return new transaction with operations as sliceByCurrentNum().map(operation => operation.rollbackOperation())
			}

		saveFunctionalArgumentsIntoSystemJS (
			systemJSCollection,
				transactionId, rollbackTransactionId,
					saveCallback
		) 
			{
		
				let savedOperationsCount = 0;
				let operationsLength = this.operations.length;
		
				this.operations.forEach((operation, index) => {
					(function(operation, index) {

						operation.saveRequestFunctionalArgsIntoSystemJS(
							systemJSCollection,
								transactionId,
									(error) => {

										if (error != null) {
											throw new Error(
												`error while saving request functional args of operation with number ${index}, error:${error}`
											);
										}

										if (rollbackTransactionId != null) {
						
											operation.saveRollbackRequestFunctionalArgsIntoSystemJS(
												systemJSCollection, 
													rollbackTransactionId, 
														(error) => {
						
															if (error != null) {
																throw new Error(
																	`error while saving rollback request functional args of operation with number ${index}, error:${error}`
																);
															}

															savedOperationsCount += 1;
															if (savedOperationsCount === operationsLength - 1) {
																saveCallback();
															}

											});

										} else {
					
											savedOperationsCount += 1;
											if (savedOperationsCount === operationsLength - 1) {
												saveCallback();
											}

										}
									});
			
					})(operation, index);
			
			});
		
		}

	removeFunctionalArgsFromSystemJS (
		systemJSCollection,
			transactionId, rollbackTransactionId,
				removeCallback
	)
		{

			systemJSCollection.deleteMany(
				{transactionId: transactionId},
					(error, result) => {

						if (error != null) {
							throw new Error(
								`error while removing request functional args of operations`
							);
						}

						if (rollbackTransactionId != null) {
				
							systemJSCollection.deleteMany(
								{transactionId: rollbackTransactionId},
									(error, result) => {

										if (error != null) {
											throw new Error(
												`error while removing rollback request functional args of operations`
											);
										}

										removeCallback();

							});
						}

					});
		}

	requestLog() 
		{
			return this.operations.map(operation => operation.requestLog());
		}

	rollbackRequestLog() 
		{
			return this.operations.map(operation => operation.rollbackRequestLog());
		}

	}

module.exports = TransactionOperations;
