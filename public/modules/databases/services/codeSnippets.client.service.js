'use strict';

//Comments service used to communicate CodeSnippet REST endpoints
angular.module('codeSnippets').factory('CodeSnippets', ['$resource',
	function($resource) {
		return $resource('codeSnippets/:codeSnippetId', { codeSnippetId: '@_id'
		});
		//place update action after returned $resource
	}
]);