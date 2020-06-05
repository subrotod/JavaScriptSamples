const obj = {
  firstName: "Subroto",
  dob: new Date("11-18-2020"),
};

value = "age" in obj ? obj.age : 99;
console.log(value);

value = "dob" in obj ? obj.dob : 99;
console.log(value);

var a = String("foo");
var b = a;
console.log(a, b);
a = String("bar");
console.log(a, b);

console.log(typeof b);
