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
  const pathArray = window.location.pathname.split("/");
  let gameId = pathArray[pathArray.length - 1];

  console.log("this is my game id " + gameId);
  if (gameId >= 0) {
    console.log("game found");
  } else {
    gameId = "";
  }
  const gameRenderArea = document.getElementById("gamerender");

  const firstGameId = document.querySelector(".game-list-item").id;
  const dom = document.getElementById("gameboard-area");
  const domId = dom.parentNode.id;
  const thisGameId = domId == "" ? firstGameId : domId;
  // if (thisGameForDom.is_nine_by_nine)

  let clearDom;
  //////// updates gameboard //////////
  //page load this checks to see if an id is stored in the dom. if not then it shows the first game in the list

  const getThisGameforDom = await fetch(`/api/games/${thisGameId}`, {
    method: "GET",
  });

  const thisGameForDom = await getThisGameforDom.json();
  console.log(thisGameForDom);
  if (thisGameForDom.is_nine_by_nine) {
    // clears the dom at #table before table render
    clearDom = document.getElementById("table-nine-by-nine");
  } else {
    clearDom = document.getElementById("table-render");
  }
  clearDom.innerHTML = "";

  // gets game by id
  const getThisGame = await fetch(`/api/games/${thisGameId}`, {
    method: "GET",
  });

  if (getThisGame.ok) {
    const thisGame = await getThisGame.json();

    if (thisGame.gameover) {
      console.log("the game is over");
      if (thisGame.game_status == "draw") {
        gameRenderArea.innerHTML = `<section class="game-result">
        <img class='draw' src='/images/draw.png' alt='Crossed Swords'/>
        <h1>The Game Was A DRAW!</h1>
        </section>`;
      } else {
        console.log(thisGame.winner_id);
        const getWinner = await fetch(`/api/users/user/${thisGame.winner_id}`, {
          method: "GET",
        });
let img;
        const winner = await getWinner.json();
        let team;
        console.log(winner.username);
        if (thisGame.winner_id === thisGame.attacker_id) {
          team = "Attackers";
          img = "<img class='crossed-swords' src='/images/crossed-swords.png' alt='Crossed Swords'/>";
         
        }
        if (thisGame.winner_id === thisGame.defender_id) {
          team = "Defenders";
          img = "<img class='shield' src='/images/shield.png' alt='shield'/>";
        }
        console.log("the game is over");
         console.log(img)
        gameRenderArea.innerHTML = `<section class="game-result">
        ${img}
        <h1>${winner.username} WON!</h1>
        <h2>The game is over!</h2>
        <p>${team} won the game!</p>
        <a href="/my-stats"><button>See my stats</button></a>
      </section>`;

        console.log(winner);
      }
    } else {
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
      // console.log(myUserName.username)
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
      if (thisGame.is_nine_by_nine) {
        const container = document.getElementById("table-nine-by-nine");
        // // togglePlayerTurn()
        // // generates board and adds visual elements
        // //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        container.innerHTML = generateBoard(thisGame.board_state);
      } else {
        const container = document.getElementById("table-render");
        // // togglePlayerTurn()

        // // generates board and adds visual elements
        // //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        container.innerHTML = generateBoard(thisGame.board_state);
      }
      // addClassToCells(guardCell, "guardSquare");
      // addClassToCells(jarlCell, "jarlsSquare");
      // addClassToCells(beserkerCell, "beserkerSquare");
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      // let playerTeam = "Attacker";
      //starts turn
      // this is basically gonna need to be wrappdein an if statement that parses the database to say if plyerteam is equal to the current player then run this function

      if (loggedIn) {
        const getMyId = await fetch("/api/users/my-id", {
          method: "GET",
        });

        const myId = await getMyId.json();

        if (myId == thisGame.attacker_id && myId == thisGame.defender_id) {
          console.log("umm do you like have no friends");
          let iHaveNoFriends;
          if (thisGame.attacker_turn === true) {
            iHaveNoFriends = "me";
          } else {
            iHaveNoFriends = "imaginaryFriend";
          }
          whosTurnIsItAnyway(iHaveNoFriends, thisGame.board_state);
        } else {
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

socket.on("gameover", async (data) => {
  console.log("THE GAME IS OVER");
  renderGameArea();
});

// renderGameArea();

renderGameArea();

export { renderGameArea };

//Exporting Socket so it can be used elsewhere client side...
export { socket };
