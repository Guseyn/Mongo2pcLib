const AsyncObject = require('./../../../oop/asyncObject');
const UpgradedTransactionState = require('./upgradedTransactionState');
const AppliedTransaction = require('./../appliedTransaction');
const CanceledTransaction = require('./../canceledTransaction');

class ExecutedOperation extends AsyncObject {

  constructor(asyncFunc, args) {
    super(asyncFunc, args);
  }

  call(asyncCall) {
    super.call(asyncCall, this.results);
  }

  onResult(result) {

    this.results.push(result);

    if (this.transactionOperations.isLast()) {

      this.transactionCollection.apply(
        this.id, result, this.transactionOperations.currentNum(), 
        (error, result) => {

          if (error == null) {

            new AppliedTransaction(
                      this.id,
                      this.rollbackId,
                      this.transactionCollection,
                      this.transactionOperations.next(),
                      this.transactionCallbacks
            ).finish(this.results);

          } else {

              this.cancel('applying transaction');

          }

        }
       );

      } else {

        new UpgradedTransactionState(
          this.transactionCollection,
          {
            pendingTransaction: this.pendingTransaction,
            id: this.id, 
            rollbackId: this.rollbackId,
            transactionCollection: this.transactionCollection,
            transactionOperations: this.transactionOperations,
            transactionCallbacks: this.transactionCallbacks,
            results: this.results
          }
        ).call('upgrade', result);

      }
        
  }

  onError(error) {

     this.cancel(`executing of the operation with number ${this.transactionOperations.currentNum()}`)

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

module.exports = ExecutedOperation;
