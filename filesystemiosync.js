// Functions dealing with file reading and writing using fs.openSync(), fs.readSync() and fs.writeSync()
// These are synchronous counterparts of functions used in filesystemio.js
// These are the functions closest to the operating system.
// Import the filesystem module
const fs = require("fs");

const file2 = "./example_file.txt"; // input file example_file.txt
const file3 = "./example_file_out.txt"; //output file example_file.txt

/* Works - Synchronous readSync*/
let fdr = fs.openSync(file2, "r");

let total_bytes = 0;
let offset = 0;
let len1 = 26;
let pos = 0;
let buff1 = Buffer.alloc(len1);
let bytes_read = 0;
const size = 38;

while (total_bytes < size) {
  len1 = len1 <= size - total_bytes ? len1 : size - total_bytes;
  bytes_read = fs.readSync(fdr, buff1, offset, len1, pos);
  // result = new Int8Array(buff1, 0, bytes_read);
  // console.log(result.toString("utf8"));
  console.log(buff1.toString("utf8"));
  console.log(bytes_read);
  total_bytes = total_bytes + bytes_read;
  pos = pos + bytes_read;
  console.log(total_bytes);
}
fs.closeSync(fdr);

/* end synchronous readSync*/

/* Write synchronous */
// const file2 = "./example_file.txt"; Declared earlier in the file

console.log("\nfs.writeSync() - Buffer reading  output\n");
const read_size = 38; // total size of the text file
let buff_read = Buffer.alloc(read_size); //contains the contents to be written out
let bytes_written = 0;

// read the file to be written out into a buffer buff_read
// Calling openSync method to open example_file.txt with all its parameters
fdr = fs.openSync(file2, "r");
offset = 0;
pos = 0;
bytes_read = fs.readSync(fdr, buff_read, offset, size, pos);
console.log(buff_read.toString("utf8"));
fs.closeSync(fdr);

// Write out the contents of buffr_read, 26 bytes at a time

console.log("\nfs.writeSync() output\n");
let fdw = fs.openSync(file3, "w", 0o666);

pos = 0;
total_bytes = 0;
offset = 0;

len1 = 26; // number of bytes to be written in each call
while (total_bytes < size) {
  len1 = len1 <= size - total_bytes ? len1 : size - total_bytes;
  bytes_written = fs.writeSync(fdw, buff_read, offset, len1, pos);
  console.log(bytes_written);
  total_bytes = total_bytes + bytes_written;
  pos = pos + bytes_written;
  offset = offset + bytes_written;
  console.log(total_bytes);
}

fs.closeSync(fdw);
