// How to pass a 'this' to a function
// An object can be passed as the first argument to call or apply and this will be bound to it.
var obj = {a: 'Custom'};

// This property is set on the global object
a = 'Global';

function whatsThis() {
  return this.a;  // The value of 'this' is dependent on how the function is called
}

console.log(whatsThis());          // 'Global'
console.log(whatsThis.call(obj));  // 'Custom'
console.log(whatsThis.apply(obj)); // 'Custom'

function add(c, d) {
    return this.a + this.b + c + d;
}
  
var o = {a: 1, b: 3};
  
// The first parameter is the object to use as
// 'this', subsequent parameters are passed as 
// arguments in the function call
console.log(add.call(o, 5, 7)); // 16
  
// The first parameter is the object to use as
// 'this', the second is an array whose
// members are used as the arguments in the function call
console.log( add.apply(o, [10, 20])); // 34

// Note that in non–strict mode, with call and apply, if the value passed as this is not 
// an object, an attempt will be made to convert it to an object using the internal ToObject 
// operation. So if the value passed is a primitive like 7 or 'foo', it will be converted 
// to an Object using the related constructor, so the primitive number 7 is converted to an 
// object as if by new Number(7) and the string 'foo' to an object as if by new String('foo'), 

function bar() {
  console.log(Object.prototype.toString.call(this));
}

bar.call(7);     // [object Number]
bar.call('foo'); // [object String]

// the bind method
// ECMAScript 5 introduced Function.prototype.bind(). Calling f.bind(someObject) creates 
// a new function with the same body and scope as f, but where this occurs in the original function, 
// in the new function it is permanently bound to the first argument of bind, regardless of how 
// the function is being used

function f() {
    return this.a;
}
  
var g = f.bind({a: 'azerty'});
console.log(g()); // azerty
  
var h = g.bind({a: 'yoo'}); // bind only works once!!!!
console.log(h()); // azerty
  
var o = {a: 37, f: f, g: g, h: h};
console.log(o.a, o.f(), o.g(), o.h()); // 37,37, azerty, azerty

// Arrow function binding rules
// In arrow functions, this retains the value of the enclosing lexical context's this. 
// In global code, it will be set to the global object:

var globalObject = this;
var foo = (() => this);
console.log(foo() === globalObject); // true
console.log(this === globalObject); // true

a = "NodeGlobal"
console.log(global.a);
console.log(this);

// Note: if this arg is passed to call, bind, or apply on invocation of an arrow function 
// it will be ignored. You can still prepend arguments to the call, but the first argument 
// (thisArg) should be set to null.

// Call as a method of an object
var globalObject = this;
var foo = (() => this);
var obj = {func: foo};
console.log(obj.func() === globalObject); // true

// Attempt to set this using call
console.log(foo.call(obj) === globalObject); // true, i.e. obj not used as this value

// Attempt to set this using bind
foo = foo.bind(obj);
console.log(foo() === globalObject); // true, i.e. obj not used as this value

// Create obj with a method bar that returns a function that returns its this. The 
// returned function is created as an arrow function, so its 'this' is permanently bound to the
// this of its enclosing function. The value of bar can be set in the call, which in turn 
// sets the value of the returned function.

var obj = {
    bar: function() {
      var x = (() => this);
      return x;
    }
  };
  
  // Call bar as a method of obj, setting its this to obj
  // Assign a reference to the returned function to fn
  var fn = obj.bar();
  
  // Call fn without setting this, would normally default
  // to the global object or undefined in strict mode
  console.log(fn() === obj); // true
  
  // But caution if you reference the method of obj without calling it
  var fn2 = obj.bar;
  // Calling the arrow function's this from inside the bar method()
  // will now return global, because it follows the this from fn2.
  console.log(fn2()() == global); // true







