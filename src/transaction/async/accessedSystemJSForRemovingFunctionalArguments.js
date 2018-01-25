'use strict'

const AsyncObject = require('./../../../oop/asyncObject');
const RemovedFunctionalArgumentsFromSystemJS = require('./removedFunctionalArgumentsFromSystemJS');

class AccessedSystemJSForRemovingFunctionalArguments extends AsyncObject {

  constructor ({appliedTransaction, results}) {
    super({appliedTransaction, results});
  }

  call (asyncCall) {
    super.call(asyncCall);
  }

  onResult (systemJSCollection) {
    new RemovedFunctionalArgumentsFromSystemJS({
      appliedTransaction: this.appliedTransaction,
      results: this.results
    }).call('removeFunctionalArgumentsFromSystemJS', systemJSCollection);
  }

  onError (error) {
    this.appliedTransaction.nonConsistentFail (
      new Error(
        `systemJS error is not accessable: ${error.message}`
      )
    );
  }

}

module.exports = AccessedSystemJSForRemovingFunctionalArguments;
