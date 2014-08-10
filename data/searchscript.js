
String.prototype.replaceBetween = function(start, end, what) {
	return this.substring(0, start) + what + this.substring(end);
};

var matchesfound = 0;

self.port.on("search", function(olddoc,searchterm) {
	// Handle the message

	if(olddoc != ""){ //olddoc has been set
		document.body.innerHTML = olddoc; //reset page to unmodified version
		console.log("reset page...");
	}
	else{
		olddoc = document.body.innerHTML; //store original version of page
		console.log("set page...");

		self.port.emit("sendolddoc",olddoc);

	}

	function replaceText(oldText, newText, node){
		node = node || document.body; // base node

		//var node = document.body;

		var childs = node.childNodes, i = 0;

		while(node = childs[i]){
			if (node.nodeType == 3){ // text node found, do the replacement
				if (node.textContent) {
					//  node.textContent = node.textContent.replace(oldText, newText);
					node.textContent = node.textContent.replace(oldText, "UNIQUECODE");


				} else { // support to IE
					node.nodeValue = node.nodeValue.replace(oldText, newText);
				}
			} else { // not a text mode, look forward
				replaceText(oldText, newText, node);
			}
			i++;
		}

	}

	var searchstring =   strip(document.body.innerHTML);

	//search for obfuscated term here:
	var docstring = "";
	for(i = 0; i < searchstring.length;i++){



		docstring = docstring + searchstring.charAt(i);
		if(docstring.length >10){
			docstring = docstring.substring(1,docstring.length);
		}

		if(evalstrings(searchterm,docstring)==true){
			console.log("Found a Match!" + i + " " + searchterm + " " + docstring);
			matchesfound++;
			//highlight the match:

			replaceText(docstring,docstring.fontcolor("yellow"));
			//document.body.innerHTML = document.body.innerHTML.replace(new RegExp(docstring,'g'),docstring.fontcolor("yellow"));
			document.body.innerHTML = document.body.innerHTML.replace(new RegExp("UNIQUECODE",'g'),docstring.fontcolor("yellow"));

		}
	}

});

console.log("Matches Found: " + matchesfound);

function evalstrings(searchterm,docstring){
	//	console.log("EVAL: " + searchterm + " " + docstring);

	searchterm = searchterm.toLowerCase();
	docstring = docstring.toLowerCase();

	var hits = 0;
	//console.log(searchterm.length);
	for(j = 0; j < searchterm.length;j++){

		//search within docstring: (ignore order and multiple hits for now)
		if(docstring.indexOf(searchterm.charAt(j))>-1)
		hits++;

	}

	//Assume that if hits is over 70% of the length of search term, this is a match:
	var hitpercent = 70;

	var evalhit = (searchterm.length/100)*hitpercent;
	if(hits >= evalhit)
	//return j;
	return true;
	else
		//return -1;
		return false;

	}

	function strip(html)
	{
		var tmp = document.createElement("DIV");
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || "";
	}