'use strict';

//code Snippet controller
angular.module('codeSnippets').controller('CodeSnippetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'CodeSnippets', 
	function( $scope, $stateParams, $location, Authentication, CodeSnippets ){

		$scope.authentication = Authentication;

		/* NEW CODEMIRROR CONTROLS */

		//modes enabled for posting code comments

		$scope.modes = ['R'];

		$scope.mode = $scope.modes[0];

        //New code-mirror snippet options
		$scope.cmOption1 = {

            placeholder: "Your code goes here",
            viewportMargin: Infinity,
			lineNumbers: true,
			lineWrapping: true,
			autoCloseBrackets: true,
			enableSearchTools: true,
			showSearchButton: true,
			highlightMatches: true,
			smartIndent: true,
			theme: 'monokai',
			extraKeys: {'Ctrl-Space': 'autocomplete'},
			foldGutter: {
				rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.brace, CodeMirror.fold.comment)
			},
			gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],

			onLoad : function(_cm){

				// HACK to have the codemirror instance in the scope...
				$scope.modeChanged = function(){
					_cm.setOption('mode', $scope.mode.toLowerCase());
				};
			}


		};

        //Archived code-mirror snippet options
		$scope.cmOption2 = {
			lineNumbers: true,
			lineWrapping: true,
			autoCloseBrackets: true,
			enableSearchTools: true,
			showSearchButton: true,
			highlightMatches: true,
			readOnly: 'nocursor',
			smartIndent: true,
			theme: 'monokai',
			extraKeys: {'Ctrl-Space': 'autocomplete'},
			foldGutter: {
				rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.brace, CodeMirror.fold.comment)
			},
			gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
		};


		//initial code content...

		$scope.cmModel = "";


		//create new CodeSnippet
		$scope.create = function(databaseId) {
			//create new CodeSnippet object
			var codeSnippet = new CodeSnippets({
				code: $scope.cmModel,
				mode: $scope.mode,
				databaseId: databaseId});

				//redirect after save
				codeSnippet.$save(function(response) {
					//clear CodeMirror form
					$scope.cmModel = '<!-- XML code in here. -->\n';
					$scope.mode = $scope.modes[0];
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
		};

		//remove existing CodeSnippet
		$scope.remove = function( codeSnippet ) {
			if(codeSnippet) {
				codeSnippet.$remove();

				for(var i in $scope.codeSnippets) {
					if($scope.codeSnippets[i] === codeSnippet)
						$scope.codeSnippets.splice(i, 1);
				}
			}
			else {
				$scope.codeSnippet.$remove(function() {
					$location.path('codeSnippets');
				});
			}
		};

		//Find a list of Code snippets
		$scope.find = function() {
			//query() is GET method provided by $resource
			$scope.codeSnippets = CodeSnippets.query();
		};

		//Find existing Code Snippet
		$scope.findOne = function() {
			$scope.codeSnippet = CodeSnippets.get({
				codeSnippetId: $stateParams.codeSnippetId
			});
		};

		//Reset CodeSnippet field
		$scope.resetCodeSnippetField = function() {
			$scope.cmModel = '<!-- XML code in here. -->\n';
		};

		//admin function
		$scope.isAdmin = function() {
			return (Authentication.user.roles.indexOf('admin') !== -1);
		};

		//update existing CodeSnippet
}]);
