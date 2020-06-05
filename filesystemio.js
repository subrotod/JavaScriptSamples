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

// This code will fail as file.txt does not exist
// fs.open(file, "r", (err, fd) => {
//   if (err) {
//     console.log(err);
//   } else {
//     /*...*/
//   }
// });

// if you call fs.open or any of the others that return a fd, you must eventually call fs.close with the fd
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

// Asynchronous solution - reads in all 38 characters in one shot
const len = 38;
const buffr = Buffer.alloc(len);
let offset = 0;
let total_bytes = 0;
/*
fs.open(file2, "r", (err, fd) => {
  if (err) {
    console.log(err);
  } else {
    fs.read(fd, buffr, offset, len, total_bytes, (err2, bytes_read, buffr) => {
      if (err2) {
        console.log(err2);
      } else {
        console.log("fs.read read in entire file in one shot results");
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
*/

/* Asynchronous - emulates the while loop synchronous solution, reading 26 bytes at a time. */
// let total_bytes = 0; declared earlier
// const file2 = "./example_file.txt"; declared earlier
let chunk_size = 26; // This is the maximum chunkSize
const file_size = 38; // file size
const buffr_a = Buffer.alloc(file_size); // This buffer will be written into by each fs.read call. The param values
// guarantee that the data will not be overwritten.

fs.open(file2, "r", (err, fd) => {
  if (err) {
    console.log(err);
  } else {
    chunk_size = 26; // chunksize for reading
    total_bytes = 0;

    while (total_bytes < file_size) {
      chunk_size =
        chunk_size <= file_size - total_bytes
          ? chunk_size
          : file_size - total_bytes;

      fs.read(
        fd,
        buffr_a,
        total_bytes,
        chunk_size,
        total_bytes,
        (err2, bytes_read, buffr_a) => {
          if (err2) {
            console.log(err2);
          }
        }
      );
      total_bytes = total_bytes + chunk_size;
    }
  }

  console.log("fs.read in loop results");
  console.log(buffr_a.toString("utf8"));

  fs.close(fd, (err) => {
    if (err) {
      console.log("close error" + err);
    }
  });
});

// Example below is from https://stackoverflow.com/questions/5985748/node-js-fs-read-example
// note use of fs.fstat to get file size and allocate the buffer based on the file size dynamically
const filepath = "./example_file.txt";

/* 
fs.open(filepath, "r", function (err, fd) {
  fs.fstat(fd, function (err, stats) {
    var bufferSize = stats.size,
      chunkSize = 512,
      buffer = Buffer.alloc(bufferSize),
      bytesRead = 0;

    while (bytesRead < bufferSize) {
      if (bytesRead + chunkSize > bufferSize) {
        chunkSize = bufferSize - bytesRead;
      }
      fs.read(
        fd,
        buffer,
        bytesRead,
        chunkSize,
        bytesRead,
        (err2, bytesRead, buffer) => {
          if (err2) {
            console.log(err2);
          }
        }
      );
      bytesRead += chunkSize;
    }
    console.log(buffer.toString("utf8", 0, bufferSize));
    fs.close(fd, (err) => {
      if (err) {
        console.log("close error" + err);
      }
    });
  });
});

*/
// https://stackoverflow.com/questions/12121775/convert-streamed-buffers-to-utf8-string
// Interesting read and example  when doing streamed i/o with fixed size buffers and
// the encoding information/start of symbol info needs to be carried over into the next buffer.
// This is needed as all symbols do not have the same fixed size encoding. In utf8
// ascii characters are 1 byte, and others may be 2, 3 or 4 bytes depending on the language.
