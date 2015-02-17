'use strict';

//code Snippet controller
angular.module('codeSnippets').controller('CodeSnippetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'CodeSnippets', 
	function( $scope, $stateParams, $location, Authentication, CodeSnippets ){

		$scope.authentication = Authentication;

		/* NEW CODEMIRROR CONTROLS */

		//modes enabled for posting code comments

		$scope.modes = ['SASS', 'R'];

		$scope.mode = $scope.modes[0];

		$scope.cmOption = {
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

		//initial code content...

		$scope.cmModel = '// Sass code goes here\n\n' +
		'$page-width:    800px\n'+
		'$sidebar-width: 200px\n'+
		'$primary-color: #eeeeee\n\n'+
		'body.home .media-unit {\n' +
		'\tborder: 1px solid #ccc;\n'+
		'\tbackground-color: #fff;\n'+
		'}\n'+
		'body.home  .media-unit .right {\n' +
		'\tborder-left: 1px solid #ccc;\n' +
		'}\n'+
		'body.home .media-unit .right h1 {\n' +
		'\tfont-size: 24px;\n'+
		'}\n' +
		'\n\n\n# R code goes here\n\n' +
		'VARselect(x, lag.max=10, type="both")\n' +
		'summary(fit <- VAR(x, p=2, type="both"))\n' +
		'library(fGarch)\n' +
		'summary(nyse.g <- garchFit(~garch(1,1), nyse))\t' +
		'u = nyse.g@sigma.t\n' +
		'plot(window(nyse, start=900, end=1000), ylim=c(-.22,.2), ylab="NYSE Returns")\n'+
		'lines(window(nyse-2*u, start=900, end=1000), lty=2, col=4)\n' +
		'lines(window(nyse+2*u, start=900, end=1000), lty=2, col=4)\n' +
		'X = list(height=5.4, weight=54)\n' +
		'print("Use default printing --")\n' +
		'print(X)\n' +
		'print("Accessing individual elements --")\n' +
		'cat("Your height is ", X$height, " and your weight is ", X$weight, "\n")\n' +
		'square <- function(x) {\n' +
		'\treturn(x*x)\n'+
		'}\n'+
		'cat("The square of 3 is ", square(3), "\n")\n';


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
			} else {
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
