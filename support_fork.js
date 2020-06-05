// child process code for processfork
//support_fork.js

// child receives message from parent
process.on("message", (m) => {
  console.log("CHILD got message:", m);
});

//child sends message to parent
process.send({ foo: "bar" });

console.log("Child pid " + process.pid);
