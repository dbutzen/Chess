
// Enum(ish)

var pieceEnum = Object.freeze({
    king: 0,
    queen: 1,
    bishop: 2,
    knight: 3,
    rook: 4,
    pawn: 5
});

var colEnum = Object.freeze({
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7
});

var playerEnum = Object.freeze({
    white: 1,
    black: 2
});

// Global Variables

// Images

imgBlackBishop = "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png";
imgWhiteBishop = "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png";
imgBlackKing = "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png";
imgWhiteKing = "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png";
imgBlackKnight = "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png";
imgWhiteKnight = "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png";
imgBlackPawn = "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png";
imgWhitePawn = "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png";
imgBlackQueen = "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png";
imgWhiteQueen = "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png";
imgBlackRook = "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png";
imgWhiteRook = "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png";

// Pieces Not necessary but leaving in case useful at later time
var blackKing;
var blackQueen;
var blackQBishop;
var blackKBishop;
var blackQKnight;
var blackKKnight;
var blackQRook;
var blackKRook;
var blackPawnA;
var blackPawnB;
var blackPawnC;
var blackPawnD;
var blackPawnE;
var blackPawnF;
var blackPawnG;
var blackPawnH;
var whiteKing;
var whiteQueen;
var whiteQBishop;
var whiteKBishop;
var whiteQKnight;
var whiteKKnight;
var whiteQRook;
var whiteKRook;
var whitePawnA;
var whitePawnB;
var whitePawnC;
var whitePawnD;
var whitePawnE;
var whitePawnF;
var whitePawnG;
var whitePawnH;

var turn;
var board;
var piece;
var clickedPosition = '0';
var lastMove;
var whiteInCheck;
var blackInCheck;
var lastMove = { col: null, row: null };
var enPassantPossible;
var enPassantMaybe;
var enPassantNextTurn;



// Functions

function colFromLetter(letter) {
    switch (letter) {
        case 'a':
            return 1;
        case 'b':
            return 2;
        case 'c':
            return 3;
        case 'd':
            return 4;
        case 'e':
            return 5;
        case 'f':
            return 6;
        case 'g':
            return 7;
        case 'h':
            return 8;

    }
}

function letterFromCol(col) {
    switch (col) {
        case 0:
            return 'a';
        case 1:
            return 'b';
        case 2:
            return 'c';
        case 3:
            return 'd';
        case 4:
            return 'e';
        case 5:
            return 'f';
        case 6:
            return 'g';
        case 7:
            return 'h';

    }
}

function invertToArrayRow(row) {
    switch (row) {
        case 0:
            return 7;
        case 1:
            return 6;
        case 2:
            return 5;
        case 3:
            return 4;
        case 4:
            return 3;
        case 5:
            return 2;
        case 6:
            return 1;
        case 7:
            return 0;
    }
}

function getId(row, col) {
    idRow = invertToArrayRow(row) + 1;
    idCol = letterFromCol(col);
    return (idCol + idRow);
}

function getArrayCol(id) {

    var thisPiece = colFromLetter(id.substring(0, 1)) - 1; //array col
    return thisPiece;
}

function getArrayRow(id) {

    var thisPiece = invertToArrayRow(id.substring(1, 2) - 1); //array row
    return thisPiece;

}

function nextTurn() {
    if (turn == playerEnum.white) {
        turn++;
        document.getElementById('turnDisplay').innerHTML = "Black's Turn";
    }
    else {
        turn = playerEnum.white;
        document.getElementById('turnDisplay').innerHTML = "White's Turn";
    }
}


// Play Game

