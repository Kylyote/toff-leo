const board = {
  a: [null, null, null,    0,    1,    2,    3,    4, null, null, null], 
  b: [null, null, null, null, null,    5, null, null, null, null, null],
  c: [null, null, null, null, null, null, null, null, null, null, null],
  d: [   6, null, null, null, null,   24, null, null, null, null,    7],
  e: [   8, null, null, null,   25,   26,   27, null, null, null,    9],
  f: [  10,   11, null,   28,   29,   36,   30,   31, null,   12,   13],
  g: [  14, null, null, null,   32,   33,   34, null, null, null,   15],
  h: [  16, null, null, null, null,   35, null, null, null, null,   17],
  i: [null, null, null, null, null, null, null, null, null, null, null],
  j: [null, null, null, null, null,   18, null, null, null, null, null],
  k: [ null, null, null,  19,   20,   21,   22,   23, null, null,  null]
};

const gameBoard = {
  a: [null, null, null,    0,    1,    2,    3,    4, null, null, null],
  b: [null, null, null, null, null,    5, null, null, null, null, null],
  c: [null, null, null, null, null, null, null, null, null, null, null],
  d: [   6, null, null, null, null,   24, null, null, null, null,    7],
  e: [   8, null, null, null,   25,   26,   27, null, null, null,    9],
  f: [  10,   11, null,   28,   29,   36,   30,   31, null,   12,   13],
  g: [  14, null, null, null,   32,   33,   34, null, null, null,   15],
  h: [  16, null, null, null, null,   35, null, null, null, null,   17],
  i: [null, null, null, null, null, null, null, null, null, null, null],
  j: [null, null, null, null, null,   18, null, null, null, null, null],
  k: [ null, null, null,  19,   20,   21,   22,   23, null, null, null]
  //associate visual classes of board with the cellId eg. h2, a3, f5
};

// console.log(board)
//  
const generateBoard = (board) => {
  let html = '';

  for (const key in board) {
    html += '<tr id="table">';
    const currentArray = board[key];

    for (let i = 0; i < currentArray.length; i++) {
      const value = currentArray[i];
      let className = '';
      const cellId = `${key}${i}`; // Define the ID for each <td> element
      if (value === null && cellId != "a0" && cellId != "a10" && cellId != "k0" && cellId != "k10") {
        html += `<td id='${cellId}'></td>`; // Add the ID to the <td> element
      } else if (value === null && cellId == "a0" || cellId === "a10" || cellId === "k0" || cellId === "k10") {
        className = 'winSquare';
        html += `<td id='${cellId}' class='${className}'></td>`;
      } else if (value < 24) {
        className = 'beserkerSquare';
        html += `<td id='${cellId}' class='${className}'><div class='beserker' id='${value}'>${value}</div></td>`;
      } else if (value > 23 && value < 36) {
        className = 'guardSquare';
        html += `<td id='${cellId}' class='${className}'><div class='guard' id='${value}'>${value}</div></td>`;
      } else if (value === 36) {
        className = 'jarlsSquare';
        html += `<td id='${cellId}' class='${className}'><div class='jarl' id='${value}'>${value}</div></td>`;
      }
    }

    html += '</tr>';
  }
// console.log(html)
  return html;
};

export { board, gameBoard, generateBoard };
//if the found item is less than, than anything less thatn is discarded and same thing with greater than

