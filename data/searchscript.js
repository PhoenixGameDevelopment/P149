
self.port.on("setvars", function(searchterm) {
  // Handle the message
  console.log("searchterm" + searchterm);
  
 // document.body.innerHTML = olddoc;//.replace(new RegExp(searchterm,'g'),searchterm.fontcolor("yellow"));
  
  olddoc = document.body.innerHTML;
  
  document.body.innerHTML = document.body.innerHTML.replace(new RegExp(searchterm,'g'),searchterm.fontcolor("yellow"));
  
});