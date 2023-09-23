const isAttacker = document.querySelectorAll(".join-as-attacker");
const isDefender = document.querySelectorAll(".join-as-defender");

//Socket.io
let socketServerUrl;

//For Local Development
if (window.location.hostname === "localhost") {
  socketServerUrl = "http://localhost:3001";
} else {
  //For Hosted URL ...
  socketServerUrl = window.location.origin;
}

const socket = io(socketServerUrl);

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
        //Socket Emit

        socket.emit("game-updated", { gameId: thisGameId });

        document.location.replace(`/api/games/play/${thisGameId}`);
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
        socket.emit("game-updated", { gameId: thisGameId });
        document.location.replace(`/api/games/play/${thisGameId}`);
      } else {
        alert(`There was an error joining this game`);
      }
    });
  });
}
