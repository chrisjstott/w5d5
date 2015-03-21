var Board = require("./board");
var HumanPlayer = require("./humanPlayer");


function Game(player1, player2) {

  function init() {
    this.board = new Board();
    this.players = [player1, player2];
    this.turns = 0;
    var readline = require('readline');
    this.reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  function run(completionCallback) {
    this.board.print();
    if (this.board.isOver()) {
      completionCallback();
      return;
    }
    var currentPlayer = this.players[this.turns % 2];
    currentPlayer.getMove(this, this.reader, function(pos) {
      if (this.board.placeMark(pos, currentPlayer.mark)) {
        this.turns += 1;
        run(completionCallback);
      } else {
        console.log("Invalid Move");
        run(completionCallback);
      }
    });
  }

  return function() {
    init();
    run(function(){
      this.reader.close();
      if (this.winner) {
        console.log(this.winner + " won!!");
      } else {
        console.log("it's a tie...");
      }
    });
  };
}


var human1 = new HumanPlayer("Ned", "x");
var human2 = new HumanPlayer("Jeff", "o");


var game = new Game(human1, human2);
game();
