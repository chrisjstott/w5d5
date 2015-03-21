var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function HanoiGame(discs) {
  var myObjects = {};

  function init() {
    myObjects.stacks = [[],[],[]];
    for (var i = discs; i >= 1; i--){
      myObjects.stacks[0].push(i);
    }
  }

  function isWon() {
    return [1,2].reduce(function(acc, stack) {
      return acc || myObjects.stacks[stack].length === discs;
    }, false);
  }

  function isValidMove(start, end) {
    var smaller = myObjects.stacks[start].slice(-1) < myObjects.stacks[end].slice(-1);
    var empty = myObjects.stacks[end].length === 0;
    return smaller || empty;
  }

  function move(start, end) {
    if (isValidMove(start,end)) {
      myObjects.stacks[end].push(myObjects.stacks[start].pop());
      return true;
    }
    return false;
  }

  function print() {
    console.log("--------------");
    for (var i = discs - 1; i >= 0; i--) {
      var stackString = myObjects.stacks.reduce(function(str, stack) {
        return str += fixu(stack[i]) + "   ";
      }, "");
      console.log(stackString);
    }
    console.log("--------------");
  }


  function fixu(num) {
    if (num === undefined) {
      return " ";
    } else {
      return num;
    }
  }

  function run(completionCallback) {
    print();
    if (isWon()) {
      completionCallback();
    } else {
      promptMove(function (start, end) {
        move(start, end);
        run(completionCallback);
      });
    }
  }

  function promptMove(callback) {
    reader.question("Where would you like to move from and to?\n", function(answer) {
      var ans = answer.split(" ");
      callback(ans[0], ans[1]);
    });
  }

  return function () {
    init();
    run(function () {
      console.log ('YOU WIN!!');
      reader.close();
    });
  };
}

var h = new HanoiGame(3);
h();
