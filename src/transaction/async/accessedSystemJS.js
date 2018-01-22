const AsyncObject = require('./../../../oop/asyncObject');
const SavedFunctionalArgumentsIntoSystemJS = require('./savedFunctionalArgumentsIntoSystemJS');

class AccessedSystemJS extends AsyncObject {

  constructor(obj, args) {
    super(obj, args);
  }

  call(asyncCall) {
    super.call(asyncCall);
  }

  onResult(systemJSCollection) {
    new SavedFunctionalArgumentsIntoSystemJS(
      this.obj, {}
    ).call('saveFunctionalArgumentsIntoSystemJS', systemJSCollection);
  }

  onError(error) {
    // Main transaction
    if (this.rollbackId != null) {
      this.obj.nonConsistentFail(
        new Error(
          `systemJS error is not accessable: ${error.message}`
        )
      );
    } else {
      // Rollback transcation
      this.obj.consistentFail(
        new Error(
          `systemJS error is not accessable: ${error.message}`
        )
      );
    }
  }

}

module.exports = AccessedSystemJS;
