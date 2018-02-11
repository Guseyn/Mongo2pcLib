const AsyncObject = require('./../../ioop/asyncObject');

class AccessedSystemJS extends AsyncObject {

  constructor({transaction}, systemJSAsyncObject) {
    super({transaction}, systemJSAsyncObject);
  }

  call() {
    super.call(this.transaction, 'systemJS');
  }

  onFail(error) {
    this.transaction.accessSystemJSFail(error);
  }

}

module.exports = AccessedSystemJS;
