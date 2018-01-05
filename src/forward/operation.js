
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

	requestLog(funcArgIds) {
		return this.request.log(funcArgIds);
	}

	rollbackRequestLog(funcArgIds) {
		return this.rollbackRequest.log(funcArgIds);
	}

}


module.exports = Operation;
