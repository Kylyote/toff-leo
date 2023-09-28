const createGameBtn = document.querySelector("#create-game-btn");
const attackerBtn = document.querySelector("#attacker-btn");
const defenderBtn = document.querySelector("#defender-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const modal = document.querySelector("#new-game-modal");
const elevenButton = document.querySelector("#eleven-board");
const nineButton = document.querySelector("#nine-board");

let chosenBoard = "taflElevenByEleven"

const switchNine = async (event) => {
  chosenBoard = event.target.id == "nine-board" ? "taflNineByNine" : "taflElevenByEleven";
  console.log(chosenBoard)
}
const switchEleven = async (event) => {
  chosenBoard = event.target.id == "nine-board" ? "taflNineByNine" : "taflElevenByEleven";
  console.log(chosenBoard)

}

const createGame = async (event) => {  
  
  event.preventDefault();
  const chosenRole =
    event.target.id == "attacker-btn" ? "attacker" : "defender";

console.log(chosenBoard)
  const createNewGame = await fetch("/api/games/create", {
    method: "POST",
    body: JSON.stringify({ chosenRole, chosenBoard}),
    headers: { "Content-Type": "application/json" },
  });

  if (createNewGame.ok) {
    const thisNewGame = await createNewGame.json();
    // redirects user to the game they created
    // document.location.replace(`/api/games/play/${thisNewGame.id}`);
    console.log(thisNewGame.board_state)
  } else {
    alert(createNewGame.board_state);
    
  }

  closeModal();
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

nineButton.addEventListener("click", switchNine);
elevenButton.addEventListener("click", switchEleven);
