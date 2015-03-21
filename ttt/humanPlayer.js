function HumanPlayer(name, mark) {
  this.name = name;
  this.mark = mark;
}

HumanPlayer.prototype.getMove = function(board, reader, callback) {
  reader.question("Choose a position (row/column):\n", function(response) {
    var pos = response.split(" ");
    callback(pos);
  });
};

module.exports = HumanPlayer;
