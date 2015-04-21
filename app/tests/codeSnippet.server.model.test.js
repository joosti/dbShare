'use strict';

//Module dependencies
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	CodeSnippet = mongoose.model('CodeSnippet');

/*
** Globals
*/

var user, codeSnippet;

/*
** Unit tests
*/

describe('Code Snippet Model Unit Tests', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'First',
			lastName: 'Last',
			fullName: 'First Last',
			email: 'test@databasesareawesome.org',
			username: 'joeSmith',
			password: 'awfulPassword'
		});

		user.save(function() {
			codeSnippet = new CodeSnippet({
				mode: 'R',
				code: 'This is a line of code with a newline \n',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return codeSnippet.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should return an error when trying to save without code', function(done) {
			codeSnippet.code = '';

			return codeSnippet.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should return an error when trying to save without a mode', function(done) {
			codeSnippet.mode = '';

			return codeSnippet.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to remove with no errors', function(done) {

			return codeSnippet.remove(function(err) {
				should.not.exist(err);
				done();
			});
		});

	});

	afterEach(function(done) {
		CodeSnippet.remove({databaseId : undefined}).exec();
		done();
	});
});