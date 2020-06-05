// Node.js child_process.exec() method
// Executes a node.js program specified in support.js, and prinst the stdout and stderr contents from the child process

const fs = require("fs");
const child_process = require("child_process");

for (var i = 0; i < 3; i++) {
  var workerProcess = child_process.exec("node support.js " + i, function (
    error,
    stdout,
    stderr
  ) {
    if (error) {
      // error will hold the exit code in this case. If all went well in support.js the child process must return 0
      console.log(error.stack);
      console.log("Error code: " + error.code);
      console.log("Signal received: " + error.signal);
    }
    console.log("stdout: " + stdout);
    console.log("stderr: " + stderr);
  });

  // The 'exit' event is emitted after the child process ends. If the process exited, code is the final exit code of the process,
  // otherwise null. If the process terminated due to receipt of a signal, signal is the string name of the signal,
  // otherwise null. One of the two will always be non-null.
  // When the 'exit' event is triggered, child process stdio streams might still be open.
  // Node.js establishes signal handlers for SIGINT and SIGTERM and Node.js processes will not terminate immediately
  // due to receipt of those signals. Rather, Node.js will perform a sequence of cleanup actions and then will re-raise
  // the handled signal.

  workerProcess.on("exit", function (code) {
    console.log("Child process exited with exit code " + code);
  });
}
