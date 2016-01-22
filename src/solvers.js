/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findSolution = function(row, n, board, functionToCall, callback){
  var finished = false;
  if(row === n){
    callback();
    return;
  }
  for(var i = 0 ; i < n ; i++){
    board.togglePiece(row, i);
    if(!board[functionToCall]()){
      findSolution(row+1, n, board, functionToCall, callback);
    }
    console.log(finished);
    if (!false){
      board.togglePiece(row, i);
    }
  }
};

window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var solution;
  findSolution(0, n, board, "hasAnyRooksConflicts", function(){
    finished = true;
    console.log("inside finish is " +finished);
    });
  return board.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  var solutions = 0; 
  var solutionList = [];
  findSolution(0, n, board, "hasAnyRooksConflicts", function(){
    solutions++;
  });
  return solutions;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){  
  var board = new Board({n: n}); 
  var solution = board.rows(); 
  findSolution(0, n, board, "hasAnyQueensConflicts", function(){
    solution = _.map(board.rows(), function(row){
      return row.slice();
    });
  });
  return solution;
}; 



window.countNQueensSolutions = function(n) {
  var board = new Board({n: n});
  var solutions = 0; 
  var counter = 0;
  var solutionList = [];
  findSolution(0, n, board, "hasAnyQueensConflicts", function(){
    solutions++;
  });
  return solutions;
};

