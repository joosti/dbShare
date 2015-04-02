
var myAppModule = angular.module('myAppModule', ['ui.codemirror']);

myAppModule.modeURL = "bower_components/codemirror/mode/%N/%N.js";

myAppModule.controller('MyController', [ '$scope', function($scope) {
    $scope.editorOptions = {
        mode: 'xml',
        htmlMode: true,
        lineNumbers: true,
        lineWrapping: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        enableSearchTools: true,
        showSearchButton: true,
        highlightMatches: true,
        smartIndent: true,
        theme: 'monokai',
        extraKeys: {"Ctrl-Space": "autocomplete"},
        foldGutter: {
            rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.brace, CodeMirror.fold.comment)
        },
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    };
}]);

myAppModule.commands.autocomplete = function(cm) {
    myAppModule.showHint(cm, myAppModule.hint.javascript);
};

var modeInput = document.getElementById("mode");
myAppModule.on(modeInput, "keypress", function(e) {
    if (e.keyCode == 13) change();
});

function change() {
    var val = modeInput.value, m, mode, spec;
    if (m = /.+\.([^.]+)$/.exec(val)) {
        var info = CodeMirror.findModeByExtension(m[1]);
        if (info) {
            mode = info.mode;
            spec = info.mime;
        }
    } else if (/\//.test(val)) {
        var info = CodeMirror.findModeByMIME(val);
        if (info) {
            mode = info.mode;
            spec = val;
        }
    } else {
        mode = spec = val;
    }
    if (mode) {
        MyController.setOption("mode", spec);
        myAppModule.autoLoadMode(editor, mode);
        document.getElementById("modeinfo").textContent = spec;
    } else {
        alert("Could not find a mode corresponding to " + val);
    }
}

