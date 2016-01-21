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



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var rows = board.rows();
  var counter = 0; 
  for (var i = 0; i < rows.length; i++){
    for (var j =0; j < rows.length; j++){
      board.togglePiece(i,j);
      counter++;
      if(board.hasAnyRooksConflicts()){
        board.togglePiece(i, j);
        counter--;
      }
      if(counter>=n)
        return board.rows();
    }
  }
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  console.log("countNRooksSolutions is running");
  var board = new Board({n: n});
  var counter = 0; 
  var solutionList = []; 
  var helper = function(board, startingIndex){
    // console.log(board);
    var rows = board.rows(); //is this any different from a regular nest array?
    for (var i = 0; i < rows.length; i++){
      for (var j =0; j < rows.length; j++){
        if(rows[i][j] === 0){
          board.togglePiece(i,j);
          counter++;
          //if theres a conflict
          if(board.hasAnyRooksConflicts()){
            //return the piece to the original state and decrease the counter
            board.togglePiece(i, j);
            counter--;
          //if there's no conflict, recursively call helper function
          } else{
            if(counter>=n){
                if(solutionList.indexOf(JSON.stringify(board.rows())) === -1){
                solutionList.push(JSON.stringify(board.rows()));
              }
            } else {
              var copy = JSON.parse(JSON.stringify(board));
              copy = Object.create(board);
              helper(copy);
            }
          }
        }
        board.togglePiece(i,j);
      }
    }
  };
  helper(board);
  console.log("length is " + solutionList.length);
  if (solutionList.length >2){
    return solutionList.length-1;
  } else {
    return solutionList.length; 
  }
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  // console.log("running findNQueensSolution");
  // console.log(n);
  if (n === 0){
    //console.log("returning empty array");
    return [];
  }
  var solution;
  var board = new Board({n: n});
  var rows = board.rows();
  var counter = 0;
  for (var i = 0; i < rows.length; i++){
    for (var j =0; j < rows.length; j++){
      board.togglePiece(i,j);
      //console.log("toggling piece ", i, j);
      counter++;
      if(board.hasAnyQueenConflicts()){
        board.togglePiece(i, j);
        counter--;
      }
      if(counter>=n)
        //console.log(board.rows());
        return board.rows();
    }
  }  // return 'No solution';
  //solution = board.rows();
//  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

//  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
