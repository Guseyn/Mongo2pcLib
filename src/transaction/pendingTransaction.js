
const TransactionProtocol = require('./transactionProtocol');
const AppliedTransaction = require('./appliedTransaction');
const CanceledTransaction = require('./canceledTransaction');
const ExecutedOperation = require('./async/executedOperation');

class PendingTransaction extends TransactionProtocol {

  constructor (id, rollbackId, collection, operations, callbacks) {
    super(id, rollbackId, collection, operations, callbacks);
  }

  logAppliedState(result, onApply) {
    this.transactionCollection.apply(
      this.id, result, this.currentNum(), onApply
    );
  }

  logNextPendingState(result, onUpgrade) {
    this.transactionCollection.upgrade(
      this.id, result, this.currentNum(), onUpgrade
    );
  }

  logCancelState(onCancel) {
    this.transactionCollection.cancel(
      this.id, this.currentNum(), onCancel
    );
  }

  consistentFail(error) {
    if (this.rollbackId != null) {
      super.consistentFail(error);
    }
  }

  nextState() {
    return new PendingTransaction(
      this.id, this.rollbackId,
      this.transactionCollection,
      this.transactionOperations.next(),
      this.transactionCallbacks
    );
  }

  applyState() {
    new AppliedTransaction(
      this.id, this.rollbackId,
      this.transactionCollection,
      this.transactionOperations.next(),
      this.transactionCallbacks
    );
  }

  cancelState() {

    if (this.rollbackId != null) {
      
      return new CanceledTransaction(
        this.id, this.rollbackId,
        this.transactionCollection,
        this.transactionOperations,
        this.transactionCallbacks
      );

    } else {

      return {
        rollback:() => {}
      }

    }

  }

  upgrade (results) {

    results = results || [];

    new ExecutedOperation({
      pendingTransaction: this,
      results: results
    }).call('executeCurrent');

  }

  executeCurrent(results, onExecute) {
    this.transactionOperations.executeCurrent(results, onExecute);
  }

  currentNum() {
    return this.transactionOperations.currentNum();
  }


}

module.exports = PendingTransaction;