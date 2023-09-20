const User = require("./User");
const Game = require("./Game");

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
