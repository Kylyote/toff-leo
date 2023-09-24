//Socket.io
let socketServerUrl;

//For Local Development
if (window.location.hostname === "localhost") {
  socketServerUrl = "http://localhost:3001";
} else {
  //For Hosted URL ...
  socketServerUrl = window.location.origin;
}

const socket = io(socketServerUrl);

import {
  gameBoard,
  generateBoard,
  addClassToCells,
  guardCell,
  jarlCell,
  beserkerCell,
} from "./scripts/board.js";
import { whosTurnIsItAnyway } from "./scripts/playerTurn.js";

// // renders the board based on the state stores in the DB by id
// const allViewBtns = document.querySelectorAll(".game-list-item-view-btn");

// allViewBtns.forEach((element) => {
//   element.addEventListener("click", async (event) => {
//     const domId = document.getElementById("table").closest("div");
//     const clearDom = document.getElementById("table");

//     // clears the dom at #table before table render
//     clearDom.innerHTML = "";

//     const thisId = event.target.id; // gets the id stored in a game button stored in the left panel

//     domId.id = thisId; // sets the id for the table parent div so other opperations of the game can use it

//     // gets game by id
//     const getThisGame = await fetch(`/api/games/${thisId}`, {
//       method: "GET",
//     });

//     if (getThisGame.ok) {
//       // scrubs returned game
//       const thisGame = await getThisGame.json();

//       const container = document.getElementById("table");
//       // // togglePlayerTurn()

//       // // generates board and adds visual elements
//       // //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//       container.innerHTML = generateBoard(thisGame.board_state);

//       addClassToCells(guardCell, "guardSquare");
//       addClassToCells(jarlCell, "jarlsSquare");
//       addClassToCells(beserkerCell, "beserkerSquare");
//       //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//       // let playerTeam = "Attacker";
//       //starts turn
//       // this is basically gonna need to be wrappdein an if statement that parses the database to say if plyerteam is equal to the current player then run this function

//       const getMyId = await fetch("/api/users/my-id", {
//         method: "GET",
//       });

//       const myId = await getMyId.json();

//       const myTurn =
//         (myId == thisGame.attacker_id && thisGame.attacker_turn) ||
//         (myId == thisGame.defender_id && !thisGame.attacker_turn)
//           ? true
//           : false;

//       const isAttacker = myId == thisGame.attacker_id ? true : false;

//       if (myTurn) {
//         whosTurnIsItAnyway(isAttacker, thisGame.board_state);
//       } else {
//         console.log("waiting on opponent");
//       }
//     } else {
//       alert("Could not get the game board");
//     }
//   });
// });

const renderGameArea = async () => {
  const domId = document.getElementById("table").closest("div").closest("div");
  const clearDom = document.getElementById("table");

  //////// updates gameboard //////////
  console.log(domId.id);
  // clears the dom at #table before table render
  clearDom.innerHTML = "";

  // gets game by id
  const getThisGame = await fetch(`/api/games/${domId.id}`, {
    method: "GET",
  });

  if (getThisGame.ok) {
    const thisGame = await getThisGame.json();

    const getSession = await fetch("/api/users/logged-in", {
      method: "GET",
    });

    const loggedIn = await getSession.json();

    //////// updates combatant headers ////////////
    // gets current user details to extract name for labels
    const getMyUserName = await fetch("/api/users/username", {
      method: "GET",
    });

    // gets current users details to extract name for label purposes
    const myUserName = await getMyUserName.json();

    // conditional for combatant header lables.  If you are a player it will render a different label
    const attackerLabel = loggedIn
      ? thisGame.Attacker
        ? myUserName.username == thisGame.Attacker.username
          ? "You"
          : thisGame.Attacker.username
        : "Waiting for an Attacker"
      : thisGame.Attacker.username;

    const defenderLabel = loggedIn
      ? thisGame.Defender
        ? myUserName.username == thisGame.Defender.username
          ? "You"
          : thisGame.Defender.username
        : "Waiting for a Defender"
      : thisGame.Defender.username;

    const whosTurnAttacker = loggedIn
      ? thisGame.Attacker && thisGame.Defender
        ? myUserName.username == thisGame.Attacker.username
          ? "It's your turn"
          : `It's ${thisGame.Attacker.username}'s turn`
        : "Pending..."
      : `It's ${thisGame.Attacker.username}'s turn`;

    const whosTurnDefender = loggedIn
      ? thisGame.Attacker && thisGame.Defender
        ? myUserName.username == thisGame.Defender.username
          ? "It's your turn"
          : `It's ${thisGame.Defender.username}'s turn`
        : "Pending..."
      : `It's ${thisGame.Defender.username}'s turn`;

    // gets elements from the page
    const attackerName = document.getElementById("attacker-username");
    const defenderName = document.getElementById("defender-username");
    const whosTurn = document.getElementById("whos-turn");

    // renders data to elements
    // combatants header div
    attackerName.textContent = attackerLabel;
    whosTurn.textContent = thisGame.attacker_turn
      ? whosTurnAttacker
      : whosTurnDefender;
    defenderName.textContent = defenderLabel;

    //////////////// udpates table ////////////////////////
    // scrubs returned game

    const container = document.getElementById("table");
    // // togglePlayerTurn()

    // // generates board and adds visual elements
    // //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    container.innerHTML = generateBoard(thisGame.board_state);

    addClassToCells(guardCell, "guardSquare");
    addClassToCells(jarlCell, "jarlsSquare");
    addClassToCells(beserkerCell, "beserkerSquare");
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // let playerTeam = "Attacker";
    //starts turn
    // this is basically gonna need to be wrappdein an if statement that parses the database to say if plyerteam is equal to the current player then run this function

    if (loggedIn) {
      const getMyId = await fetch("/api/users/my-id", {
        method: "GET",
      });

      const myId = await getMyId.json();

      const myTurn =
        (myId == thisGame.attacker_id && thisGame.attacker_turn) ||
        (myId == thisGame.defender_id && !thisGame.attacker_turn)
          ? true
          : false;

      const isAttacker = myId == thisGame.attacker_id ? true : false;

      if (myTurn) {
        whosTurnIsItAnyway(isAttacker, thisGame.board_state);
      } else {
        console.log("waiting on opponent");
      }
    }
  } else {
    alert("Could not get the game board");
  }

  //////// updates combatants header ///////////
};

//Update from Socket
socket.on("game-updated", (data) => {
  renderGameArea();
});

renderGameArea();
export { renderGameArea };

//Exporting Socket so it can be used elsewhere client side...
export { socket };
