
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
const { Cc, Ci, Cu } = require('chrome');

function replaceAll(find, replace2, str) {
	return str.replace(new RegExp(find, 'g'), replace2);
}

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
	label: "Highlight Search Term",
	icon: "./icon-16.png",
	onClick: highlightsearchterm
});

function highlightsearchterm() {

	var tabs = require("sdk/tabs");

	var str="the";
	var regex;
	var regex = new RegExp(str, "g");

	var searchterm = "Phoenix";
	var contentScriptString = 'document.body.innerHTML = document.body.innerHTML.replace(new RegExp("'+searchterm+'",\'g\'),"'+searchterm+'".fontcolor("yellow"));'

	tabs.activeTab.attach({
		contentScript: contentScriptString
	});


}
