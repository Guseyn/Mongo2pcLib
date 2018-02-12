const AsyncObject = require('./../../ioop/asyncObject');

class AccessedSystemJS extends AsyncObject {

  constructor({id, rollbackId, сollection, callbacks}, onAccessAsyncObject) {
    super({id, rollbackId, сollection, callbacks}, onAccessAsyncObject);
  }

  call() {
    super.call(this.сollection, 'systemJS');
  }

  onFail(error) {
  	// Main transaction
    if (this.rollbackId != null) {
      this.callbacks.nonConsistentFail(
        new Error(
          `systemJS error is not accessable: ${error.message}`
        ), this.id
      );
    } else {
      // Rollback transcation
      this.callbacks.consistentFail(
        new Error(
          `systemJS error is not accessable: ${error.message}`
        ), this.id
      );
    }
  }

}

module.exports = AccessedSystemJS;
