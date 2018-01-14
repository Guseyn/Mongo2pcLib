class AppliedTransaction 

  {

    constructor (
      id,
      rollbackId,
        transactionCollection,
          transactionOperations, 
            transactionCallbacks
    )
      {
        this.id = id;
        this.rollbackId = rollbackId;
        this.transactionCollection = transactionCollection;
        this.transactionOperations = transactionOperations;
        this.transactionCallbacks = transactionCallbacks;
      }

    finish (results)
      {
        this.transactionCollection.systemJS(
          (error, systemJSCollection) => {

            if (error == null) {

              this.transactionOperations.removeFunctionalArgsFromSystemJS (
                systemJSCollection,
                  this.id, this.rollbackId, 
                    () => {
                      this.transactionCallbacks.commit(this.id, results);
                  }
              );

            } else {

              this.transactionCallbacks.nonConsistentFail(
                  new Error(
                    `systemJS error is not accessable: ${error.message}`
                  ), this.id
              );

            }


      
        });
    
      }

}

module.exports = AppliedTransaction;
