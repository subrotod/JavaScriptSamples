// Functions dealing with file system access, and getting stats on files and directories
// Import the filesystem module
const fs = require("fs");

// File system acces to check if a file exits
// https://www.geeksforgeeks.org/node-js-fs-access-method/
// Node.js program to demonstrate the fs.access() method

// Allowing only read permission
// Caveats: on Windows only the write permission can be changed, and the distinction among
// the permissions of group, owner or others is not implemented.
console.log("Giving only read permission to the user");
// fs.chmodSync("example_file.txt", fs.constants.S_IRUSR | S_IRGRP );
fs.chmodSync("example_file.txt", 0o400 | 0o200);

// Test the read permission
fs.access("example_file.txt", fs.constants.R_OK, (err) => {
  console.log("\n> Checking Permission for reading the file");
  if (err) console.error("No Read access");
  else console.log("File can be read");
});

// Test both the read and write permissions
fs.access("example_file.txt", fs.constants.R_OK | fs.constants.W_OK, (err) => {
  console.log('\n> Checking Permission for reading" + " and writing to file');
  if (err) console.error("No Read and Write access");
  else console.log("File can be read and written");
});

// Getting stats on a file
// Node.js program to demonstrate the fs.stat() method

// Getting information for a file
fs.stat("example_file.txt", (error, stats) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Stats object for: example_file.txt");
    console.log(stats);

    // Using methods of the Stats object
    console.log("Path is file:", stats.isFile());
    console.log("Path is directory:", stats.isDirectory());
  }
});

// Getting information for a directory
fs.stat("example_directory.txt", (error, stats) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Stats object for: example_directory.txt");
    console.log(stats);

    // Using methods of the Stats object
    console.log("Path is file:", stats.isFile());
    console.log("Path is directory:", stats.isDirectory());
  }
});
