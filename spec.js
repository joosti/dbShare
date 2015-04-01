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


describe('Getting to the homepage', function() {
  it('should have a title', function() {
    browser.get('http://localhost:3000');

    expect(browser.getTitle()).toEqual('CEN3031FA14 - Development Environment');
  });
});

describe('Creating a new database', function() {
	it ('should be able to add all the info of the db', function() {
		browser.get('http://localhost:3000/#!/databases');
		element(by.buttonText('Create New Database')).click();

		browser.get('http://localhost:3000/#!/databases/create');
		name.sendKeys('The Real DB');
		url.sendKeys('www.realdbs.com');
		isFree.sendKeys(true);
		descriptionShort.sendKeys('This is one of the best dbs on campus and provides a much need information');
		descriptionLong.sendKeys('In this database all the information that is provided is not really understandable\n' +
		'however is you look at it long enought it really strates to make sense.');

		element(by.buttonText('Create Database')).click();
	});
});

describe('Creating a new codeSnippet', function() {
	it ('should be able to add a codeSnippet to the db', function() {
		browser.get('http://localhost:3000/#!/databases');

		query.sendKeys('gatorDB');

	});
});


describe('Signing up', function() {
	it ('should be able to reject an existing username', function() {
		browser.get('http://localhost:3000/#!/signup');
		fname.sendKeys('TestFirst');
		lname.sendKeys('TestLast');
		username.sendKeys('Test@ufl.edu');
		password.sendKeys('test123');
		research.sendKeys('This is my research interests. I like to test. ');

	 	element(by.buttonText('Sign up')).click();

		expect($('[data-ng-show="error"]').isDisplayed()).toBeTruthy();
	});

	it ('should not sign up for a non-UFL email', function(){
		browser.get('http://localhost:3000/#!/signup');
		fname.sendKeys('TestFirst');
		lname.sendKeys('TestLast');
		username.sendKeys('Test@yahoo.edu');
		password.sendKeys('test123');
		research.sendKeys('This is my research interests. I like to test. ');

	 	element(by.buttonText('Sign up')).click();

		expect($('[data-ng-show="error"]').isDisplayed()).toBeTruthy();

	});
});

// can repeat above for each credential that is missing
describe('Logging in',function() {
	it ('should be able to log in', function() {
  	browser.get('http://localhost:3000/#!/');

  	username.sendKeys('kenan@ufl.edu');
  	password.sendKeys('dbShare2015');

  	element(by.buttonText('Sign in')).click();

  	expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases');
  });
});

describe('Viewing your profile', function(){
	it ('should be able to view your profile', function(){
		browser.get('http://localhost:3000/#!/databases');
		element(by.id('dispName')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/settings/profile');

	});
});


describe('Viewing the user directory', function(){
	it ('should be able to view all the users in the website', function(){
		browser.get('http://localhost:3000/#!/databases');
		element(by.id('userDirectory')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/settings/list');

	});
});

describe('Viewing the database details', function(){
	it ('should be able to see all the info for the db', function(){
		browser.get('http://localhost:3000/#!/databases');
		element(by.id('userDirectory')).click();

		//expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/settings/profile');

	});
});


//http://localhost:3000/#!/databases/550f96584a05f10000b428e0

describe('Creating a new codeSnippet', function() {
	it ('should be able to add a codeSnippet to the db', function() {
		browser.get('http://localhost:3000/#!/databases');

		query.sendKeys('gatorDB');



	});
});


//codeSnippetSubmit.sendKeys('int main(){\nfor(int i = 0; i < 10; ++i){\n cout << "Its great to be a Florida Gator!!!"\n}\n}');
