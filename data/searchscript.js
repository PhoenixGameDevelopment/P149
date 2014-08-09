
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

var searchstring =   strip(document.body.innerHTML);
console.log("DTA:" + document.body.textContent);

//search for obfuscated term here:

var docstring = "";
for(i = 0; i < searchstring.length;i++){


	
	docstring = docstring + searchstring.charAt(i);
	if(docstring.length >10){
		docstring = docstring.substring(1,docstring.length);
	}
	//	console.log(searchstring.charAt(i);
	//	console.log(docstring);
	
	if(evalstrings(searchterm,docstring)==true){
	//	console.log("Found a Match!");
		//highlight the match:
		 // document.body.innerHTML = document.body.innerHTML.replace(new RegExp(docstring,'g'),docstring.fontcolor("yellow"));
 document.body.innerHTML = document.body.innerHTML.replace(new RegExp(docstring,'g'),docstring.fontcolor("yellow"));
	}
}


 // document.body.innerHTML = document.body.innerHTML.replace(new RegExp(searchterm,'g'),searchterm.fontcolor("yellow"));

});

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

//	console.log("HITS: " + hits + " " + searchterm.length);

	//Assume that if hits is over 70% of the length of search term, this is a match:
	var hitpercent = 70;
	
	var evalhit = (searchterm.length/100)*hitpercent;
	if(hits >= evalhit)
	return true;
	else
		return false;

	}

function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}