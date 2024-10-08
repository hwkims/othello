const cellElements= document.querySelectorAll('[data-cell]')
let circleTurn=1
document.querySelector(".scorewhite").innerHTML= "2"
document.querySelector(".scoreblack").innerHTML= "2"



const resetBoard=document.querySelector('#restartButton')
resetBoard.addEventListener('click',resetFunction,{once:false})




var sound1 = new Audio();         
sound1.src = "blackpiece.mp3";  
sound1.oncanplaythrough = function(){  
    sound1.readyToRock = true;    
                                 
};
sound1.onerror = function(){      
    console.log("Sound file SoundFileURL.mp3 failed to load.")
};


var sound2 = new Audio();         
sound2.src = "whitepiece.mp3";  
sound2.oncanplaythrough = function(){   
    sound2.readyToRock = true;    
                                 
};
sound2.onerror = function(){      
    console.log("Sound file SoundFileURL.mp3 failed to load.")
};

// var sound3 = new Audio();         
// sound3.src = "mixkit-ominous-drums-227.wav";  
// sound3.oncanplaythrough = function(){   
//     sound3.readyToRock = true;    
                                 
// };
// sound3.onerror = function(){      
//     console.log("Sound file SoundFileURL.mp3 failed to load.")
// };

var sound4 = new Audio();         
sound4.src = "button-22.mp3";  
sound4.oncanplaythrough = function(){   
    sound4.readyToRock = true;    
                                 
};
sound4.onerror = function(){      
    console.log("Sound file SoundFileURL.mp3 failed to load.")
};




const board = new Array(8);

for (var i = 0; i < board.length; i++) {
  board[i] = new Array(8);
}

for (let i = 0; i < 8; i++)
for (let j = 0; j < 8; j++)
board[i][j] = '.';
board[3][3] = 'X';
board[3][4] = 'O';
board[4][3] = 'O';
board[4][4] = 'X';




function resetFunction(e)
{  if(sound4 && sound4.readyToRock){  // check for the sound and if it has loaded
  sound4.currentTime = 0;       // seek to the start
  sound4.play();                // play it till it ends
}
  for (let i = 0; i < 8; i++)
  for (let j = 0; j < 8; j++)
  board[i][j] = '.';
  board[3][3] = 'X';
  board[3][4] = 'O';
  board[4][3] = 'O';
  board[4][4] = 'X';

  for (let i = 0; i < 8; i++)
  {for (let j = 0; j < 8; j++)
    {let arrtonum=(8*i)+j;
                  let ide=arrtonum.toString();
                  document.getElementById(ide).classList.remove("bcircle");
                  document.getElementById(ide).classList.remove("wcircle");
                  if(ide=='27'||ide=='36')
                  document.getElementById(ide).classList.add("wcircle");
                  if(ide=='28'||ide=='35')
                  document.getElementById(ide).classList.add("bcircle");
                  
    }
    let winningDiv =document.querySelector("#winningMessage")
    winningDiv.classList.remove("show")

  }
document.querySelector(".scorewhite").innerHTML= "2"
document.querySelector(".scoreblack").innerHTML= "2"
displaylegalmoves('O')
document.body.scrollTop = document.documentElement.scrollTop = 0;

}

cellElements.forEach(cell => {
cell.addEventListener('click', handleClick, {once:false})    
})
    
function displaylegalmoves(player)
       {  if(player=='O')
        {
        for(let i=0;i<8;i++)
        {
          for(let j=0;j<8;j++)
          {     let arrtonum=(8*i)+j;
                  let ide=arrtonum.toString();
                  document.getElementById(ide).classList.remove("legalmove");
                  if(islegalMove(board,i,j,player))
                  document.getElementById(ide).classList.add("legalmove");

            }
            
        }

        }

       else {for(let i=0;i<8;i++)
         {
           for(let j=0;j<8;j++)
          {     let arrtonum=(8*i)+j;
                   let ide=arrtonum.toString();
                  document.getElementById(ide).classList.remove("legalmove");
                  

             }
            
         }

       }
    }

