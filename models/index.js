const User = require("./User");
const Game = require("./Game");

//users can be defenders for many games
User.hasMany(Game, { as: "Defender", foreignKey: "defender_id" });
Game.belongsTo(User, { as: "Defender", foreignKey: "defender_id" });

//users can be attackers for many games
User.hasMany(Game, { as: "Attacker", foreignKey: "attacker_id" });
Game.belongsTo(User, { as: "Attacker", foreignKey: "attacker_id" });

module.exports = {
  User,
  Game,
};
