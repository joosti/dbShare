'use strict';
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = function () {
    // Init module configuration options
    var applicationModuleName = 'cen3031fa14';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ngCookies',
        'ngAnimate',
        'ngTouch',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'ui.codemirror'
      ];
    // Add a new vertical module
    var registerModule = function (moduleName, dependencies) {
      // Create angular module
      angular.module(moduleName, dependencies || []);
      // Add the module to the AngularJS configuration file
      angular.module(applicationModuleName).requires.push(moduleName);
    };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();'use strict';
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_')
    window.location.hash = '#!';
  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('codeSnippets');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('comments');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('databases');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');'use strict';
// Setting up route
angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    // Home state routing
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/users/views/authentication/signin.client.view.html'
    });
  }
]);'use strict';
angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  function ($scope, Authentication, Menus) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);'use strict';
angular.module('core').controller('HomeController', [
  '$scope',
  'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }
]);'use strict';
//Menu service used for managing  menus
angular.module('core').service('Menus', [function () {
    // Define a set of default roles
    this.defaultRoles = ['*'];
    // Define the menus object
    this.menus = {};
    // A private function for rendering decision 
    var shouldRender = function (user) {
      if (user) {
        if (!!~this.roles.indexOf('*')) {
          return true;
        } else {
          for (var userRoleIndex in user.roles) {
            for (var roleIndex in this.roles) {
              if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
                return true;
              }
            }
          }
        }
      } else {
        return this.isPublic;
      }
      return false;
    };
    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exist');
        }
      } else {
        throw new Error('MenuId was not provided');
      }
      return false;
    };
    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      return this.menus[menuId];
    };
    // Add new menu object by menu id
    this.addMenu = function (menuId, isPublic, roles) {
      // Create the new menu
      this.menus[menuId] = {
        isPublic: isPublic || false,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      };
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      delete this.menus[menuId];
    };
    // Add menu item object
    this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Push new menu item
      this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: isPublic === null || typeof isPublic === 'undefined' ? this.menus[menuId].isPublic : isPublic,
        roles: roles === null || typeof roles === 'undefined' ? this.menus[menuId].roles : roles,
        position: position || 0,
        items: [],
        shouldRender: shouldRender
      });
      // Return the menu object
      return this.menus[menuId];
    };
    // Add submenu item object
    this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: menuItemTitle,
            link: menuItemURL,
            uiRoute: menuItemUIRoute || '/' + menuItemURL,
            isPublic: isPublic === null || typeof isPublic === 'undefined' ? this.menus[menuId].items[itemIndex].isPublic : isPublic,
            roles: roles === null || typeof roles === 'undefined' ? this.menus[menuId].items[itemIndex].roles : roles,
            position: position || 0,
            shouldRender: shouldRender
          });
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    //Adding the topbar menu
    this.addMenu('topbar');
  }]);'use strict';
