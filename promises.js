// Article : https://medium.com/better-programming/understanding-promises-in-javascript-13d99df067c1

// Promises are generally used for easier handling of asynchronous operations or blocking code, 
// for example, file operations, API calls, DB calls, IO calls, etc. These asynchronous operations 
// initiate inside the executorfunction. If the asynchronous operations are successful the expected 
// result is returned by calling the resolvefunction. Similarly, if there was some unexpected error 
// the reasons are passed on by calling the rejectfunction.

// The Promise constructor accepts a function called executor. This executor function accepts two parameters: 
// resolve and reject, which are in turn functions. There are four static methods in the Promise object.
// a) Promise.reject(reason) helps you create a rejected promise.
// b) Promise.resolve(value) helps you create a resolved promise.
// c) The Promise.all(iterable) method returns a single Promise that resolves when all of the promises in 
// the iterable argument have resolved or when the iterable argument contains no promises. It rejects 
// with the reason of the first promise that rejects.
// d) The Promise.race(iterable) method returns a promise that resolves or rejects as soon as one of the 
// promises in the iterable resolves or rejects, with the value or reason from that promise.


// new Promise( /* executor */ function(resolve, reject) { ... } );

// Let’s create a simple promise to help our understanding.
var keepsHisWord;
keepsHisWord = true;
promise1 = new Promise(function(resolve, reject) {
  if (keepsHisWord) {
    resolve("The man likes to keep his word");
  } else {
    reject("The man doesnt want to keep his word");
  }
});
console.log(promise1);

// So let us just create a new promise that will take some time to resolve. The easiest way to do 
// that is to use the setTimeOut function.
promise2 = new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve({
        message: "The man likes to keep his word",
        code: "aManKeepsHisWord"
      });
    }, 10 * 1000);
  });
  console.log(promise2);


// A Promise that will be rejected
// (node:16252) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. 
// In the future, promise rejections that are not handled will terminate the Node.js process 
// with a non-zero exit code.

keepsHisWord = false;
promise3 = new Promise(function(resolve, reject) {
  if (keepsHisWord) {
    resolve("The man likes to keep his word");
  } else {
    reject("The man doesn't want to keep his word");
  }
});
console.log(promise3);

// Promise Prototype Methods. There are three of them.
// As we saw earlier when a Promise is created it is in pending state. One or more of the following 
// three methods will be run when a promise is settled based on whether they are fulfilled or rejected:
// a) Promise.prototype.catch(onRejected)
// b) Promise.prototype.then(onFulfilled, onRejected)
// b) Promise.prototype.finally(onFinally)