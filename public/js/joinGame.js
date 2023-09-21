const isNoAttacker = document.querySelectorAll(".join-as-attacker");
const isNoDefender = document.querySelectorAll(".join-as-defender");

if (isNoAttacker.length > 0) {
  const joinAttackerBtn = document.querySelector(".join-as-attacker");

  const joinAsAttacker = async (event) => {
    const thisGameId = event.target.id;

    const joinThisGame = await fetch(`/api/games/join/attacker/${thisGameId}`, {
      method: "PUT",
    });

    if (joinThisGame.ok) {
      document.location.replace("/my-games");
    } else {
      alert(`There was an error joining this game`);
    }
  };

  joinAttackerBtn.addEventListener("click", joinAsAttacker);
}

if (isNoDefender.length > 0) {
  const joinDefenderBtn = document.querySelector(".join-as-defender");

  const joinAsDefender = async (event) => {
    const thisGameId = event.target.id;

    const joinThisGame = await fetch(`/api/games/join/defender/${thisGameId}`, {
      method: "PUT",
    });

    if (joinThisGame.ok) {
      document.location.replace("/my-games");
    } else {
      alert(`There was an error joining this game`);
    }
  };

  joinDefenderBtn.addEventListener("click", joinAsDefender);
}
