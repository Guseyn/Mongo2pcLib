'use strict'

const AsyncObject = require('./../../../oop/asyncObject');

class SavedFunctionalArgumentsIntoSystemJS extends AsyncObject {

  constructor({transaction}) {
    super({transaction});
  }

  call(asyncCall, systemJSCollection) {
    super.call(asyncCall, systemJSCollection);
  }

  onResult(result) {
  	// PreparedTransaction
  	this.transaction.nextState().invoke();
  }

  onError(error) {
    this.transaction.nonConsistentFail(
    	new Error(
        `cannot save argFuncs: ${error.message}`
      )
    );
  }

}

module.exports = SavedFunctionalArgumentsIntoSystemJS;
