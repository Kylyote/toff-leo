import {gameBoard, generateBoard, addClassToCells, guardCell, jarlCell, beserkerCell } from './scripts/board.js';
import {currentPlayer, whosTurnIsItAnyway} from './scripts/playerTurn.js';

const container = document.getElementById('table');
// togglePlayerTurn()

// generates board and adds visual elements
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

container.innerHTML = generateBoard(gameBoard);

addClassToCells(guardCell, 'guardSquare')
addClassToCells(jarlCell, 'jarlsSquare')
addClassToCells(beserkerCell, 'beserkerSquare')
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let playerTeam = "Attacker"
//starts turn
// this is basically gonna need to be wrappdein an if statement that parses the database to say if plyerteam is equal to the current player then run this function
if (playerTeam == currentPlayer){
whosTurnIsItAnyway(currentPlayer);
 } else {
    console.log("waiting on opponent")
 }
//then maybe an if not then have a banner display(or whatever) waiting on opponent