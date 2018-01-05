
'use strict'

class Request {

	constructor(executor, logger) {
		this.executor = executor;
		this.logger = logger;
	}

	execute(results, requestCallback) {
		this.executor(requestCallback);
	}

	args() {
		return this.logger().args;
	}

	log(funcArgIds) {
		let log = this.logger();
		log.args = log.args.map((arg, index) => {
			return typeof(arg) === 'function' ? funcArgIds[index] : arg;
		});
		return log;
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
	return new Request(
		(requestCallback) => {
			collection.findOneAndUpdate(filter, update, options, requestCallback);
		}, 
		() => {
			return {
				requestName: 'findOneAndUpdate',
				args: [filter, update, options]
			}
		}
	);
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

