
class CancelledTransaction 

  {

    constructor (
      transactionEnvironment,
        transactionOperations,
          transactionCallbacks
    )
      {
        this.transactionEnvironment = transactionEnvironment;
        this.transactionOperations = transactionOperations;
        this.transactionCallbacks = transactionCallbacks;
      }

    rollback() 
      {
    
      }

  }

module.exports = InvokedTransaction;
