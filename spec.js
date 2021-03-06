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
var comment = generateUUID();

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

////////////////////////////////////////////////////////////////
////////Login/Out///////////////////////////////////////////////
////////////////////////////////////////////////////////////////

describe('Logging Out',function() {
	it ('should be able to log out', function() {
		dropdown.click();
		signout.click();
		expect($('[data-ng-show="error"]').isDisplayed()).toBeFalsy();
	});
});

describe('Logging in',function() {
	it ('should be able to log in', function() {
		//browser.get('http://localhost:3000/#!/');
		//username.sendKeys('kenan@ufl.edu');
		username.sendKeys(randomUser);

		//password.sendKeys('dbShare2015');
		password.sendKeys(randomPass);

		element(by.buttonText('Sign in')).click();

		expect($('[data-ng-show="error"]').isDisplayed()).toBeFalsy();
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


////////////////////////////////////////////////////////////////
////////Database////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

describe('Adding a database', function(){
	it ('should be able to add a database', function(){
		element(by.id('addDBButton')).click();
		element(by.id('name')).sendKeys( generateUUID() );
		element(by.id('url')).sendKeys( generateUUID() );
		element(by.id('descriptionShort')).sendKeys( generateUUID() );
		element(by.id('descriptionLong')).sendKeys( generateUUID() );
		element(by.id('submit')).click();
		expect($('[data-ng-show="error"]').isDisplayed()).toBeFalsy();
	});
});

describe('View gatorDB', function() {
	it ('should be able to see the database for gatorDB', function() {
		browser.get('http://localhost:3000/#!/databases');
        query.sendKeys('gatorDB');
		element(by.id('gatorDB')).click();
		expect($('[data-ng-show="error"]').isDisplayed()).toBeFalsy();
	});
});


////////////////////////////////////////////////////////////////
////////Comment and Code Snippet////////////////////////////////
////////////////////////////////////////////////////////////////

describe('Creating a new comment', function() {
	it ('should be able to add a comment to the db', function() {
		element(by.id('newCommentTab')).click();
		element(by.id('reviews')).sendKeys( comment );
		element(by.id('commentSubmit')).click();
		expect($('[data-ng-show="error"]').isDisplayed()).toBeFalsy();
	});
});

describe('Checking comment created', function() {

	it ('should be able to confirm comment added', function() {

		browser.sleep(3000);
		element(by.id('commentTab')).click();

		var array = element.all(by.repeater('comment in dbComments').column('comment.reviews')).map(function (elm) {
			return elm.getText();
		});

		expect(array).toContain(comment);
	});
});


////////////////////////////////////////////////////////////////
////////Adding a db to Portfolio////////////////////////////////
////////////////////////////////////////////////////////////////

describe('Adding database to portfolio', function() {
	it ('should show no errors while adding', function() {
		element(by.id('addDBButtonPort')).click();
		element(by.id('proficient'));
		element(by.id('submitAdd')).click();
		expect($('[data-ng-show="error"]').isDisplayed()).toBeFalsy();
	});
});

describe('Checking database created', function() {
	it ('should be able to see the database in portfolio', function() {
		element(by.id('dispName')).click();

		var array = element.all(by.repeater('portfolio in user.portfolios').column('portfolio.name')).map(function (elm) {
			return elm.getText();
		});

		expect(array).toContain('gatorDB');
	});
});

//Finally Signout
describe('Logging Out',function() {
	it ('should be able to log out', function() {
		dropdown.click();
		signout.click();
		expect($('[data-ng-show="error"]').isDisplayed()).toBeFalsy();
	});
});


