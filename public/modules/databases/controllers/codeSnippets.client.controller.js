'use strict';

angular.module('codeSnippets').controller('CodeSnippetController', ['$scope', '$stateParams', '$location', 'Authentication', 'CodeSnippet', 
	function( $scope, $stateParams, $location, Authentication, CodeSnippets ){

		$scope.authentication = Authentication;

		/* NEW CODEMIRROR CONTROLS */

		//modes enabled for posting code comments

		$scope.modes = ['XML', 'Javascript', 'text/x-mysql'];

		$scope.mode = $scope.modes[0];

		$scope.cmOption = {
			lineNumbers: true,
			lineWrapping: true,
			autoCloseTags: true,
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

		//initial code content...

		$scope.cmModel = '<!-- XML code in here. -->\n' +
		'<root class="main">\n\t<foo style="background-attachment: fixed">\n\t\tOMG this is great!\n\t</foo>\n\t<bar/>\n</root>\n\n\n' +
		'// Javascript code in here.\n' +
		'function foo(msg) {\n\tvar r = Math.random();\n\treturn "" + r + " : " + msg;\n}' +
		'\n\n# SQL code in here\n' +
		'\nSELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate\n'+
		'FROM Orders\n' +
		'INNER JOIN Customers\n' +
		'ON Orders.CustomerID=Customers.CustomerID;\n';


		//create new CodeSnippet
		$scope.create = function(databaseId) {
			//create new CodeSnippet object
			var codeSnippet = new CodeSnippet({
				code = this.cmModel;
				mode = this.mode;
				databaseId = databaseId;

				//redirect after save
				codeSnippet.$save(function(response) {
					//clear CodeMirror form
					$scope.cmModel = '<!-- XML code in here. -->\n';
					$scope.mode = $scope.modes[0];
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			});
		};

		//remove existing CodeSnippet

		//update existing CodeSnippet
}]);