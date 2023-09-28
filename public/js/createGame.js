const createGameBtn = document.querySelector("#create-game-btn");
const attackerBtn = document.querySelector("#attacker-btn");
const defenderBtn = document.querySelector("#defender-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const submitBtn = document.querySelector("#submit-btn");
const modal = document.querySelector("#new-game-modal");
const elevenButton = document.querySelector("#eleven-board");
const nineButton = document.querySelector("#nine-board");

let chosenBoard = "taflElevenByEleven";

const switchNine = async (event) => {
  event.preventDefault();
  chosenBoard = event.target.id == "nine-board" ? "taflNineByNine" : "taflElevenByEleven";
  console.log(chosenBoard)
  elevenButton.classList.remove('eleven-board-selected')
  nineButton.classList.add('nine-board-selected')
  elevenButton.classList.add('eleven-board')
  nineButton.classList.remove('nine-board')
  nineButton.removeEventListener("click", switchNine);
  elevenButton.addEventListener("click", switchEleven);
};
const switchEleven = async (event) => {
  event.preventDefault();
  chosenBoard = event.target.id == "nine-board" ? "taflNineByNine" : "taflElevenByEleven";
  console.log(chosenBoard)
  elevenButton.classList.add('eleven-board-selected')
  nineButton.classList.remove('nine-board-selected')
  elevenButton.classList.remove('eleven-board')
  nineButton.classList.add('nine-board')
  nineButton.addEventListener("click", switchNine);
  elevenButton.removeEventListener("click", switchEleven);
};

let chosenRole = "attacker";

const switchAttacker = async (event) => {
  event.preventDefault();
  chosenRole = event.target.id == "attacker-btn" ? "attacker" : "defender";
  console.log(chosenRole)
  attackerBtn.classList.add('attacker-btn-selected')
  defenderBtn.classList.remove('defender-btn-selected')
  attackerBtn.classList.remove('attacker-btn')
  defenderBtn.classList.add('defender-btn')
  defenderBtn.addEventListener("click", switchDefender);
  attackerBtn.removeEventListener("click", switchAttacker);

};

const switchDefender = async (event) => {
  event.preventDefault();
  chosenRole = event.target.id == "attacker-btn" ? "attacker" : "defender";
  console.log(chosenRole)
  attackerBtn.classList.remove('attacker-btn-selected')
  defenderBtn.classList.add('defender-btn-selected')
  attackerBtn.classList.add('attacker-btn')
  defenderBtn.classList.remove('defender-btn')
  defenderBtn.removeEventListener("click", switchDefender);
  attackerBtn.addEventListener("click", switchAttacker);

};


const createGame = async (event) => {  
  event.preventDefault();
console.log(chosenBoard)
  const createNewGame = await fetch("/api/games/create", {
    method: "POST",
    body: JSON.stringify({ chosenRole, chosenBoard}),
    headers: { "Content-Type": "application/json" },
  });

  if (createNewGame.ok) {
    const thisNewGame = await createNewGame.json();
    // redirects user to the game they created
    document.location.replace(`/api/games/play/${thisNewGame.id}`);
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
attackerBtn.addEventListener("click", switchAttacker);
defenderBtn.addEventListener("click", switchDefender);
cancelBtn.addEventListener("click", closeModal);
submitBtn.addEventListener("click", createGame);
nineButton.addEventListener("click", switchNine);
elevenButton.addEventListener("click", switchEleven);
