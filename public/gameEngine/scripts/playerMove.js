import { renderGameArea } from "../index.js";
//Socket 
import {socket} from "../index.js";

import {
  togglePlayerTurn,
  splitID,
  currentPlayer,
  whosTurnIsItAnyway,
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

  runOutcomeConditions(currentPlayer, board, pieceId);
  runKingOutcomes(currentPlayer, board, pieceId);

  //switch turns
  // togglePlayerTurn();
  //add code here to post gameboard
  // console.log(board);

  const domId = document.getElementById("table").closest("div");

  // const getThisGame = await fetch(`/api/games/${domId.id}`, {
  //   method: "GET",
  // });

  // const thisGame = await getThisGame.json();

  const turn = pieceId < 24 ? false : true;

  console.log(turn);

  const updateGame = await fetch(`/api/games/turn/${domId.id}`, {
    method: "PUT",
    body: JSON.stringify({ board, turn }),
    headers: { "Content-Type": "application/json" },
  });

  //Socket Emit  
  if (updateGame.ok) {
    socket.emit('game-updated', { gameId: domId.id });
  }

  //-----------

  // console.log(updateGame);

  const getMyId = await fetch("/api/users/my-id", {
    method: "GET",
  });

  // const myId = await getMyId.json();

  // const isAttacker = myId == thisGame.attacker_id ? true : false;

  // \/ \/ \/ \/ THIS IS FOR TESTING LOCCALLY ONLY, REMOVE FOR GAME TO FUNCTION PROPERLY ONLINE \/ \/ \/ \/
  // whosTurnIsItAnyway(isAttacker);
  renderGameArea();
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Example usage of the movePiece function

export { handleClick };
