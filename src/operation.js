
'use strict'

class Operation {

	constructor({request, rollbackRequest, rollbackCondition, commitCondition}) {
		this.request = request;
		this.rollbackRequest = rollbackRequest;
		this.rollbackCondition = rollbackCondition || ((result) => {return false;});
		this.commitCondition = commitCondition || ((result) => {return false;});
	}

	doNext(isOperationLast, result) {
		return this.commitCondition(result) || !isOperationLast;
	}

	doRollback(result) {
		return this.rollbackCondition(result);
	}

	rollbackOperation() {
		return new Operation({
			request: this.rollbackRequest,
			rollbackRequest: this.request
		});
	}

	executeRequest(transactionId, requestCallback) {
		this.request.execute(transactionId, (err, result) => {
			requestCallback(err, result);
		});
	}

}


module.exports = Operation;
