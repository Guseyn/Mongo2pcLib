
'use strict'

const RollbackOperation = require('./../rollback/rollbackOperation');

class Operation {

	constructor({request, rollbackRequest}) {
		this.request = request;
		this.rollbackRequest = rollbackRequest;
	}

	rollbackOperation() {
		return new RollbackOperation({
			request: this.rollbackRequest
		});
	}

	executeRequest(results, requestCallback) {
		this.request.execute(results, requestCallback);
	}

	saveRequestFunctionalArgsIntoSystemJS(systemJSCollection, transactionId, saveCallback) {
		this.rollbackRequest.saveFunctionalArgsIntoSystemJS(systemJSCollection, transactionId, saveCallback);
	}

	saveRollbackRequestFunctionalArgsIntoSystemJS(systemJSCollection, transactionId, saveCallback) {
		this.rollbackRequest.saveFunctionalArgsIntoSystemJS(systemJSCollection, transactionId, saveCallback);
	}

	requestLog() {
		return this.request.log();
	}

	rollbackRequestLog() {
		return this.rollbackRequest.log();
	}

}


module.exports = Operation;