function score(board2,piece)
{
let total = 0;
for (let x = 0; x < 8; x++)
for (let y = 0; y < 8; y++)
{
if (board2[x][y] == piece)
{if(x==0&&y==0||x==7&&y==0||x==0&&y==7||x==7&&y==7)
total=total+3
else if(((board2[0][0]!=piece)&&(x==0&&y==1||x==1&&y==1||x==1&&y==0))||((board2[7][0]!=piece)&&(x==7&&y==1||x==6&&y==0||x==6&&y==1))||((board2[7][7]!=piece)&&(x==7&&y==6||x==6&&y==6||x==6&&y==7))||((board2[0][7]!=piece)&&(x==0&&y==6||x==1&&y==6||x==1&&y==7)))
total=total-1
else if(x==0||y==0||x==7||y==7)
total=total+1.5
else total++

}
}
return total;
}

  displaylegalmoves('O')

function handleClick(e)
{  
  if(sound1 && sound1.readyToRock){  // check for the sound and if it has loaded
    sound1.currentTime = 0;       // seek to the start
    sound1.play();                // play it till it ends
}


   const cell=e.target
   console.log(cell.id)
  
   
   placeMark(cell, "bcircle")
   
   document.querySelector(".scorewhite").innerHTML= `  ${scoreboard(board,'X')}` 
   document.querySelector(".scoreblack").innerHTML= `  ${scoreboard(board,'O')}`
   checkWin()
   
   displaylegalmoves('X') 
   let moveX=[]
   let moveY=[]
   let numMoves={
     moveCount: 0
   }
   MoveList(board,moveX,moveY,numMoves,'X')
   if(numMoves.moveCount==0)
   displaylegalmoves('O')
   else
  {var delayInMilliseconds = 300; //0.3 seconds
  setTimeout(function() {
  AImoveGenerator(board,'X')
  document.querySelector(".scorewhite").innerHTML= `  ${scoreboard(board,'X')}` 
  document.querySelector(".scoreblack").innerHTML= `  ${scoreboard(board,'O')}`
  displaylegalmoves('O')}
      , delayInMilliseconds);
         
   }   
      
// if(isGameOver(board))
// {if(scoreboard(board,'O')>scoreboard(board,'X')) 
// {document.querySelector(".scoreblack").innerHTML="Black wins!!!"
// document.querySelector(".scorewhite").innerHTML= "AI player is a noob"}
// else if(scoreboard(board,'O')>scoreboard(board,'X')) 
// {document.querySelector(".scorewhite").innerHTML="White wins!!!"
// document.querySelector(".scoreblack").innerHTML= "Hard luck black, you lost"}
// else
// {document.querySelector(".scorewhite").innerHTML="Draw!!!"
// document.querySelector(".scoreblack").innerHTML= ""}
//   }
 
}

// while(!(isGameOver(board)))
// {
  
//    RandomMoveGenerator(board,'O')
//    AImoveGenerator(board,'X')
   
      


// }



function placeMark(cell, currentClass)
{ let piece='X'  
  if(currentClass=="bcircle")
  piece='O'
    cell.classList.add(currentClass)
    let ide=parseInt(cell.id)
    let x=Math.floor(ide/8)
    let y=ide%8
    placePiece(board,x,y,piece)
     
}

function RandomMoveGenerator(board2,piece)
{let x;
 let y; 
let moveX=[]
let moveY=[]
let numMoves={
  moveCount: 0
}
MoveList(board2, moveX, moveY, numMoves, piece);
if (numMoves.moveCount == 0)
{
x = -1;
y = -1;
}
else
{
let i = Math.floor(Math.random()*numMoves.moveCount);
x = moveX[i];
y = moveY[i];
placePiece(board2,x,y,piece)
}
}

function copyBoard(src,dest)
{var len = src.length;
for(var i=0; i<len; i++)
    dest[i] = src[i].slice(0);
}

