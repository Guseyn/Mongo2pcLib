
'use strict'

const InsertedFunctionalArgDocs = require('./async/insertedFunctionalArgDocs');

class Request {

  constructor (methodName, collection, ...args) {
    this.methodName = methodName;
    this.collection = collection;
    this.args = args; // objects, functions
    this.loggedArgs = [];
  }

  execute (results, requestCallback) {
    
    let appliedArgs = this.args.map((arg) => {
      return typeof(arg) === 'function' ? arg(results) : arg;
    });
    
    this.collection[this.methodName](...appliedArgs, requestCallback);

  }

  saveFunctionalArgumentsIntoSystemJS (systemJSCollection, transactionId, onSave) {

    let functionalArgDocs = this.args
      .filter(arg => typeof(arg) === 'function')
      .map((arg) => {
        return {
          value: arg,
          transactionId: transactionId
        }
      });
    
    if (functionalArgDocs.length !== 0) {

      new InsertedFunctionalArgDocs({
        systemJSCollection, request: this, onSave
      }).call('insertMany', functionalArgDocs);

    } else {
        
      onSave(null);
      
    }

  }

  setLogArgsBySavedFunctionalArgsIntoSystemJSResult (result) {
    let argCount = 0;
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

  log() {
    return {
      methodName: this.methodName,
      args: this.loggedArgs
    }
  }

}

module.exports = Request;


