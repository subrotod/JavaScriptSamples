// https://dzone.com/articles/understanding-execfile-spawn-exec-and-fork-in-node
//parent.js
const child_process = require("child_process");

const worker_process = child_process.fork(`${__dirname}/support_fork.js`);
console.log("Parent pid " + process.pid);

// parent receives message from child/worker
worker_process.on("message", (m) => {
  console.log("PARENT got message:", m);
});

// parent sends message to child/worker
worker_process.send({ hello: "world" });