function AImoveGenerator(board2,whoseTurn)
{ let x;
  let y;
let moveX=[];
let moveY=[];
let numMoves= {
  moveCount: 0
}
let opponent = 'X';
if (whoseTurn == 'X')
opponent = 'O';
MoveList(board2, moveX, moveY, numMoves, whoseTurn);
if (numMoves.moveCount == 0) 
{
x = -1;
y = -1;
}
else
{

let bestMoveVal = -99999;
let bestX = moveX[0];
let bestY = moveY[0];

for (let i = 0; i < numMoves.moveCount; i++)
{

let tempBoard=new Array(board2.length);
copyBoard(board2, tempBoard);
placePIeceCopy(tempBoard, moveX[i], moveY[i], whoseTurn);

let val = minimaxValue(tempBoard, whoseTurn, opponent, 1);

if (val > bestMoveVal)
{
bestMoveVal = val;
bestX = moveX[i];
bestY = moveY[i];
}
}

x = bestX;
y = bestY;

// if(validMove(board2,0,0,'X'))         //weighing the corners to be worth much more
// {x=0;
// y=0;}
// if(validMove(board2,0,7,'X'))
// {x=0;
// y=7;}
// if(validMove(board2,7,0,'X'))
// {x=7;
// y=0;}
// if(validMove(board2,7,7,'X'))
// {x=7;
// y=7;}

placePiece(board2,x,y,whoseTurn)
// if(isGameOver(board))
// {if(scoreboard(board,'O')>scoreboard(board,'X')) 
// {document.querySelector(".scoreblack").innerHTML="Black wins!!!"
// document.querySelector(".scorewhite").innerHTML= "AI player is a noob"}
// else if(scoreboard(board,'O')>scoreboard(board,'X')) 
// {document.querySelector(".scorewhite").innerHTML="White wins!!!"
// document.querySelector(".scoreblack").innerHTML= "Hard luck black, you lost"}
// else
// {document.querySelector(".scorewhite").innerHTML="Draw!!!"
// document.querySelector(".scoreblack").innerHTML= ""}
//   }
if(sound2 && sound2.readyToRock){  // check for the sound and if it has loaded
  sound2.currentTime = 0;       // seek to the start
  sound2.play();                // play it till it ends
}
checkWin()
var delayInMilliseconds = 300; //0.3 seconds
MoveList(board,moveX,moveY,numMoves,'O')
if(numMoves.moveCount==0)
{setTimeout(function() {
  AImoveGenerator(board,'X')
  document.querySelector(".scorewhite").innerHTML= ` ${scoreboard(board,'X')}` 
  document.querySelector(".scoreblack").innerHTML= ` ${scoreboard(board,'O')}`
  displaylegalmoves('O')}
      , delayInMilliseconds);
}
}
}


function minimaxValue(board2,originalTurn,currentTurn,searchDepth)
{
if (isGameOver(board2) || (searchDepth == 1) ) 
{
return heuristic(board2, originalTurn);
}
let moveX=[];
let moveY=[];
let numMoves={
  moveCount: 0
}
let opponent = 'X';
if (currentTurn == 'X')
opponent = 'O';
MoveList(board2, moveX, moveY, numMoves, currentTurn);
if (numMoves.moveCount == 0) // if no moves skip to next player's turn
{
return minimaxValue(board2, originalTurn, opponent, searchDepth + 1);
}
else
{

let bestMoveVal = -99999; 
if (originalTurn != currentTurn)
bestMoveVal = 99999; 
for (let i = 0; i < numMoves.moveCount; i++)
{

let tempBoard=new Array(board2.length);
copyBoard(board2, tempBoard);
placePIeceCopy(tempBoard, moveX[i], moveY[i], currentTurn);
// Recursive call
let val = minimaxValue(tempBoard, originalTurn, opponent,
 searchDepth + 1);

if (originalTurn == currentTurn)
{

if (val > bestMoveVal)
bestMoveVal = val;
}
else
{

if (val < bestMoveVal)
bestMoveVal = val;
}
}
return bestMoveVal;
}
return -1;
}



