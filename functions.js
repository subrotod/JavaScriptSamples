// Use of arrow functions
// Article on how this is set 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
var users = [
    { name: 'Jack', age: 21 },
    { name: 'Ben', age: 23 },
    { name: 'Adam', age: 22 },
  ];

// Anonymous function before arrow  
console.log(
    users.map(function(user) {
      return user.age;
    })
  );

// Anonymous function with arrow
console.log(users.map(user => user.age));

// More examples with anonymous function notation
var ages = users.map(user => user.age);

// Because reduce takes two parameters, brackets are required to make it clear that the 
// parameters are for the arrow function, not for the reduce call
var sum = ages.reduce((a, b) => a + b);
console.log(sum);

// Arrow functions can have multiple statements within, in which case you need to use a block. 
// You also need to use the return keyword, whereas in the one line examples above, the return 
// was implicit i.e. no explicit return was needed.

var agesDoubled = users.map(user => {
    var age = user.age;
    return age * 2;
  }); // better to use non-arrow notation in this case

  // Another handy feature of arrow functions is the lexical binding of this to a function. 
  // As you’ll probably know already, when you create a new function, the this keyword is set 
  // to a value depending on the way a function is called, and the rules as to what this might 
  // be defined as are notoriously convoluted.

  function API() {
    this.uri = 'http://www.my-hipster-api.io/';
  }
  
  // Code that does not work because the this is locally bound to the Promise object

  // let's pretend this method gets all documents at
  // a specific RESTful resource...
  API.prototype.get = function(resource) {
    return new Promise(function(resolve, reject) {
      // this doesn't work
      http.get(this.uri + resource, function(data) {
        resolve(data);
      });
    });
  };

  var api = new API();

// By calling api.get, we should be making a request to http://www.my-hipster-api.io/nuggets
// However the 'this' does not resolve because this.uri is undefined so when we come to call 
// our http.get() method that we’re wrapping, we can’t properly form the URL we need. 
// Why would this be? Well, when we call new Promise(), we’re calling a constructor of another 
// object the Promise, which creates a new lexical 'this' in turn. Put simply, this.uri is not in scope.
api.get('nuggets').then(function(data) {
  console.log(data);
});

// Possible solutions
// a) explicity saving and using the this from the API constructor in the self variable

API.prototype.get = function(resource) {
    var self = this; // a-ha! we'll assign to a local var
    return new Promise(function(resolve, reject) {
      // this works!
      http.get(self.uri + resource, function(data) {
        resolve(data);
      });
    });
  };

  // b) Surely there must be a way for us to define this ourselves? If we’re working inside 
  // an environment where we have ES5 features (IE9 or above), we could use .bind(), which 
  // is a method on the Function prototype that allows us to “bind” (funnily enough) a value 
  // a function’s lexical this.

  API.prototype.get = function(resource) {
    return new Promise(
      function(resolve, reject) {
        // this works!
        http.get(this.uri + resource, function(data) {
          resolve(data);
        });
      }.bind(this)
    );
  };

  // c) Enter arrow functions! In ES6, the same function above could be defined like this. 
  // but what’s the arrow doing? Well, it actually binds the context of the Promise’s this 
  // to the context of the function that contains it, so this.uri resolves to the value we 
  // assigned in the constructor. This avoids having to use bind or the dreaded 
  // var self = this trick to keep a reference to the desired scope.

  API.prototype.get = function(resource) {
    return new Promise((resolve, reject) => {
      http.get(this.uri + resource, function(data) {
        resolve(data);
      });
    });
  };

// In arrow functions, this retains the value of the enclosing lexical context's this. 
// In global code, it will be set to the global object:
 
// Glbal context

// Function Context
function f1() {
    return this;
}
  
// In a browser:
// f1() === window; // true 
  
// In Node:
console.log(f1() === global); // true

// In strict mode this is undefined
function f2() {
    'use strict'; // see strict mode, note all code executed after call to f2() is in strict mode
    return this;
  }
  
console.log(f2() === undefined); // true

