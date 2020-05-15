// With JavaScript, you can define and create your own objects. There are different ways to create new objects:
// a. Define and create a single object, using an object literal.
var person = {
  firstName: "John",
  lastName : "Doe",
  id       : 5566,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
};

// b. Define and create a single object, with the keyword new. This can be wrapped within a function that 
// returns person, as in example c.
var person_john = new Object(); // or var person = {}
person_john.firstName = "John";
person_john.lastName = "Doe";
person_john.age = 50;
person_john.eyeColor = "blue";
person_john.fullname = function() {
  return this.firstName + " " + this.lastName;
}

console.log("person_john.eyecolor :" + person_john.fullname() + "\'s eyecolor is " + person_john.eyeColor)

// c. Define an object constructor function, and then create objects of the constructed type.
// Constructor function for Person objects
// You cannot add a new property to an existing object constructor: Person.nationality = "English"  is illegal
// Instead you must this.nationality = "English" within the constructor function OR
// Person.prototype.nationality = "English" outside the Person function

function Person(first, last, age, eye) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eye;
  this.nationality = "English";
  this.name = function() {return this.firstName + " " + this.lastName;};
}

// Create a Person object
var myFather = new Person("John", "Doe", 50, "green");

// d. In ECMAScript 2015, an object can also be created with the function Object.create(). 
// The Object.create() method creates a new object, using an existing object as the prototype 
// of the newly created object.
const person_generic = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person_generic);

me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten
me.printIntroduction();

// e. Builtin Javascript constructors for native objects
var x1 = new Object();    // A new Object object
var x2 = new String();    // A new String object
var x3 = new Number();    // A new Number object
var x4 = new Boolean();   // A new Boolean object
var x5 = new Array();     // A new Array object
var x6 = new RegExp();    // A new RegExp object
var x7 = new Function();  // A new Function object
var x8 = new Date();      // A new Date object

// JavaScript classes, introduced in ECMAScript 2015, are primarily syntactical sugar over JavaScript's 
// existing prototype-based inheritance. The class syntax does not introduce a new object-oriented inheritance 
// model to JavaScript.

// 1 a. Class definition using declaration syntax and instantiation using class and new
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    console.log("Rectangle", this.height, this.width);
  }
}

// 1 b. Class definition using class expression syntax. Name of the class is Rectangle2. The Rectangle after class
// is optional and can be removed
let Rectangle2 = class Rectangle {
  constructor(height, width) {
    this.height = height * 10;
    this.width = width;
    console.log("Rectangle2", this.height, this.width);
  }
};

const p = new Rectangle(3,4);
const p2 = new Rectangle2(6,8);


// Classes are in fact "special functions", and just as you can define function expressions and function declarations, 
// the class syntax has two components: class expressions and class declarations. An important difference between
// function declarations and class declarations is that function declarations are hoisted and class declarations are not.

// 2 a. Class definition using class expression and class inheritance using extends
// Default function parameters is from ES2015 onwards
class Animalxa { 
    constructor(name, age = 0) {
      this.name = name;

      if (typeof age === "undefined") { 
        this.age = 99;
      } else {
        this.age = age;
      }
  }
    
  speak() {
      console.log(`${this.name} makes a noise.`);
  }
}
  
class Dogxa extends Animalxa {
  // If derived class Dogxa does not have a constructor, the base class constructor Anilnalxa will be called and all parameters to 
  // new Dogxa(params) is passed to the base class constructor. There is an implied super(params) call.
  
  /* Explicit Dogxa constructor has been commented out to reflect the implied call to Animalxa constructor.
  // The super() is required if the derived class has its own constructor
  constructor(name) {
    super(name, 12); 
  }
  */

  eat() {
      console.log('Yummy Yummy!');
  }
}
  
const dogAxa = new Dogxa('Miluxa'); // Use the default age value
dogAxa.speak(); // Miluxa makes a noise.
dogAxa.eat(); // Yummy Yummy!
console.log("Age: " + dogAxa.age)

// 2 b. Mixin (Interface) definition and addition to an existing  class using Object.setPrototypeOf
// In object-oriented programming languages, a mixin (or mix-in) is a class that contains methods for use by 
// other classes without having to be the parent class of those other classes.
const Animalxb = {
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
};

class Dogxb {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log('Yummy Yummy!');
  }
}

Object.setPrototypeOf(Dogxb.prototype, Animalxb);

const dogAxb = new Dogxb('Miluxb');
dogAxb.speak(); // Milu makes a noise.
dogAxb.eat(); // Yummy Yummy!

// 3. Function based class definition and expanding definition with .prototype
// followed by class inheritance of the function based definition
// With .prototype approach the added function (speak) is shared between all instantiations of the class 
// wheras if (speak) is defined within Animalf each instance would get its own copy of (speak)
function Animalf (name) {
  this.name = name;  
}
  
Animalf.prototype.speak = function () {
  console.log(`${this.name} makes a noise.`);
}
  
class Dogf extends Animalf {
  eat() {
    console.log('Gummy Gummy!');
  }
}
 
const dogAf = new Dogf('Miluf');
console.log(`${typeof(dogAf)}`);
console.log(`${typeof(Animalf)}`);

dogAf.speak(); // Miluf makes a noise.
dogAf.eat(); // Gummy Gummy!

// 4. Create an object with common methods and use it as a mixin template for a class using Object.assign
const animalBehavior =  { 
  speak() {
    console.log(`${this.name} makes a noise.`);
  },
   eat() {
    console.log('Bummy Bummy!');
  }
}

class Dogab {
 constructor(name) {
    this.name = name;
  }
}

Object.assign(Dogab.prototype, animalBehavior);

const dogAab = new Dogab('Miluab');
dogAab.speak(); // Milu makes a noise.
dogAab.eat(); // Yummy Yummy!

console.log(dogAab.__proto__);
console.log(typeof(animalBehavior));
console.log(typeof(dogAab));
console.log(typeof(Dogab));
console.log(typeof(Animalf));

// Multiple mixin examples needed