
'use strict'

class Request 

  {

    constructor (methodName, collection, ...args) 
      {
        this.methodName = methodName;
        this.collection = collection;
        this.args = args; // objects, functions
      }

    execute (results, requestCallback) 
      {
        let appliedArgs = this.args.map((arg) => {
          return typeof(arg) === 'function' ? arg(results) : arg;
        });
        appliedArgs.push(requestCallback);

        this.collection[this.methodName].apply(this.collection, appliedArgs);
      }

    saveFunctionalArgsIntoSystemJS (
      systemJSCollection,
        transactionId, saveCallback
    ) 
      {

        let functionalArgDocs = this.args
        .filter(arg => typeof(arg) === 'function')
        .map((arg) => {
          return {
            value: arg,
            transactionId: transactionId
          }
        });
    
        if (functionalArgDocs.length !== 0) {

          systemJSCollection.insertMany(functionalArgDocs, (error, result) => {
      
            if (error == null) {
              this.setLogArgsBySavedFunctionalArgsIntoSystemJSResult(result);           
            }

            saveCallback(error);
          
          });

        } else {
      
          saveCallback(null);
    
        }

      }

  setLogArgsBySavedFunctionalArgsIntoSystemJSResult (result)
    {
      let argCount = 0;
      this.loggedArgs = [];
      this.args.forEach((arg) => {
        let pushedArg;
        if (typeof(arg) === 'function') {
          pushedArg = result.insertedIds[argCount];
          argCount += 1;
        } else {
          pushedArg = arg;
        }
        this.loggedArgs.push(pushedArg);
      });
    }

  log() 
    {
      return {
        methodName: this.methodName,
        args: this.loggedArgs || this.args
      }
    }

  }

module.exports = Request;

var aggregate = (collection, pipeline, options) => {

};

var bulkWrite = (collection, operations, options) => {

};

var deleteMany = (collection, filter, options) => {

};

var deleteOne = (collection, filter, options) => {

};

var findOneAndDelete = (collection, filter, options) => {

};

var findOneAndReplace = (collection, filter, replacement, options) => {

};

var findOneAndUpdate = (collection, filter, update, options) => {
  return new Request('findOneAndUpdate', collection, filter, update, options);
};

var initializeOrderedBulkOp = (collection, options) => {

};

var initializeUnorderedBulkOp = (collection, options) => {

};

var insertMany = (collection, docs, options) => {

};

var insertOne = (collection, doc, options) => {

};

var replaceOne = (collection, filter, doc, options) => {

};

var updateMany = (collection, filter, update, options) => {

};

var updateOne = (collection, filter, update, options) => {

};

