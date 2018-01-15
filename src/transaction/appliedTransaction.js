class AppliedTransaction {

  constructor (id, rollbackId, collection, operations, callbacks) {
    this.id = id;
    this.rollbackId = rollbackId;
    this.transactionCollection = collection;
    this.transactionOperations = operations;
    this.transactionCallbacks = callbacks;
  }

  finish (results) {

    this.transactionCollection.systemJS(
      (error, systemJSCollection) => {

        if (error == null) {

          this.transactionOperations.removeFunctionalArgsFromSystemJS (
            systemJSCollection, this.id, this.rollbackId, () => {
              this.transactionCallbacks.commit(this.id, results);
            }
          );

        } else {

          this.transactionCallbacks.nonConsistentFail (
            new Error(
              `systemJS error is not accessable: ${error.message}`
            ), this.id
          );

        }
      });
  }

}

module.exports = AppliedTransaction;
