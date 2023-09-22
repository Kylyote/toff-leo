const isAttacker = document.querySelectorAll(".join-as-attacker");
const isDefender = document.querySelectorAll(".join-as-defender");

if (isAttacker.length > 0) {
  isAttacker.forEach((element) => {
    element.addEventListener("click", async (event) => {
      const thisGameId = event.target.id;

      const joinThisGame = await fetch(
        `/api/games/join/attacker/${thisGameId}/`,
        {
          method: "PUT",
        }
      );

      if (joinThisGame.ok) {
        document.location.replace("/my-games");
      } else {
        alert(`There was an error joining this game`);
      }
    });
  });
}

if (isDefender.length > 0) {
  isDefender.forEach((element) => {
    element.addEventListener("click", async (event) => {
      const thisGameId = event.target.id;

      const joinThisGame = await fetch(
        `/api/games/join/defender/${thisGameId}`,
        {
          method: "PUT",
        }
      );

      if (joinThisGame.ok) {
        document.location.replace("/my-games");
      } else {
        alert(`There was an error joining this game`);
      }
    });
  });
}
