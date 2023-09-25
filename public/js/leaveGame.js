const leaveGameBtn = document.querySelector("#leave-game-btn");
const forfeitGameBtn = document.querySelector("#forfeit-game-btn");


async function forfeitGame(event) {
  event.preventDefault();

  // Game ID from the window, can be seen in the URL path
  const pathArray = window.location.pathname.split('/');
  const gameId = pathArray[pathArray.length-1];
  console.log("This is the game ID: " + gameId);

  // This double stacks the API route when in a game. Only works in main lobby, which will then not give the game ID. 
  const getMyId = await fetch("api/users/my-id", {
    method: "GET",
  });
  const myId = await getMyId.json();
  console.log("This is the player ID: " + myId);


  const getMyGame = await fetch("api/games/my-games", {
    method: "GET",
  });
  const myGame = await getMyGame.json();
  // get the game ID from the DOM
  /*  const pathArray = window.location.pathname.split('/');
  const gameId = pathArray[pathArray.length-1];
  console.log(gameID);
  */

  // Get current player's ID
  // const forfeitGame = await fetch(`/api/my-games/${id}`, {
  //   method: "PUT",
  // });

  // If the player is forfeiting as the attacker, increase their losses. Up defencer's wins

  // If the player is forgeiting as the defender, increase their losses. Up attacker's wins

  console.log("Forfeit button was pressed");
  console.log("Current game data:" + myGame);
}

forfeitGameBtn.addEventListener("click", forfeitGame)