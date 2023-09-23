const gameItem = document.querySelectorAll(".game-list-item-view-btn"); // Checks dom to see if games are rendered in that game list

if (gameItem.length > 0) {
  gameItem.forEach((element) => {
    element.addEventListener("click", async (event) => {
      const thisGameId = event.target.id; // gets the ID from the game stored on each line item button

      const getSession = await fetch("/api/users/logged-in", {
        method: "GET",
      });

      const loggedIn = await getSession.json();

      if (loggedIn) {
        document.location.replace(`/api/games/play/${thisGameId}`);
      } else {
        document.location.replace(`/api/games/watch/${thisGameId}`);
      }
    });
  });
}