function startGame() {

    turn = playerEnum.white;


    // pieces
    blackKing = { Name: 'blackKing', Type: pieceEnum.king, Player: playerEnum.black, Position: { row: 8, column: 'e' }, HasMoved: false, HasBeenChecked: false };
    blackQueen = { Type: pieceEnum.queen, Player: playerEnum.black, Position: { row: 8, column: colEnum.d } };
    blackQBishop = { Type: pieceEnum.bishop, Player: playerEnum.black, Position: { row: 8, column: colEnum.c } };
    blackKBishop = { Type: pieceEnum.bishop, Player: playerEnum.black, Position: { row: 8, column: colEnum.f } };
    blackQKnight = { Type: pieceEnum.knight, Player: playerEnum.black, Position: { row: 8, column: colEnum.b } };
    blackKKnight = { Type: pieceEnum.knight, Player: playerEnum.black, Position: { row: 8, column: colEnum.g } };
    blackQRook = { Type: pieceEnum.rook, Player: playerEnum.black, Position: { row: 8, column: colEnum.a }, HasMoved: false };
    blackKRook = { Type: pieceEnum.rook, Player: playerEnum.black, Position: { row: 8, column: colEnum.h }, HasMoved: false };
    blackPawnA = { Type: pieceEnum.pawn, Player: playerEnum.black, Position: { row: 7, column: colEnum.a }, HasMoved: false };
    blackPawnB = { Type: pieceEnum.pawn, Player: playerEnum.black, Position: { row: 7, column: colEnum.b }, HasMoved: false };
    blackPawnC = { Type: pieceEnum.pawn, Player: playerEnum.black, Position: { row: 7, column: colEnum.c }, HasMoved: false };
    blackPawnD = { Type: pieceEnum.pawn, Player: playerEnum.black, Position: { row: 7, column: colEnum.d }, HasMoved: false };
    blackPawnE = { Type: pieceEnum.pawn, Player: playerEnum.black, Position: { row: 7, column: colEnum.e }, HasMoved: false };
    blackPawnF = { Type: pieceEnum.pawn, Player: playerEnum.black, Position: { row: 7, column: colEnum.f }, HasMoved: false };
    blackPawnG = { Type: pieceEnum.pawn, Player: playerEnum.black, Position: { row: 7, column: colEnum.g }, HasMoved: false };
    blackPawnH = { Type: pieceEnum.pawn, Player: playerEnum.black, Position: { row: 7, column: colEnum.h }, HasMoved: false };
    whiteKing = { Name: 'whiteKing', Type: pieceEnum.king, Player: playerEnum.white, Position: { row: 1, column: 'e' }, HasMoved: false, HasBeenChecked: false };
    whiteQueen = { Type: pieceEnum.queen, Player: playerEnum.white, Position: { row: 1, column: colEnum.d } };
    whiteQBishop = { Type: pieceEnum.bishop, Player: playerEnum.white, Position: { row: 1, column: colEnum.c } };
    whiteKBishop = { Type: pieceEnum.bishop, Player: playerEnum.white, Position: { row: 1, column: colEnum.f } };
    whiteQKnight = { Type: pieceEnum.knight, Player: playerEnum.white, Position: { row: 1, column: colEnum.b } };
    whiteKKnight = { Type: pieceEnum.knight, Player: playerEnum.white, Position: { row: 1, column: colEnum.g } };
    whiteQRook = { Type: pieceEnum.rook, Player: playerEnum.white, Position: { row: 1, column: colEnum.a }, HasMoved: false };
    whiteKRook = { Type: pieceEnum.rook, Player: playerEnum.white, Position: { row: 1, column: colEnum.h }, HasMoved: false };
    whitePawnA = { Type: pieceEnum.pawn, Player: playerEnum.white, Position: { row: 2, column: colEnum.a }, HasMoved: false };
    whitePawnB = { Type: pieceEnum.pawn, Player: playerEnum.white, Position: { row: 2, column: colEnum.b }, HasMoved: false };
    whitePawnC = { Type: pieceEnum.pawn, Player: playerEnum.white, Position: { row: 2, column: colEnum.c }, HasMoved: false };
    whitePawnD = { Type: pieceEnum.pawn, Player: playerEnum.white, Position: { row: 2, column: colEnum.d }, HasMoved: false };
    whitePawnE = { Type: pieceEnum.pawn, Player: playerEnum.white, Position: { row: 2, column: colEnum.e }, HasMoved: false };
    whitePawnF = { Type: pieceEnum.pawn, Player: playerEnum.white, Position: { row: 2, column: colEnum.f }, HasMoved: false };
    whitePawnG = { Type: pieceEnum.pawn, Player: playerEnum.white, Position: { row: 2, column: colEnum.g }, HasMoved: false };
    whitePawnH = { Type: pieceEnum.pawn, Player: playerEnum.white, Position: { row: 2, column: colEnum.h }, HasMoved: false };

    // Board positions are from a-h(column left to right), then 1-8(row bottom to top)
    board = [
        [
            { piece: blackQRook },
            { piece: blackQKnight },
            { piece: blackQBishop },
            { piece: blackQueen },
            { piece: blackKing },
            { piece: blackKBishop },
            { piece: blackKKnight },
            { piece: blackKRook }
        ],
        [
            { piece: blackPawnA },
            { piece: blackPawnB },
            { piece: blackPawnC },
            { piece: blackPawnD },
            { piece: blackPawnE },
            { piece: blackPawnF },
            { piece: blackPawnG },
            { piece: blackPawnH }
        ]
        ,
        [
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null }
        ],
        [
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null }
        ],
        [
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null }
        ],
        [
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null }
        ],
        [
            { piece: whitePawnA },
            { piece: whitePawnB },
            { piece: whitePawnC },
            { piece: whitePawnD },
            { piece: whitePawnE },
            { piece: whitePawnF },
            { piece: whitePawnG },
            { piece: whitePawnH }
        ],
        [
            { piece: whiteQRook },
            { piece: whiteQKnight },
            { piece: whiteQBishop },
            { piece: whiteQueen },
            { piece: whiteKing },
            { piece: whiteKBishop },
            { piece: whiteKKnight },
            { piece: whiteKRook }
        ]
        
        
    ];

    // Piece Image Placements
    document.getElementById('a8').innerHTML = "<img src=" + imgBlackRook + " />";
    document.getElementById('b8').innerHTML = "<img src=" + imgBlackKnight + " />";
    document.getElementById('c8').innerHTML = "<img src=" + imgBlackBishop + " />";
    document.getElementById('d8').innerHTML = "<img src=" + imgBlackQueen + " />";
    document.getElementById('e8').innerHTML = "<img src=" + imgBlackKing + " />";
    document.getElementById('f8').innerHTML = "<img src=" + imgBlackBishop + " />";
    document.getElementById('g8').innerHTML = "<img src=" + imgBlackKnight + " />";
    document.getElementById('h8').innerHTML = "<img src=" + imgBlackRook + " />";
    document.getElementById('a7').innerHTML = "<img src=" + imgBlackPawn + " />";
    document.getElementById('b7').innerHTML = "<img src=" + imgBlackPawn + " />";
    document.getElementById('c7').innerHTML = "<img src=" + imgBlackPawn + " />";
    document.getElementById('d7').innerHTML = "<img src=" + imgBlackPawn + " />";
    document.getElementById('e7').innerHTML = "<img src=" + imgBlackPawn + " />";
    document.getElementById('f7').innerHTML = "<img src=" + imgBlackPawn + " />";
    document.getElementById('g7').innerHTML = "<img src=" + imgBlackPawn + " />";
    document.getElementById('h7').innerHTML = "<img src=" + imgBlackPawn + " />";

    document.getElementById('a1').innerHTML = "<img src=" + imgWhiteRook + " />";
    document.getElementById('b1').innerHTML = "<img src=" + imgWhiteKnight + " />";
    document.getElementById('c1').innerHTML = "<img src=" + imgWhiteBishop + " />";
    document.getElementById('d1').innerHTML = "<img src=" + imgWhiteQueen + " />";
    document.getElementById('e1').innerHTML = "<img src=" + imgWhiteKing + " />";
    document.getElementById('f1').innerHTML = "<img src=" + imgWhiteBishop + " />";
    document.getElementById('g1').innerHTML = "<img src=" + imgWhiteKnight + " />";
    document.getElementById('h1').innerHTML = "<img src=" + imgWhiteRook + " />";
    document.getElementById('a2').innerHTML = "<img src=" + imgWhitePawn + " />";
    document.getElementById('b2').innerHTML = "<img src=" + imgWhitePawn + " />";
    document.getElementById('c2').innerHTML = "<img src=" + imgWhitePawn + " />";
    document.getElementById('d2').innerHTML = "<img src=" + imgWhitePawn + " />";
    document.getElementById('e2').innerHTML = "<img src=" + imgWhitePawn + " />";
    document.getElementById('f2').innerHTML = "<img src=" + imgWhitePawn + " />";
    document.getElementById('g2').innerHTML = "<img src=" + imgWhitePawn + " />";
    document.getElementById('h2').innerHTML = "<img src=" + imgWhitePawn + " />";

    document.getElementById('a3').innerHTML = "";
    document.getElementById('b3').innerHTML = "";
    document.getElementById('c3').innerHTML = "";
    document.getElementById('d3').innerHTML = "";
    document.getElementById('e3').innerHTML = "";
    document.getElementById('f3').innerHTML = "";
    document.getElementById('g3').innerHTML = "";
    document.getElementById('h3').innerHTML = "";
    document.getElementById('a4').innerHTML = "";
    document.getElementById('b4').innerHTML = "";
    document.getElementById('c4').innerHTML = "";
    document.getElementById('d4').innerHTML = "";
    document.getElementById('e4').innerHTML = "";
    document.getElementById('f4').innerHTML = "";
    document.getElementById('g4').innerHTML = "";
    document.getElementById('h4').innerHTML = "";
    document.getElementById('a5').innerHTML = "";
    document.getElementById('b5').innerHTML = "";
    document.getElementById('c5').innerHTML = "";
    document.getElementById('d5').innerHTML = "";
    document.getElementById('e5').innerHTML = "";
    document.getElementById('f5').innerHTML = "";
    document.getElementById('g5').innerHTML = "";
    document.getElementById('h5').innerHTML = "";
    document.getElementById('a6').innerHTML = "";
    document.getElementById('b6').innerHTML = "";
    document.getElementById('c6').innerHTML = "";
    document.getElementById('d6').innerHTML = "";
    document.getElementById('e6').innerHTML = "";
    document.getElementById('f6').innerHTML = "";
    document.getElementById('g6').innerHTML = "";
    document.getElementById('h6').innerHTML = "";
}

function boardClicked(id) {
    var thisRow = getArrayRow(id);
    var thisCol = getArrayCol(id);
    var row = getArrayRow(clickedPosition);
    var col = getArrayCol(clickedPosition);
    if (clickedPosition == '0') {
        if (board[thisRow][thisCol].piece != null) {
            if (board[thisRow][thisCol].piece.Player == turn) {
                // Select Piece
                piece = board[thisRow][thisCol].piece;
                if (piece != null) {
                    clickedPosition = id;
                    piece = board[thisRow][thisCol].piece;
                    document.getElementById(id).style.backgroundColor = 'blue';
                }
            }
        }
    }
    else {
        // Piece already selected
        if (id == clickedPosition) {
            // Deselect Piece
            clickedPosition = '0';

            // Get whether a box is gray or white using modulus
            resetBackground(id);
        }
        else {
            
            var success = false;
            // Attempt to move piece
            // Get piece type and check if move is legal based on piece type
            switch (board[row][col].piece.Type) {
                case pieceEnum.rook:
                    success = rookMovementCheck(clickedPosition, id);
                    break;
                case pieceEnum.pawn:
                    success = pawnMovementCheck(clickedPosition, id);
                    piece.HasMoved = true;
                    break;
                case pieceEnum.knight:
                    success = knightMovementCheck(clickedPosition, id);
                    break;
                case pieceEnum.bishop:
                    success = bishopMovementCheck(clickedPosition, id);
                    break;
                case pieceEnum.king:
                    success = kingMovementCheck(clickedPosition, id);
                    piece.HasMoved = true;
                    break;
                case pieceEnum.queen:
                    success = queenMovementCheck(clickedPosition, id);
                    break;
                default:
                    alert("Piece not selected correctly in boardClicked function");
            }
            // Successful Move
            // Set new position (id)
            if (success) {
                var thisRow = getArrayRow(id);
                var thisCol = getArrayCol(id);
                var tempPiece = JSON.parse(JSON.stringify(piece));
                board[thisRow][thisCol].piece = tempPiece;
                document.getElementById(id).innerHTML = '<img src="' + getPieceImage(piece) + '" />';

                if (enPassantMaybe == true && enPassantPossible == true) {
                    // Remove piece taken by en Passant
                    if (turn == playerEnum.white) {
                        board[thisRow + 1][thisCol].piece = null;
                        document.getElementById(getId(thisRow + 1, thisCol)).innerHTML = '';
                        enPassantMaybe = false;
                        enPassantPossible = false;
                    }
                    else {
                        board[thisRow - 1][thisCol].piece = null;
                        document.getElementById(getId(thisRow - 1, thisCol)).innerHTML = '';
                        enPassantMaybe = false;
                        enPassantPossible = false;
                    }
                }


                // Update properties of king or pawn

                

                if (board[thisRow][thisCol].piece.Type == pieceEnum.pawn) {
                    board[thisRow][thisCol].piece.HasMoved = true;
                }
                else if (board[thisRow][thisCol].piece.Type == pieceEnum.king) {
                    board[thisRow][thisCol].piece.HasMoved = true;
                }
                if (enPassantNextTurn == true) {
                    enPassantPossible = true;
                    enPassantNextTurn = false;
                }
                else {
                    enPassantPossible = false;
                    enPassantNextTurn = false;
                }

                // Set lastMove
                lastMove.row = thisRow;
                lastMove.col = thisCol;

                // Reset old position (clickedPosition)
                thisRow = getArrayRow(clickedPosition);
                thisCol = getArrayCol(clickedPosition);
                board[thisRow][thisCol].piece = null;
                document.getElementById(clickedPosition).innerHTML = "";
                resetBackground(clickedPosition);

                // Display checks
                if (blackInCheck) {
                    document.getElementById('txtBlackCheck').innerHTML = "Black King in Check.";
                } else {
                    document.getElementById('txtBlackCheck').innerHTML = "";
                }
                if (whiteInCheck) {
                    document.getElementById('txtWhiteCheck').innerHTML = "White King in Check.";
                } else {
                    document.getElementById('txtWhiteCheck').innerHTML = "";
                }

                // Reset to default state
                clickedPosition = '0';
                nextTurn();
            }
            else {
            }
        }
    }
}

