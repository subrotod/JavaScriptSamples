// 1. Simple class definition and instantiation using class and new
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    console.log("Rectangle", this.height, this.width);
  }
}

// 2. Class definition, inheritance using extends and instantiation
const p = new Rectangle(3,4);

class Animal { 
    constructor(name) {
      this.name = name;
  }
    
  speak() {
      console.log(`${this.name} makes a noise.`);
  }
}
  
class Dog extends Animal {
  eat() {
      console.log('Yummy Yummy!');
  }
}
  
const dogA = new Dog('Milu');
dogA.speak(); // Milu makes a noise.
dogA.eat(); // Yummy Yummy!

// 3. class definition using function and expanding definition with .prototype
// followed by class inheritance of the function based definition
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
dogAf.speak(); // Miluf makes a noise.
dogAf.eat(); // Gummy Gummy!