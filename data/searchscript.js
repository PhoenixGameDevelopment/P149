
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

  document.body.innerHTML = document.body.innerHTML.replace(new RegExp(searchterm,'g'),searchterm.fontcolor("yellow"));

});