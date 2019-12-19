// In arrow functions, this retains the value of the enclosing lexical context's this. 
// In global code, it will be set to the global object:
 
// Global context

// Function Context
function f1() {
    return this;
}
  
// In a browser:
// f1() === window; // true 
  
// In Node:
console.log(f1() === global); // true
console.log(global)

// In strict mode 'this' is undefined
function f2() {
    'use strict'; // see strict mode, note all code executed after call to f2() is in strict mode
    return this;
  }
  
console.log(f2() === undefined); // true

a = 10; // property on the global object
var d = 20; // variable at global scope

// Think of testp as the promise constructor
function testp(a, b, c) {
  this.a = a;
  this.b = this.a + b;
  this.f = c;

  this.result = function (t) {
    console.log(this.a, "  ", this.b, + " " + this.f() + " " + t);
  }
}

//a. x = new testp(2, 3, function() {return this.a}.bind(global))
//b. x = new testp(2, 3, () => {return global.a}) // return 10
//c. x = new testp(2, 3, function() {return this.a}) // return 2
// x.result()

function create_x(f) {
  return new testp(2, 3, f);
}

// Example d. with => how to bind the 'this' in new testp f property to global object. 
// using an explicit bind before the function is passed to the testp constructor function.
// If the bind is not called xf.result will return 2, i.e. it will use the a property of 
// the testp object.
xf = create_x(function(){return this.a}.bind(global))
xf.result(d) // return 10

// Example e. with =>, shows how to bind the 'this' in new testp f property to global object. 
// create_x is a global function. therefore create_x's 'this' is set to global
// in the execution context in non-strict mode. Note that the a is a property on the global
// object, because if you change a = 10 to var a = 10 at global scope, the f() call in result 
// will return NaN

xfa = create_x(() => {return a})
xfa.result(d) // return 10



