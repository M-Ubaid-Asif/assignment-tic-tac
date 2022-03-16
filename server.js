import { Server } from "socket.io";
import * as logger from "./logger.js";
import {checkforWinner,validateMove} from './helpers.js'
// getting port no. which is passed in cli
let io;

// declaring namespace for logging
const namespace = "SERVER";
if (process.argv.length !== 3 && isNaN(process.argv[2])) {
  logger.error(
    namespace,
    "Please provide a port number on which server will start"
  );
  process.exit(1);
} else {
  io = new Server(process.argv[2]);
  console.log("Server running on port : " + process.argv[2]);
}

let players = [];

io.on("connection", function (socket) {
  io.emit("welcome", "welcome to tic tac toe game");
  players.push(socket);

  if (players.length == 2) {
    //board
    let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
    let turnId = 0;
    io.to(players[0].id).emit(
      "StartGame",
      `Game started.\nYou are the first player.`
    );
    io.to(players[1].id).emit(
      "StartGame",
      `Game started.\nYou are the second player.`
    );

    // getting move from the client 1
    players[0].on("move", function (data) {
      if (validateMove(data.player, turnId, data.move, board)) {
        if (data.player == 0) {
          board[data.move - 1] = "x";
          turnId = 1;
        } else {
          board[data.move - 1] = "o";
          turnId = 0;
        }

        // sending the game board to client
        io.sockets.emit("accepted", board);
        var status = checkforWinner(board, data.player);
        if (!status) {
          io.sockets.emit("GameEnd", "tied");
        }
        if (status == 1) {
          io.sockets.emit("GameEnd", data.player);
        }
      }
    });

    // getting move from the client 2
    players[1].on("move", function (data) {
      if (validateMove(data.player, turnId, data.move, board)) {
        if (data.player == 0) {
          board[data.move - 1] = "x";
          turnId = 1;
        } else {
          board[data.move - 1] = "o";
          turnId = 0;
        }

        // sending the game board to client
        io.sockets.emit("accepted", board);
        var status = checkforWinner(board, data.player);
        if (!status) {
          io.sockets.emit("GameEnd", "tied");
        }
        if (status == 1) {
          io.sockets.emit("GameEnd", data.player);
        }
      }
    });
  }else{
    io.emit("waitForOpponent", "waiting for opponent...");
  }

  socket.on("disconnect",()=>{
    // const user = userLeave(socket.id);
    // console.log(players[0].id,players[2].id)
    io.emit("win",`your oppenent leaves the match! You win!`)
    })
});



