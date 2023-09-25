const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Game extends Model {}

//initial board game state. This is the starting pattern for an 11x11 Hnefatafl game
// prettier-ignore
const initialBoardState = {
  a: [null, null, null, 0   , 1   , 2   , 3   , 4   , null, null, null],
  b: [null, null, null, null, null, 5   , null, null, null, null, null],
  c: [null, null, null, null, null, null, null, null, null, null, null],
  d: [6   , null, null, null, null, 24  , null, null, null, null, 7   ],
  e: [8   , null, null, null, 25  , 26  , 27  , null, null, null, 9   ],
  f: [10  , 11  , null, 28  , 29  , 36  , 30  , 31  , null, 12  , 13  ],
  g: [14  , null, null, null, 32  , 33  , 34  , null, null, null, 15  ],
  h: [16  , null, null, null, null, 35  , null, null, null, null, 17  ],
  i: [null, null, null, null, null, null, null, null, null, null, null],
  j: [null, null, null, null, null, 18  , null, null, null, null, null],
  k: [null, null, null, 19  , 20  , 21  , 22  , 23  , null, null, null],
};

// DB model for the current game state, players in game, current turn. Is used to track current board state that will connect with socket.io to update gamestate for both players in real time without having to create a looping code that updates game once every second or so. 
Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    board_state: {
      //store the board as json string
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: initialBoardState,
    },
    attacker_turn: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // switch for whomevers turn it is.
    },
    num_of_moves: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    start_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    end_date: {
      type: DataTypes.DATE,
    },
    gameover: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    game_status: {
      type: DataTypes.ENUM(
        "pending",
        "active",
        "attackerWon",
        "defenderWon",
        "draw",
        "gameCancelled"
      ),
      defaultValue: "pending",
    },
    //store the attacker
    attacker_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    //store the defender
    defender_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    // store the winner
    winner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
      defaultValue: null,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "game",
  }
);

module.exports = Game;
