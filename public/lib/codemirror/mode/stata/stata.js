// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
//Author: Michael Kemerer


//Below lines seem to appear in all mode files. I see no reason to break tradition. Looks like browser handling stuff...
(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  //defineMode registers the mode with CodeMirror. The firsty argument is a string identifier for the mode. The section is the
  // function literal that defines a mode object. This function is supposed to be able to take configuration objects from users.
  //For now, I'll ignore that. The function literal is the ENTIRE relevant code here.


  CodeMirror.defineMode("stata", function () {
    //It looks like most people place some sort of helper methods here. Don't know what I'll need just yet, so I'll leave this as a reminder

    /*Here we're gonna put a regex that will list the characters possible in builtins/keywords. */

    /*Here we'll put a giant compendium of possible builtins/keywords*/
    function makeKeywords(str) {
    var obj = {}, words = str.split(" ");
    for (var i = 0; i < words.length; ++i) obj[words[i]] = true;
    return obj;
    }
    var keywords=makeKeywords("nobreak break capture noisily char class exit classutil drop describe dir which "+
  	"confirm continue creturn _datasignature datasignature discard display as ereturn error _estimates "+
  	"file findfile foreach forvalues fvexpand getttoken if else include javacall "+
  	"levelsof macro global local makecns mark marksample markout matlist matrix input "+
  	"mkmat list format rename more numlist range pause plugin postfile post postclose postutil "+
  	"_predict preserve restore program putexcel set quietly _return return scalar sreturn "+
  	"_rmcoll expand _robust cluster serset summarize signestimationsample checkestimationsample "+
  	"sleep syntax args sysdir personal adopath tabdisp timer on tokenize parse unab tsunab "+
  	"fvunab unabcmd varabbrev novarabbrev version viewsource while window append generate "+
  	"keep assert bcal replace by bysort sort cd pwd cf ");
    var builtins= makeKeywords("_by( _c( _e(")

  	var symbols=/[\w*+(]/
  
    //If nothing else, we have to return some stuff. It looks like we return several functions. 
  return{
    //startState appears to be optional, so we'll ignore it for now.
    /*startState: function(){};*/
    // According to documentation, this is essential. From the documentation:
    // It should read one token from the stream it is given as an argument, optionally update its state, and return a style string,
    // or null for tokens that do not have to be styled.
    token: function(stream, state){ //Stream and state seem to give access to the editor.
	    if (stream.sol()){
		  if (stream.peek()=="*"){// Should handle full-line * style comments
			stream.skipToEnd();
			return "comment";
		  }
	    }	
        if (stream.eatSpace()) {
          return null; //Null returns yield default stylings.
        }
        var nextCh= stream.next();
	    // Skip spaces
        if (nextCh=="/"){
    	  if (stream.peek()=="/"){  //Handles // style comments
    		stream.skipToEnd();
			return "comment";
    	  }
    	  else if (stream.peek()=="*"){ //Handles /**/ style comments
    		stream.next(); //Pass over the checked *
    		while (nextCh=stream.next()){
    			if (nextCh=="*"){
    				if (stream.peek()=="/"){
    					stream.next();
    					return "comment";
    				}
    			}
    		}
    	  } 
        }
        else if (nextCh=="`"){ //Handles Macros. May not handle nested macros or escaped single quotes
    	  while (nextCh=stream.next()){
    		if (nextCh=="\'"){
    			return "variable"; //Let's see how variables look.
    		}
    	  }
        } 
        else if (nextCh=="\'"){
    	  if (stream.peek()=="\""){ //Handles compound quotes
    		while (nextCh=stream.next()){
    			if (nextCh=="\""){
    				if(stream.peek()=="\'"){
    					stream.next();
    					return "string";
    				}
    			}
    		}
    	  }
        }
        else if (nextCh=="\""){
    	  while(nextCh=stream.next()){
    		if(nextCh=="\""){
    			return "string";
    		}
    	  }
        }
        else if (nextCh=="{"||nextCh=="}"){  //Brace highlighting using bracket support? Why not?
    	  return "bracket";
        }
        else{  //Now we test keywords and builtins
        	if (stream.current().match(symbols)){
        		stream.eatWhile(symbols);
        		if (keywords && keywords.propertyIsEnumerable(stream.current())){
        			return "keyword";
        		}
        		else if (builtins && builtins.propertyIsEnumerable(stream.current())){
        			//stream.backup(1); //Moves back to not include the ( in the styling while keeping it mandatory for the styling
                    return "variable-2";
        		}
        		else{
        			return null;
        		}
        	}
    	  return null;
        }
    } //End tokenize function
 };//End return
 });  //End defineMode
}); //End top level function thing