
//this will be outcome parameters that will iterate over ech of the peices 

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const getAColumn = (arrayName, board, number) => {
  
    arrayName = []; // Declare an empty array
// Iterate over the keys of the game board and get the column values
   for (const key in board) {
       const value = board[key][number];
       arrayName.push(value); // Push the value to the array
   }
return arrayName
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const  runOutcomeConditions = (board, pieceId) => {
    const isTheKingHome = findPiecePosition(board, 36);
    const aArray = board.a.slice();
    // Replacing the first item with 100
  aArray.splice(0, 1, 100);
  
  // Replacing the last item with 100
  aArray.splice(aArray.length - 1, 1, 100);
  
    const bArray = board.b.slice();
    const cArray = board.c.slice();
    const dArray = board.d.slice();
    const eArray = board.e.slice();
    const fArray = board.f.slice();
if (isTheKingHome.place != 'f5'){
    fArray.splice(5, 1, 100);
}

    const gArray = board.g.slice();
    const hArray = board.h.slice();
    const iArray = board.i.slice();
    const jArray = board.j.slice();
  
    const kArray = board.k.slice();
      // Replacing the first item with 100
  kArray.splice(0, 1, 100);
  
  // Replacing the last item with 100
  kArray.splice(jArray.length - 1, 1, 100);
  
  
   console.log(aArray)
   console.log(board.a)
  const zero = getAColumn ("zeroArray", board, 0)
    // Replacing the first item with 100
    zero.splice(0, 1, 100);
  
    // Replacing the last item with 100
    zero.splice(zero.length - 1, 1, 100);
    
  const one = getAColumn ("oneArray", board, 1)
  const two = getAColumn ("twoArray", board, 2)
  const three = getAColumn ("threeArray", board, 3)
  const four = getAColumn ("fourArray", board, 4)
  const five = getAColumn ("fiveArray", board, 5)
  if (isTheKingHome.place != 'f5'){
    five.splice(5, 1, 100);
}
  const six = getAColumn ("sixArray", board, 6)
  const seven = getAColumn ("sevenArray", board, 7)
  const eight = getAColumn ("eightArray", board, 8)
  const nine = getAColumn ("nineArray", board, 9)
  
  const ten = getAColumn ("tenArray", board, 10)
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
    
    const rowConditioned = checkEachThing(brokenRows, pieceId);
    const columnConditioned = checkEachThing(brokenColumns, pieceId);
    
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
  
  // console.log(numb);
  // console.log(letter);
  
  setToNull(board, letter, numb)
  
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
  setToNull(board, letter, numb)
  
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
   const checkEachThing = (brokenRows, pieceId) => {
  
    const keyCondition = [];
  
    for (const key in brokenRows) {
      const array = brokenRows[key];
  
     if (pieceId > 23) { 
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
  
    if (pieceId <24) { 
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
  
  const runKingOutcomes = (board, pieceId) => {
    let defendersWon = false;
let attackersWon = false;
   
const piece36Position = findPiecePosition(board, 36);
    let kingRow = board[piece36Position.splitLetter].slice();
    const kingColumn = []; // Declare an empty array
      // Iterate over the keys of the game board and get the column values
    for (const key in board) {
        const value = board[key][piece36Position.splitNumb];
        kingColumn.push(value); // Push the value to the array
    }
  

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


// console.log(`i am the king row ${kingRow} and i am the king column ${kingColumn}`)

    if (pieceId >23) {
  // console.log(piece36Position.place)
  if (
    piece36Position.place == "a0"|| 
    piece36Position.place == "a10"|| 
    piece36Position.place == "k0"||
    piece36Position.place == "k10")
              //THE KING HAS WON THE GAME
              defendersWon = true
        console.log('win')
    }
    if (pieceId < 24) { 
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
            rowCapture = true
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
              //THE KING HAS LOST THE GAME
              attackersWon = true
        console.log('all is lost ');
    
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
              //THE KING HAS LOST THE GAME
              attackersWon = true
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
              //THE KING HAS LOST THE GAME
              console.log(`all is lost`);
              attackersWon = true
            }
          });
          
      console.log('the king is vulnerable outside of his castle')
    }      
  }
  return {attackersWon, defendersWon}
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