// Function returns string for image src
function getPieceImage(piece){
    switch (piece.Type) {
        case pieceEnum.pawn:
            if (piece.Player == playerEnum.black) return imgBlackPawn;
            else { return imgWhitePawn };
        case pieceEnum.bishop:
            if (piece.Player == playerEnum.black) return imgBlackBishop;
            else { return imgWhiteBishop };
        case pieceEnum.king:
            if (piece.Player == playerEnum.black) return imgBlackKing;
            else { return imgWhiteKing };
        case pieceEnum.queen:
            if (piece.Player == playerEnum.black) return imgBlackQueen;
            else { return imgWhiteQueen };
        case pieceEnum.knight:
            if (piece.Player == playerEnum.black) return imgBlackKnight;
            else { return imgWhiteKnight };
        case pieceEnum.rook:
            if (piece.Player == playerEnum.black) return imgBlackRook;
            else { return imgWhiteRook };
    }
}

function resetBackground(id) {
    var thisCol = getArrayCol(id);
    var thisRow = getArrayRow(id);
    var thisSquare = document.getElementById(id);
    if ((thisCol + thisRow) % 2 == 1) {
        thisSquare.style.backgroundColor = 'lightgray';
    }
    else {
        thisSquare.style.backgroundColor = 'white';
    }
}

// Movement Functions
function rookMovementCheck(pos1, pos2) {
    // Selected
    // Get row/col
    var pos1row = getArrayRow(pos1);
    var pos1col = getArrayCol(pos1);
    var pos2row = getArrayRow(pos2);
    var pos2col = getArrayCol(pos2);
    // Check selected movement due to movement rules
    if (pos1row != pos2row && pos1col != pos2col) {
        return false;
    }
    // Check for units in the way 
    if (pos1row == pos2row) {
        // Horizontal movement
        if (pos1col < pos2col) {
            // Rook moves right
            for (i = (pos1col + 1); i < pos2col; i++) {
                if (board[pos1row][i].piece != null) {
                    return false;
                }
            }
        }
        else {
            // Rook moves left
            for (i = pos1col - 1; i > pos2col; i--) {
                if (board[pos1row][i].piece != null) {
                    return false;
                }
            }
        }
    }
    else {
        // Vertical movement
        if (pos1row < pos2row) {
            // Rook moves up
            for (i = pos1row - 1; i > pos2row; i--) {
                if (board[i][pos1col].piece != null) {
                    return false;
                }
            }
        }
        else {
            // Rook moves down
            for (i = pos1row + 1; i < pos2row; i++) {
                if (board[i][pos1col].piece != null) {
                    return false;
                }
            }
        }
    }
    
    // Check for ally unit at new position 
    if (board[pos2row][pos2col].piece != null) {
        if (board[pos2row][pos2col].piece.Player == turn) return false;
    }
    // Check if puts own king in check
    if (checkForNotInCheckAfterMovement(board, pos1row, pos2row, pos1col, pos2col, turn, false) == false) return false;
    // If no longer in check, reset king in check
    resetCheck(turn);
    // Find if opponent is now in check
    checkAndSetOpponentCheck(turn, pos1row, pos2row, pos1col, pos2col, board);
    // Piece hasn't moved yet, set hasMoved property in advance
    board[pos1row][pos1col].piece.HasMoved = true;
    // Return true 
    return true;
}

function knightMovementCheck(pos1, pos2) {
    // Selected
    // Get row/col
    var pos1row = getArrayRow(pos1);
    var pos1col = getArrayCol(pos1);
    var pos2row = getArrayRow(pos2);
    var pos2col = getArrayCol(pos2);
    // Check selected movement due to movement rules
    if (((pos2row == (pos1row + 2)) && (pos2col == (pos1col + 1)) || (pos2col == (pos1col - 1))) ||
        ((pos2row == (pos1row - 2)) && (pos2col == (pos1col + 1)) || (pos2col == (pos1col - 1))) ||
        ((pos2row == (pos1row + 1)) && (pos2col == (pos1col + 2)) || (pos2col == (pos1col - 2))) ||
        ((pos2row == (pos1row - 1)) && (pos2col == (pos1col + 2)) || (pos2col == (pos1col - 2)))) {
        // Check for ally unit at new position 
        if (board[pos2row][pos2col].piece != null) {
            if (board[pos2row][pos2col].piece.Player == turn) return false;
        }
        // Check if puts own king in check
        if (checkForNotInCheckAfterMovement(board, pos1row, pos2row, pos1col, pos2col, turn, false) == false) return false;
        // If no longer in check, reset king in check
        resetCheck(turn);
        // Find if opponent is now in check
        checkAndSetOpponentCheck(turn, pos1row, pos2row, pos1col, pos2col, board);

        // Return true 
        return true;
    }
    else {
        return false;
    }
}

