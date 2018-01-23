'use strict'

const AsyncObject = require('./../../../oop/asyncObject');
const RemovedFunctionalArgumentsFromSystemJS = require('./removedFunctionalArgumentsFromSystemJS');

class AccessedSystemJSForRemovingFunctionalArguments extends AsyncObject {

  constructor({appliedTranscation}) {
    super({appliedTranscation});
  }

  call(asyncCall) {
    super.call(asyncCall);
  }

  onResult(systemJSCollection) {
    new RemovedFunctionalArgumentsFromSystemJS({
      transaction: this.transaction,
      results: this.results
    }).call('removeFunctionalArgsFromSystemJS', systemJSCollection);
  }

  onError(error) {
    this.appliedTranscation.nonConsistentFail (
      new Error(
        `systemJS error is not accessable: ${error.message}`
      )
    );
  }

}

module.exports = AccessedSystemJSForRemovingFunctionalArguments;
