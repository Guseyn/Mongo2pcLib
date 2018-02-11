const AsyncObject = require('./../../ioop/asyncObject');

class SavedFunctionalArguments extends AsyncObject {

  constructor({transaction}, onSavedAsyncObject) {
    super({transaction}, onSavedAsyncObject);
  }

  call(systemJSCollection) {
    super.call(this.transaction,'saveFunctionalArgumentsIntoSystemJS', systemJSCollection);
  }

  onFail(error) {
    this.transaction.saveFunctionalArgumentsFail(error);
  }

}

module.exports = SavedFunctionalArguments;
