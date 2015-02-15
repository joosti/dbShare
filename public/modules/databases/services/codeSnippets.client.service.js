'use strict';

//Comments service used to communicate CodeSnippet REST endpoints
angular.module('codeSnippets').factory('CodeSnippet', ['$resource',
	function($resource) {
		return $resource('codeSnippets/:codeSnippetId', { commentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);