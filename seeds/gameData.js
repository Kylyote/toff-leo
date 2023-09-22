const { Game } = require("../models");

//initial board game state
const initialBoardState = {
  a: [null, null, null, 0, 1, 2, 3, 4, null, null, null],
  b: [null, null, null, null, null, 5, null, null, null, null, null],
  c: [null, null, null, null, null, null, null, null, null, null, null],
  d: [6, null, null, null, null, 24, null, null, null, null, 7],
  e: [8, null, null, null, 25, 26, 27, null, null, null, 9],
  f: [10, 11, null, 28, 29, 36, 30, 31, null, 12, 13],
  g: [14, null, null, null, 32, 33, 34, null, null, null, 15],
  h: [16, null, null, null, null, 35, null, null, null, null, 17],
  i: [null, null, null, null, null, null, null, null, null, null, null],
  j: [null, null, null, null, null, 18, null, null, null, null, null],
  k: [null, null, null, 19, 20, 21, 22, 23, null, null, null],
};

const gameData = [
  {
    board_state: initialBoardState,
    attacker_id: 2,
    defender_id: 1,
    game_status: "active",
  },
  {
    board_state: initialBoardState,
    attacker_id: 1,
    defender_id: 2,
    game_status: "attackerWon",
  },
  {
    board_state: initialBoardState,
    attacker_id: 3,
    defender_id: 4,
    game_status: "active",
  },
  {
    board_state: initialBoardState,
    attacker_id: 5,
    defender_id: null,
    game_status: "pending",
  },
  {
    board_state: initialBoardState,
    attacker_id: null,
    defender_id: 6,
    game_status: "pending",
  },
];

const seedGames = () => Game.bulkCreate(gameData);

module.exports = seedGames;
