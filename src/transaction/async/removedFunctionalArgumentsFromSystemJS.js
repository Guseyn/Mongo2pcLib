'use strict'

const AsyncObject = require('./../../../oop/asyncObject');

class RemovedFunctionalArgumentsFromSystemJS extends AsyncObject {

  constructor({appliedTransaction, results}) {
    super({appliedTransaction, results});
  }

  call(asyncCall, systemJSCollection) {
    super.call(asyncCall, systemJSCollection);
  }

  onResult(result) {
  	this.appliedTransaction.commit(this.results);
  }

  onError(error) {
    this.appliedTransaction.nonConsistentFail(
      new Error(
        `cannot remove argFuncs: ${error.message}`
      )
    );
  }

}

module.exports = RemovedFunctionalArgumentsFromSystemJS;
