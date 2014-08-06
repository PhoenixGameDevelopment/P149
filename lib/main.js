
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
const { Cc, Ci, Cu } = require('chrome');

var button = buttons.ActionButton({
	id: "pgd-link",
	label: "Visit PGD",
	icon: {
		"16": "./icon-16.png",
		"32": "./icon-32.png",
		"64": "./icon-64.png"
	},
	onClick: handleClick
});

function handleClick(state) {
	tabs.open("http://www.phoenixgamedevelopment.com/");
}

require("sdk/ui/button/action").ActionButton({
	id: "list-tabs",
	label: "Blank Page!",
	icon: "./icon-16.png",
	onClick: blankpage
});

function blankpage() {
	
	// main.js
var tabs = require("sdk/tabs");
var contentScriptString = 'document.body.innerHTML = "<h1>This page has been Blanked!</h1>";'

tabs.activeTab.attach({
  contentScript: contentScriptString
});
	

}
