(function(global, $) {
  //* 'new' an object
  var Greeter = function(firstName, LastName, language) {
    return new Greeter.init(firstName, LastName, language);
  };
  //* hidden within the scope of the iife and never directly accesible
  var supportedLangs = ["en", "es"];

  //*informal greeting
  var greetings = {
    en: "hello",
    es: "hola"
  };

  //*formal greeting
  var formalGreetings = {
    en: "Greetings",
    es: "Saludos"
  };

  //* logger messages
  var logMessages = {
    en: "logged in",
    es: "Inicio sesion"
  };

  Greeter.prototype = {
    //*'this' refers to the calling object at execution time
    fullName: function() {
      return this.firstName + " " + this.lastName;
    },
    validate: function() {
      //*check that it is a valid language
      //* references the externally inaccessible 'supported' within the closure
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid language";
      }
    },
    //* retrive messages from object by refering to properties using [] syntax
    greetings: function() {
      return greetings[this.language] + " " + this.firstName + "!";
    },
    formalGreetings: function() {
      return formalGreetings[this.language] + ", " + this.fullName();
    },

    greet: function(formal) {
      var msg;
      //if undefined or null it will be coercised to 'false'
      if (formal) {
        msg = this.formalGreetings();
      } else {
        msg = this.greetings();
      }
      if (console) {
        console.log(msg);
      }
      //'this' refers to the calling object at execution time
      // makes the method chainable
      return this;
    },
    log: function() {
      if (console) {
        console.log(logMessages[this.language] + ": " + this.fullName());
      }
      return this;
    },

    setLang: function(lang) {
      //* set the language
      this.language = lang;

      //*validate
      this.validate();

      //*make chainable
      return this;
    },
    HTMLGreeting: function(selector, formal) {
      if (!$) {
        throw "jQuery not loaded";
      }
      if (!selector) {
        throw "Missing Jquery selector";
      }

      //*determine the message
      var msg;
      if (formal) {
        msg = this.formalGreetings();
      } else {
        msg = this.greetings();
      }

      //inject the message in the chosen place in the DOM
      $(selector).html(msg);

      //*make chainable
      return this;
    }
  };

  //*the actual object is created here, allowing us to 'new' an object without calling 'new'
  Greeter.init = function(firstName, LastName, language) {
    var self = this;
    self.firstName = firstName || "";
    self.lastName = LastName || "";
    self.language = language || "en";

    self.validate();
  };

  //*trick borrowed from jquery so we do not have to use the 'new' keyword
  Greeter.init.prototype = Greeter.prototype;

  //attach our Greeter to the global object, and provide a shorthand '$G' for ease our poor fingers
  global.Greeter = global.G$ = Greeter;
})(window, $);
