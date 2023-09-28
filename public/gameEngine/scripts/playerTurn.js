import { handleClick } from "./playerMove.js";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Set the initial player to 'Attacker'
// let currentPlayer = "Attacker";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// // Function to toggle the player turn between 'Attacker' and 'Defender'
// function togglePlayerTurn() {
//   currentPlayer = currentPlayer === "Attacker" ? "Defender" : "Attacker";
// }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Function to determine whose turn it is
// const whosTurnIsItAnyway = (currentPlayer, board) => {
//   // If the current player is 'Attacker', handle initial click for 'beserker' pieces
//   console.log(currentPlayer);
//   if (currentPlayer) {
//     let pieceType = "beserker";
//     handleInitialClick(pieceType, board);
//     // If the current player is 'Defender', handle initial click for 'guard' and 'jarl' pieces
//   } else if (!currentPlayer) {
//     let pieceType = "guard, .jarl";
//     handleInitialClick(pieceType, board);
//   }
// };
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const whosTurnIsItAnyway = (currentPlayer, board) => {
  // If the current player is 'Attacker', handle initial click for 'beserker' pieces
  console.log(currentPlayer);
  if (currentPlayer === true) {
    let pieceType = "beserker";
    handleInitialClick(pieceType, board);
    // If the current player is 'Defender', handle initial click for 'guard' and 'jarl' pieces
  } else if (currentPlayer === false) {
    let pieceType = "guard, .jarl";
    handleInitialClick(pieceType, board);
  } else if (currentPlayer === "me") {
    let pieceType = "beserker";
    handleInitialClick(pieceType, board);
  } else if (currentPlayer === "imaginaryFriend") {
    let pieceType = "guard, .jarl";
    handleInitialClick(pieceType, board);
  }
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//function for splitting the parent id into its parts
const splitID = (id) => {
  const letterOfId = id.charAt(0); // Get the first character (letter)
  const numberString = id.slice(1); // Get the remaining characters as a string
  const realNumberOfId = parseInt(numberString);
  return { letterOfId, realNumberOfId };
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function for the click on the selected piece
const handleInitialClick = (pieceType, board) => {
  // Select all the divsOfPiece with the specified piece type
  const divsOfPiece = document.querySelectorAll(`.${pieceType}`);

  console.log(`whosTurnIsItAnyway function ran for ${pieceType}`);
  console.log("handling add listeners to peices");
  divsOfPiece.forEach((div) => {
    let clicks = 0;
    // Add a click event listener to each div
    div.addEventListener("click", function () {
      // Remove the 'highlight' class from all divsOfPiece
      clicks++;
      console.log("these are my clicks " + clicks);
      if (clicks != 0) {
        console.log("i should be resetting the turn");
        let table;
        let clonedTable;
        console.log(board.a.length)
if (board.a.length === 9){
         table = document.getElementById("table-nine-by-nine");
         clonedTable = table.cloneNode(true); // Clone the table and its descendants

      }else {
         table = document.getElementById("table");
         clonedTable = table.cloneNode(true); // Clone the table and its descendants

      }

        table.parentNode.replaceChild(clonedTable, table);
        handleInitialClick(pieceType, board);
      }
      divsOfPiece.forEach((div) => {
        div.classList.remove("highlight");
      });
      // Add the 'highlight' class to the clicked div

      const pieceId = parseFloat(div.id);
      const parentId = div.parentNode.id;

      console.log("I AM PIECE pieceId:" + pieceId);
      console.log("I AM PARENT parentId:" + parentId);
      // Parse the parent ID to extract the letter and number
      const theSplitID = splitID(parentId);
      const theLetterOfId = theSplitID.letterOfId;
      const theNumberOfId = theSplitID.realNumberOfId;
      // console.log('Parent ID:', letter, numberAsInt);
      console.log(
        "I AM THE LETTER OF THE PARENT ID theLetterOfId: " + theLetterOfId
      );
      console.log(
        "I AM THE NUMBER OF THE PARENT ID theNumberOfId: " + theNumberOfId
      );
      // Call the logRowsWithSameArrayPosition function
      logRowsWithSameArrayPosition(
        board,
        theLetterOfId,
        theNumberOfId,
        pieceId,
        parentId
      );
    });
  });
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Function to log the rows with the same array position as the selected piece
function logRowsWithSameArrayPosition(board, row, column, pieceId, parentId) {
  const playerPiecePathClass =
    pieceId < 24 ? "highlight-attacker" : "highlight-defender";

  console.log(
    "adding classes to available spaces" +
      " " +
      row +
      " " +
      column +
      " " +
      pieceId
  );
  // Get the current row from the game board
  let currentRow = board[row];
  const columnArray = []; // Declare an empty array
  // Iterate over the keys of the game board and get the column values
  for (const key in board) {
    const value = board[key][column];
    columnArray.push(value); // Push the value to the array
  }
  //clear highlights
  const tds = document.querySelectorAll("td");
  tds.forEach((td) => {
    td.classList.remove("highlight-attacker", "highlight-defender");
  });
  const parentTD = document.querySelector(`#${parentId}`);
  parentTD.classList.add(`${playerPiecePathClass}`);
  // console.log( "this is the column array "+ columnArray);
  // console.log("this is the row array "+ currentRow)

  // Convert the column array and row array to valid column and row arrays
  const convertedColumnArray = convertArray(columnArray, pieceId);
  const convertedRowArray = convertArray(currentRow, pieceId);

  // console.log("valid column " + convertedColumnArray)
  // console.log("valid row " + convertedRowArray)

  console.log("im the parent id " + parentId);

  function handleMyClick(event) {
    const element = event.target;
    const id = element.id;
    console.log(id);
    handleClick(board, row, column, pieceId, id);
  }
  let i = 0;
  // Add the 'highlight' class to the available spaces in the column
  convertedColumnArray.forEach(() => {
    let letter = "";

    if (convertedColumnArray[i] === 0) {
      letter = "a";
    } else if (convertedColumnArray[i] === 1) {
      letter = "b";
    } else if (convertedColumnArray[i] === 2) {
      letter = "c";
    } else if (convertedColumnArray[i] === 3) {
      letter = "d";
    } else if (convertedColumnArray[i] === 4) {
      letter = "e";
    } else if (convertedColumnArray[i] === 5) {
      letter = "f";
    } else if (convertedColumnArray[i] === 6) {
      letter = "g";
    } else if (convertedColumnArray[i] === 7) {
      letter = "h";
    } else if (convertedColumnArray[i] === 8) {
      letter = "i";
    } else if (convertedColumnArray[i] === 9) {
      letter = "j";
    } else if (convertedColumnArray[i] === 10) {
      letter = "k";
    }
    i++;
    //add event listeners and visual elements to the pieces that can be moved
    const columnArrayId = letter + column;
    const avail = document.querySelector(`#${columnArrayId}`);
    avail.classList.add(`${playerPiecePathClass}`);
    avail.addEventListener("click", handleMyClick);
  });

  i = 0;
  convertedRowArray.forEach(() => {
    const columnArrayId = row + convertedRowArray[i];
    i++;
    // console.log("currID is " + currID)
    const avail = document.querySelector(`#${columnArrayId}`);
    avail.classList.add(`${playerPiecePathClass}`);
    avail.addEventListener("click", handleMyClick);
  });
 
  if (pieceId != 36) {
    
    if (board.a.length === 9){
      const center = document.querySelector(`#e4`);
      const a0 = document.querySelector(`#a0`);
      const a8 = document.querySelector(`#a8`);
      const i0 = document.querySelector(`#i0`);
      const i8 = document.querySelector(`#i8`);
      const removeExemptJarl = (square) => {
        square.classList.remove("highlight-attacker", "highlight-defender");
        square.removeEventListener("click", handleMyClick);
      };
      removeExemptJarl(center);
      removeExemptJarl(a0);
      removeExemptJarl(a8);
      removeExemptJarl(i0);
      removeExemptJarl(i8);
 } else {
    const center = document.querySelector(`#f5`);
    const a0 = document.querySelector(`#a0`);
    const a10 = document.querySelector(`#a10`);
    const k0 = document.querySelector(`#k0`);
    const k10 = document.querySelector(`#k10`);
    const removeExemptJarl = (square) => {
      square.classList.remove("highlight-attacker", "highlight-defender");
      square.removeEventListener("click", handleMyClick);
    };
    removeExemptJarl(center);
    removeExemptJarl(a0);
    removeExemptJarl(a10);
    removeExemptJarl(k0);
    removeExemptJarl(k10);
  }}
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//converts arrays to valid spaces only
function convertArray(array, chosenID) {
  // console.log(array +" is being tested"); // Log the array being tested
  // console.log(chosenID +" is my piece"); // Log the chosenID
  const indicesOfNull = []; // Create an array to store the indices of null values
  // Loop through the array to find indices of null values

  for (let i = 0; i < array.length; i++) {
    if (array[i] === null) {
      indicesOfNull.push(i); // Push the index of null value to indicesOfNull array
    }
  }
  // console.log("i of null " + indicesOfNull); // Log the indices of null values
  let indexOfMyNumb = array.indexOf(chosenID); // Get the index of chosenID in the array
  // console.log("my piece is at "+ indexOfMyNumb); // Log the index of chosenID
  // Filter the indicesOfNull array to get the indices before and after indexOfMyNumb
  const beforeNullArray = indicesOfNull.filter(
    (index) => index < array.indexOf(chosenID)
  );
  const afterNullArray = indicesOfNull.filter(
    (index) => index > array.indexOf(chosenID)
  );
  const reversedBeforeNullArray = beforeNullArray.reverse(); // Reverse the beforeNullArray
  let validNumbers = []; // Create an array to store valid numbers
  let indexOfMyNumbForTest = indexOfMyNumb; // Iterate over the afterNullArray

  afterNullArray.forEach((afterNullArray) => {
    if (indexOfMyNumbForTest + 1 === afterNullArray) {
      // console.log(afterNullArray + " IS valid"); // Log if the number is valid
      validNumbers.push(afterNullArray); // Push the valid number to validNumbers array
      indexOfMyNumbForTest++;
    } else {
      // console.log(afterNullArray + " is NOT valid"); // Log if the number is not valid
    }
  });

  indexOfMyNumbForTest = indexOfMyNumb;
  // Iterate over the reversedBeforeNullArray
  reversedBeforeNullArray.forEach((reversedBeforeNullArray) => {
    if (indexOfMyNumbForTest - 1 === reversedBeforeNullArray) {
      // console.log(reversedBeforeNullArray + " IS valid"); // Log if the number is valid
      validNumbers.push(reversedBeforeNullArray); // Push the valid number to validNumbers array
      indexOfMyNumbForTest--;
    } else {
      // console.log(reversedBeforeNullArray + " is NOT valid"); // Log if the number is not valid
    }
  });

  // console.log("Valid numbers:", validNumbers); // Log the valid numbers
  return validNumbers; // Return the valid numbers
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export {
  logRowsWithSameArrayPosition,
  // togglePlayerTurn,
  // currentPlayer,
  whosTurnIsItAnyway,
  splitID,
};
