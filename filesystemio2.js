// High level functions dealing with file reading and writing using fs.readFileSync(), fs.writeFileSync(),
// Calls to open the file are handled within these two functions and is not exposed to the user.
// These are synchronous counterparts of functions fs.readFile() and fs.writeFile(), also shown below.

const fs = require("fs");

// Demonstrates the no brainer way of reading and writing files
// The "normal" way in Node.js is to read in the content of a file in a non-blocking,
// asynchronous way. That is, to tell Node to read in the file, and then to get a callback when
// the file-reading has been finished. That would allow us to hand several requests in parallel.
// No calls to open or close are made as these functions take care of those.

// Asynchronous using readFile
const file2 = "./example_file.txt";
let contents = null;
fs.readFile(file2, "utf8", function (err, contents) {
  console.log("readFile:" + contents);
});

// synchronous using readFileSync
let contents1 = fs.readFileSync(file2, "utf8");
console.log("readFileSync:" + contents1);

// The fs module includes a high-level writeFile method that can write data to files asynchronously.
// This means, like with a lot of operations in Node.js, the I/O is non-blocking, and emits an event
// when the operation finishes. We can write a callback function to run when the writeFile returns.
// fs.writeFile( file, data, options, callback )
// file: It is a string, Buffer, URL or file description integer that denotes the path of the file where it has to be written.
// Using a file descriptor will make it behave similar to fs.write() method.
// data: It is a string, Buffer, TypedArray or DataView that will be written to the file.
// options: It is an string or object that can be used to specify optional parameters that will affect the output. It has three optional parameter:
//     encoding: It is a string value that specifies the encoding of the file. The default value is ‘utf8’.
//     mode: It is an integer value that specifies the file mode. The default value is 0o666.
//     flag: It is a string value that specifies the flag used while writing to the file. The default value is ‘w’.
// callback: It is the function that would be called when the method is executed.
// err: It is an error that would be thrown if the operation fails.
// https://www.geeksforgeeks.org/node-js-fs-writefile-method/

// Simple Asynchronous writeFile example with default options
// Import the filesystem module

let data = "This is a file containing a collection of books.";

fs.writeFile("books.txt", data, (err) => {
  if (err) console.log(err);
  else {
    console.log("File written successfully\n");
    console.log("The written has the following contents:");
    console.log(fs.readFileSync("books.txt", "utf8"));
  }
});

// Advanced Asynchronous writeFile example with options provided as an object
let data1 = "This is a file containing a collection of movies.";

fs.writeFile(
  "movies.txt",
  data1,
  {
    encoding: "utf8",
    flag: "w",
    mode: 0o666, // ugo have read and write permissions. No execute permissions.
  },
  (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
      console.log(fs.readFileSync("movies.txt", "utf8"));
    }
  }
);

// Synchronous writeFileSync example with options from https://www.geeksforgeeks.org/node-js-fs-writefilesync-method/
// Node.js program to demonstrate the fs.writeFileSync() method

// Writing to the file 5 times with the append file mode
for (let i = 0; i < 5; i++) {
  fs.writeFileSync("movies.txt", "Movie " + i + "\n", {
    encoding: "utf8",
    flag: "a+",
    mode: 0o666,
  });
}
console.log("File written successfully 5 times\n");
console.log("The written file has the following contents:");
console.log(fs.readFileSync("movies.txt", "utf8"));
