process = require("process");

function printStdOutErr() {
  // console.log( "Child Process " + process.argv[1] + process.argv[2] + " executed.");

  process.stdout.write(
    "Child Process using process.stdout " +
      process.argv[1] +
      process.argv[2] +
      " executed." +
      process.pid +
      "\n"
  );

  process.stderr.write(
    "Child Process using process.stderr " +
      process.argv[1] +
      process.argv[2] +
      " executed.\n"
  );

  let exitcode = 99 + parseInt(process.argv[2]);
  process.exit(exitcode);
}

process.on("disconnect", function () {
  console.log("parent exited");
  process.exit();
});

// call the rest of the code and have it execute after 3 seconds
setTimeout(printStdOutErr, 3000);

// process.exit(99 + process.argv[2]);
