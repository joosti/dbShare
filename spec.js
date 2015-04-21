// spec.js
function generateUUID()
{
	var text = "";
	var possible = "abcdefghijklmnopqrstuvwxyz";

	for( var i=0; i < 8; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

var dropdown = element(by.id('dropdownCaret'));
var signout = element(by.id('signout'));
var username = element(by.model('credentials.username'));
var password = element(by.model('credentials.password'));
var confirmpassword = element(by.model('credentials.confirmpassword'));
var fname = element(by.model('credentials.firstName'));
var lname = element(by.model('credentials.lastName'));
var research = element(by.model('credentials.researchinterests'));

var randomFirst = generateUUID();
var randomLast = generateUUID();
var randomUser = randomLast + "@ufl.edu";
var randomPass = generateUUID();

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

	//it ('should be able to reject an existing username', function() {
	//	browser.get('http://localhost:3000/#!/signup');
	//	fname.sendKeys('TestFirst');
	//	lname.sendKeys('TestLast');
	//	username.sendKeys('Test@ufl.edu');
	//	password.sendKeys('test123');
	//	// confirmpassword.sendKeys('test123') ***
	//	research.sendKeys('This is my research interests. I like to test.');
    //
	//	element(by.buttonText('Sign up')).click();
    //
	//	expect($('[data-ng-show="error"]').isDisplayed()).toBeTruthy();
	//});

	//it ('should not sign up for a non-UFL email', function(){
	//	browser.get('http://localhost:3000/#!/signup');
	//	fname.sendKeys('TestFirst');
	//	lname.sendKeys('TestLast');
	//	username.sendKeys('Test@yahoo.edu');
	//	password.sendKeys('test123');
	//	// confirmpassword.sendKeys('test123') ***
	//	research.sendKeys('This is my research interests. I like to test. ');
    //
	//	element(by.buttonText('Sign up')).click();
    //
	//	expect($('[data-ng-show="error"]').isDisplayed()).toBeTruthy();
    //
	//});
    //
	it ('should be able to create a new user', function() {

		browser.get('http://localhost:3000/#!/signup');
		fname.sendKeys(randomFirst);
		lname.sendKeys(randomLast);
		username.sendKeys(randomUser);
		password.sendKeys(randomPass);
		confirmpassword.sendKeys(randomPass);
		research.sendKeys('This is my research interests. I like to test.');

		element(by.buttonText('Sign up')).click();

		expect($('[data-ng-show="error"]').isDisplayed()).toBeFalsy();
	});

});


//describe('Logging Out',function() {
//	it ('should be able to log out', function() {
//		dropdown.click();
//		signout.click();
//		expect($('[data-ng-show="error"]').isDisplayed()).toBeFalsy();
//	});
//});
//
//describe('Logging in',function() {
//	it ('should be able to log in', function() {
//		//browser.get('http://localhost:3000/#!/');
//		//username.sendKeys('kenan@ufl.edu');
//		username.sendKeys(randomUser);
//
//		//password.sendKeys('dbShare2015');
//		password.sendKeys(randomPass);
//
//		element(by.buttonText('Sign in')).click();
//
//		expect($('[data-ng-show="error"]').isDisplayed()).toBeFalsy();
//	});
//});


////////////////////////////////////////////////////////////////
////////Profile/////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

//describe('Viewing your profile', function(){
//	it ('should be able to view your profile', function(){
//		browser.get('http://localhost:3000/#!/databases');
//		element(by.id('dispName')).click();
//		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/settings/profile');
//	});
//});

//
describe('Adding database to your portfolio', function(){
	it ('should be able to add a database', function(){
		browser.get('http://localhost:3000/#!/databases/');

		var porlist = element.all(by.repeater('item in menu.items'));
		porlist[0].click();

		element(by.id('name')).sendKeys( generateUUID() );
		element(by.id('url')).sendKeys( generateUUID() );
		element(by.id('descriptionShort')).sendKeys( generateUUID() );
		element(by.id('descriptionLong')).sendKeys( generateUUID() );
		element(by.id('submit')).click();
		expect($('[data-ng-show="error"]').isDisplayed()).toBeFalsy();
	});


});

////////////////////////////////////////////////////////////////
////////Database////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

//describe('Creating a new database', function() {
//    it ('should be able to add all the info of the db', function() {
//        // browser.get('http://localhost:3000/#!/databases'); *** select from dropdown menu?
//        browser.get('http://localhost:3000/#!/databases/create');
//
//         name.sendKeys('The Real DB2');
//         url.sendKeys('www.realdbs2.com');
//         isFree.sendKeys(true);
//         descriptionShort.sendKeys('This is one of the best dbs on campus and provides a much need information');
//         descriptionLong.sendKeys('In this database all the information that is provided is not really understandable\n' +
//         'however is you look at it long enough it really strates to make sense.');
//
//         element(by.buttonText('Create Database')).click();
//         browser.get('http://localhost:3000/#!/databases');
//         expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases');
//    });
//});

// gatorDB INFO
// http://localhost:3000/#!/databases/552d85612e01ff00006eee89

//describe('View gatorDB', function() {
//	it ('should be able to see the database for gatorDB', function() {
//		browser.get('http://localhost:3000/#!/databases');
//        query.sendKeys('gatorDB');
//		element(by.id('gatorDB')).click();
//
//		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/552d85612e01ff00006eee89');
//	});
//});


////////////////////////////////////////////////////////////////
////////Comment and Code Snippet////////////////////////////////
////////////////////////////////////////////////////////////////
//
//describe('Creating a new comment', function() {
//	it ('should be able to add a comment to the db', function() {
//		browser.get('http://localhost:3000/#!/552d85612e01ff00006eee89');
//
//		query.sendKeys('gatorDB');
//
//	});
//});
//
//describe('Creating a new codeSnippet', function() {
// 	it ('should be able to add a codeSnippet to the db', function() {
// 		browser.get('http://localhost:3000/#!/552d85612e01ff00006eee89');
//
// 		query.sendKeys('gatorDB');
//
// 	});
//});

//describe('Deleting a user', function() {
//	it ('should be able to delete a user', function() {
//		browser.get('http://localhost:3000/#!/settings/edit');
//		element(by.id('deleteMe')).click();
//
//
//
//
//	});
//});