function placePIeceCopy(board2, x, y, piece)
{let classname="wcircle"
if(piece=='O')
classname="bcircle"
// Put the piece at x,y
board2[x][y] = piece;

// let arrtonum=(8*x)+y;
//  let ide=arrtonum.toString();
//  document.getElementById(ide).classList.add(classname);


let opponent = 'O';
if (piece == 'O')
opponent = 'X';
// Check to the left
if (x!=0&&flipCheck(board2, x - 1, y, -1, 0, piece, opponent))
flipPiecescopy(board2, x - 1, y, -1, 0, piece, opponent);
// Check to the right
if (x!=7&&flipCheck(board2, x + 1, y, 1, 0, piece, opponent))
flipPiecescopy(board2, x + 1, y, 1, 0, piece, opponent);
// Check down
if (y!=0&&flipCheck(board2, x, y-1, 0, -1, piece, opponent))
flipPiecescopy(board2, x, y-1, 0, -1, piece, opponent);
// Check up
if (y!=7&&flipCheck(board2, x, y + 1, 0, 1, piece, opponent))
flipPiecescopy(board2, x, y + 1, 0, 1, piece, opponent);
// Check down-left
if (x!=0&&y!=0&&flipCheck(board2, x-1, y - 1, -1, -1, piece, opponent))
flipPiecescopy(board2, x-1, y - 1, -1, -1, piece, opponent);
// Check down-right
if (x!=7&&y!=0&&flipCheck(board2, x + 1, y - 1, 1, -1, piece, opponent))
flipPiecescopy(board2, x + 1, y - 1, 1, -1, piece, opponent);
// Check up-left
if (x!=0&&y!=7&&flipCheck(board2, x - 1, y + 1, -1, 1, piece, opponent))
flipPiecescopy(board2, x - 1, y + 1, -1, 1, piece, opponent);
// Check up-right
if (x!=7&&y!=7&&flipCheck(board2, x + 1, y + 1, 1, 1, piece, opponent))
flipPiecescopy(board2, x + 1, y + 1, 1, 1, piece, opponent);
}

function flipPiecescopy(board2,x,y,deltaX,deltaY,myPiece,opponentPiece)
 {
 while (board2[x][y] == opponentPiece)
 { 
 board2[x][y] = myPiece;
//  let arrtonum=(8*x)+y;
//  let ide=arrtonum.toString();
//  document.getElementById(ide).classList.remove("bcircle");
//  document.getElementById(ide).classList.remove("wcircle");
//  document.getElementById(ide).classList.add(classname);
 x += deltaX;
 y += deltaY;
 }
 }
 


 function scoreboard(board2,piece)
 {
  
  let total = 0;
  for (let x = 0; x < 8; x++)
  for (let y = 0; y < 8; y++)
  {
  if (board2[x][y] == piece)
  total++;
  }
  return total;
  
 }

 function flipCheck(board2, x, y, deltaX,deltaY, 
  myPiece, opponentPiece)
{
if (board2[x][y] == opponentPiece)      
{
while ((x >= 0) && (x < 8) && (y >= 0) && (y < 8))
{
x += deltaX;
y += deltaY;

if(x<0||y<0||x>=8||y>=8)
return false;

if (board2[x][y] == '.') 
return false; 
if (board2[x][y] == myPiece)
return true; 
else
{

}
}
}
return false; 
}    

function placePiece(board2, x, y, piece)
{let classname="wcircle"
if(piece=='O')
classname="bcircle"

board2[x][y] = piece;

let arrtonum=(8*x)+y;
let ide=arrtonum.toString();
document.getElementById(ide).classList.add(classname);


let opponent = 'O';
if (piece == 'O')
opponent = 'X';
// Check to the left
if (x!=0&&flipCheck(board2, x - 1, y, -1, 0, piece, opponent))
flipPieces(board2, x - 1, y, -1, 0, piece, opponent);
// Check to the right
if (x!=7&&flipCheck(board2, x + 1, y, 1, 0, piece, opponent))
flipPieces(board2, x + 1, y, 1, 0, piece, opponent);
// Check down
if (y!=0&&flipCheck(board2, x, y-1, 0, -1, piece, opponent))
flipPieces(board2, x, y-1, 0, -1, piece, opponent);
// Check up
if (y!=7&&flipCheck(board2, x, y + 1, 0, 1, piece, opponent))
flipPieces(board2, x, y + 1, 0, 1, piece, opponent);
// Check down-left
if (x!=0&&y!=0&&flipCheck(board2, x-1, y - 1, -1, -1, piece, opponent))
flipPieces(board2, x-1, y - 1, -1, -1, piece, opponent);
// Check down-right
if (x!=7&&y!=0&&flipCheck(board2, x + 1, y - 1, 1, -1, piece, opponent))
flipPieces(board2, x + 1, y - 1, 1, -1, piece, opponent);
// Check up-left
if (x!=0&&y!=7&&flipCheck(board2, x - 1, y + 1, -1, 1, piece, opponent))
flipPieces(board2, x - 1, y + 1, -1, 1, piece, opponent);
// Check up-right
if (x!=7&&y!=7&&flipCheck(board2, x + 1, y + 1, 1, 1, piece, opponent))
flipPieces(board2, x + 1, y + 1, 1, 1, piece, opponent);
}

