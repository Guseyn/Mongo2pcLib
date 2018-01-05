
'use strict'

class RollbackOperation {

	constructor({request}) {
		this.request = request;
	}

	executeRequest(results, requestCallback) {
		this.request.execute(results, requestCallback);
	}

	requestLog(funcArgIds) {
		return this.request.log(funcArgIds);
	}

}


module.exports = RollbackOperation;
