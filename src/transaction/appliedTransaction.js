class AppliedTransaction 

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

    finish (results)
      {
        this.transactionEnvironment.systemJS(
          (error, systemJSCollection, transactionId, rollbackTransactionId) => {

            if (error != null) {
              throw new Error(
                `cannot access system.js collection: ${error}`
              );
            }

          this.transactionOperations.removeFunctionalArgsFromSystemJS (
            systemJSCollection,
              transactionId, rollbackTransactionId, 
                () => {
                  this.transactionCallbacks.commit(results);
                }
          );
      
        });
    
    
      }

}

module.exports = AppliedTransaction;