function pawnMovementCheck(pos1, pos2) { // Tried a different program method which works but takes a lot more space and repetition
    // Selected
    // Get row/col
    var pos1row = getArrayRow(pos1);
    var pos1col = getArrayCol(pos1);
    var pos2row = getArrayRow(pos2);
    var pos2col = getArrayCol(pos2);
    // Check selected movement due to movement rules
    // Taking piece as white
    if (turn == playerEnum.white) {
        if (((pos2col == (pos1col + 1)) || (pos2col == (pos1col - 1))) && (pos2row == pos1row - 1)) {
            if (board[pos2row][pos2col].piece != null) {
                if (board[pos2row][pos2col].piece.Player == playerEnum.black) {
                    // Check if puts own king in check
                    if (checkForNotInCheckAfterMovement(board, pos1row, pos2row, pos1col, pos2col, turn, false) == false) return false;
                    // If no longer in check, reset king in check
                    resetCheck(turn);
                    // If in final row, turn into queen
                    if (pos2row == 0) board[pos1row][pos1col].piece.Type = pieceEnum.queen;
                    // Find if opponent is now in check
                    checkAndSetOpponentCheck(turn, pos1row, pos2row, pos1col, pos2col, board);
                    board[pos1row][pos1col].piece.HasMoved = true;
                    return true;
                }
                return false;
            }
            // En passant
            else if (enPassantPossible == true && (lastMove.col == pos2col) && (lastMove.row == (pos2row + 1))) {
                enPassantMaybe = true;
                // Check if puts own king in check
                if (checkForNotInCheckAfterMovement(board, pos1row, pos2row, pos1col, pos2col, turn, false) == false) return false;
                // If no longer in check, reset king in check
                resetCheck(turn);
                // If in final row, turn into queen
                if (pos2row == 0) board[pos1row][pos1col].piece.Type = pieceEnum.queen;
                // Find if opponent is now in check
                checkAndSetOpponentCheck(turn, pos1row, pos2row, pos1col, pos2col, board);
                board[pos1row][pos1col].piece.HasMoved = true;
                return true;
            }
            else {
                return false;
            }

        }
        // Standard moves
        else if ((pos1col == pos2col) && (pos1row == pos2row + 1)) {
            if (board[pos2row][pos2col].piece == null) {
                // Check if puts own king in check
                if (checkForNotInCheckAfterMovement(board, pos1row, pos2row, pos1col, pos2col, turn) == false) return false;
                // If no longer in check, reset king in check
                resetCheck(turn);
                // If in final row, turn into queen
                if (pos2row == 0) board[pos1row][pos1col].piece.Type = pieceEnum.queen;
                // Find if opponent is now in check
                checkAndSetOpponentCheck(turn, pos1row, pos2row, pos1col, pos2col, board);
                board[pos1row][pos1col].piece.HasMoved = true;
                return true;
            }
            else {
                return false;
            }
        }
        else if ((pos1col == pos2col) && (pos1row == pos2row + 2) && board[pos1row][pos1col].piece.HasMoved == false) {
            if (board[pos2row][pos2col].piece == null && board[pos2row + 1][pos2col].piece == null) {
                // Check if puts own king in check
                if (checkForNotInCheckAfterMovement(board, pos1row, pos2row, pos1col, pos2col, turn) == false) return false;
                // If no longer in check, reset king in check
                resetCheck(turn);
                // If in final row, turn into queen
                if (pos2row == 0) board[pos1row][pos1col].piece.Type = pieceEnum.queen;
                // Find if opponent is now in check
                checkAndSetOpponentCheck(turn, pos1row, pos2row, pos1col, pos2col, board);
                enPassantNextTurn = true;
                board[pos1row][pos1col].piece.HasMoved = true;
                return true;
            }
            return false;
        }
        else {
            return false;
        }
    }
    // Taking piece as black
    else {
        if (((pos2col == (pos1col - 1)) || (pos2col == (pos1col + 1))) && (pos2row == pos1row + 1)) {
            // Standard take
            if (board[pos2row][pos2col].piece != null) {
                if (board[pos2row][pos2col].piece.Player == playerEnum.white) {
                    // Check if puts own king in check
                    if (checkForNotInCheckAfterMovement(board, pos1row, pos2row, pos1col, pos2col, turn) == false) return false;
                    // If no longer in check, reset king in check
                    resetCheck(turn);
                    // If in final row, turn into queen
                    if (pos2row == 7) board[pos1row][pos1col].piece.Type = pieceEnum.queen;
                    // Find if opponent is now in check
                    checkAndSetOpponentCheck(turn, pos1row, pos2row, pos1col, pos2col, board);
                }
                board[pos1row][pos1col].piece.HasMoved = true;
                return true;
            }
            // En passant
            else if (enPassantPossible == true && (lastMove.col == pos2col) && (lastMove.row == pos2row - 1)) {
                enPassantMaybe = true;
                // Check if puts own king in check
                if (checkForNotInCheckAfterMovement(board, pos1row, pos2row, pos1col, pos2col, turn) == false) return false;
                // If no longer in check, reset king in check
                resetCheck(turn);
                // If in final row, turn into queen
                if (pos2row == 7) board[pos1row][pos1col].piece.Type = pieceEnum.queen;
                // Find if opponent is now in check
                checkAndSetOpponentCheck(turn, pos1row, pos2row, pos1col, pos2col, board);
                board[pos1row][pos1col].piece.HasMoved = true;
                return true;
            }
            else {
                return false;
            }

        }
        // Standard moves
        else if (((pos1col == pos2col) && (pos1row == pos2row - 1))) {
            if (board[pos2row][pos2col].piece == null) {
                // Check if puts own king in check
                if (checkForNotInCheckAfterMovement(board, pos1row, pos2row, pos1col, pos2col, turn) == false) return false;
                // If no longer in check, reset king in check
                resetCheck(turn);
                // If in final row, turn into queen
                if (pos2row == 7) board[pos1row][pos1col].piece.Type = pieceEnum.queen;
                // Find if opponent is now in check
                checkAndSetOpponentCheck(turn, pos1row, pos2row, pos1col, pos2col, board);
                board[pos1row][pos1col].piece.HasMoved = true;
                return true;
            }
            else {
                return false;
            }
            
        }
        else if ((pos1col == pos2col) && (pos1row == pos2row - 2) && board[pos1row][pos1col].piece.HasMoved == false) {
            if (board[pos2row][pos2col].piece == null && board[pos2row - 1][pos2col].piece == null) {
                // Check if puts own king in check
                if (checkForNotInCheckAfterMovement(board, pos1row, pos2row, pos1col, pos2col, turn) == false) return false;
                // If no longer in check, reset king in check
                resetCheck(turn);
                // If in final row, turn into queen
                if (pos2row == 7) board[pos1row][pos1col].piece.Type = pieceEnum.queen;
                // Find if opponent is now in check
                checkAndSetOpponentCheck(turn, pos1row, pos2row, pos1col, pos2col, board);
                enPassantNextTurn = true;
                board[pos1row][pos1col].piece.HasMoved = true;
                return true;

            } else {

                return false;
            }
        }
        else {
            return false;
        }
    }
    return true;
}

function bishopMovementCheck(pos1, pos2) {
    // Selected
    // Get row/col
    var pos1row = getArrayRow(pos1);
    var pos1col = getArrayCol(pos1);
    var pos2row = getArrayRow(pos2);
    var pos2col = getArrayCol(pos2);
    // Check selected movement due to movement rules
    var diagonal;
    // Remove div by 0 case
    if (pos1col - pos2col != 0) {
        diagonal = (pos1row - pos2row) / (pos1col - pos2col);
    }
    else {
        return false;
    }
    if (diagonal != 1 && diagonal != -1) {
        return false;
    }
    // Check for units in the way 
    if (pos1row > pos2row) {
        // Up 
        if (pos1col < pos2col) {
            // Right
            for (i = pos1col + 1, j = pos1row - 1; i < pos2col; i++, j--) {
                if (board[j][i].piece != null) {
                    return false;
                }
            }
        }
        else {
            // Left
            for (i = pos1col - 1, j = pos1row - 1; i > pos2col; i--, j--) {
                if (board[j][i].piece != null) {
                    return false;
                }
            }
        }
    }
    else {
        // Down
        if (pos1col < pos2col) {
            // Right
            for (i = pos1col + 1, j = pos1row + 1; j < pos2row; i++, j++) {
                if (board[j][i].piece != null) {
                    return false;
                }
            }
        }
        else {
            // Left
            for (i = pos1col - 1, j = pos1row + 1; j < pos2row; i--, j++) {
                if (board[j][i].piece != null) {
                    return false;
                }
            }
        }
    }

    // Check for ally unit at new position 
    if (board[pos2row][pos2col].piece != null) {
        if (board[pos2row][pos2col].piece.Player == turn) return false;
    }
    // Check if puts own king in check
    if (checkForNotInCheckAfterMovement(board, pos1row, pos2row, pos1col, pos2col, turn) == false) return false;
    // If no longer in check, reset king in check
    resetCheck(turn);
    // Find if opponent is now in check
    checkAndSetOpponentCheck(turn, pos1row, pos2row, pos1col, pos2col, board);

    // Return true 
    return true;
}

// Queen movement rules
function queenMovementCheck(pos1, pos2) {
    // Queen is a combination of rook and bishop
    // If either check returns true, movement must be good.
    // Checking for check does not require the moved piece type, as it only tracks the king and what's around it.
    if (rookMovementCheck(pos1, pos2) == false && bishopMovementCheck(pos1, pos2) == false) {
        return false;
    }
    return true;
}

