'use strict';

/*
* MODULE DEPENDENCIES
*/

var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	CodeSnippet = mongoose.model('Code'),
	_ = require('lodash');

/*
Create Code Snippet
*/

exports.create = function() {
	var codeSnippet = new Code(req.body);
};