// const board = {
//   a: [null, null, null, 0, 1, 2, 3, 4, null, null, null],
//   b: [null, null, null, null, null, 5, null, null, null, null, null],
//   c: [null, null, null, null, null, null, null, null, null, null, null],
//   d: [6, null, null, null, null, 24, null, null, null, null, 7],
//   e: [8, null, null, null, 25, 26, 27, null, null, null, 9],
//   f: [10, 11, null, 28, 29, 36, 30, 31, null, 12, 13],
//   g: [14, null, null, null, 32, 33, 34, null, null, null, 15],
//   h: [16, null, null, null, null, 35, null, null, null, null, 17],
//   i: [null, null, null, null, null, null, null, null, null, null, null],
//   j: [null, null, null, null, null, 18, null, null, null, null, null],
//   k: [null, null, null, 19, 20, 21, 22, 23, null, null, null],
// };

const gameBoard = {
  a: [null, null, null, 0, 1, 2, 3, 4, null, null, null],
  b: [null, null, null, null, null, 5, null, null, null, null, null],
  c: [null, null, null, null, null, null, null, null, null, null, null],
  d: [6, null, null, null, null, 24, null, null, null, null, 7],
  e: [8, null, null, null, 25, 26, 27, null, null, null, 9],
  f: [10, 11, null, 28, 29, 36, 30, 31, null, 12, 13],
  g: [14, null, null, null, 32, 33, 34, null, null, null, 15],
  h: [16, null, null, null, null, 35, null, null, null, null, 17],
  i: [null, null, null, null, null, null, null, null, null, null, null],
  j: [null, null, null, null, null, 18, null, null, null, null, null],
  k: [null, null, null, 19, 20, 21, 22, 23, null, null, null],
};

// console.log(board)
//

const generateNineByNine = (board)  => {
  let html = "";
  
  for (const key in board) {
      html += '<tr id="table-nine-by-nine">';
      const currentArray = board[key];
  
      for (let i = 0; i < currentArray.length; i++) {
        const value = currentArray[i];
        let className = "";
        const cellId = `${key}${i}`; // Define the ID for each <td> element
  
        if (value === null) {
          html += `<td id='${cellId}'></td>`; // Add the ID to the <td> element
      } else if (value < 24) {
          html += `<td id='${cellId}'><img src="/images/berserker-nine-by-nine.png" class='beserker game-piece' id='${value}'></img></td>`;
        } else if (value > 23 && value < 36) {
          html += `<td id='${cellId}'><img src="/images/guard-nine-by-nine.png" class='guard game-piece' id='${value}'></img></td>`;
        } else if (value === 36) {
          html += `<td id='${cellId}'><img src="/images/jarl-nine-nine.png" class='jarl game-piece' id='${value}'></img></td>`;
        }
      }
  
      html += "</tr>";
    }
    // console.log(html)
    return html;
  };
  

const generateBoard = (board) => {
  let html = "";

  for (const key in board) {
    html += '<tr id="table">';
    const currentArray = board[key];

    for (let i = 0; i < currentArray.length; i++) {
      const value = currentArray[i];
      let className = "";
      const cellId = `${key}${i}`; // Define the ID for each <td> element

      if (
        value === null &&
        cellId != "a0" &&
        cellId != "a10" &&
        cellId != "k0" &&
        cellId != "k10"
      ) {
        html += `<td id='${cellId}'></td>`; // Add the ID to the <td> element
      } else if (
        (value === null && cellId == "a0") ||
        cellId === "a10" ||
        cellId === "k0" ||
        cellId === "k10"
      ) {
        className = "winSquare";
        html += `<td id='${cellId}' class='${className}'></td>`;
      } else if (value < 24) {
        html += `<td id='${cellId}'><img src="/images/berserker-piece.png" class='beserker game-piece' id='${value}'></img></td>`;
      } else if (value > 23 && value < 36) {
        html += `<td id='${cellId}'><img src="/images/guard-piece.png" class='guard game-piece' id='${value}'></img></td>`;
      } else if (value === 36) {
        html += `<td id='${cellId}'><img src="/images/jarl-piece.png" class='jarl game-piece' id='${value}'></img></td>`;
      }
    }

    html += "</tr>";
  }
  // console.log(html)
  return html;
};

const beserkerCell = {
  cell1: "a3",
  cell2: "a4",
  cell3: "a5",
  cell4: "a6",
  cell5: "a7",
  cell6: "b5",
  cell7: "d0",
  cell8: "d10",
  cell9: "e0",
  cell10: "e10",
  cell11: "f0",
  cell12: "f1",
  cell13: "f9",
  cell14: "f10",
  cell15: "g0",
  cell16: "g10",
  cell17: "h0",
  cell18: "h10",
  cell19: "j5",
  cell20: "k3",
  cell21: "k4",
  cell22: "k5",
  cell23: "k6",
  cell24: "k7",
};

const guardCell = {
  cell1: "d5",
  cell2: "e4",
  cell3: "e5",
  cell4: "e6",
  cell5: "f3",
  cell6: "f4",
  cell7: "f6",
  cell8: "f7",
  cell9: "g4",
  cell10: "g5",
  cell11: "g6",
  cell12: "h5",
};

const jarlCell = {
  cell1: "f5",
};

function addClassToCells(cellsToModify, className) {
  // Iterate over the object keys using Object.keys()
  Object.keys(cellsToModify).forEach((key) => {
    // Get the specific value from the object
    const value = cellsToModify[key];
    const cell = document.getElementById(value);

    // Add the class to the <td> element
    cell.classList.add(className);
  });
}
export {
  // board,
  gameBoard,
  generateBoard,
  generateNineByNine,
  addClassToCells,
  guardCell,
  jarlCell,
  beserkerCell,
};
//if the found item is less than, than anything less thatn is discarded and same thing with greater than
