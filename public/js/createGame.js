const createGameBtn = document.querySelector("#create-game-btn");
const attackerBtn = document.querySelector("#attacker-btn");
const defenderBtn = document.querySelector("#defender-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const modal = document.querySelector("#new-game-modal");

const createGame = async (event) => {
  event.preventDefault();
  const chosenRole =
    event.target.id == "attacker-btn" ? "attacker" : "defender";

  const createNewGame = await fetch("/api/games/create", {
    method: "POST",
    body: JSON.stringify({ chosenRole }),
    headers: { "Content-Type": "application/json" },
  });

  if (createNewGame.ok) {
    const thisNewGame = await createNewGame.json();
    console.log(thisNewGame);
  } else {
    alert(createNewGame.statusText);
  }
};

const openModal = () => {
  modal.style.display = "block";
};

const closeModal = () => {
  modal.style.display = "none";
};

createGameBtn.addEventListener("click", openModal);
attackerBtn.addEventListener("click", createGame);
defenderBtn.addEventListener("click", createGame);
cancelBtn.addEventListener("click", closeModal);
