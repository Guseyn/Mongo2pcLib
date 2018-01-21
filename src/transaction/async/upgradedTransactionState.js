const AsyncObject = require('./../../../oop/asyncObject');
const CanceledTransaction = require('./../canceledTransaction');

class UpgradedTransactionState extends AsyncObject {

  constructor(asyncFunc, args) {
    super(asyncFunc, args);
  }

  call(asyncCall, result) {
    super.call(asyncCall, this.id, result, this.transactionOperations.currentNum());
  }

  onResult(result) {
    this.pendingTransaction.next().upgrade(this.results);
  }

  onError(error) {
    this.cancel(
      `upgrading transaction failed on operation with number ${this.transactionOperations.currentNum()}`
    );
  }

      cancel (specificCancelMessage) {

        if (this.rollbackId != null) {

          this.transactionCollection.cancel(
            this.id, this.transactionOperations.currentNum(),
              (error, result) => {

                if (error == null) {
                    
                  new CanceledTransaction(
                    this.id,
                    this.rollbackId,
                    this.transactionCollection,
                    this.transactionOperations,
                    this.transactionCallbacks
                  ).rollback();

                } else {

                  this.transactionCallbacks.consistentFail(
                    new Error(
                      `${specificCancelMessage} failed with error: ${error.mesasge}`
                    ), this.id
                  );

                }

              }
          );
        }
    }

}

module.exports = UpgradedTransactionState;