// King movement rules
function kingMovementCheck(pos1, pos2) {
    // Selected
    // Get row/col
    var pos1row = getArrayRow(pos1);
    var pos1col = getArrayCol(pos1);
    var pos2row = getArrayRow(pos2);
    var pos2col = getArrayCol(pos2);
    // Check selected movement due to movement rules
    // Castle check first
    // Don't need to reset check here as can't castle out of check as a rule
    if (pos2col == 6 || pos2col == 2) {
        if (board[pos1row][pos1col].piece.HasMoved == false && board[pos1row][pos1col].piece.HasBeenChecked == false) {
            if (player = playerEnum.white) {
                // Get the rook spot
                if (board[7][0].piece.Type == pieceEnum.rook && board[7][0].piece.Player == playerEnum.white && board[7][0].piece.HasMoved == false) {
                    // Good to attempt to castle left
                    if (board[7][1].piece != null || board[7][2].piece != null || board[7][3].piece != null) {
                        return false;
                    }
                    // Check for check
                    if (checkForNotInCheckAfterTwoMovement(board, pos1row, pos2row, pos1col, pos2col, 7, 7, 0, 3, playerEnum.white) == false){
                        return false;
                    }

                    // Move Rook since it's not taken care of in parent function
                    board[7][3].piece = board[7][0].piece;
                    board[7][0].piece = null;
                    board[7][3].piece.HasMoved = true;
                    // Get id
                    var id = getId(7, 3);
                    document.getElementById(id).innerHTML = '<img src="' + getPieceImage(board[7][3].piece) + '" />';
                    id = getId(7, 0);
                    document.getElementById(id).innerHTML = '';
                    return true;
                }
                else if (board[7][7].piece.Type == pieceEnum.rook && board[7][7].piece.Type == playerEnum.white && board[7][7].piece.HasMoved == false) {
                    // Good to attempt to castle right
                    if (board[7][6].piece != null || board[7][5].piece != null) {
                        return false;
                    }
                    // Check for check
                    if (checkForNotInCheckAfterTwoMovement(board, pos1row, pos2row, pos1col, pos2col, 7, 7, 7, 5, playerEnum.white) == false) {
                        return false;
                    }
                    // Move Rook since it's not taken care of in parent function
                    board[7][5].piece = board[7][7].piece;
                    board[7][7].piece = null;
                    board[7][5].piece.HasMoved = true;
                    // Get id
                    var id = getId(7, 5);
                    document.getElementById(id).innerHTML = '<img src="' + getPieceImage(board[7][5].piece) + '" />';
                    id = getId(7, 7);
                    document.getElementById(id).innerHTML = '';
                    return true;
                }
            }
            else {
                // Get the rook spot
                if (board[0][0].piece.Type == pieceEnum.rook && board[0][0].piece.Player == playerEnum.black && board[0][0].piece.HasMoved == false) {
                    // Good to attempt to castle left
                    if (board[0][1].piece != null || board[0][2].piece != null || board[0][3].piece != null) {
                        return false;
                    }
                    // Check for check
                    if (checkForNotInCheckAfterTwoMovement(board, pos1row, pos2row, pos1col, pos2col, 0, 0, 0, 3, playerEnum.black) == false) {
                        return false;
                    }
                    // Move Rook since it's not taken care of in parent function
                    board[0][3].piece = board[0][0].piece;
                    board[0][0].piece = null;
                    board[0][3].piece.HasMoved = true;
                    // Get id
                    var id = getId(0, 3);
                    document.getElementById(id).innerHTML = '<img src="' + getPieceImage(board[0][3].piece) + '" />';
                    id = getId(0, 0);
                    document.getElementById(id).innerHTML = '';
                    return true;
                }
                else if (board[0][7].piece.Type == pieceEnum.rook && board[0][7].piece.Type == playerEnum.black && board[0][7].piece.HasMoved == false) {
                    // Good to attempt to castle right
                    if (board[0][6].piece != null || board[0][5].piece != null) {
                        return false;
                    }
                    // Check for check
                    if (checkForNotInCheckAfterTwoMovement(board, pos1row, pos2row, pos1col, pos2col, 0, 0, 7, 5, playerEnum.black) == false) {
                        return false;
                    }
                    // Move Rook since it's not taken care of in parent function
                    board[0][5].piece = board[0][7].piece;
                    board[0][7].piece = null;
                    board[0][5].piece.HasMoved = true;
                    // Get id
                    var id = getId(0, 5);
                    document.getElementById(id).innerHTML = '<img src="' + getPieceImage(board[0][5].piece) + '" />';
                    id = getId(0, 7);
                    document.getElementById(id).innerHTML = '';
                    return true;
                }
            }
        }
    }

    if (pos2row > pos1row + 1 || pos2row < pos1row - 1) {
        return false;
    }
    if (pos2col > pos1col + 1 || pos2col < pos1col - 1) {
        return false;
    }
    // Check for ally unit at new position 
    if (board[pos2row][pos2col].piece != null) {
        if (board[pos2row][pos2col].piece.Player == turn) return false;
    }
    // Check if puts own king in check
    if (checkForNotInCheckAfterMovement(board, pos1row, pos2row, pos1col, pos2col, turn) == false) {
        return false;
    }
    // If no longer in check, reset king in check
    resetCheck(turn);
    // Opponent can still be in check if king movement frees a lane for another piece
    checkAndSetOpponentCheck(turn, pos1row, pos2row, pos1col, pos2col, board);
    board[pos1row][pos1col].piece.HasMoved = true;
    // Return true 
    return true;
}

// Checks for check of passed opponent and sets corresponding variable
function checkAndSetOpponentCheck(player, pos1row, pos2row, pos1col, pos2col, _board) {
    if (player == playerEnum.white) {
        if (checkForNotInCheckAfterMovement(_board, pos1row, pos2row, pos1col, pos2col, playerEnum.black) == false) {
            blackInCheck = true;
            document.getElementById('warningDisplay').innerHTML = "Black is in check!";
            var id = getKingPosition(playerEnum.black, _board);
            var row = getArrayRow(id);
            var col = getArrayCol(id);
            _board[row][col].piece.HasBeenChecked = true;
        }
    }
    else {
        if (checkForNotInCheckAfterMovement(_board, pos1row, pos2row, pos1col, pos2col, playerEnum.white) == false) {
            whiteInCheck = true;
            document.getElementById('warningDisplay').innerHTML = "White is in check!";
            var id = getKingPosition(playerEnum.white, _board);
            var row = getArrayRow(id);
            var col = getArrayCol(id);
            _board[row][col].piece.HasBeenChecked = true;
        }
    }
}

// Gets the position of the passed player's king
function getKingPosition(player, _board) {
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            if (_board[i][j].piece != null) {
                if (_board[i][j].piece.Type == pieceEnum.king) {
                    if (_board[i][j].piece.Player == player) {
                        //return { row: i, col: j };
                        return getId(i, j);
                    }
                }
            }
        }
    }
}

// Resets the inCheck variable of passed player
function resetCheck(player) {
    if (player == playerEnum.white) {
        whiteInCheck = false;
        document.getElementById('warningDisplay').innerHTML = "";
    }
    if (player == playerEnum.black) {
        blackInCheck = false;
        document.getElementById('warningDisplay').innerHTML = "";
    }
}

function checkForNotInCheckAfterMovement(_board, pos1row, pos2row, pos1col, pos2col, player) {
    // Deep copy board to check movement
    var tempBoard = JSON.parse(JSON.stringify(_board));
    // Move piece on tempBoard
    var tempPiece = JSON.parse(JSON.stringify(_board[pos1row][pos1col].piece));
    tempBoard[pos2row][pos2col].piece = tempPiece;
    tempBoard[pos1row][pos1col].piece = null;
    // Check new piece position to prevent self-checking
    var temp = checkForNotInCheck(player, tempBoard); 
    return temp;
    
}

function checkForNotInCheckAfterTwoMovement(_board, pos1row1, pos2row1, pos1col1, pos2col1, pos1row2, pos2row2, pos1col2, pos2col2, player) {
    // Deep copy board to check movement
    var tempBoard = JSON.parse(JSON.stringify(_board));
    // Move piece on tempBoard
    var tempPiece = JSON.parse(JSON.stringify(_board[pos1row1][pos1col1].piece));
    var tempPiece2 = JSON.parse(JSON.stringify(_board[pos1row2][pos1col2].piece));
    tempBoard[pos2row1][pos2col1].piece = tempPiece;
    tempBoard[pos2row2][pos2col2].piece = tempPiece2;
    tempBoard[pos1row1][pos1col1].piece = null;
    tempBoard[pos1row2][pos1col2].piece = null;
    // Check new piece position to prevent self-checking
    return checkForNotInCheck(player, tempBoard);

}

