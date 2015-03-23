//node dataShellTest.js - This is the command to run the script
//sudo npm install -g faker
//sudo npm update -g faker
//git clone https://github.com/Marak/faker.js/
//cd faker.js
//sudo npm link faker
//Then go to the project directory and (npm link)


//Inititalizing the faker.js

var faker = require("faker");

var randomFirstName;            //Users First Name
var randomLastName;             //Users Last Name
var randomDisplayName;          //Users Display Name
var randomPassword;             //Users Password
var randomEmail;                //Users Email
var randomResearchInterests;    //Users Research Interests
var randomDescriptionLong;      //DB Description Long
var randomDescriptionShort;     //DB Description Short
var randomURL;                  //DB url
var randomDBName;               //DB Name
var randomDate;                 //Comment Date
var randomCode;                 //codeSnippet
var randomUserID = ["550efebe467b9a788f9acf55", "550f8999a89116f5661ff265", "550f8a6ba89116f5661ff266",
                    "550f8a6ba89116f5661ff267", "550f8c83a89116f5661ff268", "550f8c83a89116f5661ff269",
                    "550f8c83a89116f5661ff26a", "550f8c84a89116f5661ff26b", "550f8c84a89116f5661ff26b",
                    "550f8c84a89116f5661ff26c", "550f8c84a89116f5661ff26d", "550f8c84a89116f5661ff26e"];

//var usersArray = [];
//var databasesArray = [];
//var commentsArray = [];
//var codeSnippetsArray = [];

//var users = 'db.users.insert([\n';
//var databases = 'db.databases.insert([\n';
//var comments = 'db.comments.insert([\n';
//var codeSnippets = 'db.comments.insert([\n';



var users = "";
var databases = "";
var comments = "";
var codeSnippets = "";

var maxValue = 30;
var userIDCounter = 0;

for(var i = 0; i < maxValue; ++i) {
    randomFirstName = faker.name.firstName();
    randomLastName = faker.name.lastName();
    randomEmail = faker.internet.email();
    randomDisplayName = randomFirstName + " " + randomLastName;
    randomPassword = faker.internet.password();
    randomResearchInterests = faker.hacker.phrase();

    randomDescriptionLong = faker.hacker.phrase();
    randomDescriptionShort = faker.hacker.phrase();
    randomDBName = faker.company.companyName();
    randomURL = faker.internet.domainName();

    randomDate = faker.date.recent();
    randomComment = faker.hacker.phrase();
    randomCode = faker.lorem.paragraph();

    //This is all the inputs for the users table
    users += '{';
    users += '"username": "' +  randomEmail + '", ';
    users += '"password": "' + randomPassword + '", ';
    users += '"firstName": "' + randomFirstName + '", ';
    users += '"lastName": "' + randomLastName + '", ';
    users += '"displayName": "' + randomDisplayName + '", ';
    users += '"researchinterests": "' + randomResearchInterests + '", ';
    users += '"roles": ' + "[" + "'user'" + "], ";
    users += '"portfolios":"[]", ';
    users += '"proficientpors": "[]", ';
    users += '"provider": ' + "'local'";
    if(i == maxValue - 1){
        users += '}\n';
    }
    else {
        users += '},\n';
    }

    //usersArray[i] = users;

    //users = "";

    //This is all the inputs for the databases table
    databases += '{';
    databases += '"name": "' + randomDBName +'", ';
    databases += '"descrpitonLong": "' + randomDescriptionLong + '", ';
    databases += '"descriptionShort": "' + randomDescriptionShort + '", ';
    databases += '"url": "' + randomURL + '" ';
    if(i == maxValue - 1){
        databases += '}\n';
    }
    else {
        databases += '},\n';
    }

    //databasesArray[i] = databases;

    //databases = "";

    //This is the inputs for comments table
    comments += '{';
    comments += '"user": {';
    comments += '"$oid": "' + randomUserID[userIDCounter] + '"}, ';
    comments += '"databaseId": "550f96584a05f10000b428e0", ';
    comments += '"created": {';
    comments += '"$date": "2015-03-23T05:37:51.390Z"}, ';
    comments += '"reviews": "' + randomComment + '", ';
    comments += '"__v": 0';
    if(i == maxValue - 1){
        comments += '}\n';
    }
    else {
        comments += '},\n';
    }

    if(userIDCounter == 11){
        userIDCounter = 0;
    }
    else {
        ++userIDCounter;
    }

    //commentsArray[i] = comments;

    //comments = "";

    //This is the inputs for codeSnippets table
    codeSnippets += '{';
    codeSnippets += '"user": {';
    codeSnippets += '"$oid": "' + randomUserID[userIDCounter] + '"}, ';
    codeSnippets += '"code": "' + randomCode + '", ';
    codeSnippets += '"mode": "R",';
    codeSnippets += '"databaseId": "550f96584a05f10000b428e0", ';
    codeSnippets += '"created": {';
    codeSnippets += '"$date": "2015-03-23T05:37:51.390Z"}, ';
    codeSnippets += '"__v": 0';
    if(i == maxValue - 1){
        codeSnippets += '}\n';
    }
    else {
        codeSnippets += '},\n';
    }

    /*
    {
        "user": {
        "$oid": "550da9f592c1bc0000da66a8"
    },
        "code": "//This is the output of all the users\nfor(var i = 0; i < 10; ++i){\n    console.log(users);\n}\n\n//This is the output for all the databases\nfor(var i = 0; i < 10; ++i){\n    console.log(databases);\n}\n\n//This is the output for all the comments\nfor(var i = 0; i < 10; ++i){\n    console.log(comments);\n}\n\n//This is the output for all the codeSnippet\nfor(var i = 0; i < 10; ++i){\n    console.log(codeSnippets);\n}",
        "mode": "R",
        "databaseId": "550f96584a05f10000b428e0",
        "created": {
        "$date": "2015-03-23T04:41:36.499Z"
    },
        "__v": 0
    }

    */

    //codeSnippetsArray[i] = codeSnippets;

    //codeSnippets = "";
}


//users += "]";
//databases += "]";
//comments += "]";
//codeSnippets += "]";

//users += "])";
//databases += "])";
//comments += "])";
//codeSnippets += "])";

//This is the output of all the users
    //console.log(users);

//This is the output for all the databases
    //console.log(databases);

//This is the output for all the comments
    //console.log(comments);

//This is the output for all the codeSnippet
    console.log(codeSnippets);



/**
 * Module dependencies.
 */
//var mongoose = require('mongoose');
//
//function connect(connectionString){
//    mongoose.connect(connectionString);
//
//    var db = mongoose.connection;
//    db.on('error', console.error.bind(console, 'connection error'));
//    db.once('open', function callback(){
//        console.log('Mongoose connected at: ', connectionString);
//
//        //This is where the data will be input into mongoDB
//        //var UserSchema = new Schema;
//
//        //var Model = mongoose.model('InputTemplate', UserSchema);
//
//        var done = 0;
//        for (var i = 0; i <= usersArray.length; i++) {
//            var UserSchema = new models.UserSchema(usersArray[i]);
//            UserSchema.save(function (err) {
//                console.log(i);
//                if (err) {
//                    console.log(err);
//                }
//                else {
//                    //some logic goes here
//                    done++;
//                    if (done == usersArray.length) {
//                        finallyDone();
//                    }
//                }
//            })
//        }
//
//        finallyDone = function() {
//            console.log("Everything is saved")
//        }
//    });
//}
//
//module.exports = connect;
//
//connect('mongodb://localhost/cen3031fa14-dev');


