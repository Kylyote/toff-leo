const User = require("./User");
const Game = require("./Game");

// //a single user can have many roles in many games
// User.belongsToMany(Game, { through: UserGameRole, foreignKey: "user_id" });

// //a game can have many users with various roles
// Game.belongsToMany(User, { through: UserGameRole, foreignKey: "game_id" });

//users can be attackers for many games
User.hasMany(Game, { foreignKey: "attacker_id" });
Game.belongsTo(User, { as: "Attacker", foreignKey: "attacker_id" });

//users can be defenders for many games
User.hasMany(Game, { foreignKey: "defender_id" });
Game.belongsTo(User, { as: "Defender", foreignKey: "defender_id" });

module.exports = {
  User,
  Game,
};
