
'use strict'

class Request {

	constructor(requestName, collection, boundArgsToTransactionId, ...args) {
		this.requestName = requestName;
		this.collection = collection;
		this.boundArgsToTransactionId = boundArgsToTransactionId;
		this.args = args;
	}

	execute(requestCallback) {
		this.collection[this.requestName](this.boundArgsToTransactionId(this.args), (err, result) => {
			requestCallback(err, result);
		});
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

