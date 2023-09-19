import {board, gameBoard} from './board.js';
//this will be outcome parameters that will iterate over ech of the peices 

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const getAColumn = (arrayName, gameBoard, number) => {
  
    arrayName = []; // Declare an empty array
// Iterate over the keys of the game board and get the column values
   for (const key in gameBoard) {
       const value = gameBoard[key][number];
       arrayName.push(value); // Push the value to the array
   }
return arrayName
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const  runOutcomeConditions = (currentPlayer, gameBoard, pieceId) => {
    const isTheKingHome = findPiecePosition(gameBoard, 36);
    const aArray = gameBoard.a.slice();
    // Replacing the first item with 100
  aArray.splice(0, 1, 100);
  
  // Replacing the last item with 100
  aArray.splice(aArray.length - 1, 1, 100);
  
    const bArray = gameBoard.b.slice();
    const cArray = gameBoard.c.slice();
    const dArray = gameBoard.d.slice();
    const eArray = gameBoard.e.slice();
    const fArray = gameBoard.f.slice();
if (isTheKingHome.place != 'f5'){
    fArray.splice(5, 1, 100);
}

    const gArray = gameBoard.g.slice();
    const hArray = gameBoard.h.slice();
    const iArray = gameBoard.i.slice();
    const jArray = gameBoard.j.slice();
  
    const kArray = gameBoard.k.slice();
      // Replacing the first item with 100
  kArray.splice(0, 1, 100);
  
  // Replacing the last item with 100
  kArray.splice(jArray.length - 1, 1, 100);
  
  
   console.log(aArray)
   console.log(gameBoard.a)
  const zero = getAColumn ("zeroArray", gameBoard, 0)
    // Replacing the first item with 100
    zero.splice(0, 1, 100);
  
    // Replacing the last item with 100
    zero.splice(zero.length - 1, 1, 100);
    
  const one = getAColumn ("oneArray", gameBoard, 1)
  const two = getAColumn ("twoArray", gameBoard, 2)
  const three = getAColumn ("threeArray", gameBoard, 3)
  const four = getAColumn ("fourArray", gameBoard, 4)
  const five = getAColumn ("fiveArray", gameBoard, 5)
  if (isTheKingHome.place != 'f5'){
    five.splice(5, 1, 100);
}
  const six = getAColumn ("sixArray", gameBoard, 6)
  const seven = getAColumn ("sevenArray", gameBoard, 7)
  const eight = getAColumn ("eightArray", gameBoard, 8)
  const nine = getAColumn ("nineArray", gameBoard, 9)
  
  const ten = getAColumn ("tenArray", gameBoard, 10)
    // Replacing the first item with 100
    ten.splice(0, 1, 100);
  
    // Replacing the last item with 100
    ten.splice(ten.length - 1, 1, 100);
  
    console.log(ten, zero, kArray, aArray)
  
    const brokenRows =[
      aArray,
      bArray,
      cArray,
      dArray,
      eArray,
      fArray,
      gArray,
      hArray,
      iArray,
      jArray,
      kArray
    ]
      const brokenColumns =[
      zero,
      one,
      two,
      three,
      four,
      five,
      six,
      seven,
      eight,
      nine,
      ten
  
    ]
    
    const rowConditioned = checkEachThing(brokenRows, currentPlayer, pieceId);
    const columnConditioned = checkEachThing(brokenColumns, currentPlayer, pieceId);
    
    console.log(rowConditioned);
  
  columnConditioned.forEach((element) => {
      console.log(element);
  let [numb, letter] = element.split(" ");
      
  if (letter == 0) {
    letter = 'a';
  } else if (letter == 1) {
    letter = 'b';
  } else if (letter == 2) {
    letter = 'c';
  } else if (letter == 3) {
    letter = 'd';
  } else if (letter == 4) {
    letter = 'e';
  } else if (letter == 5) {
    letter = 'f';
  } else if (letter == 6) {
    letter = 'g';
  } else if (letter == 7) {
    letter = 'h';
  } else if (letter == 8) {
    letter = 'i';
  } else if (letter == 9) {
    letter = 'j';
  } else if (letter == 10) {
    letter = 'k';
  };
  
  console.log(numb);
  console.log(letter);
  
  setToNull(gameBoard, letter, numb)
  
  });
  
  rowConditioned.forEach((element) => {
      console.log(element);
  
      let [letter, numb] = element.split(" ");
  
  if (letter == 0) {
    letter = 'a';
  } else if (letter == 1) {
    letter = 'b';
  } else if (letter == 2) {
    letter = 'c';
  } else if (letter == 3) {
    letter = 'd';
  } else if (letter == 4) {
    letter = 'e';
  } else if (letter == 5) {
    letter = 'f';
  } else if (letter == 6) {
    letter = 'g';
  } else if (letter == 7) {
    letter = 'h';
  } else if (letter == 8) {
    letter = 'i';
  } else if (letter == 9) {
    letter = 'j';
  } else if (letter == 10) {
    letter = 'k';
  };
  console.log(letter);
  console.log(numb);
  setToNull(gameBoard, letter, numb)
  
  });
      
   }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   const setToNull = (board, letter, numb) => {
    board[letter][numb] = null;
    const toBeSet = document.querySelector(`#${letter}${numb}`);
    console.log(toBeSet)
    toBeSet.removeChild(toBeSet.firstChild);
  };
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   const checkEachThing = (brokenRows, currentPlayer, pieceId) => {
  
    const keyCondition = [];
  
    console.log(currentPlayer)
    for (const key in brokenRows) {
      const array = brokenRows[key];
  
     if (currentPlayer === "Defender") { 
      for (let i = 0; i < array.length; i++) {
        if (
          array[i] < 24 && 
          array[i] != null && 
          array[i] != 36 && 
          array[i] != null && 
          (array[i - 1] > 23 || array[i - 1] == 100) && 
          (array[i + 1] > 23 || array[i + 1] == 100) &&
          (
            array[i - 1] == pieceId || 
            array[i + 1] == pieceId ||
            array[i + 1] == pieceId || 
            array[i - 1] == pieceId 
          )
          ) {
            keyCondition.push(`${key} ${i}`);
          console.log(`Value ${array[i]} at index ${key} ${i} meets the condition`);
        }
      }
    }
  
    if (currentPlayer === "Attacker") { 
      for (let i = 0; i < array.length; i++) {
        if (
          array[i] > 23 && 
          array[i] != null && 
          array[i] != 100 && 
          array[i] != 36 && 
          (array[i - 1] < 24 || array[i - 1] == 100) && 
          (array[i + 1] < 24 || array[i + 1] == 100) && 
          array[i + 1] != null && 
          array[i - 1] != null &&
          (
            array[i - 1] == pieceId || 
            array[i + 1] == pieceId ||
            array[i + 1] == pieceId || 
            array[i - 1] == pieceId 
          )
          ) {
            keyCondition.push(`${key} ${i}`);
          console.log(`Value ${array[i]} at index ${key} ${i} meets the condition`);
        }
      }
    }
  
  
  }
  console.log(keyCondition)
  
  return keyCondition
  }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  const runKingOutcomes = (currentPlayer, gameBoard, pieceId) => {
const piece36Position = findPiecePosition(gameBoard, 36);
    let kingRow = gameBoard[piece36Position.splitLetter].slice();
    const kingColumn = []; // Declare an empty array
      // Iterate over the keys of the game board and get the column values
    for (const key in gameBoard) {
        const value = gameBoard[key][piece36Position.splitNumb];
        kingColumn.push(value); // Push the value to the array
    }
    console.log(`${piece36Position.place} is my row and column!!!!!!!!!!!!!!!!!!!!`)
    console.log(`${kingColumn} is my column!!!!!!!!!!!!!!!!!!!!`)
    console.log(`${kingRow} is my row!!!!!!!!!!!!!!!!!!!!`)

if(piece36Position.splitLetter == 'a' || piece36Position.splitLetter == 'k'){
    kingRow.splice(0, 1, 100);
  
    // Replacing the last item with 100
    kingRow.splice(kingRow.length - 1, 1, 100);
  }
    
  if(piece36Position.splitNumb == 0 || piece36Position.splitNumb == 10){
    kingColumn.splice(0, 1, 100);
  
    // Replacing the last item with 100
    kingColumn.splice(kingRow.length - 1, 1, 100);
  }


  if(
    piece36Position.place == "e5"|| 
    piece36Position.place == "f4"|| 
    piece36Position.place == "f6"||
    piece36Position.place == "g5"
    ){
if (kingColumn[5] != 36){
    kingColumn.splice(5, 1, 100);
}
if (kingRow[5] != 36){
    kingRow.splice(5, 1, 100);
}
  }


console.log(`i am the king row ${kingRow} and i am the king column ${kingColumn}`)

    if (currentPlayer == "Defender") {
  console.log(piece36Position.place)
  if (
    piece36Position.place == "a0"|| 
    piece36Position.place == "a10"|| 
    piece36Position.place == "k0"||
    piece36Position.place == "k10")
        console.log('win')
    }
    if (currentPlayer == "Attacker") { 
   console.log(piece36Position.place)
  if (
    piece36Position.place == "e5"|| 
    piece36Position.place == "f4"|| 
    piece36Position.place == "f6"||
    piece36Position.place == "g5"||
    piece36Position.place == "f5"
    ){
    console.log('king is outside the castle walls')
 let colCapture = false
 let rowCapture = false
let enemyCapture = false
    kingColumn.forEach((value, index, array) => {
        console.log(value)
        if (
          value == 36 && 
          (array[index - 1] < 24 || array[index - 1] == 100) && 
          (array[index + 1] < 24 || array[index + 1] == 100) && 
          array[index + 1] != null && 
          array[index - 1] != null 
          ) {
          colCapture = true
        }
          if (
            array[index - 1] == pieceId || 
            array[index + 1] == pieceId 
          ){
            enemyCapture = true
          }
        
      });
      
      kingRow.forEach((value, index, array) => {
        console.log(value)
        if (
          value == 36 && 
          (array[index - 1] < 24 || array[index - 1] == 100) && 
          (array[index + 1] < 24 || array[index + 1] == 100) && 
          array[index + 1] != null && 
          array[index - 1] != null)
           {
            colCapture = true
          }
            if (
              array[index - 1] == pieceId || 
              array[index + 1] == pieceId 
            ){
              enemyCapture = true
            }
      });
      console.log(rowCapture, colCapture)
      if (colCapture && rowCapture && enemyCapture) {
        console.log('all is really lost now');
    
}


    } else {
        kingColumn.forEach((value, index, array) => {
            console.log(value)
            if (
              value == 36 && 
              (array[index - 1] < 24 || array[index - 1] == 100) && 
              (array[index + 1] < 24 || array[index + 1] == 100) && 
              array[index + 1] != null && 
              array[index - 1] != null &&
              (
                array[index - 1] == pieceId || 
                array[index + 1] == pieceId ||
                array[index + 1] == pieceId || 
                array[index - 1] == pieceId 
              )
            ) {
              console.log(`all is lost`);
            }
          });
          
          kingRow.forEach((value, index, array) => {
            console.log(value)
            if (
              value == 36 && 
              (array[index - 1] < 24 || array[index - 1] == 100) && 
              (array[index + 1] < 24 || array[index + 1] == 100) && 
              array[index + 1] != null && 
              array[index - 1] != null &&
              (
                array[index - 1] == pieceId || 
                array[index + 1] == pieceId ||
                array[index + 1] == pieceId || 
                array[index - 1] == pieceId 
              )
            ) {
              console.log(`all is lost`);
            }
          });
          
      console.log('the king is vulnerable outside of his castle')
    }      
  }
}

  const findPiecePosition = (board, piece) => {
    for (const key in board) {
      const row = board[key];
      const columnIndex = row.indexOf(piece);
      if (columnIndex !== -1) {
        return { place:`${key}${columnIndex}`, splitLetter:key, splitNumb:columnIndex};
      }
    }
    return null; // Piece not found in the board
  };
  
// Usage
  

  export { runOutcomeConditions, runKingOutcomes};
