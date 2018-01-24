const AsyncObject = require('./../../../oop/asyncObject');
const CanceledTransaction = require('./../canceledTransaction');

class UpgradedTransactionState extends AsyncObject {

  constructor({pendingTransaction, results}) {
    super({pendingTransaction, results});
  }

  call(asyncCall, result) {
    super.call(asyncCall, result);
  }

  onResult(result) {
    // Pending Transaction
    this.pendingTransaction.nextState().upgrade(this.results);
  }

  onError(error) {
    new CanceledTransactionState({
      pendingTransaction: this.pendingTransaction,
      errorMessage: `cannot upgrade pending transaction: ${error.mesasge}`
    }).call('logCancelState');
  }

}

module.exports = UpgradedTransactionState;
