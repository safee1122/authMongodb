"use strict";

var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
var db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
module.exports = db;