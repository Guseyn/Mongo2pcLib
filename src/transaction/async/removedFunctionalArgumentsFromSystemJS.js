'use strict'

const AsyncObject = require('./../../../oop/asyncObject');

class RemovedFunctionalArgumentsFromSystemJS extends AsyncObject {

  constructor({appliedTransaction}) {
    super({appliedTransaction});
  }

  call(asyncCall, systemJSCollection) {
    super.call(asyncCall, systemJSCollection);
  }

  onResult(result) {
  	this.appliedTransaction.commit(this.results);
  }

  onError(error) {
    this.transaction.nonConsistentFail(
      new Error(
        `systemJS error is not accessable: ${error.message}`
      )
    );
  }

}

module.exports = RemovedFunctionalArgumentsFromSystemJS;
