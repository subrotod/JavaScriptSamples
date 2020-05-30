// Functions dealing with file reading and writing using fs.open(), fs.read() and fs.write()
// These are the node.js functions closest to the operating system.
// Import the filesystem module
const fs = require("fs");

// https://www.brainbell.com/javascript/fs-open-read-write-file.html
// reading and writing from a file using example_file.txt
// Asynchronous Low level functions fs.open(), fs.read(), fs.write()
// The fs.read() and fs.write() functions use buffer for reading from or writing to a file.
// The fs.read and fs.write give you full control overeading and writing, like if if you want to skip
// bytes or overwrite bytes

// Step 1 Open a file for reading or writing using fs.open method
// Syntax: fs.open(path, flags [,mode], callback)path

// Filename and path e.g. D:\BrainBell\map.xml
// flags
//  r Opens the file for reading
//  r+ Opens the file for reading and writing
//  w Opens the file for writing
//  wx Opens the file for writing, but fails if the file does exist
//  w+ Opens the file for reading and writing
//  wx+ Opens the file for reading and writing, but fails if the file exists
//  a Opens the file for appending
//  ax Opens the file for appending, fails if the file exists
//  a+ Opens the file for reading and appending
//  ax+ Opens the file for reading and appending, but fails if the file exists
// mode
//  An optional value that sets the sticky and permission bits on the file if created, and defaults to 0666.
// Callback function
//  The callback function has two parameters:
//    error If an error occurs
//    fd A file descriptor, used by subsequent file operations.

//Open a file for reading
const file = "./file.txt";

// Will fail as file.txt does not exist
// fs.open(file, "r", (err, fd) => {
//   if (err) {
//     console.log(err);
//   } else {
//     /*...*/
//   }
// });

// if you call fs.open or any of the others that give a fd,// you must eventually fs.close with the fd
// that you are given.

// reading and writing after calling fs.open - Asynchronous
// The fs.read() and fs.write() functions share the same parameters:
// fd : the fs.open() method’s callback file descriptor
// buffer : The buffer used to either hold data to be written or appended, or read
// offset : The offset where the input/output (I/O) operation begins in the buffer
// length : The number of bytes to read or write in the buffer
// position : Position in the file where to begin reading or writing.
// callback : The callback functions have three arguments:
// err : An error, if operation failed
// bytes : Bytes read (or written)
// buffer : The buffer.
//fs.read syntax with callback
// fs.read(fd, buffer, offset, length, position, (err, bytes, buffer) => {});

//fs.write syntax
// fs.write(fd, buffer, offset, length, position, (err, bytes, buffer) => {});

const file2 = "./example_file.txt";

// Works - Asynchronous - reads in all 38 characters in one shot
const len = 38;
const buffr = Buffer.alloc(len);
let offset = 0;
let total_bytes = 0;

fs.open(file2, "r", (err, fd) => {
  if (err) {
    console.log(err);
  } else {
    fs.read(fd, buffr, offset, len, total_bytes, (err2, bytes_read, buffr) => {
      if (err2) {
        console.log(err2);
      } else {
        console.log(buffr.toString("utf8"));
        console.log(bytes_read);
        total_bytes = total_bytes + bytes_read;
        console.log(total_bytes);
      }
    });
  }

  fs.close(fd, (err) => {
    if (err) {
      console.log("close error" + err);
    }
  });
});

/* Does not work - Asynchronous - emulates the while loop synchronous solution

let offset = 0;
let count = 0;
let total_bytes = 0;
const file2 = "./example_file.txt";
const len = 26;
const buffr_a = Buffer.alloc(len);

fs.open(file2, "r", (err, fd) => {
  if (err) {
    console.log(err);
  } else {
    // count < 3 is a guard to prevent infnite loop
    while (total_bytes < size && count < 3) {
      fs.read(
        fd,
        buffr_a,
        offset,
        len,
        total_bytes,
        (err2, bytes_read, buffr_a) => {
          if (err2) {
            console.log(err2);
          } else {
            console.log(buffr.toString("utf8"));
            console.log(bytes_read);
            total_bytes = total_bytes + bytes_read;
            console.log(total_bytes);
          }
        }
      );

      count++;
    }

    fs.close(fd, (err) => {
      if (err) {
        console.log("close error" + err);
      }
    });
  }
});
*/

// https://stackoverflow.com/questions/12121775/convert-streamed-buffers-to-utf8-string
// Interesting read when doing streamed i/o with fixed size buffers
