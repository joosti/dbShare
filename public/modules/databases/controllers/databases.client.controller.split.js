'use strict';

// Databases controller
angular.module('databases').controller('DatabasesController', ['$scope', '$rootScope', '$stateParams', '$location', '$window', 'Users', 'Authentication', 'Databases', 'Comments', 'CodeSnippets', '$modal',
	function($scope, $rootScope, $stateParams, $location, $window, Users, Authentication, Databases, Comments, CodeSnippets, $modal) {
		$scope.user = {};
		angular.copy(Authentication.user, $scope.user);
		$scope.authentication = Authentication;

    $scope.currentDatabase = {};

    $scope.orientation = "horizontal";
    $scope.hello = "Hello from Controller!";
        $scope.shit = true;


		$("#vertical").kendoSplitter({
			orientation: "vertical",
			panes: [
				{ collapsible: false, resizable: false, size: "100px" }
			]
		});


		$("#horizontal").kendoSplitter({
			panes: [
				{ collapsible: true, size: "100px" },
        { collapsible: false },
        { collapsible: true, size: "100%" }
			]
		});

    $scope.setDatabase = function(database) {


        console.log("id = " + database._id);

        $scope.findDBUsers(database._id );
        $scope.getComments(database._id );
        $scope.getCodeSnippets(database._id );
        $scope.database = database; //Set this scope's current database
    }

		// Create new Database
		$scope.create = function() {
			// Create new Database object
			var database = new Databases ({
				name: this.name,
				descriptionShort: this.descriptionShort,
				descriptionLong: this.descriptionLong,
				isFree: this.isFree,
				url: this.url
			});

			// Redirect after save
			database.$save(function(response) {
				$location.path('databases/' + response._id);

				// Clear form fields
				$scope.name = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
			//open modals
		$scope.open = function (size, _database) {
			$scope.modalInstance = $modal.open({
		      templateUrl: 'addDBModal',
		      controller: 'ModalInstanceCtrl',
		      size: size,
		      backdrop: 'static',
		      scope: $scope,
		      resolve:{
		      	database: function()
		      	{
		      		return _database;
		      	}
		      }
		   	});
		};

		// Remove existing Database
		$scope.remove = function( database ) {
			if ( database ) { database.$remove();

				for (var i in $scope.databases ) {
					if ($scope.databases [i] === database ) {
						$scope.databases.splice(i, 1);
					}
				}
			} else {
				$scope.database.$remove(function() {
					$location.path('databases');
				});
			}
		};

		// Update existing Database
		$scope.update = function() {
			var database = $scope.database ;

			database.$update(function() {
				$location.path('databases/' + database._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Databases
		$scope.find = function() {


			$scope.databases = Databases.query(function() {
        // $scope.currentDatabase.name = $scope.databases[0].name;
        // $scope.currentDatabase.descriptionShort = $scope.databases[0].descriptionShort;
        // $scope.currentDatabase.descriptionLong = $scope.databases[0].descriptionLong;
        // $scope.currentDatabase.isFree = $scope.databases[0].isFree;
        // $scope.currentDatabase.url = $scope.databases[0].url;
        
        $scope.currentDatabase._id = $scope.databases[0]._id;

        console.log("id = " + $scope.databases[0]._id);

        $scope.findDBUsers($scope.currentDatabase._id );
        $scope.getComments($scope.currentDatabase._id );
        $scope.getCodeSnippets($scope.currentDatabase._id );
        $scope.database = $scope.databases[0]; //Set this scope's current database


      });
     

      // $scope.findDBUsers(Databases[0].id);
      // $scope.getComments(Databases[0].id);
      // $scope.getCodeSnippets(Databases[0].id);
      // $scope.database = Databases[0]; //Set this scope's current databas


        

		};

		// Find existing Database
		$scope.findOne = function() {

      //Note we had to use a local variable 'result' in order to be able to use it within the callback function
      var result = Databases.get({ 
        databaseId: $stateParams.databaseId
      }, function(){

        $scope.findDBUsers(result._id);
        $scope.getComments(result._id);
        $scope.getCodeSnippets(result._id);
        $scope.database = result; //Set this scope's current database
      });
			
		};

		// Add databases into portfolio
		$scope.addDatabaseToPortfolio = function(arg_database, proficiency) {
            $scope.success = $scope.error = null;
            var user = new Users(Authentication.user);
            var database = new Databases($scope.database);
            if(arg_database) {database = arg_database;}

            //Check if database is in portfolio. If not, add to portfolio.
            if (user.portfolios.indexOf(database._id) === -1) {
            	user.portfolios.push(database._id);
            	

				//if user is proficient, then add them to list of proficient users
				if(proficiency){
					user.proficientpors.push(database._id);

				}
				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
					$scope.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});

			}
            //console.log(user);

         $scope.modalInstance.dismiss('cancel');
        };

        //Checks for database in user's portfolio. Returns TRUE if database is NOT in portfolio.
        $scope.checkForDatabaseInPortfolio = function(arg_database) {
        	$scope.success = $scope.error = null;
        	var user = new Users(Authentication.user);
        	var database = new Databases($scope.database);
        	if(arg_database) {database = arg_database;}

        	if(user.portfolios.indexOf(database._id) === -1) {
        		return true;
        	}

        	return false;
        };

        $scope.removeDatabaseFromPortfolio = function(arg_database) {
        	$scope.success = $scope.error = null;
        	var user = new Users(Authentication.user);
        	var database = new Databases($scope.database);
        	if(arg_database) {database = arg_database;}

        	user.portfolios.splice(user.portfolios.indexOf(database._id), 1);
        	user.proficientpors.splice(user.portfolios.indexOf(database._id),1);

        	user.$update(function(response) {
        		$scope.success = true;
        		Authentication.user = response;
        		$scope.user = response;
        	}, function(response) {
        		$scope.error = response.data.message;
        	});
        };

        //This function will find all users which have the provided database in their portfolio
        $scope.findDBUsers = function(database_id){
       		var allUsers = Users.query({}, function(){
	       		for(var i=0; i < allUsers.length; i++)
	       		{
	       			var currUser = allUsers[i];
	       			//If we can't find the database in the user portfolio, splice from array
	       			if(currUser.portfolios.indexOf(database_id) === -1)
	       			{
	       				//console.log(currUser.firstName + " " + currUser.lastName + " does not have this database!");
	       				allUsers.splice(i, 1);
	       				i--; // We need to decrement i because the right neighbor of the recently spliced element will shift left
	       			}
	       		}
	        	$scope.dbUsers = allUsers;
        	});
        };

        //Find all comments associated with the current database
		$scope.getComments = function(database_id) {
			console.log('get here');
			var allComments = Comments.query({}, function(){
				for(var i = 0; i < allComments.length; i++)
				{
					//console.log(allComments);
					var currentComment = allComments[i];
					if(currentComment.databaseId !== database_id) {
						allComments.splice(i,1);
						i--;
					}
				}
				$scope.dbComments = allComments;
			});
		};

		//Find all code snippets associated with the current database
		$scope.getCodeSnippets = function(database_id) {
			console.log('get here');
			var allCodeSnippets = CodeSnippets.query({}, function() {
				for(var i = 0; i < allCodeSnippets.length; i++)
				{
					var currentCodeSnippet = allCodeSnippets[i];
					if(currentCodeSnippet.databaseId !== database_id) {
						allCodeSnippets.splice(i, 1);
						i--;
					}
				}
				$scope.dbCodeSnippets = allCodeSnippets;
			});
		};

		$scope.isProficient = function(proficients,dbID){
			for (var i=0; i<proficients.length; i++)
			{
				var profID = proficients[i];
				if (proficients[i] === dbID)
				{
					return true; 
				}
			}
			return false; 
		};

		$scope.isAdmin = function() {
			return (Authentication.user.roles.indexOf('admin') !== -1);
		};

		//sort order for the list database page
		$scope.sortorder = 'name';

		//default tab for comment/code section
		$scope.selectedTab = 1;
	}
]);

angular.module('databases').controller('ModalInstanceCtrl', function ($scope, $rootScope, $modalInstance, database, Users, Authentication, Databases)
{
			$scope.database = database;


    $scope.cancel = function () {
    $modalInstance.dismiss('cancel');


  };



});


