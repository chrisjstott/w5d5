function Board() {
  this.board = [[undefined, undefined, undefined], [undefined, undefined, undefined], [undefined, undefined, undefined]];
  this.winner = undefined;
}

// board values are "x" and ""

Board.prototype.WINS = function() {
  var row, col, wins = [];
  [0, 1, 2].forEach(function(num) {
    row = [];
    col = [];
    [0, 1, 2].forEach(function(num2) {
      row.push([num, num2]);
      col.push([num2, num]);
    });
    wins.push(row, col);
  });
  wins.push([[0,0],[1,1],[2,2]], [[0,2],[1,1],[2,0]]);
  return wins;
}();

Board.prototype.print = function() {
  console.log(
    this.board.map(function(line) {
      return (" " + line.map(function(mark) {
        return fixu(mark);
      }).join(" | "));
    }).join("\n--------\n")
  );
};

function fixu(num) {
  if (num === undefined) {
    return " ";
  } else {
    return num;
  }
}

Board.prototype.checkSquare = function (pos) {
  return this.board[pos[0]][pos[1]];
};

Board.prototype.isWon = function() {
  var that = this;
  this.WINS.forEach(function (win) {
    var possWin = win.map(function(square) {
      return that.checkSquare(square);
    });
    if (possWin === ["x", "x", "x"]) {
      that.winner = "x";
      return true;
    } else if (possWin === ["o", "o", "o"]) {
      that.winner = "o";
      return true;
    }
  });
  return false;
};

Board.prototype.isOver = function () {
  return this.isWon() || this.isFull();
};

Board.prototype.isFull = function () {
  return [].concat.apply([], this.board).indexOf(undefined) === -1;
};

Board.prototype.placeMark = function(pos, mark) {
  if (this.checkSquare(pos)) {
    return false;
  } else {
    this.board[pos[0]][pos[1]] = mark;
    return true;
  }
};


module.exports = Board;