// Configuring the Articles module
angular.module('databases').run([
  'Menus',
  function (Menus, $rootScope) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Databases', 'databases', 'dropdown', '/databases(/create)?');
    Menus.addSubMenuItem('topbar', 'databases', 'List Databases', 'databases');
    Menus.addSubMenuItem('topbar', 'databases', 'New Database', 'databases/create');

      //If not logged in, do not show as logged in
      $rootScope.isLoggedIn = false;
  }
]);'use strict';
//Setting up route
angular.module('databases').config([
  '$stateProvider',
  function ($stateProvider) {
    // Databases state routing
    $stateProvider.state('listDatabases', {
      url: '/databases',
      templateUrl: 'modules/databases/views/list-databases.client.view.html'
    }).state('createDatabase', {
      url: '/databases/create',
      templateUrl: 'modules/databases/views/create-database.client.view.html'
    }).state('viewDatabase', {
      url: '/databases/:databaseId',
      templateUrl: 'modules/databases/views/view-database.client.view.html'
    }).state('editDatabase', {
      url: '/databases/:databaseId/edit',
      templateUrl: 'modules/databases/views/edit-database.client.view.html'
    });
  }
]);'use strict';
//code Snippet controller
angular.module('codeSnippets').controller('CodeSnippetsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'CodeSnippets',
  function ($scope, $stateParams, $location, Authentication, CodeSnippets) {
    $scope.authentication = Authentication;
    /* NEW CODEMIRROR CONTROLS */
    //modes enabled for posting code comments
    $scope.modes = ['R'];
    $scope.mode = $scope.modes[0];
    //New code-mirror snippet options
    $scope.cmOption1 = {
      placeholder: 'Your code goes here',
      viewportMargin: Infinity,
      lineNumbers: true,
      lineWrapping: true,
      autoCloseBrackets: true,
      enableSearchTools: true,
      showSearchButton: true,
      highlightMatches: true,
      smartIndent: true,
      theme: 'monokai',
      extraKeys: { 'Ctrl-Space': 'autocomplete' },
      foldGutter: { rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.brace, CodeMirror.fold.comment) },
      gutters: [
        'CodeMirror-linenumbers',
        'CodeMirror-foldgutter'
      ],
      onLoad: function (_cm) {
        // HACK to have the codemirror instance in the scope...
        $scope.modeChanged = function () {
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
      extraKeys: { 'Ctrl-Space': 'autocomplete' },
      foldGutter: { rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.brace, CodeMirror.fold.comment) },
      gutters: [
        'CodeMirror-linenumbers',
        'CodeMirror-foldgutter'
      ]
    };
    //initial code content...
    $scope.cmModel = '';
    //create new CodeSnippet
    $scope.create = function (databaseId) {
      //create new CodeSnippet object
      var codeSnippet = new CodeSnippets({
          code: $scope.cmModel,
          mode: $scope.mode,
          databaseId: databaseId
        });
      //redirect after save
      codeSnippet.$save(function (response) {
        //clear CodeMirror form
        $scope.cmModel = '<!-- XML code in here. -->\n';
        $scope.mode = $scope.modes[0];
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    //remove existing CodeSnippet
    $scope.remove = function (codeSnippet) {
      if (codeSnippet) {
        codeSnippet.$remove();
        for (var i in $scope.codeSnippets) {
          if ($scope.codeSnippets[i] === codeSnippet)
            $scope.codeSnippets.splice(i, 1);
        }
      } else {
        $scope.codeSnippet.$remove(function () {
          $location.path('codeSnippets');
        });
      }
    };
    //Find a list of Code snippets
    $scope.find = function () {
      //query() is GET method provided by $resource
      $scope.codeSnippets = CodeSnippets.query();
    };
    //Find existing Code Snippet
    $scope.findOne = function () {
      $scope.codeSnippet = CodeSnippets.get({ codeSnippetId: $stateParams.codeSnippetId });
    };
    //Reset CodeSnippet field
    $scope.resetCodeSnippetField = function () {
      $scope.cmModel = '<!-- XML code in here. -->\n';
    };
    //admin function
    $scope.isAdmin = function () {
      return Authentication.user.roles.indexOf('admin') !== -1;
    };  //update existing CodeSnippet
  }
]);'use strict';
// Comments controller
angular.module('comments').controller('CommentsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Comments',
  function ($scope, $stateParams, $location, Authentication, Comments) {
    $scope.authentication = Authentication;
    // Create new Comment
    $scope.create = function (databaseId) {
      // Create new Comment object
      var comment = new Comments({
          reviews: this.reviews,
          databaseId: databaseId
        });
      // Redirect after save
      comment.$save(function (response) {
        // Clear form fields
        $scope.name = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Remove existing Comment
    $scope.remove = function (comment) {
      if (comment) {
        comment.$remove();
        for (var i in $scope.comments) {
          if ($scope.comments[i] === comment) {
            $scope.comments.splice(i, 1);
          }
        }
      } else {
        $scope.comment.$remove(function () {
          $location.path('comments');
        });
      }
    };
    // Update existing Comment
    $scope.update = function () {
      var comment = $scope.comment;
      comment.$update(function () {
        $location.path('comments/' + comment._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Comments
    $scope.find = function () {
      $scope.comments = Comments.query();
    };
    // Find existing Comment
    $scope.findOne = function () {
      $scope.comment = Comments.get({ commentId: $stateParams.commentId });
    };
    //Reset comment field
    $scope.resetCommentField = function () {
      $scope.reviews = null;
    };
    $scope.isAdmin = function () {
      return Authentication.user.roles.indexOf('admin') !== -1;
    };
  }
]);'use strict';
// Databases controller
angular.module('databases').controller('DatabasesController', [
  'kendo-ui-core.directives',
  '$scope',
    '$rootScope',
  '$stateParams',
  '$location',
  '$window',
  'Users',
  'Authentication',
  'Databases',
  'Comments',
  'CodeSnippets',
  '$modal',
  function ($scope, $rootScope, $stateParams, $location, $window, Users, Authentication, Databases, Comments, CodeSnippets, $modal) {
    $scope.user = {};
    angular.copy(Authentication.user, $scope.user);
    $scope.authentication = Authentication;
    $scope.orientation = 'horizontal';
    $scope.hello = 'Hello from Controller!';
    // Create new Database
    $scope.create = function () {
      // Create new Database object
      var database = new Databases({
          name: this.name,
          descriptionShort: this.descriptionShort,
          descriptionLong: this.descriptionLong,
          isFree: this.isFree,
          url: this.url
        });
      // Redirect after save
      database.$save(function (response) {
        $location.path('databases/' + response._id);
        // Clear form fields
        $scope.name = '';
      }, function (errorResponse) {
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
        resolve: {
          database: function () {
            return _database;
          }
        }
      });
    };
    // Remove existing Database
    $scope.remove = function (database) {
      if (database) {
        database.$remove();
        for (var i in $scope.databases) {
          if ($scope.databases[i] === database) {
            $scope.databases.splice(i, 1);
          }
        }
      } else {
        $scope.database.$remove(function () {
          $location.path('databases');
        });
      }
    };
    // Update existing Database
    $scope.update = function () {
      var database = $scope.database;
      database.$update(function () {
        $location.path('databases/' + database._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Databases
    $scope.find = function () {
      $scope.databases = Databases.query();
    };
    // Find existing Database
    $scope.findOne = function () {
      //Note we had to use a local variable 'result' in order to be able to use it within the callback function
      var result = Databases.get({ databaseId: $stateParams.databaseId }, function () {
          $scope.findDBUsers(result._id);
          $scope.getComments(result._id);
          $scope.getCodeSnippets(result._id);
          $scope.database = result;  //Set this scope's current database
        });
    };
    // Add databases into portfolio
    $scope.addDatabaseToPortfolio = function (arg_database, proficiency) {
      $scope.success = $scope.error = null;
      var user = new Users(Authentication.user);
      var database = new Databases($scope.database);
      if (arg_database) {
        database = arg_database;
      }
      //Check if database is in portfolio. If not, add to portfolio.
      if (user.portfolios.indexOf(database._id) === -1) {
        user.portfolios.push(database._id);
        //if user is proficient, then add them to list of proficient users
        if (proficiency) {
          user.proficientpors.push(database._id);
        }
        user.$update(function (response) {
          $scope.success = true;
          Authentication.user = response;
          $scope.user = response;
        }, function (response) {
          $scope.error = response.data.message;
        });
      }
      //console.log(user);
      $scope.modalInstance.dismiss('cancel');
    };
    //Checks for database in user's portfolio. Returns TRUE if database is NOT in portfolio.
    $scope.checkForDatabaseInPortfolio = function (arg_database) {
      $scope.success = $scope.error = null;
      var user = new Users(Authentication.user);
      var database = new Databases($scope.database);
      if (arg_database) {
        database = arg_database;
      }
      if (user.portfolios.indexOf(database._id) === -1) {
        return true;
      }
      return false;
    };
    $scope.removeDatabaseFromPortfolio = function (arg_database) {
      $scope.success = $scope.error = null;
      var user = new Users(Authentication.user);
      var database = new Databases($scope.database);
      if (arg_database) {
        database = arg_database;
      }
      user.portfolios.splice(user.portfolios.indexOf(database._id), 1);
      user.proficientpors.splice(user.portfolios.indexOf(database._id), 1);
      user.$update(function (response) {
        $scope.success = true;
        Authentication.user = response;
        $scope.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };
    //This function will find all users which have the provided database in their portfolio
    $scope.findDBUsers = function (database_id) {
      var allUsers = Users.query({}, function () {
          for (var i = 0; i < allUsers.length; i++) {
            var currUser = allUsers[i];
            //If we can't find the database in the user portfolio, splice from array
            if (currUser.portfolios.indexOf(database_id) === -1) {
              //console.log(currUser.firstName + " " + currUser.lastName + " does not have this database!");
              allUsers.splice(i, 1);
              i--;  // We need to decrement i because the right neighbor of the recently spliced element will shift left
            }
          }
          $scope.dbUsers = allUsers;
        });
    };
    //Find all comments associated with the current database
    $scope.getComments = function (database_id) {
      console.log('get here');
      var allComments = Comments.query({}, function () {
          for (var i = 0; i < allComments.length; i++) {
            //console.log(allComments);
            var currentComment = allComments[i];
            if (currentComment.databaseId !== database_id) {
              allComments.splice(i, 1);
              i--;
            }
          }
          $scope.dbComments = allComments;
        });
    };
    //Find all code snippets associated with the current database
    $scope.getCodeSnippets = function (database_id) {
      console.log('get here');
      var allCodeSnippets = CodeSnippets.query({}, function () {
          for (var i = 0; i < allCodeSnippets.length; i++) {
            var currentCodeSnippet = allCodeSnippets[i];
            if (currentCodeSnippet.databaseId !== database_id) {
              allCodeSnippets.splice(i, 1);
              i--;
            }
          }
          $scope.dbCodeSnippets = allCodeSnippets;
        });
    };
    $scope.isProficient = function (proficients, dbID) {
      for (var i = 0; i < proficients.length; i++) {
        var profID = proficients[i];
        if (proficients[i] === dbID) {
          return true;
        }
      }
      return false;
    };
    $scope.isAdmin = function () {
      return Authentication.user.roles.indexOf('admin') !== -1;
    };
    //sort order for the list database page
    $scope.sortorder = 'name';
    //default tab for comment/code section
    $scope.selectedTab = 1;
  }
]);
angular.module('databases').controller('ModalInstanceCtrl', [
  '$scope',
  '$modalInstance',
  'database',
  'Users',
  'Authentication',
  'Databases',
  function ($scope, $modalInstance, database, Users, Authentication, Databases) {
    $scope.database = database;
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);'use strict';
//Comments service used to communicate CodeSnippet REST endpoints
angular.module('codeSnippets').factory('CodeSnippets', [
  '$resource',
  function ($resource) {
    return $resource('codeSnippets/:codeSnippetId', { codeSnippetId: '@_id' });  //place update action after returned $resource
  }
]);'use strict';
//Comments service used to communicate Comments REST endpoints
angular.module('comments').factory('Comments', [
  '$resource',
  function ($resource) {
    return $resource('comments/:commentId', { commentId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
//Databases service used to communicate Databases REST endpoints
angular.module('databases').factory('Databases', [
  '$resource',
  function ($resource) {
    return $resource('databases/:databaseId', { databaseId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Config HTTP Error Handling
angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              // Deauthenticate the global user
              Authentication.user = null;
              // Redirect to signin page
              $location.path('signin');
              break;
            case 403:
              // Add unauthorized behaviour 
              break;
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);'use strict';
// Setting up route
angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider.state('edit', {
      url: '/settings/edit',
      templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
    }).state('profile', {
      url: '/settings/profile',
      templateUrl: 'modules/users/views/settings/view-profile.client.view.html'
    }).state('password', {
      url: '/settings/password',
      templateUrl: 'modules/users/views/settings/change-password.client.view.html'
    }).state('accounts', {
      url: '/settings/accounts',
      templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
    }).state('list', {
      url: '/settings/list',
      templateUrl: 'modules/users/views/list-users.client.view.html'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'modules/users/views/authentication/signup.client.view.html'
    }).state('signin', {
      url: '/signin',
      templateUrl: 'modules/users/views/authentication/signin.client.view.html'
    }).state('forgot', {
      url: '/password/forgot',
      templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
    }).state('reset-invalid', {
      url: '/password/reset/invalid',
      templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
    }).state('reset-success', {
      url: '/password/reset/success',
      templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
    }).state('viewUser', {
      url: '/users/:userId',
      templateUrl: 'modules/users/views/view-user.client.view.html'
    }).state('verify', {
      url: '/verify',
      templateUrl: 'modules/users/views/authentication/verify-email.client.view.html'
    }).state('reset', {
      url: '/password/reset/:token',
      templateUrl: 'modules/users/views/password/reset-password.client.view.html'
    });
  }
]);'use strict';
angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$stateParams',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $stateParams, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    $scope.registration = 'open';
    // If user is signed in and not an administrator then redirect back home
    if ($scope.authentication.user && $scope.authentication.user.roles.indexOf('admin') === -1)
      $location.path('/databases');
    $scope.signup = function () {
      if ($scope.credentials.confirmpassword !== $scope.credentials.password) {
        $scope.error = 'Passwords do not match';
      } else {
        //If user is not logged in or not an administrator, check if UFL email address
        if (!$scope.authentication.user || $scope.authentication.user.roles.indexOf('admin') === -1) {
          var match = $scope.credentials.username.match(/^.*@ufl\.edu$/);
          if (match === null) {
            $scope.error = 'You must use a valid UFL email address';
          } else if ($scope.registration === 'closed') {
            $scope.error = 'Registration is currently closed.';
          } else {
            //email address is valid, continue with signup
            $http.post('/auth/signup', $scope.credentials).success(function (response) {
              // If successful we assign the response to the global user model
              $scope.authentication.user = response;
              // And redirect to the index page
              $location.path('/databases');
            }).error(function (response) {
              $scope.error = response.message;
            });
          }
        }  //user is an administrator
        else {
          $http.post('/auth/signup', $scope.credentials).success(function (response) {
            // And redirect to the index page
            $location.path('/databases');
          }).error(function (response) {
            $scope.error = response.message;
          });
        }
      }
    };
    $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        // And redirect to the index page
        $location.path('/databases');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.verifyEmail = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/verification/' + $stateParams.token).success(function (response) {
        // Attach user profile
        Authentication.user = response;
        //$scope.error = 'none';
        $location.path('/verify');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.toggleRegistration = function () {
      if ($scope.registration === 'open') {
        $scope.registration = 'closed';
      } else {
        $scope.registration = 'open';
      }
    };
  }
]);'use strict';
angular.module('users').controller('PasswordController', [
  '$scope',
  '$stateParams',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $stateParams, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    //If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    // Submit forgotten password account id
    $scope.askForPasswordReset = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/forgot', $scope.credentials).success(function (response) {
        // Show user success message and clear form
        $scope.credentials = null;
        $scope.success = response.message;
      }).error(function (response) {
        // Show user error message and clear form
        $scope.credentials = null;
        $scope.error = response.message;
      });
    };
    // Change user password
    $scope.resetUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.passwordDetails = null;
        // Attach user profile
        Authentication.user = response;
        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$timeout',
  '$location',
  'Users',
  'Authentication',
  'Databases',
  '$modal',
  function ($scope, $http, $timeout, $location, Users, Authentication, Databases, $modal) {
    $scope.accountResult = false;
    $scope.user = {};
    angular.copy(Authentication.user, $scope.user);
    //Deep copy so that changes can be reverted
    $scope.originalUser = {};
    //Keep the original copy of the user
    angular.copy($scope.user, $scope.originalUser);
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/');
    $scope.authentication = Authentication;
    // Check if there are additional accounts 
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }
      return false;
    };
    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    };
    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;
      $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      if (isValid) {
        $scope.success = $scope.error = null;
        var user = new Users($scope.user);
        user.$update(function (response) {
          $scope.success = true;
          Authentication.user = response;
        }, function (response) {
          $scope.error = response.data.message;
        });
      } else {
        $scope.submitted = true;
      }
    };
    $scope.cancelChanges = function () {
      Authentication.user = $scope.originalUser;
    };
    // Redirect to View profile page after a certain number of ms
    $scope.redirectToViewProfile = function (ms) {
      $timeout(function () {
        $location.path('/settings/profile');
      }, ms);
    };
    // Change user password
    $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null;
      //console.log($scope.passwordDetails);
      $http.post('/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    //Modal settings and functions
    $scope.open = function (size) {
      $scope.modalInstance = $modal.open({
        templateUrl: 'deleteAccountModal',
        controller: 'SettingsController',
        size: size,
        backdrop: 'static',
        scope: $scope
      });
    };
    //Deactivate user account
    $scope.deleteAccount = function (passwordModal) {
      $scope.success = $scope.error = null;
      $scope.passwordModal = passwordModal;
      $http.post('/users/verify', $scope.passwordModal).success(function (response) {
        $scope.success = true;
        $location.path('/auth/signout');
        Authentication.user = null;
        $scope.modalInstance.dismiss('delete');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // Find existing Database in Porfolio
    $scope.findUserPortfolio = function () {
      //Must save initial count because we will be changing this array
      var initPortCount = Authentication.user.portfolios.length;
      for (var i = 0; i < initPortCount; i++) {
        //Call method to remove bad portfolios from (Authentication/$scope).user.portfolios
        //Needed a separate method to preserve the current i value when the async request is made (Databases.get)
        $scope.removeBadPortfolioEntries(i);
      }
    };
    $scope.removeBadPortfolioEntries = function (i) {
      var databaseID = Authentication.user.portfolios[i];
      //Execute async request to get db
      var result = Databases.get({ databaseId: databaseID }, function () {
          //console.log('success');
          var index = $scope.user.portfolios.indexOf(databaseID);
          $scope.user.portfolios[index] = result;
          //Update $scope.user.portfolios
          $scope.finishEditPortfolio();
        }, function () {
          var index = $scope.user.portfolios.indexOf(databaseID);
          //console.log('Dead database removed from portfolio. id:' + $scope.user.portfolios[index]);
          if (index !== -1)
            $scope.removeElementfromPortfolio(index);
          //Remove the bad db
          $scope.finishEditPortfolio();
        });  //It appears as if each time finishEditPf is called, it will fail if there is already another async request being processed.	
    };
    $scope.editPortfolioBoolean = false;
    $scope.toggleEditPortfolio = function () {
      if ($scope.editPortfolioBoolean === false) {
        $scope.editPortfolioBoolean = true;  //console.log('toggled');
      } else {
        $scope.editPortfolioBoolean = false;
      }
    };
    $scope.checkEditPortfolio = function () {
      if ($scope.editPortfolioBoolean === false) {
        return false;
      }
      if ($scope.editPortfolioBoolean === true) {
        return true;
      }
    };
    $scope.removeElementfromPortfolio = function (portfolio_arg) {
      $scope.user.portfolios.splice(portfolio_arg, 1);
      Authentication.user.portfolios.splice(portfolio_arg, 1);
    };
    $scope.finishEditPortfolio = function () {
      var user = new Users(Authentication.user);
      user.$update(function (response) {
        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('UsersController', [
  '$scope',
  '$stateParams',
  '$location',
  'Users',
  'Databases',
  'Authentication',
  function ($scope, $stateParams, $location, Users, Databases, Authentication) {
    $scope.authentication = Authentication;
    $scope.user = {};
    $scope.users = {};
    $scope.inactive = '';
    //retrieve a list of users in the website
    $scope.findAllUsers = function () {
      $scope.users = Users.query();
    };
    //Retrieve a specific user from the back end
    $scope.findOneUser = function () {
      var allUsers = Users.query({}, function () {
          for (var i = 0; i < allUsers.length; i++) {
            var currUser = allUsers[i];
            if (currUser._id === $stateParams.userId) {
              $scope.user = currUser;
              $scope.inactive = $scope.user.roles.indexOf('inactive') !== -1;
            }
          }
          $scope.findUserPortfolio();
        });
    };
    //Retrieve user's portfolio
    $scope.findUserPortfolio = function () {
      //Must save initial count because we will be changing this array
      var initPortCount = $scope.user.portfolios.length;
      for (var i = 0; i < initPortCount; i++) {
        //Call method to remove bad portfolios from (Authentication/$scope).user.portfolios
        //Needed a separate method to preserve the current i value when the async request is made (Databases.get)
        $scope.removeBadPortfolioEntries(i);
      }
    };
    //Clean up bad/dead database entries in user's portfolio
    $scope.removeBadPortfolioEntries = function (i) {
      var databaseID = $scope.user.portfolios[i];
      //Execute async request to get db
      var result = Databases.get({ databaseId: databaseID }, function () {
          var index = $scope.user.portfolios.indexOf(databaseID);
          $scope.user.portfolios[index] = result;  //Update $scope.user.portfolios
        }, function () {
          var index = $scope.user.portfolios.indexOf(databaseID);
          //console.log('Dead database removed from portfolio. id:' + $scope.user.portfolios[index]);
          if (index !== -1)
            $scope.user.portfolios.splice(index, 1);  //Remove the bad db
        });
    };
    //Sort order variable for users list
    $scope.sortorder = 'displayname';
    $scope.isAdmin = function () {
      return Authentication.user.roles.indexOf('admin') !== -1;
    };
    $scope.userInactive = function () {
      return $scope.inactive;
    };
    //Functions for Deactivation and Reactivation of users
    $scope.deactivateUser = function () {
      $scope.user.roles.push('inactive');
      $scope.inactive = true;
      var currUser = $scope.user;
      Users.save(currUser);
    };
    $scope.reactivateUser = function () {
      $scope.user.roles.splice($scope.user.roles.indexOf('inactive'), 1);
      $scope.inactive = false;
      var currUser = $scope.user;
      Users.save(currUser);
    };
  }
]);'use strict';
// Authentication service for user variables
angular.module('users').factory('Authentication', [function () {
    var _this = this;
    _this._data = { user: window.user };
    return _this._data;
  }]);'use strict';
// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users/:userId', { userId: '@_id' }, { update: { method: 'PUT' } });
  }
]);
