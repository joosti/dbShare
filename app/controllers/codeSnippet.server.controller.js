'use strict';

/*
* MODULE DEPENDENCIES
*/

var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	CodeSnippet = mongoose.model('CodeSnippet'),
	_ = require('lodash');

/*
Create Code Snippet
*/

exports.create = function(req, res) {
	var codeSnippet = new CodeSnippet(req.body);
	codeSnippet.user = req.user;

	codeSnippet.save(function(err) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMessage(err)});
		}
		else 
			res.jsonp(codeSnippet);
	});
};

/**
 * Show the current code snippet
 */
exports.read = function(req, res) {
	res.jsonp(req.codeSnippet);
};

/*
* Delete a codeSnippet
*/
exports.delete = function(req, res) {
	var codeSnippet = req.codeSnippet;

	codeSnippet.remove(function(err) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMessage(err)});
		}
		else
			res.jsonp(codeSnippet);
	});
}

/*
** List of code snippets
*/

exports.list = function(req, res) {
	CodeSnippet.find().sort('-created').populate('user', 'displayName').exec(function(err, codeSnippets) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMessage(err)});
		}
		else
			res.jsonp(codeSnippets);
	});
}

/*
** Middleware to get codeSnippet by ID
*/

exports.codeSnippetByID = function(req, res, next, id) {
	if (err) return next(err);
	if (!codeSnippet) return next(new Error('Failed to load Code Snippet' + id));
	req.codeSnippet = codeSnippet;
	next();
}

/**
 * Comment authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if(req.user.roles.indexOf('admin') === -1) {
		if (req.codeSnippet.user.id !== req.user.id) {
			return res.status(403).send('User is not authorized');
		}
	}	
	next();
};