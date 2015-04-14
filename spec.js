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

// *** failure
// describe('Creating a new database', function() {
// 	it ('should be able to add all the info of the db', function() {
// 		browser.get('http://localhost:3000/#!/databases');
// 		element(by.buttonText('Create New Database')).click();

// 		browser.get('http://localhost:3000/#!/databases/create');
// 		name.sendKeys('The Real DB');
// 		url.sendKeys('www.realdbs.com');
// 		isFree.sendKeys(true);
// 		descriptionShort.sendKeys('This is one of the best dbs on campus and provides a much need information');
// 		descriptionLong.sendKeys('In this database all the information that is provided is not really understandable\n' +
// 		'however is you look at it long enought it really strates to make sense.');

// 		element(by.buttonText('Create Database')).click();
// 	});
// });

// *** failure
// describe('Creating a new codeSnippet', function() {
// 	it ('should be able to add a codeSnippet to the db', function() {
// 		browser.get('http://localhost:3000/#!/databases');

// 		query.sendKeys('gatorDB');

// 	});
// });

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

// ////////////////////////////////////////////////////////////////
// ////////Profile/////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////

describe('Viewing your profile', function(){
	it ('should be able to view your profile', function(){
		browser.get('http://localhost:3000/#!/databases');
		element(by.id('dispName')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/settings/profile');
	});
});

// ////////////////////////////////////////////////////////////////
// ////////Database////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////

describe('Creating a new database', function() {
    it ('should be able to add all the info of the db', function() {
        // browser.get('http://localhost:3000/#!/databases'); *** select from dropdown menu?
        browser.get('http://localhost:3000/#!/databases/create');

        // name.sendKeys('The Real DB2');
        // url.sendKeys('www.realdbs2.com');
        // isFree.sendKeys(true);
        // descriptionShort.sendKeys('This is one of the best dbs on campus and provides a much need information');
        // descriptionLong.sendKeys('In this database all the information that is provided is not really understandable\n' +
        // 'however is you look at it long enough it really strates to make sense.');

        // element(by.buttonText('Create Database')).click();
        // browser.get('http://localhost:3000/#!/databases');
        // expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases');
    });
});


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

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512eec50b835a0000ee893c');
	});
});

	describe('View Schumm-Hoppe', function() {
	it ('should be able to see the database for Schumm-Hoppe', function() {
		browser.get('http://localhost:3000/#!/databases');
        query.sendKeys('Schumm-Hoppe');
		element(by.id('Schumm-Hoppe')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadca89116f5661ff5f6');
	});
});

	describe('View Roberts-Rutherford', function() {
	it ('should be able to see the database for Roberts-Rutherford', function() {
		browser.get('http://localhost:3000/#!/databases');
        query.sendKeys('Roberts-Rutherford');
		element(by.id('Roberts-Rutherford')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff654');
	});
});

	describe('View Marvin-Swaniawski', function() {
	it ('should be able to see the database for Marvin-Swaniawski', function() {
		browser.get('http://localhost:3000/#!/databases');
        query.sendKeys('Marvin-Swaniawski');
		element(by.id('Marvin-Swaniawski')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff653');
	});
});

	describe('View Goyette-MacGyver', function() {
	it ('should be able to see the database for Goyette-MacGyver', function() {
		browser.get('http://localhost:3000/#!/databases');
        query.sendKeys('Goyette-MacGyver');
		element(by.id('Goyette-MacGyver')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff652');
	});
});

//*** has space
// 	describe('View Larson Group', function() {
// 	it ('should be able to see the database for Larson Group', function() {
// 		browser.get('http://localhost:3000/#!/databases');
//         query.sendKeys('Larson Group');
// 		element(by.text('Larson Group')).click();

// 		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff651');
// 	});
// });

	describe('View Stehr-Greenfelder', function() {
	it ('should be able to see the database for Stehr-Greenfelder', function() {
		browser.get('http://localhost:3000/#!/databases');
        query.sendKeys('Stehr-Greenfelder');
		element(by.id('Stehr-Greenfelder')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff650');
	});
});

	describe('View Lynch-Luettgen', function() {
	it ('should be able to see the database for Lynch-Luettgen', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Lynch-Luettgen');
		element(by.id('Lynch-Luettgen')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff64f');
	});
});

//  *** has space
// 	describe('View Rutherford, Ondricka and Rempel', function() {
// 	it ('should be able to see the database for Rutherford, Ondricka and Rempel', function() {
// 		browser.get('http://localhost:3000/#!/databases');
//         query.sendKeys('Rutherford, Ondricka and Rempel');
// 		element(by.id('Rutherford, Ondricka and Rempel')).click();

// 		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff64e');
// 	});
// });

// 	describe('View Hettinger Inc', function() {
// 	it ('should be able to add a codeSnippet to the db', function() {
// 		browser.get('http://localhost:3000/#!/databases');
// 		element(by.id('userDirectory')).click();

// 		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/settings/list');
// 	});
// });

// 	describe('View Nader, Kautzer and Turner', function() {
// 	it ('should be able to add a codeSnippet to the db', function() {
// 		browser.get('http://localhost:3000/#!/databases');
// 		element(by.id('userDirectory')).click();

// 		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/settings/list');
// 	});

	describe('View Ryan-West', function() {
	it ('should be able to see the database for Ryan-West', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Ryan-West');
		element(by.id('Ryan-West')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff64c');
	});
});

	describe('View Steuber-White', function() {
	it ('should be able to see the database for Steuber-White', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Steuber-White');
		element(by.id('Steuber-White')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff64b');
	});
});

	describe('View Tillman-Grady', function() {
	it ('should be able to see the database for Tillman-Grady', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Tillman-Grady');
		element(by.id('Tillman-Grady')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff647');
	});
});

describe('View Gleason-Considine', function() {
	it ('should be able to see the database for Gleason-Considine', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Gleason-Considine');
		element(by.id('Gleason-Considine')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff64a');
	});
});

// *** space
// describe('View Kuhn, Bogan and Boehm', function() {
// 	it ('should be able to see the database for Kuhn, Bogan and Boehm', function() {
// 		browser.get('http://localhost:3000/#!/databases');
//      	query.sendKeys('Kuhn, Bogan and Boehm');
// 		element(by.id('Kuhn, Bogan and Boehm')).click();

// 		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff649');
// 	});
// });

// *** space
// describe('View Senger, Pagac and Hintz', function() {
// 	it ('should be able to see the database for Senger, Pagac and Hintz', function() {
// 		browser.get('http://localhost:3000/#!/databases');
//      	query.sendKeys('Senger, Pagac and Hintz');
// 		element(by.id('Senger, Pagac and Hintz')).click();

// 		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff648');
// 	});
// });

describe('View Strosin-Olson', function() {
	it ('should be able to see the database for Strosin-Olson', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Strosin-Olson');
		element(by.id('Strosin-Olson')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff643');
	});
});

describe('View Wolf-Simonis', function() {
	it ('should be able to see the database for Wolf-Simonis', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Wolf-Simonis');
		element(by.id('Wolf-Simonis')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff63d');
	});
});

describe('View Waelchi-Prosacco', function() {
	it ('should be able to see the database for Waelchi-Prosacco', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Waelchi-Prosacco');
		element(by.id('Waelchi-Prosacco')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff62b');
	});
});

describe('View Swaniawski-Rice', function() {
	it ('should be able to see the database for Swaniawski-Rice', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Swaniawski-Rice');
		element(by.id('Swaniawski-Rice')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff624');
	});
});

describe('View Fay-Braun', function() {
	it ('should be able to see the database for Fay-Braun', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Fay-Braun');
		element(by.id('Fay-Braun')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff623');
	});
});

describe('View Franecki-Wolf', function() {
	it ('should be able to see the database for Franecki-Wolf', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Franecki-Wolf');
		element(by.id('Franecki-Wolf')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff61c');
	});
});

describe('View Kohler-Torp', function() {
	it ('should be able to see the database for Kohler-Torp', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Kohler-Torp');
		element(by.id('Kohler-Torp')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff635');
	});
});

describe('View Jacobs-Bogan', function() {
	it ('should be able to see the database for Jacobs-Bogan', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Jacobs-Bogan');
		element(by.id('Jacobs-Bogan')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff60d');
	});
});

describe('View Hudson-Adams', function() {
	it ('should be able to see the database for Hudson-Adams', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Hudson-Adams');
		element(by.id('Hudson-Adams')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff62c');
	});
});

describe('View Gutkowski-Predovic', function() {
	it ('should be able to see the database for Gutkowski-Predovic', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Gutkowski-Predovic');
		element(by.id('Gutkowski-Predovic')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff60a');
	});
});

describe('View Stanton-Becker', function() {
	it ('should be able to see the database for Stanton-Becker', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Stanton-Becker');
		element(by.id('Stanton-Becker')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff611');
	});
});

describe('View Johnston-Gulgowski', function() {
	it ('should be able to see the database for Johnston-Gulgowski', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Johnston-Gulgowski');
		element(by.id('Johnston-Gulgowski')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff606');
	});
});

describe('View Kirlin-Kub', function() {
	it ('should be able to see the database for Kirlin-Kub', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Kirlin-Kub');
		element(by.id('Kirlin-Kub')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff604');
	});
});

describe('View Schaefer-Huels', function() {
	it ('should be able to see the database for Schaefer-Huels', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Schaefer-Huels');
		element(by.id('Schaefer-Huels')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff602');
	});
});

describe('View Schmidt-Hilll', function() {
	it ('should be able to see the database for Schaefer-Huels', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Schmidt-Hilll');
		element(by.id('Schmidt-Hilll')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff601');
	});
});

describe('View Borer-Brekke', function() {
	it ('should be able to see the database for Borer-Brekke', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Borer-Brekke');
		element(by.id('Borer-Brekke')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff600');
	});
});

describe('View Wyman-Zemlak', function() {
	it ('should be able to see the database for Wyman-Zemlak', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Wyman-Zemlak');
		element(by.id('Wyman-Zemlak')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff5ff');
	});
});

describe('View Cummerata-Kutch', function() {
	it ('should be able to see the database for Cummerata-Kutch', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Cummerata-Kutch');
		element(by.id('Cummerata-Kutch')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff5fa');
	});
});

describe('View Haley-Kuphal', function() {
	it ('should be able to see the database for Haley-Kuphal', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Haley-Kuphal');
		element(by.id('Haley-Kuphal')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadca89116f5661ff5f5');
	});
});

describe('View Monahan-Ward', function() {
	it ('should be able to see the database for Monahan-Ward', function() {
		browser.get('http://localhost:3000/#!/databases');
     	query.sendKeys('Monahan-Ward');
		element(by.id('Monahan-Ward')).click();

		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/databases/5512fadda89116f5661ff5f9');
	});
});