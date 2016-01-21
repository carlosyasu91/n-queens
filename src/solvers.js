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
  //console.log("countNRooksSolutions is running");
  var board = new Board({n: n});
  var counter = 0; 
  var solutionList = []; 
  var helper = function(board, startingIndex){
    console.log(n);
    // //console.log(board);
    //console.log("start of recursion, board is " +JSON.stringify(board));
    var rows = board.rows(); //is this any different from a regular nest array?
    for (var i = 0; i < rows.length; i++){
      for (var j =0; j < rows.length; j++){
        if(rows[i][j] === 0){
          var noToggle= false;
          var  g=i;
          var h=j;
          board.togglePiece(i,j);
          ////console.log("Board is " + JSON.stringify(board));
          counter++;
          ////console.log("conflicts: ", board.hasAnyRooksConflicts());
          //if theres a conflict
          //console.log ( "board after next toggle is " + JSON.stringify(board));
          if(board.hasAnyRooksConflicts()){
            //return the piece to the original state and decrease the counter
            //console.log("wow it untoggled");
            //console.log("i ,j is " , i ,j );
            //console.log("space before untoggle: " + rows[i][j]);
            board.togglePiece(i, j);
                        //console.log("space after untoggle: " + rows[i][j]);
            counter--;
          //if there's no conflict, recursively call helper function
          } else{
            //console.log("new pushed value is ", g, h);
            if(counter>=n){
                if(solutionList.indexOf(JSON.stringify(board.rows())) === -1){
                solutionList.push(JSON.stringify(board.rows()));
                //console.log("solution list and its length are ", JSON.stringify(solutionList), solutionList.length);
              }
            } else {
              var copy = JSON.parse(JSON.stringify(board));
              copy = Object.create(board);
                  //console.log("before recursion board is " +JSON.stringify(copy));
              helper(copy);
            }
            board.togglePiece(i,j);
            counter--;
          }
        }
      }
    }
  };
  helper(board);

  return solutionList.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  // //console.log("running findNQueensSolution");
  // //console.log(n);
  if (n === 0){
    ////console.log("returning empty array");
    return [];
  }
  var solution;
  var board = new Board({n: n});
  var rows = board.rows();
  var counter = 0;
  for (var i = 0; i < rows.length; i++){
    for (var j =0; j < rows.length; j++){
      board.togglePiece(i,j);
      ////console.log("toggling piece ", i, j);
      counter++;
      if(board.hasAnyQueenConflicts()){
        board.togglePiece(i, j);
        counter--;
      }
      if(counter>=n)
        ////console.log(board.rows());
        return board.rows();
    }
  }  // return 'No solution';
  //solution = board.rows();
//  //console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

//  //console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
