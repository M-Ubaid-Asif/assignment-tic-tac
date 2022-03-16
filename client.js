import * as io from "socket.io-client";
import * as logger from "./logger.js";
import readcommand from "readcommand";


// getting a port number from commandline
const namespace = "client";
if (process.env.length !== 4 && isNaN(process.argv[3])) {
  logger.error(
    namespace,
    `please provide the port number on which server is running`
  );
  process.exit(1);
}

// socket connection to server
const socket = io.connect(`http://${process.argv[2]}:${process.argv[3]}`, {
  reconnection: true,
});




//connecting
socket.on('connect', function() {
 console.log('connected to ' + process.argv[2] + ' ' + process.argv[3]);
 socket.on("welcome",function(data){
   console.log(data)
 })
 socket.on("waitForOpponent", (msg) => {
  console.log(msg);
});
// starting a game
 socket.on('StartGame', function(data) {
  console.log(data);
  if (data.includes("first player")) {
   var player = 0;
  } else {
   var player = 1;
  }
  var sigints = 0;

  readcommand.loop(function(err, args, str, next) {
   if (err && err.code !== 'SIGINT') {
    throw err;
   } else if (err) {
    if (sigints === 1) {
     process.exit(0);
    } else {
     sigints++;
     console.log('Press ^C again to exit.');
     return next();
    }
   }
   else if (args[0] === 'r') {
    console.log("you lose the game")
    process.exit(1);
   }
   //sending move
   socket.emit('move', {
    player: player,
    move: args[0]
   });
   return next();
  });
 });
});

// when opponent leaves the match
socket.on("win",function(data){
    console.log(data)
    process.exit(1);
})

socket.on('accepted', function(board) {
 gameBoard(board);
});
socket.on('GameEnd', function(data) {
  console.log(data)
 if (data == 'tied') {
  console.log('Game is tied');
 } else {
  if (!data) {
   console.log('Game won by first player');
  } else {
   console.log('Game won by second player');
  }
 }
 socket.disconnect();
 process.exit(1);
});

function gameBoard(board) {
 console.log('\n');
 console.log(board[0], board[1], board[2]);
 console.log('\n');
 console.log(board[3], board[4], board[5]);
 console.log('\n');
 console.log(board[6], board[7], board[8]);
}