import { renderGameArea } from "../index.js";
//Socket 
import {socket} from "../index.js";

import {
  // togglePlayerTurn,
  splitID,
  // whosTurnIsItAnyway,
} from "./playerTurn.js";
import { runOutcomeConditions, runKingOutcomes } from "./outcome.js";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//adds functionallity to move click event listener
const handleClick = (board, row, column, pieceId, id) => {
  // Access variables within this function's scope
  // console
  // console.log("Event triggered!");
  // console.log("current row: " + row);
  // console.log("Current column: " + column);
  // console.log("piece ID: " + pieceId);
  // console.log("new pos ID: " + id);
  movePiece(board, row, column, pieceId, id);
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const movePiece = async (board, row, column, pieceId, id) => {
  const oldTdElement = document.getElementById(row + column);
  const newTdElement = document.getElementById(id);
  const oldDefault = newTdElement.innerHTML;
  // console.log(newTdElement.innerHTML)

  newTdElement.innerHTML = oldTdElement.innerHTML;
  oldTdElement.innerHTML = oldDefault;

  console.log(
    "selected = " + row + column + "\n to Move " + pieceId + " to = " + id
  );

  const result = splitID(id);
  const letter = result.letterOfId;
  const numb = result.realNumberOfId;
  // console.log(letter); // Access the letterOfId property
  // console.log(numb); // Access the realNumberOfId property

  // Additional checks or game logic as needed

  // Update the game board with the new position
  board[letter][numb] = board[row][column];
  board[row][column] = null;

  const table = document.getElementById("table");

  const mypiece = table.querySelectorAll("div");
  const tds = table.querySelectorAll("td.highlight");

  mypiece.forEach((mypiece) => {
    mypiece.classList.remove("highlight");
  });

  tds.forEach((tds) => {
    tds.classList.remove("highlight");
  });

  const clonedTable = table.cloneNode(true); // Clone the table and its descendants

  table.parentNode.replaceChild(clonedTable, table);


  const domId = document.getElementById("table").closest("div");
  runOutcomeConditions(board, pieceId);
  let didSomeoneWin = runKingOutcomes( board, pieceId);    
  
  // Code to update win/loss at game end
  const getThisGame = await fetch(`/api/games/${domId.id}`, {
      method: "GET",
    });
  let thisGame
    if (getThisGame.ok) {
       thisGame = await getThisGame.json();
    }
    let attackerId = thisGame.attacker_id;
    let defenderId = thisGame.defender_id;
  // let moves = thisGame.num_of_moves

     const getAttackerData = await fetch(`/api/users/user/${attackerId}`, {
       method: "GET",
     });
   let attackerData
   
       attackerData = await getAttackerData.json();

      const getDefenderData = await fetch(`/api/users/user/${defenderId}`, {
       method: "GET",
     });
   let defenderData

       defenderData = await getDefenderData.json();
    

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  if (didSomeoneWin.attackersWon == true) {

    let gameStatus = 'attackerWon';
    let winner_id = attackerId;
     let win  = attackerData.win;
     win++;
     let loss = attackerData.loss;
     let draw = attackerData.draw;
     let games = attackerData.games_played;
     games++;

     if (attackerId === defenderId){
      gameStatus = 'draw';
       winner_id = null;
       win  = attackerData.win;
       loss = attackerData.loss;
       draw = attackerData.draw;
       draw++;
       games = attackerData.games_played;
       games++;
   }

 const updateAttacker = await fetch(`/api/users/update/${attackerData.id}`, {
   method: 'PUT',
   body: JSON.stringify({win, loss, draw, games,}),
   headers: { "Content-Type": "application/json" },
 })
 if (updateAttacker.ok) {
   console.log(attackerData.username + ' was updated');
 }

  win  = defenderData.win;
  loss = defenderData.loss;
  loss++;
  draw = defenderData.draw;
  games = defenderData.games_played;
  games++;
 const updateDefender = await fetch(`/api/users/update/${defenderData.id}`, {
 method: 'PUT',
 body: JSON.stringify({win, loss, draw, games,}),
 headers: { "Content-Type": "application/json" },
 })
 if (updateDefender.ok) {
 console.log(defenderData.username + ' was updated');
 }

    console.log('THE ATTACKERS HAVE WON!!!')
    const gameover = await fetch(`/api/games/gameover/${domId.id}`, {
      method: "PUT",
      body: JSON.stringify({ gameStatus, winner_id }),
      headers: { "Content-Type": "application/json" },
    });
  
    //Socket Emit  
    if (gameover.ok) {
      socket.emit('game-updated', { gameId: domId.id });
    }
  } 
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  else if (didSomeoneWin.defendersWon === true) {

    console.log('THE DEFENDERS HAVE WON!!!')
    let gameStatus = 'defenderWon'
    let winner_id =defenderId
     let win  = defenderData.win;
     win++;
     let loss = defenderData.loss;
     let draw = defenderData.draw;
     let games = defenderData.games_played;
     games++;

     if (attackerId === defenderId){
      gameStatus = 'draw';
       winner_id = null;
       win  = attackerData.win;
       loss = attackerData.loss;
       draw = attackerData.draw;
       draw++;
       games = attackerData.games_played;
       games++;
   }

 const updateDefender = await fetch(`/api/users/update/${defenderData.id}`, {
   method: 'PUT',
   body: JSON.stringify({win, loss, draw, games,}),
   headers: { "Content-Type": "application/json" },
 });
 if (updateDefender.ok) {
   console.log(defenderData.username + ' was updated');
 }

  win  = attackerData.win;
  loss = attackerData.loss;
  win++;
  draw = attackerData.draw;
  games = attackerData.games_played;
  games++

  const updateAttacker = await fetch(`/api/users/update/${attackerData.id}`, {
  method: 'PUT',
  body: JSON.stringify({win, loss, draw, games,}),
  headers: { "Content-Type": "application/json" },
  });
  if (updateAttacker.ok) {
    console.log(attackerData.username + ' was updated');
  }



    const gameover = await fetch(`/api/games/gameover/${domId.id}`, {
      method: "PUT",
      body: JSON.stringify({ gameStatus, winner_id }),
      headers: { "Content-Type": "application/json" },
    });
  
    //Socket Emit  
    if (gameover.ok) {
      socket.emit('game-updated', { gameId: domId.id });
    }
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
} else  {
  console.log('GAMEIS STILL IN PROGRESS...');
  } 
  //switch turns
  // togglePlayerTurn();
  //add code here to post gameboard
  // console.log(board);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//gets game Id form window


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const turn = pieceId < 24 ? false : true;
// if (turn){
//   moves++
// }
  console.log(turn);
// console.log(moves)
  const updateGame = await fetch(`/api/games/turn/${domId.id}`, {
    method: "PUT",
    body: JSON.stringify({ board, turn, }),
    headers: { "Content-Type": "application/json" },
  });

  //Socket Emit  
  if (updateGame.ok) {
    socket.emit('game-updated', { gameId: domId.id });
  }
  renderGameArea();
  


  //-----------

  // console.log(updateGame);



  // const myId = await getMyId.json();

  // const isAttacker = myId == thisGame.attacker_id ? true : false;

  // \/ \/ \/ \/ THIS IS FOR TESTING LOCCALLY ONLY, REMOVE FOR GAME TO FUNCTION PROPERLY ONLINE \/ \/ \/ \/
  // whosTurnIsItAnyway(isAttacker);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
// Example usage of the movePiece function

export { handleClick };
