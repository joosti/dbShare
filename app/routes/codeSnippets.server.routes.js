'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var codeSnippets = require('../../app/controllers/codeSnippet');

	//CodeSnippet routes
	app.route('/codeSnippets')
	   .get(codeSnippets.list)
	   .post(users.requiresLogin, codeSnippets.create);

	//-----> Need to place PUT method later
	app.route('/codeSnippets/:codeSnippetId')
	   .get(codeSnippets.read)
	   .delete(users.requiresLogin, codeSnippets.hasAuthorization, codeSnippets.delete);

	//bind middleware
	app.param('codeSnippetId', codeSnippets.codeSnippetByID);
};