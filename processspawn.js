// Node.js child_process.spawn() method
// The child_process.spawn() method launches a new process with a given command.
// This method returns streams (stdout & stderr) in the ChildProcess instance. Important difference from exec
// Data is retrieved by listening to "data" messages on ChildProcess.stdout.on() and ChildProcess.stderr.on()
//  It is generally used when the process returns large amount of data.

// Syntax: child_process.spawn(command[, args][, options])
// Parameters:
// 1) command: It specifies the command to run.
// 2) args: It specifies an array List of string arguments.
// 3) options: It may contain one or more of the following options:
// a) cwd: It specifies the current working directory of the child process.
// b) env: It specifies environment key-value pairs.
// c) stdio: Array|String Child's stdio configuration
// d) customFds: Array Deprecated File descriptors for the child to use for stdio
// e) detached Boolean : The child will be a process group leader
// f) uid Number: Sets the user identity of the process.
// g) gid Number: Sets the group identity of the process.

// Node.js child_process.spawn() example
const os = require("os");
const fs = require("fs");
const child_process = require("child_process");

var workerProcess = [];
workerProcess.length = 3;

function stdoutWithPiD(pid) {
  return function (data) {
    console.log("stdout msp: " + pid + " " + data);
  };
}

for (var i = 0; i < workerProcess.length; i++) {
  workerProcess[i] = child_process.spawn("node", ["support.js", i]);

  console.log(workerProcess[i].pid);
  // console.log(workerProcess[i]);

  // workerProcess[i].stdout.on("data", function (data) {
  //   console.log("stdout msp: " + data);
  // });

  if (i == 2) {
    //a)  workerProcess[i].disconnect(); /* Did not work need to analyze */
    /*  default kill signal is SIGTERM */
    workerProcess[i].kill(os.constants.signals.SIGTSTP);
    console.log(workerProcess[i].killed); // was kill was sent successfully

    // c)  Use a pipe for the worker process to send its console.log to parent
    // This is additional to the workerProcess[i].stdout.on event, that is emitted by the child and processed by the parent.
    // workerProcess[i].stdout.pipe(process.stdout);

    // d) Dump the ChildProcess instance created by spawn
    // console.log(workerProcess[i]);
  }

  // Use closure to remember the child process pid for the console message
  workerProcess[i].stdout.on("data", stdoutWithPiD(workerProcess[i].pid));

  workerProcess[i].stderr.on("data", function (data) {
    console.log("stderr msp : " + data);
  });

  // The 'close' event is emitted when the stdio streams of a child process have been closed.
  // This is distinct from the 'exit' event, since multiple processes might share the same stdio streams.
  workerProcess[i].on("close", function (code, signal) {
    // code will hold the exit code
    console.log("msp : child process " + " exited with code " + code);
    if (signal) {
      console.log(
        `msp : child process terminated due to receipt of signal ${signal}`
      );
    }
  });
}
