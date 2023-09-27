//import needed modules
import { renderGameArea } from "../gameEngine/index.js";

import {socket} from "../gameEngine/index.js";

const leaveGameBtn = document.querySelector("#leave-game-btn");
const forfeitGameBtn = document.querySelector("#forfeit-game-btn");

async function forfeitGame(event) {
  event.preventDefault();

  // This double stacks the API route when in a game. Only works in main lobby, which will then not give the game ID.
  const getMyId = await fetch("/api/users/my-id", {
    method: "GET",
  });
  const myId = await getMyId.json();
  console.log("This is the player ID: " + myId);

  // Game ID from the window, can be seen in the URL path
  // const pathArray = window.location.pathname.split('/');
  // const gameId = pathArray[pathArray.length - 1];
  // console.log("This is the game ID: " + gameId);
  const dom = document.getElementById("gameboard-area");
  const gameId = dom.parentNode.id;

  const getMyGame = await fetch(`/api/games/${gameId}`, {
    method: "GET",
  });
  const myGame = await getMyGame.json();
  console.log("Current attacker ID: " + myGame.attacker_id);
  console.log("Current defender ID: " + myGame.defender_id);

  // If the player is forfeiting as the attacker, increase their losses. Up defender's wins. Set game status to defender wins
  if (myId == myGame.attacker_id) {
    // Get data from DB for attacker and defender
    let getAttackerData = await fetch(`/api/users/user/${myId}`, {
      method: "GET",
    });
    let getDefenderData = await fetch(`/api/users/user/${myGame.defender_id}`, {
      method: "GET",
    });
    // change code back into an object from string
    let attackerData = await getAttackerData.json();
    let defenderData = await getDefenderData.json();

    // update game
    let gameStatus = "defenderWon";
    let winner_id = defenderData.id;
    console.log(
      gameStatus +
        " Status of the current game" +
        "\n" +
        winner_id +
        " game winner"
    );
    // Push changes to game update
    const updateGame = await fetch(`/api/games/gameover/${gameId}`, {
      method: "PUT",
      body: JSON.stringify({ gameStatus, winner_id }),
      headers: { "Content-Type": "application/json" },
    });
    if (updateGame.ok) {
      console.log(gameId + " game info updated with game end");
    }

    // update defender game stats
    let win = defenderData.win;
    win++;
    let games = defenderData.games_played;
    games++;
    // push changes to the defender database
    const updateDefender = await fetch(`/api/users/update/${defenderData.id}`, {
      method: "PUT",
      body: JSON.stringify({ win, games }),
      headers: { "Content-Type": "application/json" },
    });
    if (updateDefender.ok) {
      console.log(defenderData.username + " info updated");
    }

    // Update attacker game stats
    let loss = attackerData.loss++;
    // This needs to be used since the database only accepts names that are used in the model
    games = attackerData.games_played++;
    // push changes to the attacker database
    const updateAttacker = await fetch(`/api/users/update/${myId}`, {
      method: "PUT",
      body: JSON.stringify({ loss, games }),
    });
    if (updateAttacker.ok) {
      console.log(attackerData.username + " info updated");
    }

    //Socket Emit to call game over screen
    if (updateGame.ok) {
      socket.emit('game-updated', { gameId: gameId });
    }
  }

  // If the player is forgeiting as the defender, increase their losses. Up attacker's wins. Set game status to attacker wins.
  if (myId == myGame.defender_id) {
    // Get data from DB for attacker and defender
    let getDefenderData = await fetch(`/api/users/user/${myId}`, {
      method: "GET",
    });
    let getAttackerData = await fetch(`/api/users/user/${myGame.attacker_id}`, {
      method: "GET",
    });
    // change code back into an object from string
    let defenderData = await getDefenderData.json();
    let attackerData = await getAttackerData.json();

    // update game
    let gameStatus = "attackerWon";
    let winner_id = attackerData.id;
    console.log(
      gameStatus +
        " Status of the current game" +
        "\n" +
        winner_id +
        " game winner"
    );
    // Push changes to game update
    const updateGame = await fetch(`/api/games/gameover/${gameId}`, {
      method: "PUT",
      body: JSON.stringify({ gameStatus, winner_id }),
      headers: { "Content-Type": "application/json" },
    });
    if (updateGame.ok) {
      console.log(gameId + " game info updated with game end");
    }

    // update attacker game stats
    let win = attackerData.win;
    win++;
    let games = attackerData.games_played;
    games++;
    // push changes to the attacker database
    const updateAttacker = await fetch(`/api/users/update/${attackerData.id}`, {
      method: "PUT",
      body: JSON.stringify({ win, games }),
      headers: { "Content-Type": "application/json" },
    });
    if (updateAttacker.ok) {
      console.log(attackerData.username + " info updated");
    }

    // Update defender game stats
    let loss = defenderData.loss++;
    games = defenderData.games_played++;
    // This needs to be used since the database only accepts names that are used in the model
    const updateDefender = await fetch(`/api/users/update/${myId}`, {
      method: "PUT",
      body: JSON.stringify({ loss, games }),
    });
    // push changes to the attacker database
    if (updateDefender.ok) {
      console.log(defenderData.username + " info updated");
    }
    //Socket Emit to call game over screen
    if (updateGame.ok) {
      socket.emit('game-updated', { gameId: gameId });
    }
  }
  renderGameArea()
        
}

forfeitGameBtn.addEventListener("click", forfeitGame);
