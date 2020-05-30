// This file shows how to use fs.createReadStream() to read from a stream. A stream is like a file
// without an end and data arrives in bursts. Very useful in webservers where data is coming in
// from a client. The streaming functions communicate through prespecified callbacks for events,
// when data arrives or the stream is closed.

// https://medium.com/@dalaidunc/fs-readfile-vs-streams-to-read-text-files-in-node-js-5dd0710c80ea
// https://nodejs.org/en/knowledge/advanced/streams/how-to-use-fs-create-read-stream/ use in a web server
// to stream data from a file into a response
// https://nodejs.org/api/fs.html#fs_file_system - Read first
// https://nodejs.org/api/stream.html#stream_types_of_streams - Reference

// Main article  https://www.geeksforgeeks.org/node-js-fs-createreadstream-method/
// The createReadStream() method is an inbuilt application programming interface of fs module which
// allow you to open up a file/stream and read the data present in it.
// fs.createReadStream( path[, options] )
// path: This parameter holds the path of the file where to read the file. It can be string, buffer or URL.
// Options can specify:It is an optional parameter that holds string or object.
// start, end, and encoding
// highWaterMark - controls how much of the data is buffered
// fd
// mode
// flags
// autoClose

// Simple example
// Node.js program to demonstrate the fs.createReadStream() method

// Include fs module
let fs = require("fs"),
  // Use fs.createReadStream() method to read the file
  reader = fs.createReadStream("movies.txt");

// Read and disply the file data on console
reader.on("data", function (chunk) {
  console.log(chunk.toString());
});

// Another example where the streaming object calls a user provided callback function after the
// stream which reads a file has been emptied into a buffer

const fileToBuffer = (filename, cb) => {
  let readStream = fs.createReadStream(filename);
  let chunks = [];

  // Handle any errors while reading
  readStream.on("error", (err) => {
    // handle error

    // File could not be read
    return cb(err);
  });

  // Listen for data
  readStream.on("data", (chunk) => {
    chunks.push(chunk);
  });

  // File is done being read
  readStream.on("close", () => {
    // Create a buffer of the image from the stream
    return cb(null, Buffer.concat(chunks));
  });
};

// A more involved example which shows the options in an object
// Node.js program to demonstrate the fs.createReadStream() method

// Use fs.createReadStream() method to read the file
reader = fs.createReadStream("movies.txt", {
  flag: "a+",
  encoding: "UTF-8",
  start: 5, //skip the first 5 bytes
  end: 163, // read at most 64 bytes
  highWaterMark: 6,
});

// Read and display the file data on console
reader.on("data", function (chunk) {
  console.log(chunk);
});

// https://stackoverflow.com/questions/43256505/replacing-fs-readfile-with-fs-createreadstream-in-node-js
// Example : when to stop streaming - close event
/* 
const express = require("express");
const fs = require("fs");
const server = express();

const port = process.env.PORT || 1337;

server.get("/image", (req, res) => {
  let readStream = fs.createReadStream(__dirname + "/public/images/image.png");

  // When the stream is done being read, end the response
  readStream.on("close", () => {
    res.end();
  });

  // Stream chunks to response
  readStream.pipe(res);
});

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
*/
