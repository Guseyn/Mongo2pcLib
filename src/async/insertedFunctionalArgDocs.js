'use strict'

const AsyncObject = require('./../../oop/asyncObject');

class InsertedFunctionalArgDocs extends AsyncObject {

  constructor({systemJSCollection, request, onSave}) {
    super({systemJSCollection, request, onSave});
  }

  call(asyncCall, functionalArgDocs) {
    super.call(asyncCall, functionalArgDocs);
  }

  onResult(result) {
    this.request.setLogArgsBySavedFunctionalArgsIntoSystemJSResult(result);  
    this.onSave(null);
  }

  onError(error) {
    this.onSave(error);
  }

}

module.exports = InsertedFunctionalArgDocs;
