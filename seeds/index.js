const seedUsers = require("./userData");
const seedGames = require("./gameData");
const seedChats = require("./chatSeeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log(`\n----------- DATABASE SYNCED -----------\n`);

  await seedUsers();
  console.log(`\n----------- USERS SEEDED -----------\n`);

  await seedGames();
  console.log(`\n----------- GAMES SEEDED -----------\n`);

  await seedChats();
  console.log(`\n----------- CHATS SEEDED -----------\n`);

  process.exit(0);
};

seedAll();
