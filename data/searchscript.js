
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
		console.log("Found a Match!");
		//highlight the match:
		  document.body.innerHTML = document.body.innerHTML.replace(new RegExp(docstring,'g'),docstring.fontcolor("yellow"));

	}
}


 // document.body.innerHTML = document.body.innerHTML.replace(new RegExp(searchterm,'g'),searchterm.fontcolor("yellow"));

});

function evalstrings(searchterm,docstring){
	console.log("EVAL: " + searchterm + " " + docstring);
	if(docstring.indexOf(searchterm)>-1)
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