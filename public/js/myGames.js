const gameItem = document.querySelectorAll(".game-list-item-view-btn"); // Checks dom to see if games are rendered in that game list

// clicking to view a game will render it in the game area
if (gameItem.length > 0) {
  gameItem.forEach((element) => {
    element.addEventListener("click", async (event) => {
      document.getElementById("gamerender").style.display = "block";
      document.getElementById("my-games-greeting").style.display = "none";

      const thisGameId = event.target.id;

      const getThisGame = await fetch(`/api/games/${thisGameId}`, {
        method: "GET",
      });

      const thisGame = await getThisGame.json();

      if (getThisGame.ok) {
        // gets current user details to extract name for labels
        const getMyUserName = await fetch("/api/users/username", {
          method: "GET",
        });

        // gets current users details to extract name for label purposes
        const myUserName = await getMyUserName.json();

        // conditional for combatant header lables.  If you are a player it will render a different label
        const attackerLabel = thisGame.Attacker
          ? myUserName.username == thisGame.Attacker.username
            ? "You"
            : thisGame.Attacker.username
          : "Waiting for an Attacker";

        const defenderLabel = thisGame.Defender
          ? myUserName.username == thisGame.Defender.username
            ? "You"
            : thisGame.Defender.username
          : "Waiting for a Defender";

        const whosTurnAttacker =
          thisGame.Attacker && thisGame.Defender
            ? myUserName.username == thisGame.Attacker.username
              ? "It's your turn"
              : `It's ${thisGame.Attacker.username}'s turn`
            : "Pending...";

        const whosTurnDefender =
          thisGame.Attacker && thisGame.Defender
            ? myUserName.username == thisGame.Defender.username
              ? "It's your turn"
              : `It's ${thisGame.Defender.username}'s turn`
            : "Pending...";

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

        // renders the game board based on the state from the data base
        // const thisGame = await getThisGame.json();

        // const container = document.getElementById("table");

        // container.innerHTML = generateBoard(thisGame.board_state);
      } else {
        alert("there was an error getting this game");
      }
    });
  });
}
