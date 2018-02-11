const AsyncObject = require('./../../ioop/asyncObject');

class InitialTransactionState extends AsyncObject {

  constructor({transaction, initialTransactionLog}, onInitAsyncObject) {
    super({transaction, initialTransactionLog}, onInitAsyncObject);
  }

  call() {
    super.call(this.transaction, 'init', this.initialTransactionLog);
  }

  onFail(error) {
    this.transaction.initFail(error);
  }

}

module.exports = InitialTransactionState;
