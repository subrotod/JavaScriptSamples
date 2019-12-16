// Article : https://medium.com/better-programming/understanding-promises-in-javascript-13d99df067c1

// The Promise object represents the eventual completion (or failure) of an asynchronous operation, 
// and its resulting value. Promise object has static methods and prototype methods.
// Static methods in aPromise object can be applied independently, whereas the prototype methods 
// needs to be applied to the instances of Promise object. Remembering that both normal methods and 
// prototypes all return a Promise makes it far easier to make sense of things.

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

// Let’s look at the signature for creating a new promise:
// new Promise( /* executor */ function(resolve, reject) { ... } );
// The constructor accepts a function called executor. This executor function accepts two parameters: 
// resolve and reject, which are in turn functions.

/*
// Let’s create a simple promise to help our understanding.
var keepsHisWord;
keepsHisWord = true;
promise1 = new Promise(function(resolve, reject) {
  if (keepsHisWord) {
    resolve("The man likes to keep his word_1");
  } else {
    reject("The man doesnt want to keep his word");
  }
});
console.log(promise1);
*/

// So let us just create a new promise that will take some time to resolve. The easiest way to do 
// that is to use the setTimeOut function with a 1 sec delay.

/* Function which returns a promise : Useful if promise should not be executed immediately
function promise2() {
    return (new Promise(function(resolve, reject) {
      setTimeout(function() {
        keepsHisWord = false;
        if (keepsHisWord) {
          resolve(
            { message: "The man likes to keep his word_2", code: "aManKeepsHisWord" });
        }
        else {
          reject({message: "The man does not keep his word_2", code: "aManDoesNotKeepsHisWord"});
        }
      } // close setTimeout callback function
      , 0 * 1000); // close setTimeout function
    }) // close new Promise ()
    ) // close return (
}
  
promise2().then(function(reason) {
  console.log(reason);
})
.catch(function(reason) {
  console.log(reason);
});
*/

promise2a = new Promise(function(resolve, reject) {
    setTimeout(function() {
      keepsHisWord = false;
      if (keepsHisWord) {
        resolve({ message: "The man likes to keep his word_2", code: "aManKeepsHisWord"});
      }
      else {
        reject({ message: "The man does not keep his word_2", code: "aManDoesNotKeepsHisWord"});
      }
    } // close setTimeout callback function
    , 0 * 1000); // close setTimeout function
  }) // close new Promise ()


promise2a.then(function(reason) {
console.log(reason);
})
.catch(function(reason) {
console.log(reason);
});
 
console.log(promise2a);



/* 
// A Promise that will be rejected
// (node:16252) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. 
// In the future, promise rejections that are not handled will terminate the Node.js process 
// with a non-zero exit code.

keepsHisWord = false;
promise3 = new Promise(function(resolve, reject) {
  if (keepsHisWord) {
    resolve("The man likes to keep his word_3");
  } else {
    reject("The man doesn't want to keep his word_3");
  }
});
promise3.catch(function(reason) {
  console.log(reason);
});
// console.log(promise3);

// Promise Prototype Methods. There are three of them.
// As we saw earlier when a Promise is created it is in pending state. One or more of the following 
// three methods will be run when a promise is settled based on whether they are fulfilled or rejected:
// a) Promise.prototype.catch(onRejected)
// b) Promise.prototype.then(onFulfilled, onRejected)
// b) Promise.prototype.finally(onFinally)

var momsPromise = new Promise(function(resolve, reject) {
  // If we change the value of momsSavings to 200000 then mom will be able to gift the son
  momsSavings = 200000;
  priceOfPhone = 60000;
  if (momsSavings > priceOfPhone) {
    resolve({
      brand: "iphone",
      model: "6s"
    });
  } else {
    reject("We donot have enough savings. Let us save some more money.");
  }
});

momsPromise.then(function(value) {
  console.log("Hurray I got this phone as a gift ", JSON.stringify(value));
});
momsPromise.catch(function(reason) {
  console.log("Mom coudn't buy me the phone because ", reason);
});
momsPromise.finally(function() {
  console.log(
    "Irrespecitve of whether my mom can buy me a phone or not, I still love her"
  );
});
*/
/*
// Iplementing sleep with a Promise
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two seconds later, showing sleep in a loop...');

  // Sleep in loop
  for (let i = 0; i < 5; i++) {
    if (i === 3)
      await sleep(2000);
    console.log(i);
  }
}

demo();

*/