function islegalMove(board2, x, y, piece)
{
// Check that the location is empty
if (board2[x][y] != '.')
return false;

let opponent = 'O';
if (piece != 'X')
opponent = 'X';
// If we can flip in any direction, it is a legal move

// Check to the left
if (x!=0&&flipCheck(board2, x - 1, y, -1, 0, piece, opponent))
return true;
// Check to the right
if (x!=7&&flipCheck(board2, x + 1, y, 1, 0, piece, opponent))
return true;
// Check down
if (y!=0&&flipCheck(board2, x, y - 1, 0, -1, piece, opponent))
return true;
// Check up
if (y!=7&&flipCheck(board2, x, y + 1, 0, 1, piece, opponent))
return true;
// Check down-left
if (x!=0&&y!=0&&flipCheck(board2, x - 1, y - 1, -1, -1, piece, opponent))
return true;
// Check down-right
if (x!=7&&y!=0&&flipCheck(board2, x + 1, y - 1, 1, -1, piece, opponent))
return true;
// Check up-left
if (x!=0&&y!=7&&flipCheck(board2, x - 1, y + 1, -1, 1, piece, opponent))
return true;
// Check up-right
if (x!=7&&y!=7&&flipCheck(board2, x + 1, y + 1, 1, 1, piece, opponent))
return true;
return false; // If we get here, we didn't find a valid flip direction
}

function MoveList(board2, moveX,moveY, numMoves,piece)
{
numMoves.moveCount = 0; 
// Check each square of the board and store the coordinates if we can move there
for (let x = 0; x < 8; x++)
for (let y = 0; y < 8; y++)
{
if (islegalMove(board2, x, y, piece))
{
moveX[numMoves.moveCount] = x;
moveY[numMoves.moveCount] = y;
numMoves.moveCount++;
}
}
}

function isGameOver(board2)
{
var XMoveX=[];
var XMoveY=[];
var OMoveX=[];
var OMoveY=[];
var numXMoves = {
  moveCount: 0
}
var numOMoves = {
  moveCount: 0
}

MoveList(board2, XMoveX, XMoveY, numXMoves, 'X');
MoveList(board2, OMoveX, OMoveY, numOMoves, 'O');
if ((numXMoves.moveCount == 0) && (numOMoves.moveCount == 0))
return true;
return false;
}

function flipPieces(board2,x,y,deltaX,deltaY,myPiece,opponentPiece)
 {
 while (board2[x][y] == opponentPiece)
 { let classname="wcircle"
   if(myPiece=='O')
   classname="bcircle"
 board2[x][y] = myPiece;
 let arrtonum=(8*x)+y;
 let ide=arrtonum.toString();
 document.getElementById(ide).classList.remove("bcircle");
 document.getElementById(ide).classList.remove("wcircle");
 document.getElementById(ide).classList.add(classname);
 x += deltaX;
 y += deltaY;
 }
 }
 
 function heuristic(board2,whoseTurn)
 {
 let opponent = 'O';
 if (whoseTurn == 'O')
 opponent = 'X';
 let ourScore = score(board2, whoseTurn);
 let opponentScore = score(board2, opponent);
 return (ourScore - opponentScore);
 }
function checkWin(){
let winningDiv =document.querySelector("#winningMessage")
let winningMessage=document.querySelector('[data-winning-message-text]')
if(isGameOver(board)){
  // if(sound3 && sound3.readyToRock){  // check for the sound and if it has loaded
  //   sound3.currentTime = 0;       // seek to the start
  //   sound3.play();                // play it till it ends
  // }
  winningDiv.classList.add("show")
 if(scoreboard(board,'O')>scoreboard(board,'X'))
 winningMessage.innerText="You WIN!"
 else if(scoreboard(board,'O')<scoreboard(board,'X'))
 winningMessage.innerText="You lose!"
 else winningMessage.innerText="Draw!"
}

}