function checkForNotInCheck(player, _board) {
    var id;
    var row;
    var col;
    var tempRow;
    var tempCol;
    var opponent;
    var count = 0;
    if (player == playerEnum.white) {
        opponent = playerEnum.black;
        id = getKingPosition(playerEnum.white, _board);
        row = getArrayRow(id);
        col = getArrayCol(id);
        tempRow = row;
        tempCol = col;
    }
    else {
        opponent = playerEnum.white;
        id = getKingPosition(playerEnum.black, _board);
        row = getArrayRow(id);
        col = getArrayCol(id);
        tempRow = row;
        tempCol = col;
    }
    // Check linear directions
    var occupied = false;
    // Left
    count = 0;
    while (occupied == false) {
        tempCol--;
        if (tempCol >= 0) {
            count++;
            // Within board boundaries
            if (_board[tempRow][tempCol].piece != null) {
                // There is a piece here
                if (_board[tempRow][tempCol].piece.Player == opponent) {
                    if (_board[tempRow][tempCol].piece.Type == pieceEnum.king && count == 1 ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.queen ||
                        _board[tempRow][tempCol].piece.Tpye == pieceEnum.rook) {
                        return false;
                    }
                    else {
                        occupied = true;
                    }
                } else {
                    occupied = true;
                }
            }
        } else {
            // No longer within board boundaries
            occupied = true;
        }
    }
    // Reset temp values
    tempCol = col;
    occupied = false;
    // Right
    count = 0;
    while (occupied == false) {
        tempCol++;
        if (tempCol <= 7) {
            count++;
            // Within board boundaries
            if (_board[tempRow][tempCol].piece != null) {
                // There is a piece here
                if (_board[tempRow][tempCol].piece.Player == opponent) {
                    if (_board[tempRow][tempCol].piece.Type == pieceEnum.king && count == 1 ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.queen ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.rook) {
                        return false;
                    }
                    else {
                        occupied = true;
                    }
                } else {
                    occupied = true;
                }
            }
        } else {
            // No longer within board boundaries
            occupied = true;
        }
    }
    // Reset temp values
    tempCol = col;
    occupied = false;
    // Up
    count = 0;
    while (occupied == false) {
        tempRow--;
        if (tempRow >= 0) {
            count++;
            // Within board boundaries
            if (_board[tempRow][tempCol].piece != null) {
                // There is a piece here
                if (_board[tempRow][tempCol].piece.Player == opponent) {
                    if (_board[tempRow][tempCol].piece.Type == pieceEnum.king && count == 1 ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.queen ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.rook) {
                        return false;
                    }
                    else {
                        occupied = true;
                    }
                } else {
                    occupied = true;
                }
            }
        } else {
            // No longer within board boundaries
            occupied = true;
        }
    }
    // Reset temp values
    tempRow = row;
    occupied = false;
    // Down
    count = 0;
    while (occupied == false) {
        tempRow++;
        if (tempRow <= 7) {
            count++;
            // Within board boundaries
            if (_board[tempRow][tempCol].piece != null) {
                // There is a piece here
                if (_board[tempRow][tempCol].piece.Player == opponent) {
                    if (_board[tempRow][tempCol].piece.Type == pieceEnum.king && count == 1 ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.queen ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.rook) {
                        return false;
                    }
                    else {
                        occupied = true;
                    }
                } else {
                    occupied = true;
                }
            }
        } else {
            // No longer within board boundaries
            occupied = true;
        }
    }
    // Reset temp values
    tempRow = row;
    occupied = false;
    count = 0;
    // Up and Left
    while (occupied == false) {
        tempRow--;
        tempCol--;
        if (tempCol >= 0 && tempRow >= 0) {
            // Within board boundaries
            count++;
            if (_board[tempRow][tempCol].piece != null) {
                // There is a piece here
                if (_board[tempRow][tempCol].piece.Player == opponent) {
                    if ((_board[tempRow][tempCol].piece.Type == pieceEnum.king && count == 1) ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.queen ||
                        (_board[tempRow][tempCol].piece.Type == pieceEnum.pawn && count == 1 && player == playerEnum.white)
                        || _board[tempRow][tempCol].piece.Type == pieceEnum.bishop) {
                        return false;
                    }
                    else {
                        occupied = true;
                    }
                } else {
                    occupied = true;
                }
            }
        } else {
            // No longer within board boundaries
            occupied = true;
        }
    }
    // Reset temp values
    tempRow = row;
    tempCol = col;
    count = 0;
    occupied = false;
    // Up and right
    while (occupied == false) {
        tempRow--;
        tempCol++;
        if (tempCol <= 7 && tempRow >= 0) {
            // Within board boundaries
            count++;
            if (_board[tempRow][tempCol].piece != null) {
                // There is a piece here
                if (_board[tempRow][tempCol].piece.Player == opponent) {
                    if (_board[tempRow][tempCol].piece.Type == pieceEnum.king && count == 1 ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.queen ||
                        (_board[tempRow][tempCol].piece.Type == pieceEnum.pawn && count == 1 && player == playerEnum.white)
                        || _board[tempRow][tempCol].piece.Type == pieceEnum.bishop) {
                        return false;
                    }
                    else {
                        occupied = true;
                    }
                } else {
                    occupied = true;
                }
            }
        } else {
            // No longer within board boundaries
            occupied = true;
        }
    }
    // Reset temp values
    tempRow = row;
    tempCol = col;
    count = 0;
    occupied = false;
    // Down and right
    while (occupied == false) {
        tempRow++;
        tempCol++;
        if (tempCol <= 7 && tempRow <= 7) {
            count++;
            // Within board boundaries
            if (_board[tempRow][tempCol].piece != null) {
                // There is a piece here
                if (_board[tempRow][tempCol].piece.Player == opponent) {
                    if (_board[tempRow][tempCol].piece.Type == pieceEnum.king && count == 1
                        || _board[tempRow][tempCol].piece.Type == pieceEnum.queen
                        || (_board[tempRow][tempCol].piece.Type == pieceEnum.pawn && count == 1 && player == playerEnum.black)
                        || _board[tempRow][tempCol].piece.Type == pieceEnum.bishop) {
                        return false;
                    }
                    else {
                        occupied = true;
                    }
                } else {
                    occupied = true;
                }
            }
        } else {
            // No longer within board boundaries
            occupied = true;
        }
    }
    // Reset temp values
    tempRow = row;
    tempCol = col;
    count = 0;
    occupied = false;
    // Down and left
    while (occupied == false) {
        tempRow++;
        tempCol--;
        if (tempCol >= 0 && tempRow <= 7) {
            // Within board boundaries
            count++;
            if (_board[tempRow][tempCol].piece != null) {
                // There is a piece here
                if (_board[tempRow][tempCol].piece.Player == opponent) {
                    if (_board[tempRow][tempCol].piece.Type == pieceEnum.king && count == 1 || 
                        _board[tempRow][tempCol].piece.Type == pieceEnum.queen ||
                        (_board[tempRow][tempCol].piece.Type == pieceEnum.pawn && count == 1 && player == playerEnum.black)
                        || _board[tempRow][tempCol].piece.Type == pieceEnum.bishop) {
                        return false;
                    }
                    else {
                        occupied = true;
                    }
                }
                else {
                    occupied = true;
                }
            }
        } else {
            // No longer within board boundaries
            occupied = true;
        }
    }
    // Reset temp values
    tempRow = row;
    tempCol = col;
    count = 0;
    occupied = false;
    // Horse movements
    // Down Right
    tempRow += 2;
    tempCol += 1;
    if (tempCol <= 7 && tempRow <= 7) {
        // Within board boundaries
        if (_board[tempRow][tempCol].piece != null) {
            // There is a piece here
            if (_board[tempRow][tempCol].piece.Player == opponent) {
                if (_board[tempRow][tempCol].piece.Type == pieceEnum.knight) {
                    return false;
                }
            }
        }
    }
    tempRow = row;
    tempCol = col;
    tempRow += 1;
    tempCol += 2;
    if (tempCol <= 7 && tempRow <= 7) {
        // Within board boundaries
        if (_board[tempRow][tempCol].piece != null) {
            // There is a piece here
            if (_board[tempRow][tempCol].piece.Player == opponent) {
                if (_board[tempRow][tempCol].piece.Type == pieceEnum.knight) {
                    return false;
                }
            }
        }
    }
    tempRow = row;
    tempCol = col;
    // Down Left
    tempRow += 2;
    tempCol -= 1;
    if (tempCol >= 0 && tempRow <= 7) {
        // Within board boundaries
        if (_board[tempRow][tempCol].piece != null) {
            // There is a piece here
            if (_board[tempRow][tempCol].piece.Player == opponent) {
                if (_board[tempRow][tempCol].piece.Type == pieceEnum.knight) {
                    return false;
                }
            }
        }
    }
    tempRow = row;
    tempCol = col;
    tempRow += 1;
    tempCol -= 2;
    if (tempCol >= 0 && tempRow <= 7) {
        // Within board boundaries
        if (_board[tempRow][tempCol].piece != null) {
            // There is a piece here
            if (_board[tempRow][tempCol].piece.Player == opponent) {
                if (_board[tempRow][tempCol].piece.Type == pieceEnum.knight) {
                    return false;
                }
            }
        }
    }
    tempRow = row;
    tempCol = col;
    // Up Left
    tempRow -= 2;
    tempCol -= 1;
    if (tempCol >= 0 && tempRow >= 0) {
        // Within board boundaries
        if (_board[tempRow][tempCol].piece != null) {
            // There is a piece here
            if (_board[tempRow][tempCol].piece.Player == opponent) {
                if (_board[tempRow][tempCol].piece.Type == pieceEnum.knight) {
                    return false;
                }
            }
        }
    }
    tempRow = row;
    tempCol = col;
    tempRow -= 1;
    tempCol -= 2;
    if (tempCol >= 0 && tempRow >= 0) {
        // Within board boundaries
        if (_board[tempRow][tempCol].piece != null) {
            // There is a piece here
            if (_board[tempRow][tempCol].piece.Player == opponent) {
                if (_board[tempRow][tempCol].piece.Type == pieceEnum.knight) {
                    return false;
                }
            }
        }
    }
    tempRow = row;
    tempCol = col;
    // Up Right
    tempRow -= 2;
    tempCol += 1;
    if (tempCol <= 7 && tempRow >= 0) {
        // Within board boundaries
        if (_board[tempRow][tempCol].piece != null) {
            // There is a piece here
            if (_board[tempRow][tempCol].piece.Player == opponent) {
                if (_board[tempRow][tempCol].piece.Type == pieceEnum.knight) {
                    return false;
                }
            }
        }
    }
    tempRow = row;
    tempCol = col;
    tempRow -= 1;
    tempCol += 2;
    if (tempCol <= 7 && tempRow >= 0) {
        // Within board boundaries
        if (_board[tempRow][tempCol].piece != null) {
            // There is a piece here
            if (_board[tempRow][tempCol].piece.Player == opponent) {
                if (_board[tempRow][tempCol].piece.Type == pieceEnum.knight) {
                    return false;
                }
            }
        }
    }

    return true;
    
}

