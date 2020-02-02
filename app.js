// !Greeter Framework

/*
? Greeter : when given a first name, last name and optional language, it generates formal and informal greetings.

*supports English and spanish languages.

*reuseable library/framework

easy to type 'G$()'
*/

//gets a new object (the architecture allows us to not have to use the 'new' keyword here)
var g = G$("francis", "xavier");

//use our chainable methods
g.greet()
  .setLang("es")
  .greet(true)
  .log();

//*lets use our object on the click of the login button
$("#login").click(function() {
  //creates a new 'greeter' object (lets pretend we know the name from the login)
  var loginGrtr = G$("Francis", "Xavier");

  //* hide the login on the screen
  $("#logindiv").hide();

  //*fire off an HTML greeting,passing the '#greeting' as the selector and the chosen language,and log the welcome as well
  loginGrtr
    .setLang($("#lang").val())
    .HTMLGreeting("#greeting", true)
    .log();
});
