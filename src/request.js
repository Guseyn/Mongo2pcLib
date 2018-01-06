
'use strict'

class Request {

	constructor(collection, methodName, ...args) {
		this.collection = collection;
		this.methodName = methodName;
		this.args = args; // objects, functions
	}

	execute(results, requestCallback) {
		
		let appliedArgs = this.args.map((arg) => {
			return typeof(arg) === 'function' ? arg(results) : arg;
		});
		appliedArgs.push(requestCallback);

		this.collection[this.methodName].apply(this.collection, appliedArgs);
	}

	saveFunctionalArgsIntoSystemJS(systemJSCollection, transactionId, saveCallback) {

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

	setLogArgsBySavedFunctionalArgsIntoSystemJSResult(result) {
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
			loggedArgs.push(pushedArg);
		});
	}

	log() {
		return {
			methodName: this.methodName,
			args: this.loggedArgs || this.args
		}
	}

}

module.exports.aggregate = (collection, pipeline, options) => {

};

module.exports.bulkWrite = (collection, operations, options) => {

};

module.exports.deleteMany = (collection, filter, options) => {

};

module.exports.deleteOne = (collection, filter, options) => {

};

module.exports.findOneAndDelete = (collection, filter, options) => {

};

module.exports.findOneAndReplace = (collection, filter, replacement, options) => {

};

module.exports.findOneAndUpdate = (collection, filter, update, options) => {
	return new Request(collection, 'findOneAndUpdate', filter, update, options);
};

module.exports.initializeOrderedBulkOp = (collection, options) => {

};

module.exports.initializeUnorderedBulkOp = (collection, options) => {

};

module.exports.insertMany = (collection, docs, options) => {

};

module.exports.insertOne = (collection, doc, options) => {

};

module.exports.replaceOne = (collection, filter, doc, options) => {

};

module.exports.updateMany = (collection, filter, update, options) => {

};

module.exports.updateOne = (collection, filter, update, options) => {

};

