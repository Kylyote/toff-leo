import { board, gameBoard, generateBoard } from './scripts/board.js';
import {logRowsWithSameArrayPosition, togglePlayerTurn, currentPlayer, whosTurnIsItAnyway} from './scripts/playerTurn.js';
import {} from './scripts/playerMove.js';

const container = document.getElementById('table');


container.innerHTML = generateBoard(gameBoard);
whosTurnIsItAnyway(currentPlayer);



