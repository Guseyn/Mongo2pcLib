const AsyncObject = require('./../../../oop/asyncObject');
const PreparedTransaction = require('./../preparedTransaction');

class SavedFunctionalArgumentsIntoSystemJS extends AsyncObject {

  constructor(obj, args) {
    super(obj, args);
  }

  call(asyncCall, systemJSCollection) {
    super.call(asyncCall, systemJSCollection);
  }

  onResult(result) {
  	this.obj.nextState().invoke();
  }

  onError(error) {
    this.obj.nonConsistentFail(error);
  }

}

module.exports = SavedFunctionalArgumentsIntoSystemJS;
