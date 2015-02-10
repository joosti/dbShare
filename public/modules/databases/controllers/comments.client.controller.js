'use strict';

// Comments controller
angular.module('comments').controller('CommentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Comments',
	function($scope, $stateParams, $location, Authentication, Comments ) {
		$scope.authentication = Authentication;

		// Create new Comment
		$scope.create = function(databaseId) {
			// Create new Comment object
			var comment = new Comments ({
				reviews: this.reviews,
				databaseId: databaseId
			});

			// Redirect after save
			comment.$save(function(response) {
				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};

		// Remove existing Comment
		$scope.remove = function( comment ) {
			if ( comment ) { comment.$remove();

				for (var i in $scope.comments ) {
					if ($scope.comments [i] === comment ) {
						$scope.comments.splice(i, 1);
					}
				}
			} else {
				$scope.comment.$remove(function() {
					$location.path('comments');
				});
			}
		};

		// Update existing Comment
		$scope.update = function() {
			var comment = $scope.comment ;

			comment.$update(function() {
				$location.path('comments/' + comment._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Comments
		$scope.find = function() {
			$scope.comments = Comments.query();
		};

		// Find existing Comment
		$scope.findOne = function() {
			$scope.comment = Comments.get({ 
				commentId: $stateParams.commentId
			});
		};

		//Reset comment field
		$scope.resetCommentField = function(){
			$scope.reviews = null;
		};

		$scope.isAdmin = function() {
			return (Authentication.user.roles.indexOf('admin') !== -1);
		};

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
			extraKeys: {"Ctrl-Space": "autocomplete"},
			foldGutter: {
				rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.brace, CodeMirror.fold.comment)
			},
			gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],

			onLoad : function(_cm){

				// HACK to have the codemirror instance in the scope...
				$scope.modeChanged = function(){
					_cm.setOption("mode", $scope.mode.toLowerCase());
				};
			}
		};

		//initial code content...

		$scope.cmModel = '<!-- XML code in here. -->\n' +
		'<root class="main">\n\t<foo style="background-attachment: fixed">\n\t\tOMG this is great!\n\t</foo>\n\t<bar/>\n</root>\n\n\n' +
		'// Javascript code in here.\n' +
		'function foo(msg) {\n\tvar r = Math.random();\n\treturn "" + r + " : " + msg;\n}'
		+'\n\n# SQL code in here\n'+
		'\nSELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate\n'+
		'FROM Orders\n'+
		'INNER JOIN Customers\n'+
		'ON Orders.CustomerID=Customers.CustomerID;\n';
	}
]);