// Checkmate logic
function checkForCheckmate(player) {

    // find opponent
    var opponent;
    if (player == playerEnum.white) opponent = playerEnum.black;
    else {
        opponent = playerEnum.white;
    }

    // Step one - find king in check
    var id = getKingPosition(player, _board);
    var row = getArrayRow(id);
    var col = getArrayCol(id);
    // Step two - find all possible check blocking paths and king paths
    var pathArray = findCheckPath(player, opponent, row, col);
    // Step three - cycle through units to see if they can land on any of the paths
    if (player == playerEnum.white) {
        for (i = 0; i++; i < 8) {
            for (j = 0; j++; j < 8) {
                if (board[i][j].piece != null) {
                    if (board[i][j].piece.Player == player) {
                        
                    }
                }
            }
        }
    }
}

// Function returns array of where a king is in check
function findCheckPath(player, opponent, row, col) {
    
    var count = 0;
    var tempRow = row;
    var tempCol = col;
    var pathArray = [];
    // Check linear directions
    var occupied = false;
    // Left
    while (occupied == false) {
        tempCol--;
        var count = 0;
        if (tempCol >= 0) {
            pathArray[count] = getId(tempRow, tempCol);
            count++;
            // Within board boundaries
            if (_board[tempRow][tempCol].piece != null) {
                // There is a piece here
                if (_board[tempRow][tempCol].piece.Player == opponent) {
                    if (_board[tempRow][tempCol].piece.Type == pieceEnum.king && count == 1 ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.queen ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.rook) {
                        return pathArray;
                    }
                    else {
                        occupied = true;
                    }
                } else {
                    occupied = true;
                }
            }
        } else {
            // No longer within board boundaries
            occupied = true;
        }
    }
    // Reset temp values
    tempCol = col;
    occupied = false;
    // Right
    count = 0;
    pathArray = [];
    while (occupied == false) {
        tempCol++;
        var count = 0;
        if (tempCol <= 7) {
            pathArray[count] = getId(tempRow, tempCol);
            count++;
            // Within board boundaries
            if (_board[tempRow][tempCol].piece != null) {
                // There is a piece here
                if (_board[tempRow][tempCol].piece.Player == opponent) {
                    if (_board[tempRow][tempCol].piece.Type == pieceEnum.king && count == 1 ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.queen ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.rook) {
                        return pathArray;
                    }
                    else {
                        occupied = true;
                    }
                } else {
                    occupied = true;
                }
            }
        } else {
            // No longer within board boundaries
            occupied = true;
        }
    }
    // Reset temp values
    tempCol = col;
    occupied = false;
    // Up
    count = 0;
    pathArray = [];
    while (occupied == false) {
        tempRow--;
        var count = 0;
        if (tempRow >= 0) {
            pathArray[count] = getId(tempRow, tempCol);
            count++;
            // Within board boundaries
            if (_board[tempRow][tempCol].piece != null) {
                // There is a piece here
                if (_board[tempRow][tempCol].piece.Player == opponent) {
                    if (_board[tempRow][tempCol].piece.Type == pieceEnum.king && count == 1 ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.queen ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.rook) {
                        return pathArray;
                    }
                    else {
                        occupied = true;
                    }
                } else {
                    occupied = true;
                }
            }
        } else {
            // No longer within board boundaries
            occupied = true;
        }
    }
    // Reset temp values
    tempRow = row;
    occupied = false;
    // Down
    count = 0;
    pathArray = [];
    while (occupied == false) {
        tempRow++;
        var count = 0;
        if (tempRow <= 7) {
            pathArray[count] = getId(tempRow, tempCol);
            count++;
            // Within board boundaries
            if (_board[tempRow][tempCol].piece != null) {
                // There is a piece here
                if (_board[tempRow][tempCol].piece.Player == opponent) {
                    if (_board[tempRow][tempCol].piece.Type == pieceEnum.king && count == 1 ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.queen ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.rook) {
                        return pathArray;
                    }
                    else {
                        occupied = true;
                    }
                } else {
                    occupied = true;
                }
            }
        } else {
            // No longer within board boundaries
            occupied = true;
        }
    }
    // Reset temp values
    tempRow = row;
    occupied = false;
    count = 0;
    pathArray = [];
    // Up and Left
    while (occupied == false) {
        tempRow--;
        tempCol--;
        if (tempCol >= 0 && tempRow >= 0) {
            pathArray[count] = getId(tempRow, tempCol);
            count++;
            // Within board boundaries
            if (_board[tempRow][tempCol].piece != null) {
                // There is a piece here
                if (_board[tempRow][tempCol].piece.Player == opponent) {
                    if (_board[tempRow][tempCol].piece.Type == pieceEnum.king && count == 1 ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.queen ||
                        (_board[tempRow][tempCol].piece.Type == pieceEnum.pawn && count == 1 && player == playerEnum.white)
                        || _board[tempRow][tempCol].piece.Type == pieceEnum.bishop) {
                        return pathArray;
                    }
                    else {
                        occupied = true;
                    }
                } else {
                    occupied = true;
                }
            }
        } else {
            // No longer within board boundaries
            occupied = true;
        }
    }
    // Reset temp values
    tempRow = row;
    tempCol = col;
    count = 0;
    pathArray = [];
    occupied = false;
    // Up and right
    while (occupied == false) {
        tempRow--;
        tempCol++;
        if (tempCol <= 7 && tempRow >= 0) {
            pathArray[count] = getId(tempRow, tempCol);
            count++;
            // Within board boundaries
            if (_board[tempRow][tempCol].piece != null) {
                // There is a piece here
                if (_board[tempRow][tempCol].piece.Player == opponent) {
                    if (_board[tempRow][tempCol].piece.Type == pieceEnum.king && count == 1 ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.queen ||
                        (_board[tempRow][tempCol].piece.Type == pieceEnum.pawn && count == 1 && player == playerEnum.white)
                        || _board[tempRow][tempCol].piece.Type == pieceEnum.bishop) {
                        return pathArray;
                    }
                    else {
                        occupied = true;
                    }
                } else {
                    occupied = true;
                }
            }
        } else {
            // No longer within board boundaries
            occupied = true;
        }
    }
    // Reset temp values
    tempRow = row;
    tempCol = col;
    count = 0;
    pathArray = [];
    occupied = false;
    // Down and right
    while (occupied == false) {
        tempRow++;
        tempCol++;
        if (tempCol <= 7 && tempRow <= 7) {
            pathArray[count] = getId(tempRow, tempCol);
            count++;
            // Within board boundaries
            if (_board[tempRow][tempCol].piece != null) {
                // There is a piece here
                if (_board[tempRow][tempCol].piece.Player == opponent) {
                    if (_board[tempRow][tempCol].piece.Type == pieceEnum.king && count == 1
                        || _board[tempRow][tempCol].piece.Type == pieceEnum.queen
                        || (_board[tempRow][tempCol].piece.Type == pieceEnum.pawn && count == 1 && player == playerEnum.black)
                        || _board[tempRow][tempCol].piece.Type == pieceEnum.bishop) {
                        return pathArray;
                    }
                    else {
                        occupied = true;
                    }
                } else {
                    occupied = true;
                }
            }
        } else {
            // No longer within board boundaries
            occupied = true;
        }
    }
    // Reset temp values
    tempRow = row;
    tempCol = col;
    count = 0;
    pathArray = [];
    occupied = false;
    // Down and left
    while (occupied == false) {
        tempRow++;
        tempCol--;
        if (tempCol >= 0 && tempRow <= 7) {
            // Within board boundaries
            pathArray[count] = getId(tempRow, tempCol);
            count++;
            if (_board[tempRow][tempCol].piece != null) {
                // There is a piece here
                if (_board[tempRow][tempCol].piece.Player == opponent) {
                    if (_board[tempRow][tempCol].piece.Type == pieceEnum.king && count == 1 ||
                        _board[tempRow][tempCol].piece.Type == pieceEnum.queen ||
                        (_board[tempRow][tempCol].piece.Type == pieceEnum.pawn && count == 1 && player == playerEnum.black)
                        || _board[tempRow][tempCol].piece.Type == pieceEnum.bishop) {
                        return pathArray;
                    }
                    else {
                        occupied = true;
                    }
                }
                else {
                    occupied = true;
                }
            }
        } else {
            // No longer within board boundaries
            occupied = true;
        }
    }
    // Reset temp values
    tempRow = row;
    tempCol = col;
    occupied = false;
    // Horse movements
    // Down Right
    tempRow += 2;
    tempCol += 1;
    count = 0;
    pathArray = [];
    if (tempCol <= 7 && tempRow <= 7) {
        // Within board boundaries
        pathArray[count] = getId(tempRow, tempCol);
        count++;
        if (_board[tempRow][tempCol].piece != null) {
            // There is a piece here
            if (_board[tempRow][tempCol].piece.Player == opponent) {
                if (_board[tempRow][tempCol].piece.Type == pieceEnum.knight) {
                    return pathArray;
                }
            }
        }
    }
    tempRow = row;
    tempCol = col;
    tempRow += 1;
    tempCol += 2;
    count = 0;
    pathArray = [];
    if (tempCol <= 7 && tempRow <= 7) {
        // Within board boundaries
        pathArray[count] = getId(tempRow, tempCol);
        count++;
        if (_board[tempRow][tempCol].piece != null) {
            // There is a piece here
            if (_board[tempRow][tempCol].piece.Player == opponent) {
                if (_board[tempRow][tempCol].piece.Type == pieceEnum.knight) {
                    return pathArray;
                }
            }
        }
    }
    tempRow = row;
    tempCol = col;
    // Down Left
    tempRow += 2;
    tempCol -= 1;
    count = 0;
    pathArray = [];
    if (tempCol >= 0 && tempRow <= 7) {
        // Within board boundaries
        pathArray[count] = getId(tempRow, tempCol);
        count++;
        if (_board[tempRow][tempCol].piece != null) {
            // There is a piece here
            if (_board[tempRow][tempCol].piece.Player == opponent) {
                if (_board[tempRow][tempCol].piece.Type == pieceEnum.knight) {
                    return pathArray;
                }
            }
        }
    }
    tempRow = row;
    tempCol = col;
    tempRow += 1;
    tempCol -= 2;
    count = 0;
    pathArray = [];
    if (tempCol >= 0 && tempRow <= 7) {
        // Within board boundaries
        if (_board[tempRow][tempCol].piece != null) {
            // There is a piece here
            pathArray[count] = getId(tempRow, tempCol);
            count++;
            if (_board[tempRow][tempCol].piece.Player == opponent) {
                if (_board[tempRow][tempCol].piece.Type == pieceEnum.knight) {
                    return pathArray;
                }
            }
        }
    }
    tempRow = row;
    tempCol = col;
    // Up Left
    tempRow -= 2;
    tempCol -= 1;
    count = 0;
    pathArray = [];
    if (tempCol >= 0 && tempRow >= 0) {
        // Within board boundaries
        pathArray[count] = getId(tempRow, tempCol);
        count++;
        if (_board[tempRow][tempCol].piece != null) {
            // There is a piece here
            if (_board[tempRow][tempCol].piece.Player == opponent) {
                if (_board[tempRow][tempCol].piece.Type == pieceEnum.knight) {
                    return pathArray;
                }
            }
        }
    }
    tempRow = row;
    tempCol = col;
    tempRow -= 1;
    tempCol -= 2;
    count = 0;
    pathArray = [];
    if (tempCol >= 0 && tempRow >= 0) {
        // Within board boundaries
        pathArray[count] = getId(tempRow, tempCol);
        count++;
        if (_board[tempRow][tempCol].piece != null) {
            // There is a piece here
            if (_board[tempRow][tempCol].piece.Player == opponent) {
                if (_board[tempRow][tempCol].piece.Type == pieceEnum.knight) {
                    return pathArray;
                }
            }
        }
    }
    tempRow = row;
    tempCol = col;
    // Up Right
    tempRow -= 2;
    tempCol += 1;
    count = 0;
    pathArray = [];
    if (tempCol <= 7 && tempRow >= 0) {
        // Within board boundaries
        pathArray[count] = getId(tempRow, tempCol);
        count++;
        if (_board[tempRow][tempCol].piece != null) {
            // There is a piece here
            if (_board[tempRow][tempCol].piece.Player == opponent) {
                if (_board[tempRow][tempCol].piece.Type == pieceEnum.knight) {
                    return pathArray;
                }
            }
        }
    }
    tempRow = row;
    tempCol = col;
    tempRow -= 1;
    tempCol += 2;
    count = 0;
    pathArray = [];
    if (tempCol <= 7 && tempRow >= 0) {
        // Within board boundaries
        pathArray[count] = getId(tempRow, tempCol);
        count++;
        if (_board[tempRow][tempCol].piece != null) {
            // There is a piece here
            if (_board[tempRow][tempCol].piece.Player == opponent) {
                if (_board[tempRow][tempCol].piece.Type == pieceEnum.knight) {
                    return pathArray;
                }
            }
        }
    }

    return true;

}
// TESTS
function testIdToArray() {
    var testid = 'a6';
    alert(testid);
    var testRow = getArrayRow(testid);
    var testCol = getArrayCol(testid);
    alert(testid + ', row: ' + testRow + ', col: ' + testCol);

    testid = 'f3';
    alert(testid);
    testRow = getArrayRow(testid);
    testCol = getArrayCol(testid);
    alert(testid + ', row: ' + testRow + ', col: ' + testCol);
}

