
'use strict'

class Operation {

	constructor({request, rollbackRequest}) {
		this.request = request;
		this.rollbackRequest = rollbackRequest;
	}

	rollbackOperation() {
		return new Operation({
			request: this.rollbackRequest,
			rollbackRequest: this.request
		});
	}

	executeRequest(requestCallback) {
		this.request.execute(requestCallback);
	}

	unbindFromTransaction(transactionId) {
		this.request.unibindFromTransaction(transactionId);
	}

	requestLog() {
		return this.request.log();
	}

}


module.exports = Operation;
