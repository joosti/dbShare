// spec.js
var username = element(by.model('credentials.username'));
var password = element(by.model('credentials.password'));
var fname = element(by.model('credentials.firstName'));
var lname = element(by.model('credentials.lastName'));
var research = element(by.model('credentials.researchinterests'));

var name = element(by.model('name'));
var url = element(by.model('url'));
var isFree = element(by.model('isFree'));
var descriptionShort = element(by.model('descriptionShort'));
var descriptionLong = element(by.model('descriptionLong'));

var codeSnippetSubmit = element(by.model('codeSnippetSubmit'));
var query = element(by.model('query'));


////////////////////////////////////////////////////////////////
////////Signin/Signup///////////////////////////////////////////
////////////////////////////////////////////////////////////////

describe('Getting to the homepage', function() {
  it('should have a title', function() {
    browser.get('http://localhost:3000');

    expect(browser.getTitle()).toEqual('CEN3031FA14 - Development Environment');
  });
});

describe('Signing up', function() {
	it ('should be able to reject an existing username', function() {
		browser.get('http://localhost:3000/#!/signup');
		fname.sendKeys('TestFirst');
		lname.sendKeys('TestLast');
		username.sendKeys('Test@ufl.edu');
		password.sendKeys('test123');
		// confirmpassword.sendKeys('test123') ***
		research.sendKeys('This is my research interests. I like to test.');

		element(by.buttonText('Sign up')).click();

		expect($('[data-ng-show="error"]').isDisplayed()).toBeTruthy();
	});

	it ('should not sign up for a non-UFL email', function(){
		browser.get('http://localhost:3000/#!/signup');
		fname.sendKeys('TestFirst');
		lname.sendKeys('TestLast');
		username.sendKeys('Test@yahoo.edu');
		password.sendKeys('test123');
		// confirmpassword.sendKeys('test123') ***
		research.sendKeys('This is my research interests. I like to test. ');

		element(by.buttonText('Sign up')).click();

		expect($('[data-ng-show="error"]').isDisplayed()).toBeTruthy();

	});
});

describe('Logging in',function() {
	it ('should be able to log in', function() {
		browser.get('http://localhost:3000/#!/');

		username.sendKeys('kenan@ufl.edu');
		password.sendKeys('dbShare2015');

		element(by.buttonText('Sign in')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases');
	});
});


////////////////////////////////////////////////////////////////
////////Profile/////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

describe('Viewing your profile', function(){
	it ('should be able to view your profile', function(){
		browser.get('http://localhost:3000/#!/databases');
		element(by.id('dispName')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/settings/profile');
	});
});


describe('Adding database to your portfolio', function(){
	it ('should be able to add a database protfolio', function(){
		browser.get('http://localhost:3000/#!/databases');
		element(by.id('dispName')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/settings/profile');
	});
});

////////////////////////////////////////////////////////////////
////////Database////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

describe('Creating a new database', function() {
    it ('should be able to add all the info of the db', function() {
        // browser.get('http://localhost:3000/#!/databases'); *** select from dropdown menu?
        browser.get('http://localhost:3000/#!/databases/create');

         name.sendKeys('The Real DB2');
         url.sendKeys('www.realdbs2.com');
         isFree.sendKeys(true);
         descriptionShort.sendKeys('This is one of the best dbs on campus and provides a much need information');
         descriptionLong.sendKeys('In this database all the information that is provided is not really understandable\n' +
         'however is you look at it long enough it really strates to make sense.');

         element(by.buttonText('Create Database')).click();
         browser.get('http://localhost:3000/#!/databases');
         expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases');
    });
});

// gatorDB INFO
// http://localhost:3000/#!/databases/552d85612e01ff00006eee89

// describe('Viewing the user directory', function(){
// 	it ('should be able to view all the users in the website', function(){
// 		browser.get('http://localhost:3000/#!/databases');
// 		element(by.id('userDirectory')).click();

// 		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/settings/list');

// 	});
// });

// describe('Viewing the database details', function(){
// 	it ('should be able to see all the info for the db', function(){
// 		browser.get('http://localhost:3000/#!/databases');
// 		element(by.id('userDirectory')).click();

// 		//expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/settings/profile');

// 	});
// });




// <<<<<<< HEAD
// 		query.sendKeys('gatorDB');

// 	});
// });
// =======
// //http://localhost:3000/#!/databases/550f96584a05f10000b428e0
// >>>>>>> b7e9f6b49547d08c147f77e00575035a338a98e1

	describe('View gatorDB', function() {
	it ('should be able to see the database for gatorDB', function() {
		browser.get('http://localhost:3000/#!/databases');
        query.sendKeys('gatorDB');
		element(by.id('gatorDB')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/552d85612e01ff00006eee89');
	});
});


////////////////////////////////////////////////////////////////
////////Comment and Code Snippet////////////////////////////////
////////////////////////////////////////////////////////////////

describe('Creating a new comment', function() {
	it ('should be able to add a comment to the db', function() {
		browser.get('http://localhost:3000/#!/552d85612e01ff00006eee89');

		query.sendKeys('gatorDB');

	});
});

describe('Creating a new codeSnippet', function() {
 	it ('should be able to add a codeSnippet to the db', function() {
 		browser.get('http://localhost:3000/#!/552d85612e01ff00006eee89');

 		query.sendKeys('gatorDB');

 	});
});
