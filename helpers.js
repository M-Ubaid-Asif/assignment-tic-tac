function validateMove(playerId, turnId, move, board) {
    if (playerId == turnId && move < 10 && board[move - 1] == "-") {
      return 1;
    }
    return 0;
  }
  
  // checking winner
  function checkforWinner(board, player) {
    if (board.toString().includes("-")) {
      var winner = 0;
      var item = "ooo";
      if (player == 0) item = "xxx";
      var row1 = board[0] + board[1] + board[2];
      if (row1 == item) {
        return 1;
      }
      var row2 = board[3] + board[4] + board[5];
      if (row2 == item) {
        return 1;
      }
      var row3 = board[6] + board[7] + board[8];
      if (row3 == item) {
        return 1;
      }
      var col1 = board[0] + board[3] + board[6];
      if (col1 == item) {
        return 1;
      }
      var col2 = board[1] + board[4] + board[7];
      if (col2 == item) {
        return 1;
      }
      var col3 = board[2] + board[5] + board[8];
      if (col3 == item) {
        return 1;
      }
      var diag1 = board[0] + board[4] + board[8];
      if (diag1 == item) {
        return 1;
      }
      var diag2 = board[2] + board[4] + board[6];
      if (diag2 == item) {
        return 1;
      }
      return 2;
    } else {
      return 0;
    }
  }

  export {checkforWinner,validateMove}