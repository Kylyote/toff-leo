// JEFF: need to get this to not throw an error if these items arent in the dom
const joinAttackerBtn = document.querySelector(".join-as-attacker");
const joinDefenderBtn = document.querySelector(".join-as-defender");

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

joinAttackerBtn.addEventListener("click", joinAsAttacker);
joinDefenderBtn.addEventListener("click", joinAsDefender);
