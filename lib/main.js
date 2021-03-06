
var buttons = require('sdk/ui/button/action');
var { Frame } = require("sdk/ui/frame");
var { Toolbar } = require("sdk/ui/toolbar");
var tabs = require("sdk/tabs");


var olddoc = "";

const { Cc, Ci, Cu } = require('chrome');

var data = require("sdk/self").data;

// Construct a panel, loading its content from the "text-entry.html"
// file in the "data" directory, and loading the "get-text.js" script
// into it.
var text_entry = require("sdk/panel").Panel({
	  width: 180,
  height: 75,
  contentURL: data.url("mainpane.html"),
  contentScriptFile: data.url("mainpane.js")
});


//function HTMLParser(aHTMLString){
//var {Cc, Ci} = require("chrome");
//  var html = document.implementation.createDocument("http://www.w3.org/1999/xhtml", "html", null),
//    body = document.createElementNS("http://www.w3.org/1999/xhtml", "body");
//  html.documentElement.appendChild(body);
//  body.appendChild(Components.classes["@mozilla.org/feed-unescapehtml;1"]
//    .getService(Components.interfaces.nsIScriptableUnescapeHTML)
//    .parseFragment(aHTMLString, false, null, body));
//  return body;
//}


// Create a button
require("sdk/ui/button/action").ActionButton({
  id: "show-panel",
  label: "Search!",
  icon: {
    "16": "./searchico16.png",
    "32": "./searchico32.png",
    "64": "./searchico64.png"
  },
  onClick: handleClick
});

// Show the panel when the user clicks the button.
function handleClick(state) {
  text_entry.show();
}

// When the panel is displayed it generated an event called
// "show": we will listen for that event and when it happens,
// send our own "show" event to the panel's script, so the
// script can prepare the panel for display.
text_entry.on("show", function() {
  text_entry.port.emit("show");
});
//olddoc = 'document.body.innerHTML';
// Listen for messages called "text-entered" coming from
// the content script. The message payload is the text the user
// entered.
// In this implementation we'll just log the text to the console.
text_entry.port.on("text-entered", function (text) {
 // console.log(text);
  
  highlightsearchterm(text);
  
  text_entry.hide();
});

var button = buttons.ActionButton({
	id: "pgd-link",
	label: "Visit PGD",
	icon: {
		"16": "./icon-16.png",
		"32": "./icon-32.png",
		"64": "./icon-64.png"
	},
	onClick: gotopgd
});

function gotopgd(state) {
	tabs.open("http://www.phoenixgamedevelopment.com/");
	//olddoc = 'document.body.innerHTML';
}

//require("sdk/ui/button/action").ActionButton({
//	id: "list-tabs",
//	label: "Highlight Search Term",
//	icon: "./icon-16.png",
//	onClick: highlightsearchterm
//});

tabs.on('ready', function (tab) {
  console.log(tab.url + ' is ready!');
	//worker.port.emit("resetdoc");
	

});



var old = "";
function highlightsearchterm(searchterm) {
	console.log(searchterm);
	var tabs = require("sdk/tabs");

	var str="the";
	var regex;
	var regex = new RegExp(str, "g");


	var worker =	tabs.activeTab.attach({
	//	contentScript: contentScriptString
		contentScriptFile:  data.url("searchscript.js")
	});

//var old2 = HTML

//var {Cc, Ci} = require("chrome");
//var parser = Cc["@mozilla.org/parserutils;1"].getService(Ci.nsIParserUtils);
//var sanitized = parser.sanitize(old, parser.SanitizerAllowStyle);

	worker.port.emit("search",old,searchterm);

worker.port.on("sendolddoc", function(olddoc) {
  // Handle the message
  //console.log("LOG: " + olddoc);
  old = olddoc;
});

}

