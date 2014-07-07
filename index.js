"use strict";

var mongoose = require('mongoose');
var async = require('async');
var ObjectId = mongoose.Types.ObjectId;

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = function(seedObject, cb) {
  async.each(Object.keys(seedObject), function(mongoModel, cb) {
    var documents = seedObject[mongoModel];
    mongoModel = capitalize(mongoModel);
    var Model = mongoose.model(mongoModel);
    async.each(Object.keys(documents), function(documentId, cb) {
      var document = documents[documentId];
      Model.update(
        { _id: new ObjectId(documentId) },
        document,
        { upsert: true },
        cb
      );
    }, cb);
  }, cb);
};
