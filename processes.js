//  https://nodejs.org/en/knowledge/getting-started/the-process-module/
// Each Node.js process has a set of built-in functionality, accessible through the global process module.
// The process module doesn't need to be required - it is somewhat literally a wrapper around the
// currently executing process, and many of the methods it exposes are actually wrappers around
// calls into core C libraries.
const process = require("process");

// handling stdin, stdout, stderr streams
// The process object also provides wrappings for the three STDIO streams, stdin, stdout, and stderr.
// Put briefly, stdin is a readable stream (where one would read input from the user),
// stdout is a non-blocking writeable stream (writes to stdout are asynchronous, in other words), and
// stderr is a blocking (synchronous) writeable stream.
// The simplest one to describe is process.stdout. Technically, most output in Node.js is accomplished by
// using process.stdout.write() - though most people would never know it. The following is from
//console.js in Node.js core:
exports.log = function () {
  process.stdout.write(format.apply(this, arguments) + "\n");
};

// Events
// There are two built-in events worth noting in the process module, exit and uncaughtException.
process.on("uncaughtException", function (err) {
  console.error("An uncaught error occurred!");
  console.error(err.stack);
});

// Important process properties
console.log(process.title);
// if running node.js foo.js
console.log(process.pid); // 3290
console.log(process.version); // 'v0.4.9'
console.log(process.platform); // "win32"
// The process module also exposes process.argv, an array containing the command-line arguments
// to the current process, and process.argc, an integer representing the number of arguments passed in.
// Read more on how to parse command line arguments
console.log(process.argc); // number of command line args
console.log(process.argv); // value of the command line arguments
console.log(process.execPath); //  will return the absolute path of the executable that started this process.
console.log(process.env); //  contains your environment variables. Try process.env.HOME, for example.

// Process methods
console.log(process.cwd());
// '/home/avian/dev'
// process.chdir('/home/avian')
console.log(process.cwd());
// '/home/avian'

// Finally, on a more advanced note, we have process.nextTick. This method accepts one argument
// - a callback - and places it at the top of the next iteration of the event loop.
// Some people do something like this:
// setTimeout(function () {
//   // code here
// }, 0)

// This, however, is not ideal. In Node.js, this should be used instead:

process.nextTick(function () {
  console.log("Next trip around the event loop, wheeee!");
});

// spawning a new process from current process
// https://nodejs.org/en/knowledge/child-processes/how-to-spawn-a-child-process/

const { exec } = require("child_process");

const ls = exec("ls -l", function (error, stdout, stderr) {
  if (error) {
    console.log(error.stack);
    console.log("Error code: " + error.code);
    console.log("Signal received: " + error.signal);
  }
  console.log("Child Process STDOUT: " + stdout);
  console.log("Child Process STDERR: " + stderr);
});

ls.on("exit", function (code) {
  console.log("Child process exited with exit code " + code);
});

// There are other very useful spawning functions like: .spawn(), .fork(), .execFile().

// child_process.spawn(): The spawn function launches a command in a new process and you can use it
// to pass that command any arguments. It's the most generic spawning function and all other functions
// are built over it [docs].
// child_process.execFile(): The execFile function is similar to child_process.exec() except that it
// spawns the command directly without first spawning a shell by default [docs].
// child_process.fork(): The fork function spawns a new Node.js process and invokes a specified module
// with an IPC communication channel established that allows sending messages between parent and child [docs].

// killing a process
