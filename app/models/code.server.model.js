'use strict';

/*
module dependencies
*/

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/*
Code Schema
*/

var CodeSchema = new Schema({
	
	//mode used by user to input code
	mode: {
		type: String
	},
	//actual code submitted by user
	code: {
		type: String
	}, 
	created: {
		type: Date, 
		default: Date.now
	}, 
	user: {
		type: Schema.ObjectId, 
		ref: 'user'
	}

});

mongoose.model('Code', CodeSchema);