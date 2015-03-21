var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function abs(arr, sortCompletionCallback) {
  innerLoop(arr, 0, true, sortCompletionCallback);
}

function innerLoop(arr, idx, sorted, sortCompletionCallback) {
  var temp;
  if (idx < arr.length - 1) {
    var prompt = "Is " + arr[idx] + " less than or equal to " + arr[idx + 1] + "?\n";
    reader.question(prompt, function(ans) {
      if (ans === "n") {
        temp = arr[idx];
        arr[idx] = arr[idx + 1];
        arr[idx + 1] = temp;
        sorted = false;
      }
      innerLoop(arr, idx + 1, sorted, sortCompletionCallback); // this isn't going to work quite yet
    });
  } else {
    if(sorted) {
      sortCompletionCallback(arr);
    } else {
      innerLoop(arr, 0, true, sortCompletionCallback); 
    }
  }
}

abs([4,2,6,2,62], function(arr) {
  console.log("Your array is sorted: " + arr);
});
