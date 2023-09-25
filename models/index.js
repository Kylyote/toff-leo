const User = require("./User");
const Game = require("./Game");
const Chat = require("./Chat");
const Chat = require("./Chat");

//users can be defenders for many games
User.hasMany(Game, { as: "Defender", foreignKey: "defender_id" });
Game.belongsTo(User, { as: "Defender", foreignKey: "defender_id" });

//users can be attackers for many games
User.hasMany(Game, { as: "Attacker", foreignKey: "attacker_id" });
Game.belongsTo(User, { as: "Attacker", foreignKey: "attacker_id" });

//Chat messages belong to games
Chat.belongsTo(Game, { foreignKey: "game_id" });
Game.hasMany(Chat, { foreignKey: "game_id" });

module.exports = {
  User,
  Game,
  Chat,
};