function testCreateImageString() {
    var testPiece = { Type: pieceEnum.rook, Player: playerEnum.black };
    var testString = '<img src="' + getPieceImage(testPiece) + '" />';
    alert(testString);
}

function testGetPieceImage() {
    var testId = 'a5';
    var testPiece = { Type: pieceEnum.rook, Player: playerEnum.black };
    document.getElementById(testId).innerHTML = "<img src=" + getPieceImage(testPiece) + " />";

}

function test() {
    var tempRow = 5;
    var tempCol = 5;
    var opponent = playerEnum.black;
    tempRow += 2;
    tempCol += 1;
    board[tempRow][tempCol].piece.Type = pieceEnum.knight;
    board[tempRow][tempCol].piece.Player = playerEnum.black;
    if (tempCol <= 7 && tempRow <= 7) {
        alert("first if");
        // Within board boundaries
        if (board[tempRow][tempCol].piece != null) {
            alert("second if");
            // There is a piece here
            if (board[tempRow][tempCol].piece.Player == opponent) {
                alert("third if");
                if (board[tempRow][tempCol].piece.Type == pieceEnum.knight) alert("made it");
            }
        }
    }
}

function getBlackKingPosition() {
    var testId = getKingPosition(playerEnum.black, board);
    var row = getArrayRow(testId);
    var col = getArrayCol(testId);
    alert("Row: " + row + " Col: " + col);
}

