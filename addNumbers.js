var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  reader.question("Gimme your number!\n", function (num) {
    sum += parseInt(num);
    if (numsLeft > 1) {
      console.log(sum);
      addNumbers(sum, numsLeft - 1, completionCallback);
    } else {
      completionCallback(sum);
      reader.close();
    }
  });
}

addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
});
