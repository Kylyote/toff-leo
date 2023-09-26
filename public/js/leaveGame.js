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
  const pathArray = window.location.pathname.split('/');
  const gameId = pathArray[pathArray.length-1];
  console.log("This is the game ID: " + gameId);

  const getMyGame = await fetch(`/api/games/${gameId}`, {
    method: "GET",
  });
  const myGame = await getMyGame.json();
  console.log("Current attacker ID: " + myGame.attacker_id);
  console.log("Current defender ID: " + myGame.defender_id);
  // get the game ID from the DOM
  /*  const pathArray = window.location.pathname.split('/');
  const gameId = pathArray[pathArray.length-1];
  console.log(gameID);
  */

  // Get current player's ID
  // const forfeitGame = await fetch(`/api/my-games/${id}`, {
  //   method: "PUT",
  // });

  // If the player is forfeiting as the attacker, increase their losses. Up defender's wins. Set game status to defender wins
  if (myId == myGame.defender_id) {
    // Get data from DB for attacker and defender
    let getAttackerData = await fetch(`/api/users/user/${myId}`, {
      method:'GET',
    });
    let getDefenderData = await fetch(`/api/users/user/${myGame.defender_id}`, {
      method: 'GET',
    });
    // change code back into an object from string
    let attackerData = await getAttackerData.json();
    let defenderData = await getDefenderData.json();
    console.log("here is the data from the attacker: " + attackerData + '\n' + "here is the defender data: " + defenderData);
    
  }
  // If the player is forgeiting as the defender, increase their losses. Up attacker's wins. Set game status to attacker wins. 


  console.log("Forfeit button was pressed");
}

forfeitGameBtn.addEventListener("click", forfeitGame)