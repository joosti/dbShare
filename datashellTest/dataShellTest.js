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

//var usersArray = [];
//var databasesArray = [];
//var commentsArray = [];
//var codeSnippetsArray = [];

var users = 'db.users.insert([\n';
var databases = 'db.databases.insert([\n';
var comments = 'db.comments.insert([\n';
var codeSnippets = 'db.comments.insert([\n';



//var users = "";
//var databases = "";
//var comments = "";
//var codeSnippets = "";

for(var i = 0; i < 10; ++i) {
    randomFirstName = faker.name.firstName();
    randomLastName = faker.name.lastName();
    randomEmail = faker.internet.email();
    randomDisplayName = randomFirstName + " " + randomLastName;
    randomPassword = faker.internet.password();
    randomResearchInterests = faker.hacker.phrase();

    randomDescriptionLong = faker.lorem.paragraphs();
    randomDescriptionShort = faker.lorem.paragraph();
    randomDBName = faker.company.companyName();
    randomURL = faker.internet.domainName();

    randomDate = faker.date.recent();
    randomComment = faker.hacker.phrase();
    randomCode = faker.lorem.paragraphs();

    //This is all the inputs for the users table
    users += "{\n";
    users += "username: '" +  randomEmail + "',\n";
    users += "password: '" + randomPassword + "',\n";
    users += "firstName: '" + randomFirstName + "',\n";
    users += "lastName: '" + randomLastName + "',\n";
    users += "displayName: '" + randomDisplayName + "',\n";
    users += "researchinterests: '" + randomResearchInterests + "',\n";
    users += "roles: ['user'],\n";
    users += "portfolios:[],\n";
    users += "proficientpors:[],\n";
    users += "provider: 'local'\n";
    users += "}\n";

    //usersArray[i] = users;

    //users = "";

    //This is all the inputs for the databases table
    databases += "{\n";
    databases += "name: '" +  randomDBName + "',\n";
    databases += "descrpitonLong: '" + randomDescriptionLong + "',\n";
    databases += "descriptionShort: '" + randomDescriptionShort + "',\n";
    databases += "url: '" + randomURL + "'\n";
    databases += "}\n";

    //databasesArray[i] = databases;

    //databases = "";

    //This is the inputs for comments table
    comments += "{\n";
    comments += "reviews: '" +  randomDBName + "',\n";
    comments += "created: '" + randomDate + "'\n";
    comments += "user: '" + randomDisplayName + "'\n";
    comments += "databaseID: '" + randomDBName + "'\n";
    comments += "}\n";

    //commentsArray[i] = comments;

    //comments = "";

    //This is the inputs for codeSnippets table
    codeSnippets += "{\n";
    codeSnippets += "mode: 'r',\n";
    codeSnippets += "code: '" + randomCode + "'\n";
    codeSnippets += "created: '" + randomDate + "'\n";
    codeSnippets += "user: '" + randomDisplayName + "'\n";
    codeSnippets += "databaseID: '" + randomDBName + "'\n";
    codeSnippets += "},\n";

    //codeSnippetsArray[i] = codeSnippets;

    //codeSnippets = "";
}

//users += "])";
//databases += "])";
//comments += "])";
//codeSnippets += "])";

//This is the output of all the users
for(var i = 0; i < 10; ++i){
    console.log(users);
}

//This is the output for all the databases
for(var i = 0; i < 10; ++i){
    console.log(databases);
}

//This is the output for all the comments
for(var i = 0; i < 10; ++i){
    console.log(comments);
}

//This is the output for all the codeSnippet
for(var i = 0; i < 10; ++i){
    console.log(codeSnippets);
}



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


