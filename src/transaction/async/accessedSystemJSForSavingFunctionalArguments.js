'use strict'

const AsyncObject = require('./../../../oop/asyncObject');
const SavedFunctionalArgumentsIntoSystemJS = require('./savedFunctionalArgumentsIntoSystemJS');

class AccessedSystemJSForSavingFunctionalArguments extends AsyncObject {

  constructor({transaction}) {
    super({transaction});
  }

  call(asyncCall) {
    super.call(asyncCall);
  }

  onResult(systemJSCollection) {
    new SavedFunctionalArgumentsIntoSystemJS({
      transaction: this.transaction
    }).call('saveFunctionalArgumentsIntoSystemJS', systemJSCollection);
  }

  onError(error) {
    this.transaction.fail(error);
  }

}

module.exports = AccessedSystemJSForSavingFunctionalArguments;
