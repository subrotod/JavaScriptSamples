// https://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript

// prototype is a property of a Function object. It is the prototype of objects constructed by that function.
// __proto__ is internal property of an object, pointing to its prototype. 
// Current standards provide an equivalent Object.getPrototypeOf(O) method, though de facto standard __proto__ 
// is quicker.
// You can find instanceof relationships by comparing a function's prototype to an object's __proto__ chain, 
// and you can break these relationships by changing prototype.

function Point(x, y) {
    this.x = x;
    this.y = y;
}

var myPoint = new Point();

// the following are all true
myPoint.__proto__ == Point.prototype
myPoint.__proto__.__proto__ == Object.prototype
myPoint instanceof Point;
myPoint instanceof Object;

// __proto__ is not a standard way of accessing the prototype chain, the standard approach 
// is to use Object.getPrototypeOf(obj).
// object instanceof Class operator returns true when an object is an instance of a Class, more specifically if 
// Class.prototype is found in the proto chain of that object then the object is an instance of that Class.

function instanceOf(Func){
    var obj = this;
    while(obj !== null){
      if(Object.getPrototypeOf(obj) === Func.prototype)
        return true;
      obj = Object.getPrototypeOf(obj);
    }
    return false;
  }      