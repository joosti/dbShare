Data Shell Test

1. Open your Terminal/Command prompt

2. Type the following into the terminal:

 $ mongo ds053937.mongolab.com:53937/dbshare -u kenantt -p dbShare2015

3. This should start the Mongo shell. You'll know if you're there if it says

$ MongoDB shell version: 2.6.7
$ connecting to: ds053937.mongolab.com:53937/dbShare
$ rs-ds053937:PRIMARY>

4. Now you're in the MongoDB shell, where you can basically micromanage the database.

5. At this point you can type:

$ show tables

to see what tables (collections) you have in the database.

6. To insert data from a JSON file and use the data generator navigate the datashellTest folder and run the file named dataShellTest.js using node, and in this file is the code for the data generator for each of the tables. In order for faker to work properly you must follow the comment at the top of the file to use the lasts version of faker.js with this file.

7. By changing the output at the bottom and changing the number of time the for loop iterates that will determine how data points are generated. [Note: before you do anything your should create a user, one db, and add some comments and code snippets to create the tables in the database for the data to be stored. You will need to find the database id and add that to the data generator.


11. You can run the dataShellTest.js by navigating to the folder directory then type in the terminal:

$ node dataShellTest.js

12. Copy everything inside from the console and save in to a new text file giving in the like users.json and the will be imported into mongoDB make sure you save this file in the same directory as .

13. Go back to your terminal/command prompt window with the MongoDB shell and type:

$  mongoimport -h ds053937.mongolab.com:53937 -d dbshare -c <collection> -u <user> -p <password> --file <input file>

//For example for our db we would use

$ mongoimport -h ds053937.mongolab.com:53937 -d dbshare -c users -u kenantt -p dbShare2015 --file users.json

$ mongoimport -h ds053937.mongolab.com:53937 -d dbshare -c databases -u kenantt -p dbShare2015 --file databases.json

$ mongoimport -h ds053937.mongolab.com:53937 -d dbshare -c comments -u kenantt -p dbShare2015 --file comments.json

$ mongoimport -h ds053937.mongolab.com:53937 -d dbshare -c codesnippets -u kenantt -p dbShare2015 --file codeSnippets.json

14. It should give you a "BulkWriteResult" at the end with the nInserted: 30 if all goes right. If there's an error, it will show you what it is and you can address it.


15. Repeat the same thing for each console output

16. Exit the terminal window running the Mongo shell, do the grunt stuff to run the web app and make sure it all works.
