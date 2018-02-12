const AsyncObject = require('./../../ioop/asyncObject');

class ExecutedOperation extends AsyncObject {

  constructor({id, rollbackId, сollection, operations, callbacks, results}, onExecuteAsyncObject) {
    super({id, rollbackId, сollection, operations, callbacks, results}, onExecuteAsyncObject);
  }

  call() {
    if (this.operations.isLast()) {

    } else {

    }
    super.call(this.operations, 'executeCurrent', this.results);
  }

  onFail(error) {

  }

}

module.exports = AccessedSystemJS;
